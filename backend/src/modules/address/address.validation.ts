import { z } from 'zod';

export const createAddressSchema = z.object({
  body: z.object({
    label: z.string().max(50).optional(),
    addressLine: z.string().min(1).max(200),
    city: z.string().max(100).optional(),
    region: z.string().max(100).optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
    isDefault: z.boolean().optional(),
  }),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    label: z.string().max(50).optional(),
    addressLine: z.string().min(1).max(200).optional(),
    city: z.string().max(100).optional(),
    region: z.string().max(100).optional(),
    latitude: z.coerce.number().min(-90).max(90).optional(),
    longitude: z.coerce.number().min(-180).max(180).optional(),
    isDefault: z.boolean().optional(),
  }),
});

export const addressIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>['body'];
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>['body'];
