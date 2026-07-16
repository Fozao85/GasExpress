import type { PrismaClient } from '@prisma/client';

interface CustomerRef {
  user: { id: string };
  profileId: string;
  addresses: { id: string }[];
}

interface VendorRef {
  user: { id: string };
  profileId: string;
}

interface RiderRef {
  user: { id: string };
  profileId: string;
}

interface CylinderRef {
  id: string;
  sizeKg: number;
}

interface SeedContext {
  customers: CustomerRef[];
  vendors: VendorRef[];
  riders: RiderRef[];
  cylinders: CylinderRef[];
}

function generateOrderNumber(index: number): string {
  const ts = 'SEED';
  return `GN-SEED-${ts}-${String(index).padStart(2, '0')}`;
}

function getPrice(sizeKg: number): number {
  const PRICES: Record<number, number> = { 6: 80, 12.5: 150, 15: 180, 50: 500 };
  return PRICES[sizeKg] ?? 100;
}

const ORDER_DEFINITIONS = [
  {
    customerIdx: 0,
    vendorIdx: 0,
    paymentMethod: 'CASH' as const,
    items: [
      { cylinderIdx: 0, qty: 2 },
      { cylinderIdx: 1, qty: 1 },
    ],
  },
  {
    customerIdx: 0,
    vendorIdx: 1,
    paymentMethod: 'MOBILE_MONEY' as const,
    items: [{ cylinderIdx: 2, qty: 1 }],
  },
  {
    customerIdx: 1,
    vendorIdx: 0,
    paymentMethod: 'CASH' as const,
    items: [{ cylinderIdx: 0, qty: 1 }],
  },
  {
    customerIdx: 1,
    vendorIdx: 2,
    paymentMethod: 'MOBILE_MONEY' as const,
    items: [
      { cylinderIdx: 1, qty: 3 },
      { cylinderIdx: 3, qty: 1 },
    ],
  },
  {
    customerIdx: 2,
    vendorIdx: 2,
    paymentMethod: 'CASH' as const,
    items: [
      { cylinderIdx: 0, qty: 1 },
      { cylinderIdx: 1, qty: 2 },
    ],
  },
  {
    customerIdx: 2,
    vendorIdx: 3,
    paymentMethod: 'MOBILE_MONEY' as const,
    items: [{ cylinderIdx: 2, qty: 2 }],
  },
  {
    customerIdx: 3,
    vendorIdx: 3,
    paymentMethod: 'CASH' as const,
    items: [{ cylinderIdx: 0, qty: 4 }],
  },
  {
    customerIdx: 3,
    vendorIdx: 4,
    paymentMethod: 'MOBILE_MONEY' as const,
    items: [
      { cylinderIdx: 1, qty: 1 },
      { cylinderIdx: 2, qty: 1 },
    ],
  },
  {
    customerIdx: 4,
    vendorIdx: 4,
    paymentMethod: 'CASH' as const,
    items: [{ cylinderIdx: 0, qty: 2 }],
  },
  {
    customerIdx: 4,
    vendorIdx: 1,
    paymentMethod: 'MOBILE_MONEY' as const,
    items: [{ cylinderIdx: 3, qty: 1 }],
  },
];

export async function seedOrders(prisma: PrismaClient, ctx: SeedContext) {
  const { customers, vendors, riders, cylinders } = ctx;
  let orderCount = 0;

  for (let idx = 0; idx < ORDER_DEFINITIONS.length; idx++) {
    const def = ORDER_DEFINITIONS[idx];
    const customer = customers[def.customerIdx];
    const vendor = vendors[def.vendorIdx];
    const rider = riders[idx % riders.length];
    const address = customer.addresses[0];

    const orderItems = def.items.map((i) => {
      const cylinder = cylinders[i.cylinderIdx];
      return {
        cylinderTypeId: cylinder.id,
        quantity: i.qty,
        unitPrice: getPrice(cylinder.sizeKg),
        subtotal: getPrice(cylinder.sizeKg) * i.qty,
      };
    });

    const subtotal = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
    const deliveryFee = subtotal >= 200 ? 0 : 15;
    const total = subtotal + deliveryFee;

    const orderNumber = generateOrderNumber(idx);
    const now = new Date();
    const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000);

    await prisma.order.upsert({
      where: { orderNumber },
      update: {},
      create: {
        orderNumber,
        customerId: customer.profileId,
        vendorId: vendor.profileId,
        riderId: rider.profileId,
        deliveryAddressId: address.id,
        subtotal,
        deliveryFee,
        total,
        paymentMethod: def.paymentMethod,
        paymentStatus: 'PAID',
        orderStatus: 'DELIVERED',
        notes: null,
        estimatedDeliveryAt: hoursAgo(2),
        createdAt: hoursAgo(72),
        items: {
          create: orderItems,
        },
        payment: {
          create: {
            paymentMethod: def.paymentMethod === 'CASH' ? 'CASH' : 'MOBILE_MONEY',
            amount: total,
            paymentStatus: 'PAID',
            paidAt: hoursAgo(68),
            transactionReference: `TXN-SEED-${String(idx).padStart(3, '0')}`,
          },
        },
        statusHistory: {
          create: [
            { status: 'PENDING', note: 'Order placed', createdAt: hoursAgo(72) },
            {
              status: 'VENDOR_ACCEPTED',
              note: 'Vendor accepted the order',
              createdAt: hoursAgo(70),
            },
            { status: 'PREPARING', note: 'Preparing gas cylinder', createdAt: hoursAgo(69) },
            { status: 'READY_FOR_PICKUP', note: 'Order ready for pickup', createdAt: hoursAgo(67) },
            { status: 'RIDER_ASSIGNED', note: 'Rider assigned', createdAt: hoursAgo(66) },
            { status: 'PICKED_UP', note: 'Order picked up from vendor', createdAt: hoursAgo(65) },
            { status: 'ON_THE_WAY', note: 'On the way to delivery', createdAt: hoursAgo(64.5) },
            { status: 'DELIVERED', note: 'Order delivered successfully', createdAt: hoursAgo(64) },
          ],
        },
        delivery: {
          create: {
            riderId: rider.profileId,
            pickupTime: hoursAgo(65.5),
            departureTime: hoursAgo(65),
            arrivalTime: hoursAgo(64.5),
            completionTime: hoursAgo(64),
            deliveryNotes: 'Delivered to customer at front desk',
          },
        },
        review: {
          create: {
            customerId: customer.profileId,
            vendorRating: (idx % 4) + 3,
            riderRating: (idx % 3) + 4,
            comment: 'Great service!',
            createdAt: hoursAgo(63),
          },
        },
      },
    });

    orderCount++;
  }

  console.log(`  ✓ ${orderCount} orders seeded`);
}
