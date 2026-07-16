import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    address: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

import * as addressService from './address.service';

const mockAddress = {
  id: 'addr-1',
  userId: 'user-1',
  label: 'Home',
  addressLine: '123 Main St',
  city: 'Accra',
  region: 'GA',
  latitude: null,
  longitude: null,
  isDefault: false,
  createdAt: new Date(),
};

describe('AddressService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listAddresses', () => {
    it('returns addresses sorted by default first', async () => {
      vi.mocked(prisma.address.findMany).mockResolvedValue([
        { ...mockAddress, isDefault: true },
        { ...mockAddress, id: 'addr-2', isDefault: false },
      ] as any);

      const result = await addressService.listAddresses('user-1');
      expect(result).toHaveLength(2);
      expect(result[0].isDefault).toBe(true);
    });
  });

  describe('createAddress', () => {
    it('creates a new address', async () => {
      vi.mocked(prisma.address.create).mockResolvedValue(mockAddress as any);

      const result = await addressService.createAddress('user-1', {
        addressLine: '123 Main St',
        label: 'Home',
        city: 'Accra',
      });

      expect(result.addressLine).toBe('123 Main St');
      expect(result.label).toBe('Home');
    });

    it('unsets other defaults when isDefault is true', async () => {
      vi.mocked(prisma.address.create).mockResolvedValue({
        ...mockAddress,
        isDefault: true,
      } as any);

      await addressService.createAddress('user-1', {
        addressLine: '456 New St',
        isDefault: true,
      });

      expect(prisma.address.updateMany).toHaveBeenCalledWith({
        where: { userId: 'user-1', isDefault: true },
        data: { isDefault: false },
      });
    });
  });

  describe('updateAddress', () => {
    it('updates address fields', async () => {
      vi.mocked(prisma.address.findUnique).mockResolvedValue(mockAddress as any);
      vi.mocked(prisma.address.update).mockResolvedValue({ ...mockAddress, label: 'Work' } as any);

      const result = await addressService.updateAddress('user-1', 'addr-1', {
        label: 'Work',
      });

      expect(result).toBeDefined();
    });

    it('throws for non-existent address', async () => {
      vi.mocked(prisma.address.findUnique).mockResolvedValue(null);

      await expect(
        addressService.updateAddress('user-1', 'addr-99', { addressLine: 'New' })
      ).rejects.toThrow('Address not found');
    });

    it('throws for wrong user', async () => {
      vi.mocked(prisma.address.findUnique).mockResolvedValue({
        ...mockAddress,
        userId: 'other',
      } as any);

      await expect(
        addressService.updateAddress('user-1', 'addr-1', { addressLine: 'New' })
      ).rejects.toThrow('Address not found');
    });
  });
});
