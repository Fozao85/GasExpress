import { prisma } from '../../database';
import { NotFoundError, ValidationError, ForbiddenError } from '../../common/exceptions/app-error';

export async function getDashboard() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalCustomers,
    totalVendors,
    totalRiders,
    activeVendors,
    onlineRiders,
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    inTransitOrders,
    completedOrders,
    cancelledOrders,
    revenueToday,
    revenueThisWeek,
    revenueThisMonth,
    revenueTotal,
    avgVendorRating,
    avgRiderRating,
    lowInventoryCount,
    pendingVendors,
    pendingRiders,
  ] = await Promise.all([
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.vendorProfile.count(),
    prisma.riderProfile.count(),
    prisma.vendorProfile.count({ where: { isOpen: true, verificationStatus: 'VERIFIED' } }),
    prisma.riderProfile.count({ where: { availability: 'ONLINE' } }),
    prisma.order.count(),
    prisma.order.count({ where: { orderStatus: 'PENDING' } }),
    prisma.order.count({ where: { orderStatus: 'PREPARING' } }),
    prisma.order.count({ where: { orderStatus: 'READY_FOR_PICKUP' } }),
    prisma.order.count({
      where: { orderStatus: { in: ['RIDER_ASSIGNED', 'PICKED_UP', 'ON_THE_WAY'] } },
    }),
    prisma.order.count({ where: { orderStatus: 'DELIVERED' } }),
    prisma.order.count({ where: { orderStatus: 'CANCELLED' } }),
    prisma.order.aggregate({
      where: { orderStatus: 'DELIVERED', createdAt: { gte: todayStart } },
      _sum: { deliveryFee: true },
    }),
    prisma.order.aggregate({
      where: { orderStatus: 'DELIVERED', createdAt: { gte: weekStart } },
      _sum: { deliveryFee: true },
    }),
    prisma.order.aggregate({
      where: { orderStatus: 'DELIVERED', createdAt: { gte: monthStart } },
      _sum: { deliveryFee: true },
    }),
    prisma.order.aggregate({
      where: { orderStatus: 'DELIVERED' },
      _sum: { deliveryFee: true },
    }),
    prisma.vendorProfile.aggregate({ _avg: { averageRating: true } }),
    prisma.riderProfile.aggregate({ _avg: { averageRating: true } }),
    prisma.vendorInventory.count({ where: { stockQuantity: { lte: 5 } } }),
    prisma.vendorProfile.count({ where: { verificationStatus: 'PENDING' } }),
    prisma.user.count({ where: { role: 'RIDER', status: 'PENDING' } }),
  ]);

  return {
    totalCustomers,
    totalVendors,
    totalRiders,
    activeVendors,
    onlineRiders,
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    inTransitOrders,
    completedOrders,
    cancelledOrders,
    revenueToday: Number(revenueToday._sum.deliveryFee) || 0,
    revenueThisWeek: Number(revenueThisWeek._sum.deliveryFee) || 0,
    revenueThisMonth: Number(revenueThisMonth._sum.deliveryFee) || 0,
    revenueTotal: Number(revenueTotal._sum.deliveryFee) || 0,
    averageVendorRating: Number(avgVendorRating._avg.averageRating) || 0,
    averageRiderRating: Number(avgRiderRating._avg.averageRating) || 0,
    lowInventoryVendors: lowInventoryCount,
    pendingVendorApprovals: pendingVendors,
    pendingRiderApprovals: pendingRiders,
  };
}

export async function listUsers(query: {
  page: number;
  limit: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  const where: any = {};

  if (query.role) where.role = query.role;
  if (query.status) where.status = query.status;
  if (query.search) {
    where.OR = [
      { fullName: { contains: query.search, mode: 'insensitive' } },
      { phone: { contains: query.search } },
      { email: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        lastLogin: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users: users.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
      lastLogin: u.lastLogin?.toISOString() || null,
    })),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      lastLogin: true,
      customerProfile: { select: { totalSpent: true, loyaltyPoints: true } },
      vendorProfile: {
        select: { businessName: true, verificationStatus: true, isOpen: true, averageRating: true },
      },
      riderProfile: {
        select: {
          vehicleType: true,
          availability: true,
          averageRating: true,
          totalDeliveries: true,
        },
      },
    },
  });
  if (!user) throw new NotFoundError('User');
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    lastLogin: user.lastLogin?.toISOString() || null,
    customerProfile: user.customerProfile || null,
    vendorProfile: user.vendorProfile || null,
    riderProfile: user.riderProfile || null,
  };
}

