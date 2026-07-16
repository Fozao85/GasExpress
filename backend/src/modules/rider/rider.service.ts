import { prisma } from '../../database';
import { NotFoundError, ValidationError } from '../../common/exceptions/app-error';

async function findRiderByUserId(userId: string) {
  const rider = await prisma.riderProfile.findUnique({
    where: { userId },
    include: { user: { select: { fullName: true, phone: true, email: true } } },
  });
  if (!rider) throw new NotFoundError('Rider profile');
  return rider;
}

export async function getMyProfile(userId: string) {
  const rider = await findRiderByUserId(userId);

  return {
    id: rider.id,
    fullName: rider.user.fullName,
    phone: rider.user.phone,
    email: rider.user.email,
    vehicleType: rider.vehicleType,
    licenseNumber: rider.licenseNumber,
    nationalId: rider.nationalId,
    availability: rider.availability,
    latitude: rider.latitude ? Number(rider.latitude) : null,
    longitude: rider.longitude ? Number(rider.longitude) : null,
    averageRating: rider.averageRating ? Number(rider.averageRating) : 0,
    totalDeliveries: rider.totalDeliveries,
    createdAt: rider.createdAt.toISOString(),
  };
}

export async function updateMyProfile(userId: string, data: any) {
  const rider = await findRiderByUserId(userId);

  const updated = await prisma.riderProfile.update({
    where: { id: rider.id },
    data: {
      ...(data.vehicleType !== undefined && { vehicleType: data.vehicleType }),
      ...(data.licenseNumber !== undefined && { licenseNumber: data.licenseNumber }),
      ...(data.nationalId !== undefined && { nationalId: data.nationalId }),
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
    },
    select: {
      id: true,
      vehicleType: true,
      licenseNumber: true,
      nationalId: true,
      availability: true,
      latitude: true,
      longitude: true,
    },
  });

  return {
    ...updated,
    latitude: updated.latitude ? Number(updated.latitude) : null,
    longitude: updated.longitude ? Number(updated.longitude) : null,
  };
}

export async function updateAvailability(userId: string, data: any) {
  const rider = await findRiderByUserId(userId);

  const updated = await prisma.riderProfile.update({
    where: { id: rider.id },
    data: {
      availability: data.availability,
      ...(data.latitude !== undefined && { latitude: data.latitude }),
      ...(data.longitude !== undefined && { longitude: data.longitude }),
    },
    select: {
      id: true,
      availability: true,
      latitude: true,
      longitude: true,
    },
  });

  return {
    ...updated,
    latitude: updated.latitude ? Number(updated.latitude) : null,
    longitude: updated.longitude ? Number(updated.longitude) : null,
  };
}

export async function getAvailableOrders() {
  const orders = await prisma.order.findMany({
    where: {
      orderStatus: 'READY_FOR_PICKUP',
      riderId: null,
    },
    include: {
      vendor: {
        select: {
          id: true,
          businessName: true,
          address: true,
          phone: true,
          latitude: true,
          longitude: true,
        },
      },
      items: {
        include: { cylinderType: { select: { sizeKg: true, description: true } } },
      },
      address: {
        select: {
          id: true,
          addressLine: true,
          city: true,
          region: true,
          latitude: true,
          longitude: true,
        },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    vendorName: order.vendor.businessName,
    vendorAddress: order.vendor.address,
    vendorPhone: order.vendor.phone,
    vendorLatitude: order.vendor.latitude ? Number(order.vendor.latitude) : null,
    vendorLongitude: order.vendor.longitude ? Number(order.vendor.longitude) : null,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      cylinderSize: Number(item.cylinderType.sizeKg),
      description: item.cylinderType.description,
      quantity: item.quantity,
    })),
    deliveryAddress: {
      addressLine: order.address.addressLine,
      city: order.address.city,
      region: order.address.region,
      latitude: order.address.latitude ? Number(order.address.latitude) : null,
      longitude: order.address.longitude ? Number(order.address.longitude) : null,
    },
  }));
}

