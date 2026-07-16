import { z } from 'zod';

export const listVendorsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    radius: z.coerce.number().min(1).max(50).optional(),
    sort: z.enum(['distance', 'speed', 'rating', 'price']).default('distance'),
    category: z.string().optional(),
    availability: z.enum(['open', 'all']).default('open'),
    q: z.string().max(200).optional(),
  }),
});

export const nearbyVendorsSchema = z.object({
  query: z.object({
    lat: z.coerce.number().min(-90).max(90),
    lng: z.coerce.number().min(-180).max(180),
    radius: z.coerce.number().min(1).max(50).default(15),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  }),
});

export const vendorIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const searchVendorsSchema = z.object({
  query: z.object({
    q: z.string().min(1).max(200),
    lat: z.coerce.number().min(-90).max(90).optional(),
    lng: z.coerce.number().min(-180).max(180).optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const vendorProfileUpdateSchema = z.object({
  body: z.object({
    businessName: z.string().min(1).max(200).optional(),
    phone: z.string().optional(),
    address: z.string().min(1).max(500).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    isOpen: z.boolean().optional(),
    openingTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    closingTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
  }),
});

export const inventoryCreateSchema = z.object({
  body: z.object({
    cylinderTypeId: z.string().uuid(),
    stockQuantity: z.number().int().min(0),
    price: z.number().positive(),
  }),
});

export const inventoryUpdateSchema = z.object({
  body: z.object({
    stockQuantity: z.number().int().min(0).optional(),
    price: z.number().positive().optional(),
  }),
  params: z.object({
    inventoryId: z.string().uuid(),
  }),
});

export const inventoryIdSchema = z.object({
  params: z.object({
    inventoryId: z.string().uuid(),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(['VENDOR_ACCEPTED', 'PREPARING', 'READY_FOR_PICKUP', 'CANCELLED']),
    note: z.string().max(500).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const vendorOrderListSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
    status: z.string().optional(),
  }),
});

export type ListVendorsQuery = z.infer<typeof listVendorsSchema>['query'];
export type NearbyVendorsQuery = z.infer<typeof nearbyVendorsSchema>['query'];
export type SearchVendorsQuery = z.infer<typeof searchVendorsSchema>['query'];
export type VendorProfileUpdate = z.infer<typeof vendorProfileUpdateSchema>['body'];
export type InventoryCreate = z.infer<typeof inventoryCreateSchema>['body'];
export type InventoryUpdate = z.infer<typeof inventoryUpdateSchema>['body'];
export type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>['body'];
export type VendorOrderListQuery = z.infer<typeof vendorOrderListSchema>['query'];
