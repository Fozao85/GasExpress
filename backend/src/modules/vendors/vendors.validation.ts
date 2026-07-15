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

export type ListVendorsQuery = z.infer<typeof listVendorsSchema>['query'];
export type NearbyVendorsQuery = z.infer<typeof nearbyVendorsSchema>['query'];
export type SearchVendorsQuery = z.infer<typeof searchVendorsSchema>['query'];
