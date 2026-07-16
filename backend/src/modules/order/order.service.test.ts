import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    customerProfile: { findUnique: vi.fn() },
    address: { findUnique: vi.fn() },
    order: {
      create: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      update: vi.fn(),
    },
    vendorInventory: { findFirst: vi.fn(), update: vi.fn() },
    cartItem: { deleteMany: vi.fn() },
    cart: { delete: vi.fn(), findFirst: vi.fn() },
    orderStatusHistory: { create: vi.fn(), findMany: vi.fn() },
    vendorProfile: { findUnique: vi.fn() },
    notification: { create: vi.fn() },
    $transaction: vi.fn(),
  },
}));

import * as orderService from './order.service';

const mockProfile = { id: 'prof-1', userId: 'user-1', user: { fullName: 'John' } };
const mockAddress = {
  id: 'addr-1',
  userId: 'user-1',
  label: 'Home',
  addressLine: '123 St',
  city: 'Accra',
  region: 'GA',
};
const mockCart = {
  id: 'cart-1',
  customerId: 'prof-1',
  vendorId: 'ven-1',
  vendor: { id: 'ven-1', isOpen: true, verificationStatus: 'VERIFIED' },
  items: [
    {
      id: 'ci-1',
      inventoryId: 'inv-1',
      quantity: 2,
      inventory: {
        id: 'inv-1',
        cylinderTypeId: 'ct-1',
        stockQuantity: 10,
        price: 120,
        cylinderType: { sizeKg: 14.5, description: 'Standard' },
      },
    },
  ],
};

const mockCreatedOrder = {
  id: 'order-1',
  orderNumber: 'GN-TEST-1234',
  customerId: 'prof-1',
  vendorId: 'ven-1',
  deliveryAddressId: 'addr-1',
  subtotal: 240,
  deliveryFee: 15,
  total: 255,
  paymentMethod: 'CASH',
  paymentStatus: 'PENDING',
  orderStatus: 'PENDING',
  notes: null,
  estimatedDeliveryAt: new Date(),
  createdAt: new Date(),
  vendor: { id: 'ven-1', businessName: 'Test Gas', phone: '+233', address: 'Accra' },
  address: { id: 'addr-1', label: 'Home', addressLine: '123 St', city: 'Accra', region: 'GA' },
  items: [
    {
      id: 'oi-1',
      cylinderType: { sizeKg: 14.5, description: 'Standard' },
      quantity: 2,
      unitPrice: 120,
      subtotal: 240,
    },
  ],
  payment: { id: 'pay-1', paymentMethod: 'CASH', amount: 255, paymentStatus: 'PENDING' },
  statusHistory: [{ id: 'sh-1', status: 'PENDING', note: 'Order placed', createdAt: new Date() }],
};