export async function acceptOrder(userId: string, orderId: string) {
  const rider = await findRiderByUserId(userId);
  if (rider.availability !== 'ONLINE') {
    throw new ValidationError([
      { field: 'availability', message: 'You must be online to accept orders' },
    ]);
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });
  if (!order) throw new NotFoundError('Order');
  if (order.orderStatus !== 'READY_FOR_PICKUP') {
    throw new ValidationError([{ field: 'orderId', message: 'Order is not ready for pickup' }]);
  }
  if (order.riderId) {
    throw new ValidationError([
      { field: 'orderId', message: 'Order already has a rider assigned' },
    ]);
  }

  const [updated] = await prisma.$transaction([
    prisma.order.update({
      where: { id: orderId },
      data: {
        riderId: rider.id,
        orderStatus: 'RIDER_ASSIGNED',
      },
    }),
    prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: 'RIDER_ASSIGNED',
        note: 'Rider accepted delivery',
      },
    }),
    prisma.riderProfile.update({
      where: { id: rider.id },
      data: { availability: 'BUSY' },
    }),
  ]);

  return {
    id: updated.id,
    orderNumber: updated.orderNumber,
    status: updated.orderStatus,
  };
}

export async function getMyOrders(userId: string) {
  const rider = await findRiderByUserId(userId);

  const orders = await prisma.order.findMany({
    where: {
      riderId: rider.id,
      orderStatus: { in: ['RIDER_ASSIGNED', 'PICKED_UP', 'ON_THE_WAY'] },
    },
    include: {
      vendor: {
        select: {
          id: true,
          businessName: true,
          address: true,
          phone: true,
          latitude: true,
          longitude: true,
        },
      },
      items: {
        include: { cylinderType: { select: { sizeKg: true, description: true } } },
      },
      address: {
        select: {
          id: true,
          addressLine: true,
          city: true,
          region: true,
          latitude: true,
          longitude: true,
        },
      },
      statusHistory: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.orderStatus,
    vendorName: order.vendor.businessName,
    vendorAddress: order.vendor.address,
    vendorPhone: order.vendor.phone,
    vendorLatitude: order.vendor.latitude ? Number(order.vendor.latitude) : null,
    vendorLongitude: order.vendor.longitude ? Number(order.vendor.longitude) : null,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    paymentMethod: order.paymentMethod,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      cylinderSize: Number(item.cylinderType.sizeKg),
      description: item.cylinderType.description,
      quantity: item.quantity,
    })),
    deliveryAddress: {
      addressLine: order.address.addressLine,
      city: order.address.city,
      region: order.address.region,
      latitude: order.address.latitude ? Number(order.address.latitude) : null,
      longitude: order.address.longitude ? Number(order.address.longitude) : null,
    },
    recentStatuses: order.statusHistory.map((h) => ({
      status: h.status,
      note: h.note,
      createdAt: h.createdAt.toISOString(),
    })),
  }));
}

