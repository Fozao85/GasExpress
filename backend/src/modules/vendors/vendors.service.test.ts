import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    vendorProfile: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
    },
    cylinderType: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
    vendorInventory: {
      findMany: vi.fn(),
    },
    promotion: {
      findMany: vi.fn(),
    },
  },
}));

import * as vendorService from './vendors.service';

function makeVendor(overrides: Record<string, any> = {}): any {
  return {
    id: '550e8400-e29b-41d4-a716-446655440001',
    businessName: 'Test Gas Ltd',
    phone: '+233501234567',
    address: '123 Main St, Accra',
    latitude: null,
    longitude: null,
    averageRating: 4.5,
    isOpen: true,
    verificationStatus: 'VERIFIED',
    openingTime: '08:00',
    closingTime: '18:00',
    user: {
      fullName: 'John Doe',
      email: 'john@test.com',
    },
    inventory: [],
    ...overrides,
  };
}

function makeInventory(overrides: Record<string, any> = {}): any {
  return {
    id: '660e8400-e29b-41d4-a716-446655440010',
    vendorId: '550e8400-e29b-41d4-a716-446655440001',
    cylinderTypeId: '770e8400-e29b-41d4-a716-446655440020',
    cylinderType: {
      id: '770e8400-e29b-41d4-a716-446655440020',
      sizeKg: 14.5,
      description: 'Standard 14.5kg cylinder',
    },
    stockQuantity: 10,
    price: 120.0,
    lastUpdated: new Date(),
    ...overrides,
  };
}

