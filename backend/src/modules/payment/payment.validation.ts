import { z } from 'zod';

export const initiatePaymentSchema = z.object({
  body: z.object({
    orderId: z.string().uuid(),
    gateway: z.enum(['paystack', 'flutterwave']).optional(),
  }),
});

export const paymentIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
