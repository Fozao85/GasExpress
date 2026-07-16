import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    customerProfile: { findUnique: vi.fn() },
    vendorInventory: { findUnique: vi.fn() },
    cart: { findFirst: vi.fn(), upsert: vi.fn(), delete: vi.fn(), deleteMany: vi.fn() },
    cartItem: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      deleteMany: vi.fn(),
      count: vi.fn(),
    },
  },
}));

import * as cartService from './cart.service';

const mockProfile = { id: 'prof-1', userId: 'user-1' };
const mockInventory = {
  id: 'inv-1',
  stockQuantity: 10,
  price: 120,
  cylinderType: { sizeKg: 14.5, description: 'Standard' },
  vendor: { id: 'ven-1', verificationStatus: 'VERIFIED', isOpen: true },
};
const mockCart = {
  id: 'cart-1',
  customerId: 'prof-1',
  vendorId: 'ven-1',
  vendor: { id: 'ven-1', businessName: 'Test Gas' },
  items: [],
};

describe('CartService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(prisma.customerProfile.findUnique).mockResolvedValue(mockProfile as any);
  });

  describe('getCart', () => {
    it('returns null when no cart exists', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue(null);

      const result = await cartService.getCart('user-1');
      expect(result).toBeNull();
    });

    it('returns cart with items', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        items: [
          {
            id: 'ci-1',
            inventoryId: 'inv-1',
            quantity: 2,
            inventory: {
              id: 'inv-1',
              stockQuantity: 10,
              price: 120,
              cylinderType: { sizeKg: 14.5, description: 'Standard' },
            },
          },
        ],
      } as any);

      const result = await cartService.getCart('user-1');
      expect(result).not.toBeNull();
      expect(result!.vendorName).toBe('Test Gas');
      expect(result!.items).toHaveLength(1);
      expect(result!.items[0].cylinderSize).toBe(14.5);
      expect(result!.subtotal).toBe(240);
      expect(result!.totalItems).toBe(2);
    });
  });

  describe('addToCart', () => {
    it('adds new item to cart', async () => {
      vi.mocked(prisma.vendorInventory.findUnique).mockResolvedValue(mockInventory as any);
      vi.mocked(prisma.cart.upsert).mockResolvedValue(mockCart as any);
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue(null);
      vi.mocked(prisma.cartItem.create).mockResolvedValue({} as any);
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({ ...mockCart, items: [] } as any);

      const result = await cartService.addToCart('user-1', {
        inventoryId: 'inv-1',
        vendorId: 'ven-1',
        quantity: 2,
      });
      expect(result).toBeDefined();
      expect(prisma.cartItem.create).toHaveBeenCalledWith({
        data: { cartId: 'cart-1', inventoryId: 'inv-1', quantity: 2 },
      });
    });

    it('merges quantity for existing item', async () => {
      vi.mocked(prisma.vendorInventory.findUnique).mockResolvedValue(mockInventory as any);
      vi.mocked(prisma.cart.upsert).mockResolvedValue(mockCart as any);
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue({
        id: 'ci-1',
        quantity: 1,
        inventoryId: 'inv-1',
      } as any);
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({ ...mockCart, items: [] } as any);

      await cartService.addToCart('user-1', {
        inventoryId: 'inv-1',
        vendorId: 'ven-1',
        quantity: 3,
      });
      expect(prisma.cartItem.update).toHaveBeenCalledWith({
        where: { id: 'ci-1' },
        data: { quantity: 4 },
      });
    });

    it('throws for out-of-stock product', async () => {
      vi.mocked(prisma.vendorInventory.findUnique).mockResolvedValue({
        ...mockInventory,
        stockQuantity: 0,
      } as any);

      await expect(
        cartService.addToCart('user-1', { inventoryId: 'inv-1', vendorId: 'ven-1', quantity: 1 })
      ).rejects.toThrow('Validation failed');
    });

    it('throws when quantity exceeds stock', async () => {
      vi.mocked(prisma.vendorInventory.findUnique).mockResolvedValue(mockInventory as any);

      await expect(
        cartService.addToCart('user-1', { inventoryId: 'inv-1', vendorId: 'ven-1', quantity: 20 })
      ).rejects.toThrow('Validation failed');
    });

    it('throws for closed vendor', async () => {
      vi.mocked(prisma.vendorInventory.findUnique).mockResolvedValue({
        ...mockInventory,
        vendor: { ...mockInventory.vendor, isOpen: false },
      } as any);

      await expect(
        cartService.addToCart('user-1', { inventoryId: 'inv-1', vendorId: 'ven-1', quantity: 1 })
      ).rejects.toThrow('Validation failed');
    });
  });

  describe('updateCartItemQuantity', () => {
    it('updates quantity', async () => {
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue({
        id: 'ci-1',
        cart: { customerId: 'prof-1' },
        inventory: { stockQuantity: 10, cylinderType: { sizeKg: 14.5 } },
      } as any);
      vi.mocked(prisma.cartItem.update).mockResolvedValue({} as any);
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({ ...mockCart, items: [] } as any);

      const result = await cartService.updateCartItemQuantity('user-1', 'ci-1', 5);
      expect(result).toBeDefined();
    });

    it('throws when quantity exceeds stock', async () => {
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue({
        id: 'ci-1',
        cart: { customerId: 'prof-1' },
        inventory: { stockQuantity: 3, cylinderType: { sizeKg: 14.5 } },
      } as any);

      await expect(cartService.updateCartItemQuantity('user-1', 'ci-1', 10)).rejects.toThrow(
        'Validation failed'
      );
    });

    it('throws for non-existent item', async () => {
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue(null);

      await expect(cartService.updateCartItemQuantity('user-1', 'ci-99', 2)).rejects.toThrow(
        'Cart item not found'
      );
    });
  });

  describe('removeCartItem', () => {
    it('removes item and returns updated cart', async () => {
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue({
        id: 'ci-1',
        cart: { id: 'cart-1', customerId: 'prof-1' },
      } as any);
      vi.mocked(prisma.cartItem.count).mockResolvedValue(1);
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({ ...mockCart, items: [] } as any);

      const result = await cartService.removeCartItem('user-1', 'ci-1');
      expect(result).toBeDefined();
    });

    it('deletes cart when last item removed', async () => {
      vi.mocked(prisma.cartItem.findUnique).mockResolvedValue({
        id: 'ci-1',
        cart: { id: 'cart-1', customerId: 'prof-1' },
      } as any);
      vi.mocked(prisma.cartItem.count).mockResolvedValue(0);

      const result = await cartService.removeCartItem('user-1', 'ci-1');
      expect(result).toBeNull();
    });
  });

  describe('clearCart', () => {
    it('deletes all cart items and cart', async () => {
      await cartService.clearCart('user-1');
      expect(prisma.cartItem.deleteMany).toHaveBeenCalled();
      expect(prisma.cart.deleteMany).toHaveBeenCalled();
    });
  });
});
