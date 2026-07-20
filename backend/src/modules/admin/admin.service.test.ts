import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    user: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    vendorProfile: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      aggregate: vi.fn(),
    },
    riderProfile: { count: vi.fn(), findUnique: vi.fn(), update: vi.fn(), aggregate: vi.fn() },
    order: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      aggregate: vi.fn(),
      update: vi.fn(),
    },
    vendorInventory: { count: vi.fn() },
    promotion: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    platformSettings: { findFirst: vi.fn(), create: vi.fn(), update: vi.fn() },
    orderStatusHistory: { create: vi.fn() },
    $transaction: vi.fn((ops: any[]) => Promise.resolve(ops.map(() => ({})))),
  },
}));

import * as adminService from './admin.service';

const mockAdminId = 'admin-uuid';

function makeUser(overrides: any = {}): any {
  return {
    id: 'user-1',
    fullName: 'Test',
    phone: '0550000000',
    email: null,
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: new Date(),
    lastLogin: null,
    ...overrides,
  };
}

function makeVendor(overrides: any = {}): any {
  return {
    id: 'vendor-1',
    userId: 'user-2',
    businessName: 'Test Gas',
    businessLicense: null,
    phone: '0551111111',
    address: '123 St',
    latitude: null,
    longitude: null,
    verificationStatus: 'PENDING',
    isOpen: false,
    averageRating: null,
    createdAt: new Date(),
    user: { fullName: 'Owner', phone: '0551111111', email: null, createdAt: new Date() },
    ...overrides,
  };
}

function makeRiderProfile(overrides: any = {}): any {
  return {
    id: 'rider-1',
    userId: 'user-3',
    vehicleType: 'Motorcycle',
    licenseNumber: 'LN123',
    nationalId: 'ID456',
    availability: 'ONLINE',
    averageRating: null,
    totalDeliveries: 0,
    createdAt: new Date(),
    user: { fullName: 'Rider', phone: '0552222222', email: null },
    ...overrides,
  };
}

function makeOrder(overrides: any = {}): any {
  return {
    id: 'order-1',
    orderNumber: 'GN-001',
    customerId: 'cust-1',
    vendorId: 'ven-1',
    riderId: null,
    subtotal: 100,
    deliveryFee: 15,
    total: 115,
    orderStatus: 'PENDING',
    paymentMethod: 'CASH',
    paymentStatus: 'PENDING',
    notes: null,
    estimatedDeliveryAt: null,
    createdAt: new Date(),
    vendor: { id: 'ven-1', businessName: 'Test Gas', phone: '055', address: '123 St' },
    customer: { user: { fullName: 'John', phone: '055' } },
    rider: null,
    items: [
      {
        cylinderType: { sizeKg: 14.5, description: 'Large' },
        quantity: 1,
        unitPrice: 100,
        subtotal: 100,
      },
    ],
    address: {
      id: 'addr-1',
      addressLine: '456 Home St',
      city: 'Accra',
      region: null,
      latitude: null,
      longitude: null,
    },
    payment: null,
    delivery: null,
    statusHistory: [],
    ...overrides,
  };
}

