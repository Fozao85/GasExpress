import { prisma } from '../../database';
import { NotFoundError } from '../../common/exceptions/app-error';
import { config } from '../../config';
import type {
  ListVendorsQuery,
  NearbyVendorsQuery,
  SearchVendorsQuery,
} from './vendors.validation';

const VENDOR_SELECT = {
  id: true,
  businessName: true,
  phone: true,
  address: true,
  latitude: true,
  longitude: true,
  averageRating: true,
  isOpen: true,
  verificationStatus: true,
  openingTime: true,
  closingTime: true,
};

const INVENTORY_INCLUDE = {
  inventory: {
    include: {
      cylinderType: true,
    },
    where: { stockQuantity: { gt: 0 } },
    orderBy: { price: 'asc' as const },
  },
};

function toRadians(deg: number): number {
  return (deg * Math.PI) / 180;
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface VendorListItem {
  id: string;
  businessName: string;
  phone: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  averageRating: number;
  isOpen: boolean;
  distance: number | undefined;
  eta: number | undefined;
  lowestPrice: number | undefined;
  availableProducts: number;
}

const AVG_DELIVERY_SPEED_KMH = 30;

function estimateEta(distanceKm: number | undefined): number | undefined {
  if (distanceKm === undefined) return undefined;
  return Math.ceil((distanceKm / AVG_DELIVERY_SPEED_KMH) * 60);
}

export async function listVendors(query: ListVendorsQuery) {
  const where: any = {
    verificationStatus: 'VERIFIED',
  };

  if (query.availability === 'open') {
    where.isOpen = true;
  }

  if (query.category) {
    where.inventory = {
      some: {
        cylinderType: { id: query.category },
        stockQuantity: { gt: 0 },
      },
    };
  }

  if (query.q) {
    where.businessName = { contains: query.q, mode: 'insensitive' };
  }

  const [vendors, total] = await Promise.all([
    prisma.vendorProfile.findMany({
      where,
      select: {
        ...VENDOR_SELECT,
        ...INVENTORY_INCLUDE,
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.vendorProfile.count({ where }),
  ]);

  const lat = query.lat;
  const lng = query.lng;

  let items: VendorListItem[] = vendors.map((v: any) => {
    const vendorLat = v.latitude ? Number(v.latitude) : null;
    const vendorLng = v.longitude ? Number(v.longitude) : null;
    const distance =
      lat && lng && vendorLat && vendorLng
        ? haversineDistance(lat, lng, vendorLat, vendorLng)
        : undefined;

    const prices = (v.inventory as any[])
      .filter((i: any) => i.stockQuantity > 0)
      .map((i: any) => Number(i.price));

    return {
      id: v.id,
      businessName: v.businessName,
      phone: v.phone,
      address: v.address,
      latitude: vendorLat,
      longitude: vendorLng,
      averageRating: v.averageRating ? Number(v.averageRating) : 0,
      isOpen: v.isOpen,
      distance,
      eta: estimateEta(distance),
      lowestPrice: prices.length > 0 ? Math.min(...prices) : undefined,
      availableProducts: prices.length,
    };
  });

  if (query.sort === 'distance' && lat && lng) {
    items.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
  } else if (query.sort === 'speed') {
    items.sort((a, b) => (a.eta ?? Infinity) - (b.eta ?? Infinity));
  } else if (query.sort === 'rating') {
    items.sort((a, b) => b.averageRating - a.averageRating);
  } else if (query.sort === 'price') {
    items.sort((a, b) => (a.lowestPrice ?? Infinity) - (b.lowestPrice ?? Infinity));
  }

  const radius = query.radius ?? config.vendor.defaultRadius;
  if (lat && lng) {
    items = items.filter((v) => v.distance === undefined || v.distance <= radius);
  }

  return {
    vendors: items,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getNearbyVendors(query: NearbyVendorsQuery) {
  const vendors = await prisma.vendorProfile.findMany({
    where: {
      verificationStatus: 'VERIFIED',
      isOpen: true,
      latitude: { not: null },
      longitude: { not: null },
    },
    select: {
      ...VENDOR_SELECT,
      ...INVENTORY_INCLUDE,
    },
    take: query.limit,
  });

  const items: VendorListItem[] = vendors
    .map((v: any) => {
      const vendorLat = v.latitude ? Number(v.latitude) : null;
      const vendorLng = v.longitude ? Number(v.longitude) : null;
      const distance =
        vendorLat && vendorLng
          ? haversineDistance(query.lat, query.lng, vendorLat, vendorLng)
          : undefined;

      return {
        id: v.id,
        businessName: v.businessName,
        phone: v.phone,
        address: v.address,
        latitude: vendorLat,
        longitude: vendorLng,
        averageRating: v.averageRating ? Number(v.averageRating) : 0,
        isOpen: v.isOpen,
        distance,
        eta: estimateEta(distance),
        lowestPrice: undefined,
        availableProducts: v.inventory.filter((i: any) => i.stockQuantity > 0).length,
      };
    })
    .filter((v) => v.distance !== undefined && v.distance <= query.radius)
    .sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

  return { vendors: items };
}

export async function getVendorById(id: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id },
    select: {
      ...VENDOR_SELECT,
      user: {
        select: { fullName: true, email: true },
      },
      inventory: {
        include: { cylinderType: true },
        orderBy: { price: 'asc' },
      },
    },
  });

  if (!vendor) {
    throw new NotFoundError('Vendor');
  }

  const inventory = vendor.inventory.map((item) => ({
    id: item.id,
    cylinderTypeId: item.cylinderTypeId,
    cylinderSize: Number(item.cylinderType.sizeKg),
    description: item.cylinderType.description,
    price: Number(item.price),
    stockQuantity: item.stockQuantity,
    inStock: item.stockQuantity > 0,
  }));

  const lowestPrice =
    inventory.filter((i) => i.inStock).length > 0
      ? Math.min(...inventory.filter((i) => i.inStock).map((i) => i.price))
      : null;

  return {
    id: vendor.id,
    businessName: vendor.businessName,
    ownerName: vendor.user.fullName,
    phone: vendor.phone,
    email: vendor.user.email,
    address: vendor.address,
    latitude: vendor.latitude ? Number(vendor.latitude) : null,
    longitude: vendor.longitude ? Number(vendor.longitude) : null,
    averageRating: vendor.averageRating ? Number(vendor.averageRating) : 0,
    isOpen: vendor.isOpen,
    openingTime: vendor.openingTime,
    closingTime: vendor.closingTime,
    verificationStatus: vendor.verificationStatus,
    lowestPrice,
    inventory,
  };
}

export async function searchVendors(query: SearchVendorsQuery) {
  const where: any = {
    verificationStatus: 'VERIFIED',
    businessName: { contains: query.q, mode: 'insensitive' },
  };

  const [vendors, total] = await Promise.all([
    prisma.vendorProfile.findMany({
      where,
      select: {
        ...VENDOR_SELECT,
        ...INVENTORY_INCLUDE,
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.vendorProfile.count({ where }),
  ]);

  const lat = query.lat;
  const lng = query.lng;

  const items: VendorListItem[] = vendors.map((v: any) => {
    const vendorLat = v.latitude ? Number(v.latitude) : null;
    const vendorLng = v.longitude ? Number(v.longitude) : null;
    const distance =
      lat && lng && vendorLat && vendorLng
        ? haversineDistance(lat, lng, vendorLat, vendorLng)
        : undefined;

    const prices = (v.inventory as any[])
      .filter((i: any) => i.stockQuantity > 0)
      .map((i: any) => Number(i.price));

    return {
      id: v.id,
      businessName: v.businessName,
      phone: v.phone,
      address: v.address,
      latitude: vendorLat,
      longitude: vendorLng,
      averageRating: v.averageRating ? Number(v.averageRating) : 0,
      isOpen: v.isOpen,
      distance,
      eta: estimateEta(distance),
      lowestPrice: prices.length > 0 ? Math.min(...prices) : undefined,
      availableProducts: prices.length,
    };
  });

  return {
    vendors: items,
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function listCategories() {
  const categories = await prisma.cylinderType.findMany({
    orderBy: [{ vendorId: { sort: 'asc', nulls: 'first' } }, { sizeKg: 'asc' }],
  });

  return categories.map((c) => ({
    id: c.id,
    name: c.name || `${c.sizeKg}kg`,
    sizeKg: Number(c.sizeKg),
    description: c.description,
    color: c.color,
    isCustom: !!c.vendorId,
  }));
}

export async function createCylinderType(
  userId: string,
  data: {
    name: string;
    sizeKg: number;
    description?: string | null;
    color?: string | null;
  }
) {
  const vendor = await findVendorByUserId(userId);

  const cylinderType = await prisma.cylinderType.create({
    data: {
      vendorId: vendor.id,
      name: data.name,
      sizeKg: data.sizeKg,
      description: data.description ?? null,
      color: data.color ?? null,
    },
  });

  return {
    id: cylinderType.id,
    name: cylinderType.name!,
    sizeKg: Number(cylinderType.sizeKg),
    description: cylinderType.description,
    color: cylinderType.color,
    isCustom: true,
  };
}

export async function getProductsByCategory(categoryId: string) {
  const category = await prisma.cylinderType.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new NotFoundError('Category');
  }

  const products = await prisma.vendorInventory.findMany({
    where: {
      cylinderTypeId: categoryId,
      stockQuantity: { gt: 0 },
      vendor: { verificationStatus: 'VERIFIED' },
    },
    include: {
      cylinderType: {
        select: { sizeKg: true },
      },
      vendor: {
        select: {
          id: true,
          businessName: true,
          address: true,
          isOpen: true,
          averageRating: true,
        },
      },
    },
    orderBy: { price: 'asc' },
  });

  return products.map((p) => ({
    id: p.id,
    vendorId: p.vendorId,
    vendorName: p.vendor.businessName,
    vendorAddress: p.vendor.address,
    vendorRating: Number(p.vendor.averageRating),
    vendorIsOpen: p.vendor.isOpen,
    size: Number(p.cylinderType.sizeKg),
    price: Number(p.price),
    stockQuantity: p.stockQuantity,
    inStock: p.stockQuantity > 0,
  }));
}

function computeNextAvailable(
  isOpen: boolean,
  openingTime: string | null,
  closingTime: string | null
): string | null {
  if (isOpen) return null;
  if (!openingTime || !closingTime) return null;

  const now = new Date();
  const [openH, openM] = openingTime.split(':').map(Number);
  const [closeH, closeM] = closingTime.split(':').map(Number);

  const todayOpen = new Date(now);
  todayOpen.setHours(openH, openM, 0, 0);
  const todayClose = new Date(now);
  todayClose.setHours(closeH, closeM, 0, 0);

  if (now < todayOpen) {
    return todayOpen.toISOString();
  }

  if (now < todayClose) {
    return null;
  }

  const tomorrowOpen = new Date(now);
  tomorrowOpen.setDate(tomorrowOpen.getDate() + 1);
  tomorrowOpen.setHours(openH, openM, 0, 0);
  return tomorrowOpen.toISOString();
}

export async function getVendorAvailability(id: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id },
    select: {
      isOpen: true,
      openingTime: true,
      closingTime: true,
      inventory: {
        where: { stockQuantity: { gt: 0 } },
        select: { stockQuantity: true },
      },
    },
  });

  if (!vendor) {
    throw new NotFoundError('Vendor');
  }

  const totalStock = vendor.inventory.reduce((sum, i) => sum + i.stockQuantity, 0);

  return {
    isOpen: vendor.isOpen,
    openingTime: vendor.openingTime,
    closingTime: vendor.closingTime,
    nextAvailable: computeNextAvailable(vendor.isOpen, vendor.openingTime, vendor.closingTime),
    stockStatus: totalStock > 0 ? 'in_stock' : 'out_of_stock',
    totalProducts: vendor.inventory.length,
  };
}

export async function listPromotions() {
  const now = new Date();
  const promotions = await prisma.promotion.findMany({
    where: {
      active: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    orderBy: { endDate: 'asc' },
  });

  return promotions.map((p) => ({
    id: p.id,
    title: p.title,
    discountType: p.discountType,
    value: Number(p.value),
    validUntil: p.endDate.toISOString(),
  }));
}

async function findVendorByUserId(userId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
  });
  if (!vendor) throw new NotFoundError('Vendor profile');
  return vendor;
}

export async function getMyVendorProfile(userId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId },
    include: {
      user: { select: { fullName: true, email: true } },
      inventory: {
        include: { cylinderType: true },
        orderBy: { price: 'asc' },
      },
      _count: { select: { orders: true } },
    },
  });
  if (!vendor) throw new NotFoundError('Vendor profile');

  return {
    id: vendor.id,
    businessName: vendor.businessName,
    ownerName: vendor.user.fullName,
    email: vendor.user.email,
    phone: vendor.phone,
    address: vendor.address,
    latitude: vendor.latitude ? Number(vendor.latitude) : null,
    longitude: vendor.longitude ? Number(vendor.longitude) : null,
    isOpen: vendor.isOpen,
    openingTime: vendor.openingTime,
    closingTime: vendor.closingTime,
    verificationStatus: vendor.verificationStatus,
    averageRating: vendor.averageRating ? Number(vendor.averageRating) : 0,
    totalOrders: vendor._count.orders,
    inventory: vendor.inventory.map((item) => ({
      id: item.id,
      cylinderTypeId: item.cylinderTypeId,
      cylinderSize: Number(item.cylinderType.sizeKg),
      description: item.cylinderType.description,
      price: Number(item.price),
      stockQuantity: item.stockQuantity,
      inStock: item.stockQuantity > 0,
    })),
  };
}

