import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    provider: z.enum(['CASH', 'MOBILE_MONEY', 'MTN_MOMO', 'ORANGE_MONEY']),
    phoneNumber: z
      .string()
      .regex(/^\+?\d{7,15}$/, 'Invalid phone number')
      .optional(),
  }),
});

export const verifyPaymentSchema = z.object({
  body: z.object({
    transactionReference: z.string().min(1, 'Transaction reference is required'),
  }),
});

export const paymentIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