export async function updateUserStatus(adminId: string, userId: string, status: string) {
  if (adminId === userId) throw new ForbiddenError('Cannot change your own status');

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError('User');

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: status as any },
    select: { id: true, fullName: true, role: true, status: true },
  });
  return updated;
}

export async function deleteUser(adminId: string, userId: string) {
  if (adminId === userId) throw new ForbiddenError('Cannot delete yourself');

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError('User');

  await prisma.user.delete({ where: { id: userId } });
  return { id: userId, deleted: true };
}

export async function getPendingVendors() {
  const vendors = await prisma.vendorProfile.findMany({
    where: { verificationStatus: 'PENDING' },
    include: {
      user: { select: { fullName: true, phone: true, email: true, createdAt: true } },
    },
    orderBy: { createdAt: 'asc' },
  });
  return vendors.map((v) => ({
    id: v.id,
    businessName: v.businessName,
    businessLicense: v.businessLicense,
    phone: v.phone,
    address: v.address,
    latitude: v.latitude ? Number(v.latitude) : null,
    longitude: v.longitude ? Number(v.longitude) : null,
    ownerName: v.user.fullName,
    ownerPhone: v.user.phone,
    ownerEmail: v.user.email,
    submittedAt: v.createdAt.toISOString(),
    userCreatedAt: v.user.createdAt.toISOString(),
  }));
}

export async function approveVendor(vendorId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorId },
    include: { user: true },
  });
  if (!vendor) throw new NotFoundError('Vendor');

  await prisma.$transaction([
    prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { verificationStatus: 'VERIFIED' },
    }),
    prisma.user.update({
      where: { id: vendor.userId },
      data: { status: 'ACTIVE' },
    }),
  ]);

  return { id: vendorId, status: 'VERIFIED' };
}

export async function rejectVendor(vendorId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorId },
    include: { user: true },
  });
  if (!vendor) throw new NotFoundError('Vendor');

  await prisma.$transaction([
    prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { verificationStatus: 'REJECTED' },
    }),
    prisma.user.update({
      where: { id: vendor.userId },
      data: { status: 'SUSPENDED' },
    }),
  ]);

  return { id: vendorId, status: 'REJECTED' };
}

export async function suspendVendor(vendorId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorId },
    include: { user: true },
  });
  if (!vendor) throw new NotFoundError('Vendor');

  await prisma.$transaction([
    prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { isOpen: false },
    }),
    prisma.user.update({
      where: { id: vendor.userId },
      data: { status: 'SUSPENDED' },
    }),
  ]);

  return { id: vendorId, status: 'SUSPENDED' };
}

export async function reactivateVendor(vendorId: string) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: vendorId },
    include: { user: true },
  });
  if (!vendor) throw new NotFoundError('Vendor');

  await prisma.$transaction([
    prisma.vendorProfile.update({
      where: { id: vendorId },
      data: { verificationStatus: 'VERIFIED', isOpen: true },
    }),
    prisma.user.update({
      where: { id: vendor.userId },
      data: { status: 'ACTIVE' },
    }),
  ]);

  return { id: vendorId, status: 'ACTIVE' };
}

