import { z } from 'zod';

export const riderProfileUpdateSchema = z.object({
  body: z.object({
    vehicleType: z.string().max(100).optional(),
    licenseNumber: z.string().max(100).optional(),
    nationalId: z.string().max(100).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  }),
});

export const riderAvailabilitySchema = z.object({
  body: z.object({
    availability: z.enum(['ONLINE', 'OFFLINE']),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  }),
});

export const acceptOrderSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const updateDeliveryStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PICKED_UP', 'ON_THE_WAY', 'DELIVERED']),
    note: z.string().max(500).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const trackingEventSchema = z.object({
  body: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const riderOrderListSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  }),
});

export type RiderProfileUpdate = z.infer<typeof riderProfileUpdateSchema>['body'];
export type RiderAvailabilityUpdate = z.infer<typeof riderAvailabilitySchema>['body'];
export type UpdateDeliveryStatus = z.infer<typeof updateDeliveryStatusSchema>['body'];
export type TrackingEvent = z.infer<typeof trackingEventSchema>['body'];