describe('OrderService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(prisma.customerProfile.findUnique).mockResolvedValue(mockProfile as any);
    vi.mocked(prisma.address.findUnique).mockResolvedValue(mockAddress as any);
    vi.mocked(prisma.cart.findFirst).mockResolvedValue(mockCart as any);
    vi.mocked(prisma.$transaction).mockImplementation(async (fn: any) => fn(prisma));
    vi.mocked(prisma.order.create).mockResolvedValue(mockCreatedOrder as any);
    vi.mocked(prisma.vendorProfile.findUnique).mockResolvedValue({ userId: 'ven-user-1' } as any);
  });

  describe('createOrder', () => {
    it('creates order from cart successfully', async () => {
      const result = await orderService.createOrder('user-1', {
        addressId: 'addr-1',
        paymentMethod: 'CASH',
      });

      expect(result).toBeDefined();
      expect(result.orderNumber).toMatch(/^GN-/);
      expect(result.status).toBe('PENDING');
      expect(result.total).toBe(255);
    });

    it('throws for empty cart', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        items: [],
      } as any);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-1', paymentMethod: 'CASH' })
      ).rejects.toThrow('Validation failed');
    });

    it('throws for closed vendor', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        vendor: { ...mockCart.vendor, isOpen: false },
      } as any);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-1', paymentMethod: 'CASH' })
      ).rejects.toThrow('Validation failed');
    });

    it('throws for insufficient stock', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        items: [
          {
            ...mockCart.items[0],
            quantity: 20,
            inventory: { ...mockCart.items[0].inventory, stockQuantity: 5 },
          },
        ],
      } as any);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-1', paymentMethod: 'CASH' })
      ).rejects.toThrow('Validation failed');
    });

    it('throws for deleted inventory item', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        items: [{ ...mockCart.items[0], inventory: null }],
      } as any);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-1', paymentMethod: 'CASH' })
      ).rejects.toThrow('Validation failed');
    });

    it('throws for non-existent address', async () => {
      vi.mocked(prisma.address.findUnique).mockResolvedValue(null);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-99', paymentMethod: 'CASH' })
      ).rejects.toThrow('Address not found');
    });

    it('throws for wrong address owner', async () => {
      vi.mocked(prisma.address.findUnique).mockResolvedValue({
        ...mockAddress,
        userId: 'other-user',
      } as any);

      await expect(
        orderService.createOrder('user-1', { addressId: 'addr-1', paymentMethod: 'CASH' })
      ).rejects.toThrow('Validation failed');
    });

    it('applies delivery fee for orders under 200', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue({
        ...mockCart,
        items: [
          {
            ...mockCart.items[0],
            quantity: 1,
            inventory: { ...mockCart.items[0].inventory, price: 50 },
          },
        ],
      } as any);
      vi.mocked(prisma.order.create).mockResolvedValue({
        ...mockCreatedOrder,
        subtotal: 50,
        deliveryFee: 15,
        total: 65,
      } as any);

      const result = await orderService.createOrder('user-1', {
        addressId: 'addr-1',
        paymentMethod: 'CASH',
      });

      expect(result.deliveryFee).toBe(15);
    });

    it('waives delivery fee for orders 200+', async () => {
      vi.mocked(prisma.cart.findFirst).mockResolvedValue(mockCart as any);
      vi.mocked(prisma.order.create).mockResolvedValue({
        ...mockCreatedOrder,
        subtotal: 240,
        deliveryFee: 0,
        total: 240,
      } as any);

      const result = await orderService.createOrder('user-1', {
        addressId: 'addr-1',
        paymentMethod: 'CASH',
      });

      expect(result.deliveryFee).toBe(0);
    });

    it('creates notification for vendor', async () => {
      await orderService.createOrder('user-1', {
        addressId: 'addr-1',
        paymentMethod: 'CASH',
      });

      expect(prisma.notification.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            notificationType: 'order_placed',
          }),
        })
      );
    });
  });

  describe('getOrders', () => {
    it('returns paginated orders', async () => {
      vi.mocked(prisma.order.findMany).mockResolvedValue([mockCreatedOrder] as any);
      vi.mocked(prisma.order.count).mockResolvedValue(1);

      const result = await orderService.getOrders('user-1', { page: 1, limit: 10 });

      expect(result.orders).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('filters by status', async () => {
      vi.mocked(prisma.order.findMany).mockResolvedValue([] as any);
      vi.mocked(prisma.order.count).mockResolvedValue(0);

      await orderService.getOrders('user-1', { page: 1, limit: 10, status: 'PENDING' });

      const callArgs = vi.mocked(prisma.order.findMany).mock.calls[0][0];
      expect((callArgs as any).where.orderStatus).toBe('PENDING');
    });
  });

  describe('getOrderById', () => {
    it('returns order for the customer', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(mockCreatedOrder as any);

      const result = await orderService.getOrderById('user-1', 'order-1');
      expect(result).toBeDefined();
      expect(result.id).toBe('order-1');
    });

    it('throws for non-existent order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(null);

      await expect(orderService.getOrderById('user-1', 'order-99')).rejects.toThrow(
        'Order not found'
      );
    });

    it('throws for another customers order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        ...mockCreatedOrder,
        customerId: 'other-prof',
      } as any);

      await expect(orderService.getOrderById('user-1', 'order-1')).rejects.toThrow(
        'Order not found'
      );
    });
  });

  describe('cancelOrder', () => {
    it('cancels a pending order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        ...mockCreatedOrder,
        items: [{ cylinderTypeId: 'ct-1', quantity: 2, unitPrice: 120, subtotal: 240 }],
      } as any);
      vi.mocked(prisma.vendorInventory.findFirst).mockResolvedValue({
        id: 'inv-1',
        stockQuantity: 10,
      } as any);
      vi.mocked(prisma.order.update).mockResolvedValue(mockCreatedOrder as any);

      const result = await orderService.cancelOrder('user-1', 'order-1');
      expect(result).toBeDefined();
    });

    it('throws for non-pending order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        ...mockCreatedOrder,
        orderStatus: 'DELIVERED',
        items: [],
      } as any);

      await expect(orderService.cancelOrder('user-1', 'order-1')).rejects.toThrow(
        'Validation failed'
      );
    });
  });

  describe('getOrderStatusHistory', () => {
    it('returns status history', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({ customerId: 'prof-1' } as any);
      vi.mocked(prisma.orderStatusHistory.findMany).mockResolvedValue([
        { id: 'sh-1', status: 'PENDING', note: 'Order placed', createdAt: new Date() },
      ] as any);

      const result = await orderService.getOrderStatusHistory('user-1', 'order-1');
      expect(result).toHaveLength(1);
      expect(result[0].status).toBe('PENDING');
    });
  });
});