export async function getPendingRiders() {
  const riders = await prisma.user.findMany({
    where: { role: 'RIDER', status: 'PENDING' },
    include: {
      riderProfile: {
        select: { id: true, vehicleType: true, licenseNumber: true, nationalId: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });
  return riders.map((r) => ({
    id: r.riderProfile?.id,
    userId: r.id,
    fullName: r.fullName,
    phone: r.phone,
    email: r.email,
    vehicleType: r.riderProfile?.vehicleType || null,
    licenseNumber: r.riderProfile?.licenseNumber || null,
    nationalId: r.riderProfile?.nationalId || null,
    registeredAt: r.createdAt.toISOString(),
  }));
}

export async function approveRider(riderId: string) {
  const rider = await prisma.riderProfile.findUnique({
    where: { id: riderId },
    include: { user: true },
  });
  if (!rider) throw new NotFoundError('Rider');

  await prisma.user.update({
    where: { id: rider.userId },
    data: { status: 'ACTIVE' },
  });

  return { id: riderId, status: 'ACTIVE' };
}

export async function rejectRider(riderId: string) {
  const rider = await prisma.riderProfile.findUnique({
    where: { id: riderId },
    include: { user: true },
  });
  if (!rider) throw new NotFoundError('Rider');

  await prisma.user.update({
    where: { id: rider.userId },
    data: { status: 'SUSPENDED' },
  });

  return { id: riderId, status: 'SUSPENDED' };
}

export async function suspendRider(riderId: string) {
  const rider = await prisma.riderProfile.findUnique({
    where: { id: riderId },
    include: { user: true },
  });
  if (!rider) throw new NotFoundError('Rider');

  await prisma.$transaction([
    prisma.riderProfile.update({
      where: { id: riderId },
      data: { availability: 'OFFLINE' },
    }),
    prisma.user.update({
      where: { id: rider.userId },
      data: { status: 'SUSPENDED' },
    }),
  ]);

  return { id: riderId, status: 'SUSPENDED' };
}

export async function reactivateRider(riderId: string) {
  const rider = await prisma.riderProfile.findUnique({
    where: { id: riderId },
    include: { user: true },
  });
  if (!rider) throw new NotFoundError('Rider');

  await prisma.user.update({
    where: { id: rider.userId },
    data: { status: 'ACTIVE' },
  });

  return { id: riderId, status: 'ACTIVE' };
}

export async function listOrders(query: {
  page: number;
  limit: number;
  status?: string;
  vendorId?: string;
  customerId?: string;
  riderId?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const where: any = {};

  if (query.status) where.orderStatus = query.status;
  if (query.vendorId) where.vendorId = query.vendorId;
  if (query.customerId) where.customerId = query.customerId;
  if (query.riderId) where.riderId = query.riderId;
  if (query.paymentMethod) where.paymentMethod = query.paymentMethod;
  if (query.paymentStatus) where.paymentStatus = query.paymentStatus;
  if (query.dateFrom || query.dateTo) {
    where.createdAt = {};
    if (query.dateFrom) where.createdAt.gte = new Date(query.dateFrom);
    if (query.dateTo) where.createdAt.lte = new Date(query.dateTo);
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        vendor: { select: { businessName: true } },
        customer: { select: { user: { select: { fullName: true } } } },
        rider: { select: { user: { select: { fullName: true } } } },
        items: { select: { quantity: true, unitPrice: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      status: o.orderStatus,
      customerName: o.customer.user.fullName,
      vendorName: o.vendor.businessName,
      riderName: o.rider?.user.fullName || null,
      total: Number(o.total),
      deliveryFee: Number(o.deliveryFee),
      paymentMethod: o.paymentMethod,
      paymentStatus: o.paymentStatus,
      itemCount: o.items.reduce((s, i) => s + i.quantity, 0),
      createdAt: o.createdAt.toISOString(),
    })),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getOrderDetail(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: { select: { user: { select: { fullName: true, phone: true } } } },
      vendor: { select: { id: true, businessName: true, phone: true, address: true } },
      rider: { select: { user: { select: { fullName: true, phone: true } }, vehicleType: true } },
      items: { include: { cylinderType: { select: { sizeKg: true, description: true } } } },
      address: true,
      payment: {
        select: {
          paymentMethod: true,
          transactionReference: true,
          amount: true,
          paymentStatus: true,
          paidAt: true,
        },
      },
      delivery: { include: { trackingEvents: { orderBy: { timestamp: 'desc' }, take: 1 } } },
      statusHistory: { orderBy: { createdAt: 'asc' } },
    },
  });
  if (!order) throw new NotFoundError('Order');

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.orderStatus,
    notes: order.notes,
    estimatedDeliveryAt: order.estimatedDeliveryAt?.toISOString() || null,
    createdAt: order.createdAt.toISOString(),
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    customer: { name: order.customer.user.fullName, phone: order.customer.user.phone },
    vendor: order.vendor,
    rider: order.rider
      ? {
          name: order.rider.user.fullName,
          phone: order.rider.user.phone,
          vehicleType: order.rider.vehicleType,
        }
      : null,
    deliveryAddress: order.address,
    items: order.items.map((i) => ({
      cylinderSize: Number(i.cylinderType.sizeKg),
      description: i.cylinderType.description,
      quantity: i.quantity,
      unitPrice: Number(i.unitPrice),
      subtotal: Number(i.subtotal),
    })),
    payment: order.payment
      ? {
          method: order.payment.paymentMethod,
          reference: order.payment.transactionReference,
          amount: Number(order.payment.amount),
          status: order.payment.paymentStatus,
          paidAt: order.payment.paidAt?.toISOString() || null,
        }
      : null,
    delivery: order.delivery
      ? {
          id: order.delivery.id,
          pickupTime: order.delivery.pickupTime?.toISOString() || null,
          departureTime: order.delivery.departureTime?.toISOString() || null,
          arrivalTime: order.delivery.arrivalTime?.toISOString() || null,
          completionTime: order.delivery.completionTime?.toISOString() || null,
        }
      : null,
    statusHistory: order.statusHistory.map((h) => ({
      id: h.id,
      status: h.status,
      note: h.note,
      createdAt: h.createdAt.toISOString(),
    })),
  };
}

export async function cancelOrder(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new NotFoundError('Order');
  if (order.orderStatus === 'DELIVERED' || order.orderStatus === 'CANCELLED') {
    throw new ValidationError([
      { field: 'orderId', message: 'Order is already completed or cancelled' },
    ]);
  }

  await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: { orderStatus: 'CANCELLED' },
    }),
    prisma.orderStatusHistory.create({
      data: { orderId, status: 'CANCELLED', note: 'Cancelled by admin' },
    }),
  ]);

  return { id: orderId, status: 'CANCELLED' };
}