describe('VendorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listVendors', () => {
    it('returns paginated results with default params', async () => {
      const vendor = makeVendor({ inventory: [] });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([vendor]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(1);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
      });

      expect(result.vendors).toHaveLength(1);
      expect(result.vendors[0].businessName).toBe('Test Gas Ltd');
      expect(result.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      });
      expect(prisma.vendorProfile.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 0,
          take: 20,
        })
      );
    });

    it('filters to open vendors by default', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'open',
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.isOpen).toBe(true);
    });

    it('filters by category', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
        category: '770e8400-e29b-41d4-a716-446655440020',
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.inventory.some.cylinderType.id).toBe(
        '770e8400-e29b-41d4-a716-446655440020'
      );
    });

    it('searches by business name', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
        q: 'Gas',
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.businessName.contains).toBe('Gas');
    });

    it('computes distance and ETA when coordinates provided', async () => {
      const vendor = makeVendor({
        latitude: 6.5,
        longitude: 3.4,
        inventory: [makeInventory({ stockQuantity: 5, price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([vendor]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(1);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
        lat: 6.5244,
        lng: 3.3792,
      });

      expect(result.vendors[0].distance).toBeDefined();
      expect(typeof result.vendors[0].distance).toBe('number');
      expect(result.vendors[0].eta).toBeDefined();
      expect(typeof result.vendors[0].eta).toBe('number');
    });

    it('excludes vendors outside radius', async () => {
      const farVendor = makeVendor({
        latitude: 10.0,
        longitude: 10.0,
        inventory: [makeInventory({ stockQuantity: 5, price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([farVendor]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(1);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
        lat: 6.5244,
        lng: 3.3792,
        radius: 5,
      });

      expect(result.vendors).toHaveLength(0);
    });

    it('applies verification filter', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.verificationStatus).toBe('VERIFIED');
    });

    it('sorts by distance', async () => {
      const near = makeVendor({
        id: 'a',
        latitude: 6.52,
        longitude: 3.38,
        inventory: [makeInventory({ price: 100 })],
      });
      const far = makeVendor({
        id: 'b',
        latitude: 6.55,
        longitude: 3.35,
        inventory: [makeInventory({ price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([far, near]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(2);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'all',
        lat: 6.5244,
        lng: 3.3792,
      });

      expect(result.vendors[0].id).toBe('a');
      expect(result.vendors[1].id).toBe('b');
    });

    it('sorts by speed (ETA)', async () => {
      const fast = makeVendor({
        id: 'a',
        latitude: 6.52,
        longitude: 3.38,
        inventory: [makeInventory({ price: 100 })],
      });
      const slow = makeVendor({
        id: 'b',
        latitude: 6.55,
        longitude: 3.35,
        inventory: [makeInventory({ price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([slow, fast]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(2);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'speed',
        availability: 'all',
        lat: 6.5244,
        lng: 3.3792,
      });

      expect(result.vendors[0].id).toBe('a');
      expect(result.vendors[0].eta).toBeLessThan(result.vendors[1].eta!);
    });

    it('sorts by rating descending', async () => {
      const low = makeVendor({
        id: 'a',
        averageRating: 3.0,
        inventory: [makeInventory({ price: 100 })],
      });
      const high = makeVendor({
        id: 'b',
        averageRating: 5.0,
        inventory: [makeInventory({ price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([low, high]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(2);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'rating',
        availability: 'all',
      });

      expect(result.vendors[0].id).toBe('b');
    });

    it('sorts by price ascending', async () => {
      const cheap = makeVendor({ id: 'a', inventory: [makeInventory({ price: 80 })] });
      const expensive = makeVendor({ id: 'b', inventory: [makeInventory({ price: 150 })] });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([expensive, cheap]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(2);

      const result = await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'price',
        availability: 'all',
      });

      expect(result.vendors[0].id).toBe('a');
      expect(result.vendors[0].lowestPrice).toBeLessThan(result.vendors[1].lowestPrice!);
    });

    it('handles closed vendors when availability filter is open', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      await vendorService.listVendors({
        page: 1,
        limit: 20,
        sort: 'distance',
        availability: 'open',
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.isOpen).toBe(true);
    });
  });

  describe('getNearbyVendors', () => {
    it('returns nearby vendors sorted by distance', async () => {
      const near = makeVendor({ id: 'a', latitude: 6.52, longitude: 3.38, inventory: [] });
      const far = makeVendor({ id: 'b', latitude: 6.55, longitude: 3.35, inventory: [] });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([far, near]);

      const result = await vendorService.getNearbyVendors({
        lat: 6.5244,
        lng: 3.3792,
        radius: 15,
        limit: 10,
      });

      expect(result.vendors).toHaveLength(2);
      expect(result.vendors[0].id).toBe('a');
      expect(result.vendors[0].distance).toBeDefined();
      expect(result.vendors[0].eta).toBeDefined();
    });

    it('excludes vendors outside radius', async () => {
      const far = makeVendor({ latitude: 10.0, longitude: 10.0, inventory: [] });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([far]);

      const result = await vendorService.getNearbyVendors({
        lat: 6.5244,
        lng: 3.3792,
        radius: 5,
        limit: 10,
      });

      expect(result.vendors).toHaveLength(0);
    });

    it('only returns open verified vendors with coordinates', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);

      await vendorService.getNearbyVendors({
        lat: 6.5244,
        lng: 3.3792,
        radius: 15,
        limit: 10,
      });

      const callArgs = vi.mocked(prisma.vendorProfile.findMany).mock.calls[0][0];
      expect((callArgs as any).where.verificationStatus).toBe('VERIFIED');
      expect((callArgs as any).where.isOpen).toBe(true);
      expect((callArgs as any).where.latitude.not).toBeNull();
      expect((callArgs as any).where.longitude.not).toBeNull();
    });
  });

  describe('getVendorById', () => {
    it('returns vendor details with inventory', async () => {
      const vendor = makeVendor({
        inventory: [
          {
            id: '660e8400-e29b-41d4-a716-446655440010',
            cylinderTypeId: '770e8400-e29b-41d4-a716-446655440020',
            cylinderType: {
              id: '770e8400-e29b-41d4-a716-446655440020',
              sizeKg: 14.5,
              description: 'Standard cylinder',
            },
            stockQuantity: 10,
            price: 120.0,
          },
        ],
      });
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(vendor);

      const result = await vendorService.getVendorById(vendor.id);

      expect(result.businessName).toBe('Test Gas Ltd');
      expect(result.ownerName).toBe('John Doe');
      expect(result.phone).toBe('+233501234567');
      expect(result.email).toBe('john@test.com');
      expect(result.address).toBe('123 Main St, Accra');
      expect(result.averageRating).toBe(4.5);
      expect(result.isOpen).toBe(true);
      expect(result.openingTime).toBe('08:00');
      expect(result.closingTime).toBe('18:00');
      expect(result.verificationStatus).toBe('VERIFIED');
      expect(result.lowestPrice).toBe(120);
      expect(result.inventory).toHaveLength(1);
      expect(result.inventory[0].cylinderSize).toBe(14.5);
      expect(result.inventory[0].inStock).toBe(true);
    });

    it('throws NotFoundError for missing vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(null);

      await expect(
        vendorService.getVendorById('550e8400-e29b-41d4-a716-446655449999')
      ).rejects.toThrow('Vendor not found');
    });
  });

  describe('searchVendors', () => {
    it('returns vendors matching search term', async () => {
      const vendor = makeVendor({ businessName: 'GasNow Accra', inventory: [] });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([vendor]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(1);

      const result = await vendorService.searchVendors({
        q: 'GasNow',
        page: 1,
        limit: 20,
      });

      expect(result.vendors).toHaveLength(1);
      expect(result.vendors[0].businessName).toBe('GasNow Accra');
      expect(result.pagination.total).toBe(1);
    });

    it('returns empty list for no matches', async () => {
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(0);

      const result = await vendorService.searchVendors({
        q: 'NonExistent',
        page: 1,
        limit: 20,
      });

      expect(result.vendors).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });

    it('computes distance when coordinates provided', async () => {
      const vendor = makeVendor({
        businessName: 'Nearby Gas',
        latitude: 6.52,
        longitude: 3.38,
        inventory: [makeInventory({ price: 100 })],
      });
      vi.mocked(prisma.vendorProfile.findMany).mockResolvedValue([vendor]);
      vi.mocked(prisma.vendorProfile.count).mockResolvedValue(1);

      const result = await vendorService.searchVendors({
        q: 'Nearby',
        page: 1,
        limit: 20,
        lat: 6.5244,
        lng: 3.3792,
      });

      expect(result.vendors[0].distance).toBeDefined();
      expect(result.vendors[0].eta).toBeDefined();
    });
  });

  describe('getVendorAvailability', () => {
    it('returns availability status for in-stock open vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        isOpen: true,
        openingTime: '08:00',
        closingTime: '18:00',
        inventory: [{ stockQuantity: 5 }, { stockQuantity: 3 }],
      } as any);

      const result = await vendorService.getVendorAvailability(
        '550e8400-e29b-41d4-a716-446655440001'
      );

      expect(result.isOpen).toBe(true);
      expect(result.stockStatus).toBe('in_stock');
      expect(result.totalProducts).toBe(2);
      expect(result.nextAvailable).toBeNull();
    });

    it('returns out_of_stock when inventory is empty', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({
        isOpen: true,
        openingTime: '08:00',
        closingTime: '18:00',
        inventory: [],
      } as any);

      const result = await vendorService.getVendorAvailability(
        '550e8400-e29b-41d4-a716-446655440001'
      );

      expect(result.stockStatus).toBe('out_of_stock');
    });

    it('throws NotFoundError for missing vendor', async () => {
      vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue(null);

      await expect(
        vendorService.getVendorAvailability('550e8400-e29b-41d4-a716-446655449999')
      ).rejects.toThrow('Vendor not found');
    });
  });

  describe('listCategories', () => {
    it('returns all cylinder types sorted by size', async () => {
      vi.mocked(prisma.cylinderType.findMany).mockResolvedValue([
        { id: 'a', sizeKg: 6, description: 'Small' },
        { id: 'b', sizeKg: 14.5, description: 'Standard' },
      ] as any);

      const result = await vendorService.listCategories();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('6kg');
      expect(result[1].name).toBe('14.5kg');
      expect(prisma.cylinderType.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: [{ vendorId: { sort: 'asc', nulls: 'first' } }, { sizeKg: 'asc' }],
        })
      );
    });
  });

  describe('getProductsByCategory', () => {
    it('returns products in stock for a category', async () => {
      vi.mocked(prisma.cylinderType.findUnique).mockResolvedValue({
        id: '770e8400-e29b-41d4-a716-446655440020',
      } as any);
      vi.mocked(prisma.vendorInventory.findMany).mockResolvedValue([
        {
          id: '660e8400-e29b-41d4-a716-446655440010',
          vendorId: '550e8400-e29b-41d4-a716-446655440001',
          cylinderType: { sizeKg: 14.5 },
          stockQuantity: 10,
          price: 120,
          vendor: {
            id: '550e8400-e29b-41d4-a716-446655440001',
            businessName: 'Test Gas',
            address: 'Accra',
            isOpen: true,
            averageRating: 4.5,
          },
        },
      ] as any);

      const result = await vendorService.getProductsByCategory(
        '770e8400-e29b-41d4-a716-446655440020'
      );

      expect(result).toHaveLength(1);
      expect(result[0].vendorName).toBe('Test Gas');
      expect(result[0].size).toBe(14.5);
      expect(result[0].inStock).toBe(true);
    });

    it('throws NotFoundError for missing category', async () => {
      vi.mocked(prisma.cylinderType.findUnique).mockResolvedValue(null);

      await expect(
        vendorService.getProductsByCategory('770e8400-e29b-41d4-a716-446655449999')
      ).rejects.toThrow('Category not found');
    });
  });

  describe('listPromotions', () => {
    it('returns active promotions', async () => {
      const now = new Date();
      vi.mocked(prisma.promotion.findMany).mockResolvedValue([
        {
          id: '880e8400-e29b-41d4-a716-446655440030',
          title: 'Summer Sale',
          discountType: 'PERCENTAGE',
          value: 10,
          endDate: new Date(now.getTime() + 86400000),
        },
      ] as any);

      const result = await vendorService.listPromotions();

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Summer Sale');
      expect(result[0].discountType).toBe('PERCENTAGE');
      expect(result[0].value).toBe(10);
    });

    it('returns empty list when no active promotions', async () => {
      vi.mocked(prisma.promotion.findMany).mockResolvedValue([]);

      const result = await vendorService.listPromotions();

      expect(result).toHaveLength(0);
    });
  });
});
