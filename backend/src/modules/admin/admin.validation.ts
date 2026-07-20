import { z } from 'zod';

export const listUsersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    role: z.enum(['CUSTOMER', 'VENDOR', 'RIDER', 'ADMIN']).optional(),
    status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING']).optional(),
    search: z.string().max(100).optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

export const updateUserStatusSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({ status: z.enum(['ACTIVE', 'SUSPENDED', 'PENDING']) }),
});

export const vendorIdSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
});

export const listOrdersSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    status: z.string().optional(),
    vendorId: z.string().uuid().optional(),
    customerId: z.string().uuid().optional(),
    riderId: z.string().uuid().optional(),
    paymentMethod: z.string().optional(),
    paymentStatus: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
  }),
});

export const promotionSchema = z.object({
  body: z
    .object({
      title: z.string().min(1).max(200),
      description: z.string().max(500).optional(),
      discount: z.number().positive(),
      minimumOrder: z.number().nonnegative().optional(),
      startDate: z.string(),
      endDate: z.string(),
      isActive: z.boolean().optional(),
    })
    .refine((d) => new Date(d.endDate) > new Date(d.startDate), {
      message: 'endDate must be after startDate',
    }),
});

export const promotionUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(500).optional(),
    discount: z.number().positive().optional(),
    minimumOrder: z.number().nonnegative().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({ id: z.string().uuid() }),
});

export const settingsUpdateSchema = z.object({
  body: z.object({
    defaultDeliveryFee: z.number().nonnegative().optional(),
    freeDeliveryThreshold: z.number().nonnegative().optional(),
    supportPhone: z.string().max(50).optional(),
    supportEmail: z.string().email().max(100).optional(),
    maintenanceMode: z.boolean().optional(),
    minimumInventoryAlert: z.number().int().nonnegative().optional(),
  }),
});

export type ListUsersQuery = z.infer<typeof listUsersSchema>['query'];
export type ListOrdersQuery = z.infer<typeof listOrdersSchema>['query'];
export type CreatePromotion = z.infer<typeof promotionSchema>['body'];
export type UpdatePromotion = z.infer<typeof promotionUpdateSchema>['body'];
export type UpdateSettings = z.infer<typeof settingsUpdateSchema>['body'];