export async function listPromotions() {
  return prisma.promotion.findMany({ orderBy: { startDate: 'desc' } });
}

export async function createPromotion(data: {
  title: string;
  description?: string;
  discount: number;
  minimumOrder?: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}) {
  return prisma.promotion.create({
    data: {
      title: data.title,
      discountType: 'PERCENTAGE',
      value: data.discount,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      active: data.isActive ?? true,
    },
  });
}

export async function updatePromotion(
  id: string,
  data: {
    title?: string;
    description?: string;
    discount?: number;
    minimumOrder?: number;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
  }
) {
  const promo = await prisma.promotion.findUnique({ where: { id } });
  if (!promo) throw new NotFoundError('Promotion');

  return prisma.promotion.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.discount !== undefined && { value: data.discount }),
      ...(data.startDate !== undefined && { startDate: new Date(data.startDate) }),
      ...(data.endDate !== undefined && { endDate: new Date(data.endDate) }),
      ...(data.isActive !== undefined && { active: data.isActive }),
    },
  });
}

export async function deletePromotion(id: string) {
  const promo = await prisma.promotion.findUnique({ where: { id } });
  if (!promo) throw new NotFoundError('Promotion');
  await prisma.promotion.delete({ where: { id } });
  return { id, deleted: true };
}

export async function getSettings() {
  let settings = await prisma.platformSettings.findFirst();
  if (!settings) {
    settings = await prisma.platformSettings.create({ data: {} });
  }
  return {
    defaultDeliveryFee: Number(settings.defaultDeliveryFee),
    freeDeliveryThreshold: Number(settings.freeDeliveryThreshold),
    supportPhone: settings.supportPhone,
    supportEmail: settings.supportEmail,
    maintenanceMode: settings.maintenanceMode,
    minimumInventoryAlert: settings.minimumInventoryAlert,
  };
}

export async function updateSettings(data: {
  defaultDeliveryFee?: number;
  freeDeliveryThreshold?: number;
  supportPhone?: string;
  supportEmail?: string;
  maintenanceMode?: boolean;
  minimumInventoryAlert?: number;
}) {
  let settings = await prisma.platformSettings.findFirst();
  if (!settings) {
    settings = await prisma.platformSettings.create({ data: {} });
  }

  const updated = await prisma.platformSettings.update({
    where: { id: settings.id },
    data,
  });

  return {
    defaultDeliveryFee: Number(updated.defaultDeliveryFee),
    freeDeliveryThreshold: Number(updated.freeDeliveryThreshold),
    supportPhone: updated.supportPhone,
    supportEmail: updated.supportEmail,
    maintenanceMode: updated.maintenanceMode,
    minimumInventoryAlert: updated.minimumInventoryAlert,
  };
}