export async function updateMyVendorProfile(userId: string, data: any) {
  const vendor = await findVendorByUserId(userId);

  const updated = await prisma.vendorProfile.update({
    where: { id: vendor.id },
    data: {
      ...(data.businessName !== undefined && { businessName: data.businessName }),
      ...(data.phone !== undefined && { phone: data.phone }),
      ...(data.address !== undefined && { address: data.address }),
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
      ...(data.isOpen !== undefined && { isOpen: data.isOpen }),
      ...(data.openingTime !== undefined && { openingTime: data.openingTime }),
      ...(data.closingTime !== undefined && { closingTime: data.closingTime }),
    },
    select: {
      id: true,
      businessName: true,
      phone: true,
      address: true,
      latitude: true,
      longitude: true,
      isOpen: true,
      openingTime: true,
      closingTime: true,
      verificationStatus: true,
    },
  });

  return {
    ...updated,
    latitude: updated.latitude ? Number(updated.latitude) : null,
    longitude: updated.longitude ? Number(updated.longitude) : null,
  };
}

export async function getMyInventory(userId: string) {
  const vendor = await findVendorByUserId(userId);

  const inventory = await prisma.vendorInventory.findMany({
    where: { vendorId: vendor.id },
    include: { cylinderType: true },
    orderBy: { price: 'asc' },
  });

  return inventory.map((item) => ({
    id: item.id,
    cylinderTypeId: item.cylinderTypeId,
    cylinderSize: Number(item.cylinderType.sizeKg),
    name: item.cylinderType.name,
    description: item.cylinderType.description,
    price: Number(item.price),
    stockQuantity: item.stockQuantity,
    inStock: item.stockQuantity > 0,
  }));
}

