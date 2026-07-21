import { z } from 'zod';

export const paginationSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(20),
  }),
});

export const notificationIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.string().uuid(),
    title: z.string().min(1).max(200),
    body: z.string().min(1).max(1000),
    notificationType: z.string().min(1).max(50),
    data: z.any().optional(),
  }),
});
