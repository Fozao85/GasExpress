import { z } from 'zod';

export const geocodeQuerySchema = z.object({
  query: z.object({
    q: z.string().min(1, 'Query is required'),
  }),
});

export const reverseGeocodeQuerySchema = z.object({
  query: z.object({
    lat: z
      .string()
      .transform((v) => parseFloat(v))
      .pipe(z.number().min(-90).max(90)),
    lng: z
      .string()
      .transform((v) => parseFloat(v))
      .pipe(z.number().min(-180).max(180)),
  }),
});

export const distanceQuerySchema = z.object({
  query: z.object({
    origin: z.string().min(1, 'Origin is required (lat,lng)'),
    destination: z.string().min(1, 'Destination is required (lat,lng)'),
  }),
});

export const directionsQuerySchema = z.object({
  query: z.object({
    origin: z.string().min(1, 'Origin is required (lat,lng)'),
    destination: z.string().min(1, 'Destination is required (lat,lng)'),
  }),
});