export async function addInventoryItem(userId: string, data: any) {
  const vendor = await findVendorByUserId(userId);

  const cylinderType = await prisma.cylinderType.findUnique({
    where: { id: data.cylinderTypeId },
  });
  if (!cylinderType) throw new NotFoundError('Cylinder type');

  const existing = await prisma.vendorInventory.findUnique({
    where: {
      vendorId_cylinderTypeId: {
        vendorId: vendor.id,
        cylinderTypeId: data.cylinderTypeId,
      },
    },
  });
  if (existing) {
    const { ValidationError } = await import('../../common/exceptions/app-error');
    throw new ValidationError([
      { field: 'cylinderTypeId', message: 'Inventory item already exists for this cylinder type' },
    ]);
  }

  const item = await prisma.vendorInventory.create({
    data: {
      vendorId: vendor.id,
      cylinderTypeId: data.cylinderTypeId,
      stockQuantity: data.stockQuantity,
      price: data.price,
    },
    include: { cylinderType: true },
  });

  return {
    id: item.id,
    cylinderTypeId: item.cylinderTypeId,
    cylinderSize: Number(item.cylinderType.sizeKg),
    name: item.cylinderType.name,
    description: item.cylinderType.description,
    price: Number(item.price),
    stockQuantity: item.stockQuantity,
    inStock: item.stockQuantity > 0,
  };
}