export async function getOrderById(userId: string, orderId: string) {
  const rider = await findRiderByUserId(userId);

  const order = await prisma.order.findFirst({
    where: { id: orderId, riderId: rider.id },
    include: {
      vendor: {
        select: {
          id: true,
          businessName: true,
          address: true,
          phone: true,
          latitude: true,
          longitude: true,
        },
      },
      customer: {
        select: { user: { select: { fullName: true, phone: true } } },
      },
      items: {
        include: { cylinderType: { select: { sizeKg: true, description: true } } },
      },
      address: {
        select: {
          id: true,
          addressLine: true,
          city: true,
          region: true,
          latitude: true,
          longitude: true,
        },
      },
      statusHistory: { orderBy: { createdAt: 'desc' } },
      payment: { select: { paymentMethod: true, paymentStatus: true } },
      delivery: {
        include: { trackingEvents: { orderBy: { timestamp: 'desc' }, take: 1 } },
      },
    },
  });

  if (!order) throw new NotFoundError('Order');

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.orderStatus,
    customerName: order.customer.user.fullName,
    customerPhone: order.customer.user.phone,
    vendorName: order.vendor.businessName,
    vendorAddress: order.vendor.address,
    vendorPhone: order.vendor.phone,
    vendorLatitude: order.vendor.latitude ? Number(order.vendor.latitude) : null,
    vendorLongitude: order.vendor.longitude ? Number(order.vendor.longitude) : null,
    subtotal: Number(order.subtotal),
    deliveryFee: Number(order.deliveryFee),
    total: Number(order.total),
    paymentMethod: order.payment?.paymentMethod || null,
    paymentStatus: order.paymentStatus,
    notes: order.notes,
    estimatedDeliveryAt: order.estimatedDeliveryAt?.toISOString() || null,
    createdAt: order.createdAt.toISOString(),
    items: order.items.map((item) => ({
      cylinderSize: Number(item.cylinderType.sizeKg),
      description: item.cylinderType.description,
      quantity: item.quantity,
    })),
    deliveryAddress: {
      addressLine: order.address.addressLine,
      city: order.address.city,
      region: order.address.region,
      latitude: order.address.latitude ? Number(order.address.latitude) : null,
      longitude: order.address.longitude ? Number(order.address.longitude) : null,
    },
    statusHistory: order.statusHistory.map((h) => ({
      id: h.id,
      status: h.status,
      note: h.note,
      createdAt: h.createdAt.toISOString(),
    })),
    delivery: order.delivery
      ? {
          id: order.delivery.id,
          pickupTime: order.delivery.pickupTime?.toISOString() || null,
          departureTime: order.delivery.departureTime?.toISOString() || null,
          arrivalTime: order.delivery.arrivalTime?.toISOString() || null,
          completionTime: order.delivery.completionTime?.toISOString() || null,
          lastTracking: order.delivery.trackingEvents[0] || null,
        }
      : null,
  };
}

export async function updateDeliveryStatus(userId: string, orderId: string, data: any) {
  const rider = await findRiderByUserId(userId);

  const order = await prisma.order.findFirst({
    where: { id: orderId, riderId: rider.id },
    include: { delivery: true },
  });
  if (!order) throw new NotFoundError('Order');

  const allowedTransitions: Record<string, string[]> = {
    RIDER_ASSIGNED: ['PICKED_UP'],
    PICKED_UP: ['ON_THE_WAY'],
    ON_THE_WAY: ['DELIVERED'],
  };

  const allowed = allowedTransitions[order.orderStatus];
  if (!allowed || !allowed.includes(data.status)) {
    throw new ValidationError([
      { field: 'status', message: `Cannot transition from ${order.orderStatus} to ${data.status}` },
    ]);
  }

  const operations: any[] = [
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
  ];

  if (data.status === 'PICKED_UP') {
    if (!order.delivery) {
      operations.push(
        prisma.delivery.create({
          data: {
            orderId,
            riderId: rider.id,
            pickupTime: new Date(),
          },
        })
      );
    } else {
      operations.push(
        prisma.delivery.update({
          where: { id: order.delivery.id },
          data: { pickupTime: new Date() },
        })
      );
    }
  }

  if (data.status === 'ON_THE_WAY' && order.delivery) {
    operations.push(
      prisma.delivery.update({
        where: { id: order.delivery.id },
        data: { departureTime: new Date() },
      })
    );
  }

  if (data.status === 'DELIVERED') {
    operations.push(
      prisma.riderProfile.update({
        where: { id: rider.id },
        data: {
          availability: 'ONLINE',
          totalDeliveries: { increment: 1 },
        },
      })
    );
    if (order.delivery) {
      operations.push(
        prisma.delivery.update({
          where: { id: order.delivery.id },
          data: { arrivalTime: new Date(), completionTime: new Date() },
        })
      );
    }
  }

  if (data.latitude && data.longitude) {
    if (order.delivery) {
      operations.push(
        prisma.trackingEvent.create({
          data: {
            deliveryId: order.delivery.id,
            latitude: data.latitude,
            longitude: data.longitude,
          },
        })
      );
    }
  }

  await prisma.$transaction(operations);

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: data.status,
  };
}

