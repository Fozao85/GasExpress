import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    customerProfile: { findUnique: vi.fn() },
    order: { findUnique: vi.fn(), update: vi.fn() },
    payment: { update: vi.fn(), findUnique: vi.fn() },
    paymentTransaction: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
    paymentWebhookLog: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
  },
}));

vi.mock('../../integrations', () => ({
  recordSuccess: vi.fn(),
  recordFailure: vi.fn(),
}));

import * as paymentService from './payment.service';

const mockProfile = { id: 'prof-1', userId: 'user-1' };
const mockOrder = {
  id: 'order-1',
  orderNumber: 'GN-123',
  customerId: 'prof-1',
  total: 255,
  orderStatus: 'PENDING',
  payment: { id: 'pay-1', paymentMethod: 'MOBILE_MONEY', amount: 255, paymentStatus: 'PENDING' },
  paymentTransaction: null,
};

const mockTransaction = {
  id: 'tx-1',
  orderId: 'order-1',
  userId: 'user-1',
  provider: 'MOBILE_MONEY',
  amount: 255,
  reference: 'MM-REF-1',
  providerReference: 'PROV-123',
  status: 'PENDING',
  phoneNumber: '+233501234567',
  updatedAt: new Date(),
};

describe('PaymentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(prisma.customerProfile.findUnique).mockResolvedValue(mockProfile as any);
    vi.mocked(prisma.order.findUnique).mockResolvedValue(mockOrder as any);
    vi.mocked(prisma.paymentTransaction.create).mockResolvedValue(mockTransaction as any);
    vi.mocked(prisma.paymentTransaction.findUnique).mockResolvedValue(mockTransaction as any);
    vi.mocked(prisma.paymentTransaction.update).mockResolvedValue({
      ...mockTransaction,
      status: 'SUCCESS',
    } as any);
    vi.mocked(prisma.payment.update).mockResolvedValue({} as any);
    vi.mocked(prisma.order.update).mockResolvedValue({} as any);
  });

  describe('initiatePayment', () => {
    it('initiates Mobile Money payment', async () => {
      const result = await paymentService.initiatePayment('user-1', {
        orderId: 'order-1',
        provider: 'MOBILE_MONEY',
        phoneNumber: '+233501234567',
      });

      expect(result).toBeDefined();
      expect(result.reference).toMatch(/^MM-/);
      expect(result.status).toBe('PENDING');
      expect(prisma.paymentTransaction.create).toHaveBeenCalled();
    });

    it('initiates CASH payment and marks paid', async () => {
      const result = await paymentService.initiatePayment('user-1', {
        orderId: 'order-1',
        provider: 'CASH',
      });

      expect(result.status).toBe('PENDING');
      expect(prisma.payment.update).toHaveBeenCalled();
    });

    it('throws when payment already initiated', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        ...mockOrder,
        paymentTransaction: mockTransaction,
      } as any);

      const result = await paymentService.initiatePayment('user-1', {
        orderId: 'order-1',
        provider: 'MOBILE_MONEY',
      });

      expect(result.message).toBe('Payment already initiated');
    });

    it('throws for cancelled order', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue({
        ...mockOrder,
        orderStatus: 'CANCELLED',
      } as any);

      await expect(
        paymentService.initiatePayment('user-1', { orderId: 'order-1', provider: 'MOBILE_MONEY' })
      ).rejects.toThrow('Cannot initiate payment for cancelled order');
    });
  });

  describe('verifyPayment', () => {
    it('verifies pending transaction', async () => {
      const result = await paymentService.verifyPayment('user-1', 'MM-REF-1');
      expect(result).toBeDefined();
      expect(result.status).toBe('SUCCESS');
    });

    it('returns existing status for non-pending', async () => {
      vi.mocked(prisma.paymentTransaction.findUnique).mockResolvedValue({
        ...mockTransaction,
        status: 'SUCCESS',
      } as any);

      const result = await paymentService.verifyPayment('user-1', 'MM-REF-1');
      expect(result.status).toBe('SUCCESS');
      expect(prisma.paymentTransaction.update).not.toHaveBeenCalled();
    });
  });

  describe('handleWebhook', () => {
    it('processes webhook for known provider', async () => {
      vi.mocked(prisma.paymentWebhookLog.create).mockResolvedValue({ id: 'log-1' } as any);

      const result = await paymentService.handleWebhook('MOBILE_MONEY', {
        provider: 'MOBILE_MONEY',
        body: { event: 'payment.success', transactionRef: 'MM-REF-1', status: 'successful' },
        headers: {},
      });

      expect(result.success).toBe(true);
    });
  });
});