export async function updateInventoryItem(userId: string, inventoryId: string, data: any) {
  const vendor = await findVendorByUserId(userId);

  const item = await prisma.vendorInventory.findFirst({
    where: { id: inventoryId, vendorId: vendor.id },
  });
  if (!item) throw new NotFoundError('Inventory item');

  const updated = await prisma.vendorInventory.update({
    where: { id: inventoryId },
    data: {
      ...(data.stockQuantity !== undefined && { stockQuantity: data.stockQuantity }),
      ...(data.price !== undefined && { price: data.price }),
    },
    include: { cylinderType: true },
  });

  return {
    id: updated.id,
    cylinderTypeId: updated.cylinderTypeId,
    cylinderSize: Number(updated.cylinderType.sizeKg),
    description: updated.cylinderType.description,
    price: Number(updated.price),
    stockQuantity: updated.stockQuantity,
    inStock: updated.stockQuantity > 0,
  };
}

export async function deleteInventoryItem(userId: string, inventoryId: string) {
  const vendor = await findVendorByUserId(userId);

  const item = await prisma.vendorInventory.findFirst({
    where: { id: inventoryId, vendorId: vendor.id },
  });
  if (!item) throw new NotFoundError('Inventory item');

  await prisma.vendorInventory.delete({ where: { id: inventoryId } });

  return { id: inventoryId };
}