function makePromotion(overrides: any = {}): any {
  return {
    id: 'promo-1',
    title: 'Test Promo',
    discountType: 'PERCENTAGE',
    value: 10,
    startDate: new Date(),
    endDate: new Date(Date.now() + 86400000),
    active: true,
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AdminService', () => {
  describe('getDashboard', () => {
    it('returns aggregated dashboard stats', async () => {
      vi.mocked(prisma.user.count).mockResolvedValue(10);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(5);
      vi.mocked(prisma.riderProfile.count).mockResolvedValue(3);
      vi.mocked(prisma.order.count).mockResolvedValue(50);
      vi.mocked(prisma.order.aggregate).mockResolvedValue({
        _sum: { deliveryFee: 1000 },
        _count: 20,
      } as any);
      vi.mocked(prisma.vendorProfile.aggregate).mockResolvedValue({
        _avg: { averageRating: 4.5 },
      } as any);
      vi.mocked(prisma.riderProfile.aggregate).mockResolvedValue({
        _avg: { averageRating: 4.2 },
      } as any);
      vi.mocked(prisma.vendorInventory.count).mockResolvedValue(2);

      const result = await adminService.getDashboard();
      expect(result.totalCustomers).toBe(10);
      expect(result.totalVendors).toBe(5);
      expect(result.totalRiders).toBe(3);
      expect(result.totalOrders).toBe(50);
      expect(result.revenueTotal).toBe(1000);
      expect(result.averageVendorRating).toBe(4.5);
      expect(result.averageRiderRating).toBe(4.2);
      expect(result.lowInventoryVendors).toBe(2);
    });
  });

  describe('listUsers', () => {
    it('returns paginated users', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([makeUser()]);
      vi.mocked(prisma.user.count).mockResolvedValue(1);
      const result = await adminService.listUsers({ page: 1, limit: 20 });
      expect(result.users).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('filters by role and status', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([]);
      vi.mocked(prisma.user.count).mockResolvedValue(0);
      await adminService.listUsers({ page: 1, limit: 20, role: 'VENDOR', status: 'PENDING' });
      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ role: 'VENDOR', status: 'PENDING' }),
        })
      );
    });

    it('searches by name, phone or email', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([]);
      vi.mocked(prisma.user.count).mockResolvedValue(0);
      await adminService.listUsers({ page: 1, limit: 20, search: 'john' });
      expect(prisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: expect.objectContaining({ OR: expect.any(Array) }) })
      );
    });
  });

  describe('getUserById', () => {
    it('returns user with profile details', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(
        makeUser({ vendorProfile: makeVendor() })
      );
      const result = await adminService.getUserById('user-1');
      expect(result.fullName).toBe('Test');
      expect(result.vendorProfile).toBeDefined();
    });

    it('throws NotFoundError for missing user', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
      await expect(adminService.getUserById('bad-id')).rejects.toThrow('User');
    });
  });

  describe('updateUserStatus', () => {
    it('updates user status', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(makeUser());
      vi.mocked(prisma.user.update).mockResolvedValue(makeUser({ status: 'SUSPENDED' }));
      const result = await adminService.updateUserStatus('admin-id', 'user-1', 'SUSPENDED');
      expect(result.status).toBe('SUSPENDED');
    });

    it('prevents admin from changing own status', async () => {
      await expect(
        adminService.updateUserStatus('admin-1', 'admin-1', 'SUSPENDED')
      ).rejects.toThrow('Cannot change your own status');
    });
  });

  describe('deleteUser', () => {
    it('deletes a user', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValue(makeUser());
      vi.mocked(prisma.user.delete).mockResolvedValue(makeUser());
      const result = await adminService.deleteUser('admin-id', 'user-1');
      expect(result.deleted).toBe(true);
    });

    it('prevents admin from deleting self', async () => {
      await expect(adminService.deleteUser('admin-1', 'admin-1')).rejects.toThrow(
        'Cannot delete yourself'
      );
    });
  });

  describe('vendor approval', () => {
    it('approves a vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(makeVendor());
      const result = await adminService.approveVendor('vendor-1');
      expect(result.status).toBe('VERIFIED');
    });

    it('rejects a vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(makeVendor());
      const result = await adminService.rejectVendor('vendor-1');
      expect(result.status).toBe('REJECTED');
    });

    it('suspends a vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(makeVendor());
      const result = await adminService.suspendVendor('vendor-1');
      expect(result.status).toBe('SUSPENDED');
    });

    it('reactivates a vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(makeVendor());
      const result = await adminService.reactivateVendor('vendor-1');
      expect(result.status).toBe('ACTIVE');
    });
  });

  describe('rider approval', () => {
    it('approves a rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRiderProfile());
      const result = await adminService.approveRider('rider-1');
      expect(result.status).toBe('ACTIVE');
    });

    it('rejects a rider', async () => {
      vi.mocked(prisma.riderProfile.findUnique).mockResolvedValue(makeRiderProfile());
      const result = await adminService.rejectRider('rider-1');
      expect(result.status).toBe('SUSPENDED');
    });
  });

  describe('getPendingRiders', () => {
    it('returns pending riders', async () => {
      vi.mocked(prisma.user.findMany).mockResolvedValue([
        {
          id: 'u1',
          fullName: 'Rider',
          phone: '055',
          email: null,
          role: 'RIDER',
          status: 'PENDING',
          createdAt: new Date(),
          riderProfile: { id: 'rp-1', vehicleType: 'Bike', licenseNumber: 'LN', nationalId: 'ID' },
        },
      ]);
      const result = await adminService.getPendingRiders();
      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe('Rider');
    });
  });

  describe('orders', () => {
    it('lists orders with filters', async () => {
      vi.mocked(prisma.order.findMany).mockResolvedValue([makeOrder()]);
      vi.mocked(prisma.order.count).mockResolvedValue(1);
      const result = await adminService.listOrders({ page: 1, limit: 20, status: 'PENDING' });
      expect(result.orders).toHaveLength(1);
      expect(result.orders[0].orderNumber).toBe('GN-001');
    });

    it('returns order detail with full timeline', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder());
      const result = await adminService.getOrderDetail('order-1');
      expect(result.orderNumber).toBe('GN-001');
    });

    it('cancels an order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder({ orderStatus: 'PENDING' }));
      const result = await adminService.cancelOrder('order-1');
      expect(result.status).toBe('CANCELLED');
    });

    it('rejects cancelling delivered order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(makeOrder({ orderStatus: 'DELIVERED' }));
      await expect(adminService.cancelOrder('order-1')).rejects.toThrow('Validation failed');
    });
  });

  describe('promotions', () => {
    it('lists promotions', async () => {
      vi.mocked(prisma.promotion.findMany).mockResolvedValue([makePromotion()]);
      const result = await adminService.listPromotions();
      expect(result).toHaveLength(1);
    });

    it('creates a promotion', async () => {
      vi.mocked(prisma.promotion.create).mockResolvedValue(makePromotion());
      const result = await adminService.createPromotion({
        title: 'New Promo',
        discount: 15,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
      });
      expect(result.title).toBe('Test Promo');
    });

    it('updates a promotion', async () => {
      vi.mocked(prisma.promotion.findUnique).mockResolvedValue(makePromotion());
      vi.mocked(prisma.promotion.update).mockResolvedValue(makePromotion({ title: 'Updated' }));
      const result = await adminService.updatePromotion('promo-1', { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });

    it('deletes a promotion', async () => {
      vi.mocked(prisma.promotion.findUnique).mockResolvedValue(makePromotion());
      vi.mocked(prisma.promotion.delete).mockResolvedValue(makePromotion());
      const result = await adminService.deletePromotion('promo-1');
      expect(result.deleted).toBe(true);
    });
  });

  describe('settings', () => {
    it('returns settings (creates default if none exists)', async () => {
      vi.mocked(prisma.platformSettings.findFirst).mockResolvedValueOnce(null);
      vi.mocked(prisma.platformSettings.create).mockResolvedValue({
        id: 's1',
        defaultDeliveryFee: 15,
        freeDeliveryThreshold: 200,
        supportPhone: null,
        supportEmail: null,
        maintenanceMode: false,
        minimumInventoryAlert: 5,
      } as any);
      vi.mocked(prisma.platformSettings.findFirst).mockResolvedValue({
        id: 's1',
        defaultDeliveryFee: 15,
        freeDeliveryThreshold: 200,
        supportPhone: null,
        supportEmail: null,
        maintenanceMode: false,
        minimumInventoryAlert: 5,
      } as any);
      const result = await adminService.getSettings();
      expect(result.defaultDeliveryFee).toBe(15);
    });

    it('updates settings', async () => {
      vi.mocked(prisma.platformSettings.findFirst).mockResolvedValue({ id: 's1' } as any);
      vi.mocked(prisma.platformSettings.update).mockResolvedValue({
        id: 's1',
        defaultDeliveryFee: 20,
        freeDeliveryThreshold: 250,
        supportPhone: '0550000000',
        supportEmail: null,
        maintenanceMode: true,
        minimumInventoryAlert: 3,
      } as any);
      const result = await adminService.updateSettings({
        defaultDeliveryFee: 20,
        maintenanceMode: true,
      });
      expect(result.defaultDeliveryFee).toBe(20);
      expect(result.maintenanceMode).toBe(true);
    });
  });
});
