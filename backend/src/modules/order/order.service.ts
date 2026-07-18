import { prisma } from '../../database';
import { PaymentMethod } from '@prisma/client';
import { NotFoundError, ValidationError } from '../../common/exceptions/app-error';

function nullish<T>(val: T | undefined): T | null {
  return val === undefined ? null : val;
}

function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GN-${ts}-${rand}`;
}

const ORDER_INCLUDE = {
  vendor: {
    select: { id: true, businessName: true, phone: true, address: true },
  },
  address: {
    select: { id: true, label: true, addressLine: true, city: true, region: true },
  },
  items: {
    include: {
      cylinderType: { select: { sizeKg: true, description: true } },
    },
  },
  payment: {
    select: { id: true, paymentMethod: true, amount: true, paymentStatus: true },
  },
  statusHistory: {
    orderBy: { createdAt: 'desc' as const },
    take: 5,
  },
};

function mapOrder(order: any) {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.orderStatus,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    estimatedDeliveryAt: order.estimatedDeliveryAt,
    createdAt: order.createdAt,
    vendor: order.vendor,
    address: order.address,
    items: order.items.map((i: any) => ({
      id: i.id,
      cylinderSize: Number(i.cylinderType.sizeKg),
      description: i.cylinderType.description,
      quantity: i.quantity,
      unitPrice: Number(i.unitPrice),
      subtotal: Number(i.subtotal),
    })),
    payment: order.payment,
    statusHistory: order.statusHistory,
  };
}

export async function createOrder(
  customerId: string,
  input: { addressId: string; paymentMethod: string; notes?: string }
): Promise<any> {
  const profile = await prisma.customerProfile.findUnique({
    where: { userId: customerId },
    include: { user: true },
  });
  if (!profile) throw new NotFoundError('Customer profile');

  const address = await prisma.address.findUnique({ where: { id: input.addressId } });
  if (!address) throw new NotFoundError('Address');
  if (address.userId !== customerId) {
    throw new ValidationError([
      { field: 'addressId', message: 'Address does not belong to customer' },
    ]);
  }

  const cart = await prisma.cart.findFirst({
    where: { customerId: profile.id },
    include: {
      vendor: { select: { id: true, isOpen: true, verificationStatus: true } },
      items: {
        include: {
          inventory: {
            include: { cylinderType: true },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new ValidationError([{ field: 'cart', message: 'Cart is empty' }]);
  }

  if (!cart.vendor.isOpen) {
    throw new ValidationError([{ field: 'vendorId', message: 'Vendor is currently closed' }]);
  }
  if (cart.vendor.verificationStatus !== 'VERIFIED') {
    throw new ValidationError([{ field: 'vendorId', message: 'Vendor is not verified' }]);
  }

  for (const item of cart.items) {
    if (!item.inventory) {
      throw new ValidationError([
        {
          field: `items.${item.inventoryId}`,
          message: 'Product is no longer available',
        },
      ]);
    }
    if (item.quantity > item.inventory.stockQuantity) {
      throw new ValidationError([
        {
          field: `items.${item.inventoryId}`,
          message: `Only ${item.inventory.stockQuantity} units available for ${item.inventory.cylinderType.sizeKg}kg`,
        },
      ]);
    }
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.inventory.price) * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const paymentMethod = input.paymentMethod as PaymentMethod;

  const order = await prisma.$transaction(async (tx) => {
    const orderNumber = generateOrderNumber();

    const created = await tx.order.create({
      data: {
        orderNumber,
        customerId: profile.id,
        vendorId: cart.vendorId,
        deliveryAddressId: input.addressId,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'CASH' ? 'PENDING' : 'PENDING',
        orderStatus: 'PENDING',
        notes: nullish(input.notes),
        estimatedDeliveryAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        items: {
          create: cart.items.map((item) => ({
            cylinderTypeId: item.inventory.cylinderTypeId,
            quantity: item.quantity,
            unitPrice: item.inventory.price,
            subtotal: Number(item.inventory.price) * item.quantity,
          })),
        },
        payment: {
          create: {
            paymentMethod,
            amount: total,
            paymentStatus: 'PENDING',
          },
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            note: 'Order placed',
          },
        },
      },
      include: ORDER_INCLUDE,
    });

    for (const item of cart.items) {
      await tx.vendorInventory.update({
        where: { id: item.inventoryId },
        data: { stockQuantity: { decrement: item.quantity } },
      });
    }

    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
    await tx.cart.delete({ where: { id: cart.id } });

    return created;
  });

  await prisma.notification.create({
    data: {
      userId: (await prisma.vendorProfile.findUnique({ where: { id: cart.vendorId } }))!.userId,
      title: 'New Order',
      body: `Order ${order.orderNumber} has been placed`,
      notificationType: 'order_placed',
    },
  });

  return mapOrder(order);
}

export async function getOrders(
  customerId: string,
  query: { page: number; limit: number; status?: string }
) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const where: any = { customerId: profile.id };
  if (query.status) {
    const statuses = query.status.split(',').map((s) => s.trim());
    where.orderStatus = statuses.length === 1 ? statuses[0] : { in: statuses };
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: ORDER_INCLUDE,
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders: orders.map(mapOrder),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getOrderById(customerId: string, orderId: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: ORDER_INCLUDE,
  });

  if (!order) throw new NotFoundError('Order');
  if (order.customerId !== profile.id) throw new NotFoundError('Order');

  return mapOrder(order);
}

export async function getOrderStatusHistory(customerId: string, orderId: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { customerId: true },
  });

  if (!order) throw new NotFoundError('Order');
  if (order.customerId !== profile.id) throw new NotFoundError('Order');

  const history = await prisma.orderStatusHistory.findMany({
    where: { orderId },
    orderBy: { createdAt: 'desc' },
  });

  return history.map((h) => ({
    id: h.id,
    status: h.status,
    note: h.note,
    createdAt: h.createdAt,
  }));
}

export async function cancelOrder(customerId: string, orderId: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) throw new NotFoundError('Order');
  if (order.customerId !== profile.id) throw new NotFoundError('Order');
  if (order.orderStatus !== 'PENDING') {
    throw new ValidationError([
      { field: 'orderId', message: 'Only pending orders can be cancelled' },
    ]);
  }

  const updated = await prisma.$transaction(async (tx) => {
    for (const item of order.items) {
      const inventory = await tx.vendorInventory.findFirst({
        where: { vendorId: order.vendorId, cylinderTypeId: item.cylinderTypeId },
      });
      if (inventory) {
        await tx.vendorInventory.update({
          where: { id: inventory.id },
          data: { stockQuantity: { increment: item.quantity } },
        });
      }
    }

    const cancelled = await tx.order.update({
      where: { id: orderId },
      data: { orderStatus: 'CANCELLED' },
      include: ORDER_INCLUDE,
    });

    await tx.orderStatusHistory.create({
      data: {
        orderId,
        status: 'CANCELLED',
        note: 'Order cancelled by customer',
      },
    });

    return cancelled;
  });

  return mapOrder(updated);
}
