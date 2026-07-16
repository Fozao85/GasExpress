import { z } from 'zod';

export const addToCartSchema = z.object({
  body: z.object({
    inventoryId: z.string().uuid(),
    vendorId: z.string().uuid(),
    quantity: z.number().int().min(1).max(99),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    itemId: z.string().uuid(),
  }),
  body: z.object({
    quantity: z.number().int().min(1).max(99),
  }),
});

export const cartItemIdSchema = z.object({
  params: z.object({
    itemId: z.string().uuid(),
  }),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>['body'];
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>['body'];
