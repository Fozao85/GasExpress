import { z } from 'zod';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const mediaTypeSchema = z.enum([
  'avatar',
  'logo',
  'drivers_licence',
  'national_id',
  'vehicle_photo',
  'proof_of_delivery',
]);

export const uploadMediaSchema = z.object({
  body: z.object({
    mediaType: mediaTypeSchema,
    ownerType: z.enum(['vendor', 'customer', 'rider', 'delivery']),
  }),
});

export const mediaIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const mediaPathSchema = z.object({
  params: z.object({
    path: z.string().min(1),
  }),
});

export { ALLOWED_MIME_TYPES, MAX_FILE_SIZE };
