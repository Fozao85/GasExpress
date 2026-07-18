import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    addressId: z.string().uuid(),
    paymentMethod: z.enum(['CASH', 'MOBILE_MONEY']),
    notes: z.string().max(500).optional(),
  }),
});

export const orderIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const listOrdersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    status: z.string().optional(),
  }),
});

export const validOrderStatuses = [
  'PENDING',
  'VENDOR_ACCEPTED',
  'PREPARING',
  'READY_FOR_PICKUP',
  'RIDER_ASSIGNED',
  'PICKED_UP',
  'ON_THE_WAY',
  'DELIVERED',
  'CANCELLED',
] as const;

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type ListOrdersQuery = z.infer<typeof listOrdersSchema>['query'];