export async function getMyOrders(userId: string, query: any) {
  const vendor = await findVendorByUserId(userId);

  const where: any = { vendorId: vendor.id };
  if (query.status) {
    where.orderStatus = query.status;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        customer: {
          select: {
            user: { select: { fullName: true, phone: true } },
          },
        },
        items: {
          include: { cylinderType: true },
        },
        address: true,
        payment: { select: { paymentMethod: true, paymentStatus: true } },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customer.user.fullName,
      customerPhone: order.customer.user.phone,
      status: order.orderStatus,
      paymentMethod: order.payment?.paymentMethod || null,
      paymentStatus: order.paymentStatus,
      subtotal: Number(order.subtotal),
      deliveryFee: Number(order.deliveryFee),
      total: Number(order.total),
      notes: order.notes,
      estimatedDeliveryAt: order.estimatedDeliveryAt?.toISOString() || null,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((item) => ({
        id: item.id,
        cylinderSize: Number(item.cylinderType.sizeKg),
        description: item.cylinderType.description,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        subtotal: Number(item.subtotal),
      })),
      address: {
        id: order.address.id,
        addressLine: order.address.addressLine,
        city: order.address.city,
        region: order.address.region,
      },
      lastStatus: order.statusHistory[0] || null,
    })),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getVendorOrderById(userId: string, orderId: string) {
  const vendor = await findVendorByUserId(userId);

  const order = await prisma.order.findFirst({
    where: { id: orderId, vendorId: vendor.id },
    include: {
      customer: {
        select: {
          user: { select: { fullName: true, phone: true } },
        },
      },
      items: {
        include: { cylinderType: true },
      },
      address: true,
      payment: { select: { paymentMethod: true, paymentStatus: true, transactionReference: true } },
      statusHistory: { orderBy: { createdAt: 'desc' } },
    },
  });

  if (!order) throw new NotFoundError('Order');

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.customer.user.fullName,
    customerPhone: order.customer.user.phone,
    status: order.orderStatus,
    paymentMethod: order.payment?.paymentMethod || null,
    paymentStatus: order.paymentStatus,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    notes: order.notes,
    estimatedDeliveryAt: order.estimatedDeliveryAt?.toISOString() || null,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      cylinderSize: Number(item.cylinderType.sizeKg),
      description: item.cylinderType.description,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      subtotal: Number(item.subtotal),
    })),
    address: {
      id: order.address.id,
      addressLine: order.address.addressLine,
      city: order.address.city,
      region: order.address.region,
    },
    statusHistory: order.statusHistory.map((h) => ({
      id: h.id,
      status: h.status,
      note: h.note,
      createdAt: h.createdAt.toISOString(),
    })),
  };
}

