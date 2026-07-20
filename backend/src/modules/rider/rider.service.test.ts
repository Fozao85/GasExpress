import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    riderProfile: { findUnique: vi.fn(), update: vi.fn() },
    order: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
      aggregate: vi.fn(),
    },
    orderStatusHistory: { create: vi.fn() },
    delivery: { create: vi.fn(), update: vi.fn() },
    trackingEvent: { create: vi.fn() },
    $transaction: vi.fn((ops: any[]) => Promise.resolve(ops.map((o: any) => o.data || o))),
  },
}));

import * as riderService from './rider.service';

const mockUserId = 'user-1';

function makeRider(overrides: Record<string, any> = {}): any {
  return {
    id: 'rider-1',
    userId: mockUserId,
    vehicleType: 'Motorcycle',
    licenseNumber: 'LN123',
    nationalId: 'ID456',
    availability: 'ONLINE',
    latitude: null,
    longitude: null,
    averageRating: 4.5,
    totalDeliveries: 50,
    createdAt: new Date('2026-01-01'),
    user: { fullName: 'Test Rider', phone: '0551234567', email: 'rider@test.com' },
    ...overrides,
  };
}

function makeOrder(overrides: Record<string, any> = {}): any {
  return {
    id: 'order-1',
    orderNumber: 'GN-ABCD',
    customerId: 'cust-1',
    vendorId: 'vendor-1',
    riderId: null,
    subtotal: 100,
    deliveryFee: 15,
    total: 115,
    paymentMethod: 'CASH',
    paymentStatus: 'PENDING',
    orderStatus: 'READY_FOR_PICKUP',
    notes: null,
    estimatedDeliveryAt: null,
    createdAt: new Date('2026-07-16T10:00:00Z'),
    vendor: {
      id: 'vendor-1',
      businessName: 'Test Gas',
      address: '123 Shop St',
      phone: '0550000000',
      latitude: null,
      longitude: null,
    },
    customer: { user: { fullName: 'John Doe', phone: '0559999999' } },
    items: [{ cylinderType: { sizeKg: 14.5, description: 'Large' }, quantity: 1 }],
    address: {
      id: 'addr-1',
      addressLine: '456 Home St',
      city: 'Accra',
      region: 'Greater Accra',
      latitude: null,
      longitude: null,
    },
    delivery: null,
    statusHistory: [],
    payment: null,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('RiderService', () => {
  describe('getMyProfile', () => {
    it('returns rider profile', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      const result = await riderService.getMyProfile(mockUserId);
      expect(result.fullName).toBe('Test Rider');
      expect(result.vehicleType).toBe('Motorcycle');
    });

    it('throws NotFoundError for missing profile', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(null);
      await expect(riderService.getMyProfile(mockUserId)).rejects.toThrow('Rider profile');
    });
  });

  describe('updateMyProfile', () => {
    it('updates and returns profile fields', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.riderProfile.update).mockResolvedValue(
        makeRider({ vehicleType: 'Bicycle', licenseNumber: 'LN999' })
      );
      const result = await riderService.updateMyProfile(mockUserId, {
        vehicleType: 'Bicycle',
        licenseNumber: 'LN999',
      });
      expect(result.vehicleType).toBe('Bicycle');
      expect(result.licenseNumber).toBe('LN999');
    });
  });

  describe('updateAvailability', () => {
    it('updates availability status', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.riderProfile.update).mockResolvedValue(
        makeRider({ availability: 'OFFLINE' })
      );
      const result = await riderService.updateAvailability(mockUserId, { availability: 'OFFLINE' });
      expect(result.availability).toBe('OFFLINE');
    });
  });

  describe('getAvailableOrders', () => {
    it('returns available orders ready for pickup', async () => {
      vi.mocked(prisma.order.findMany).mockResolvedValue([makeOrder()]);
      const result = await riderService.getAvailableOrders();
      expect(result).toHaveLength(1);
      expect(result[0].orderNumber).toBe('GN-ABCD');
      expect(prisma.order.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ orderStatus: 'READY_FOR_PICKUP', riderId: null }),
        })
      );
    });

    it('returns empty list when no orders available', async () => {
      vi.mocked(prisma.order.findMany).mockResolvedValue([]);
      const result = await riderService.getAvailableOrders();
      expect(result).toHaveLength(0);
    });
  });

  describe('acceptOrder', () => {
    it('accepts an order and sets rider to busy', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder());
      vi.mocked(prisma.$transaction).mockImplementation(async (ops: any[]) => {
        return ops.map(() => makeOrder({ riderId: 'rider-1', orderStatus: 'RIDER_ASSIGNED' }));
      });
      const result = await riderService.acceptOrder(mockUserId, 'order-1');
      expect(result.status).toBe('RIDER_ASSIGNED');
    });

    it('throws if rider is offline', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(
        makeRider({ availability: 'OFFLINE' })
      );
      await expect(riderService.acceptOrder(mockUserId, 'order-1')).rejects.toThrow(
        'Validation failed'
      );
    });

    it('throws if order already has a rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder({ riderId: 'other-rider' }));
      await expect(riderService.acceptOrder(mockUserId, 'order-1')).rejects.toThrow(
        'Validation failed'
      );
    });

    it('throws if order is not ready for pickup', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder({ orderStatus: 'DELIVERED' }));
      await expect(riderService.acceptOrder(mockUserId, 'order-1')).rejects.toThrow(
        'Validation failed'
      );
    });
  });

  describe('rejectOrder', () => {
    it('rejects order and sets back to ready for pickup', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'RIDER_ASSIGNED' })
      );
      vi.mocked(prisma.$transaction).mockImplementation(async (ops: any[]) => {
        return ops.map(() => makeOrder({ orderStatus: 'READY_FOR_PICKUP' }));
      });
      const result = await riderService.rejectOrder(mockUserId, 'order-1');
      expect(result.status).toBe('READY_FOR_PICKUP');
    });

    it('throws if order not found or not assigned to rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(null);
      await expect(riderService.rejectOrder(mockUserId, 'order-1')).rejects.toThrow('Order');
    });

    it('throws if order not in RIDER_ASSIGNED status', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'PICKED_UP' })
      );
      await expect(riderService.rejectOrder(mockUserId, 'order-1')).rejects.toThrow(
        'Validation failed'
      );
    });
  });

  describe('updateLocation', () => {
    it('updates rider location', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.riderProfile.update).mockResolvedValue(
        makeRider({ latitude: 5.6037, longitude: -0.187 })
      );
      const result = await riderService.updateLocation(mockUserId, {
        latitude: 5.6037,
        longitude: -0.187,
      });
      expect(result.latitude).toBe(5.6037);
      expect(result.longitude).toBe(-0.187);
    });
  });

  describe('getEarnings', () => {
    it('returns earnings breakdown with periods', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      const mockAgg = { _sum: { deliveryFee: 150 }, _count: 10 };
      vi.mocked(prisma.order.aggregate).mockResolvedValue(mockAgg as any);
      vi.mocked(prisma.order.findMany).mockResolvedValue([
        {
          id: 'order-1',
          orderNumber: 'GN-ABCD',
          deliveryFee: 15,
          createdAt: new Date('2026-07-16T10:00:00Z'),
          vendor: { businessName: 'Test Gas' },
        },
      ]);
      const result = await riderService.getEarnings(mockUserId);
      expect(result.periods.today.earnings).toBe(150);
      expect(result.periods.allTime.deliveries).toBe(10);
      expect(result.recentDeliveries).toHaveLength(1);
    });
  });

  describe('getMyOrders', () => {
    it('returns active orders for the rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findMany).mockResolvedValue([
        makeOrder({ riderId: 'rider-1', orderStatus: 'RIDER_ASSIGNED' }),
      ]);
      const result = await riderService.getMyOrders(mockUserId);
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('RIDER_ASSIGNED');
    });
  });

  describe('getOrderById', () => {
    it('returns order detail for assigned rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({
          riderId: 'rider-1',
          orderStatus: 'RIDER_ASSIGNED',
          statusHistory: [],
          delivery: null,
        })
      );
      const result = await riderService.getOrderById(mockUserId, 'order-1');
      expect(result.orderNumber).toBe('GN-ABCD');
      expect(result.customerName).toBe('John Doe');
    });

    it('throws for non-existent order', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(null);
      await expect(riderService.getOrderById(mockUserId, 'order-1')).rejects.toThrow('Order');
    });
  });

  describe('updateDeliveryStatus', () => {
    it('transitions from RIDER_ASSIGNED to PICKED_UP', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'RIDER_ASSIGNED', delivery: null })
      );
      vi.mocked(prisma.$transaction).mockImplementation(async (ops: any[]) =>
        ops.map(() => makeOrder({ orderStatus: 'PICKED_UP' }))
      );
      const result = await riderService.updateDeliveryStatus(mockUserId, 'order-1', {
        status: 'PICKED_UP',
      });
      expect(result.status).toBe('PICKED_UP');
    });

    it('transitions from PICKED_UP to ON_THE_WAY', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'PICKED_UP', delivery: { id: 'del-1' } })
      );
      vi.mocked(prisma.$transaction).mockImplementation(async (ops: any[]) =>
        ops.map(() => makeOrder({ orderStatus: 'ON_THE_WAY' }))
      );
      const result = await riderService.updateDeliveryStatus(mockUserId, 'order-1', {
        status: 'ON_THE_WAY',
      });
      expect(result.status).toBe('ON_THE_WAY');
    });

    it('transitions from ON_THE_WAY to DELIVERED', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'ON_THE_WAY', delivery: { id: 'del-1' } })
      );
      vi.mocked(prisma.$transaction).mockImplementation(async (ops: any[]) =>
        ops.map(() => makeOrder({ orderStatus: 'DELIVERED' }))
      );
      const result = await riderService.updateDeliveryStatus(mockUserId, 'order-1', {
        status: 'DELIVERED',
      });
      expect(result.status).toBe('DELIVERED');
    });

    it('rejects invalid transitions', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'RIDER_ASSIGNED' })
      );
      await expect(
        riderService.updateDeliveryStatus(mockUserId, 'order-1', { status: 'DELIVERED' })
      ).rejects.toThrow('Validation failed');
    });
  });

  describe('submitTracking', () => {
    it('creates tracking event for active delivery', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findFirst).mockResolvedValue(
        makeOrder({ riderId: 'rider-1', orderStatus: 'ON_THE_WAY', delivery: { id: 'del-1' } })
      );
      vi.mocked(prisma.trackingEvent.create).mockResolvedValue({
        id: 'evt-1',
        latitude: 5.6,
        longitude: -0.19,
        timestamp: new Date(),
      });
      const result = await riderService.submitTracking(mockUserId, 'order-1', {
        latitude: 5.6,
        longitude: -0.19,
      });
      expect(result.latitude).toBe(5.6);
      expect(result.longitude).toBe(-0.19);
    });
  });

  describe('getDeliveryHistory', () => {
    it('returns paginated delivery history', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.findMany).mockResolvedValue([
        makeOrder({
          riderId: 'rider-1',
          orderStatus: 'DELIVERED',
          delivery: { pickupTime: new Date(), completionTime: new Date() },
        }),
      ]);
      vi.mocked(prisma.order.count).mockResolvedValue(1);
      const result = await riderService.getDeliveryHistory(mockUserId, { page: 1, limit: 10 });
      expect(result.deliveries).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('getDashboard', () => {
    it('returns dashboard stats', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRider());
      vi.mocked(prisma.order.count).mockResolvedValue(0);
      vi.mocked(prisma.order.aggregate).mockResolvedValue({
        _sum: { deliveryFee: 75 },
        _count: 5,
      } as any);
      const result = await riderService.getDashboard(mockUserId);
      expect(result.stats.availability).toBe('ONLINE');
      expect(result.stats.totalDeliveries).toBe(50);
    });
  });
});