export async function submitTracking(userId: string, orderId: string, data: any) {
  const rider = await findRiderByUserId(userId);

  const order = await prisma.order.findFirst({
    where: { id: orderId, riderId: rider.id },
    include: { delivery: true },
  });
  if (!order) throw new NotFoundError('Order');
  if (!order.delivery) throw new NotFoundError('Delivery record');

  const event = await prisma.trackingEvent.create({
    data: {
      deliveryId: order.delivery.id,
      latitude: data.latitude,
      longitude: data.longitude,
    },
  });

  return {
    id: event.id,
    latitude: Number(event.latitude),
    longitude: Number(event.longitude),
    timestamp: event.timestamp.toISOString(),
  };
}

export async function getDeliveryHistory(userId: string, query: any) {
  const rider = await findRiderByUserId(userId);

  const where: any = { riderId: rider.id, orderStatus: 'DELIVERED' };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      include: {
        vendor: { select: { businessName: true } },
        items: {
          include: { cylinderType: { select: { sizeKg: true, description: true } } },
        },
        delivery: { select: { pickupTime: true, completionTime: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    }),
    prisma.order.count({ where }),
  ]);

  return {
    deliveries: orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      vendorName: order.vendor.businessName,
      total: Number(order.total),
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((item) => ({
        cylinderSize: Number(item.cylinderType.sizeKg),
        description: item.cylinderType.description,
        quantity: item.quantity,
      })),
      pickupTime: order.delivery?.pickupTime?.toISOString() || null,
      completionTime: order.delivery?.completionTime?.toISOString() || null,
    })),
    pagination: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages: Math.ceil(total / query.limit),
    },
  };
}

export async function getDashboard(userId: string) {
  const rider = await findRiderByUserId(userId);

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [activeDeliveries, todayDeliveries, totalDeliveries, todayEarnings, totalEarnings] =
    await Promise.all([
      prisma.order.count({
        where: {
          riderId: rider.id,
          orderStatus: { in: ['RIDER_ASSIGNED', 'PICKED_UP', 'ON_THE_WAY'] },
        },
      }),
      prisma.order.count({
        where: { riderId: rider.id, orderStatus: 'DELIVERED', createdAt: { gte: todayStart } },
      }),
      prisma.riderProfile.findUnique({
        where: { id: rider.id },
        select: { totalDeliveries: true },
      }),
      prisma.order.aggregate({
        where: { riderId: rider.id, orderStatus: 'DELIVERED', createdAt: { gte: todayStart } },
        _sum: { deliveryFee: true },
      }),
      prisma.order.aggregate({
        where: { riderId: rider.id, orderStatus: 'DELIVERED' },
        _sum: { deliveryFee: true },
      }),
    ]);

  const availableOrders = await prisma.order.count({
    where: { orderStatus: 'READY_FOR_PICKUP', riderId: null },
  });

  return {
    stats: {
      availability: rider.availability,
      activeDeliveries,
      todayDeliveries,
      totalDeliveries: totalDeliveries?.totalDeliveries || 0,
      todayEarnings: todayEarnings._sum.deliveryFee ? Number(todayEarnings._sum.deliveryFee) : 0,
      totalEarnings: totalEarnings._sum.deliveryFee ? Number(totalEarnings._sum.deliveryFee) : 0,
      averageRating: rider.averageRating ? Number(rider.averageRating) : 0,
      availableOrders,
    },
  };
}