export async function updateOrderStatus(userId: string, orderId: string, data: any) {
  const vendor = await findVendorByUserId(userId);

  const order = await prisma.order.findFirst({
    where: { id: orderId, vendorId: vendor.id },
  });
  if (!order) throw new NotFoundError('Order');

  const allowedTransitions: Record<string, string[]> = {
    PENDING: ['VENDOR_ACCEPTED', 'CANCELLED'],
    VENDOR_ACCEPTED: ['PREPARING', 'CANCELLED'],
    PREPARING: ['READY_FOR_PICKUP', 'CANCELLED'],
  };

  const allowed = allowedTransitions[order.orderStatus];
  if (!allowed || !allowed.includes(data.status)) {
    const { ValidationError } = await import('../../common/exceptions/app-error');
    throw new ValidationError([
      { field: 'status', message: `Cannot transition from ${order.orderStatus} to ${data.status}` },
    ]);
  }

  const [updated] = await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: data.status },
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: data.status,
        note: data.note || null,
      },
    }),
  ]);

  return {
    id: updated.id,
    orderNumber: updated.orderNumber,
    status: updated.orderStatus,
  };
}

export async function getDashboard(userId: string) {
  const vendor = await findVendorByUserId(userId);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [
    totalOrders,
    pendingOrders,
    activeOrders,
    completedOrders,
    todayOrders,
    totalRevenue,
    todayRevenue,
    lowStockItems,
  ] = await Promise.all([
    prisma.order.count({ where: { vendorId: vendor.id } }),
    prisma.order.count({ where: { vendorId: vendor.id, orderStatus: 'PENDING' } }),
    prisma.order.count({
      where: {
        vendorId: vendor.id,
        orderStatus: { in: ['VENDOR_ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP'] },
      },
    }),
    prisma.order.count({ where: { vendorId: vendor.id, orderStatus: 'DELIVERED' } }),
    prisma.order.count({
      where: { vendorId: vendor.id, createdAt: { gte: todayStart } },
    }),
    prisma.order.aggregate({
      where: { vendorId: vendor.id, orderStatus: 'DELIVERED' },
      _sum: { total: true },
    }),
    prisma.order.aggregate({
      where: { vendorId: vendor.id, orderStatus: 'DELIVERED', createdAt: { gte: todayStart } },
      _sum: { total: true },
    }),
    prisma.vendorInventory.count({
      where: { vendorId: vendor.id, stockQuantity: { lte: 5 } },
    }),
  ]);

  const totalRev = totalRevenue._sum.total ? Number(totalRevenue._sum.total) : 0;
  const todayRev = todayRevenue._sum.total ? Number(todayRevenue._sum.total) : 0;

  return {
    stats: {
      totalOrders,
      pendingOrders,
      activeOrders,
      completedOrders,
      todayOrders,
      totalRevenue: totalRev,
      todayRevenue: todayRev,
      lowStockItems,
      averageRating: vendor.averageRating ? Number(vendor.averageRating) : 0,
    },
    business: {
      isOpen: vendor.isOpen,
      verificationStatus: vendor.verificationStatus,
    },
  };
}
