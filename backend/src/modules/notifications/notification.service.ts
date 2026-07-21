import { prisma } from '../../database';
import type { Prisma } from '@prisma/client';

interface CreateNotificationInput {
  userId: string;
  title: string;
  body: string;
  notificationType: string;
  data?: Record<string, unknown>;
}

interface PaginationInput {
  page: number;
  limit: number;
}

export async function listNotifications(userId: string, pagination: PaginationInput) {
  const { page, limit } = pagination;
  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.notification.count({ where: { userId } }),
  ]);

  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getUnreadCount(userId: string) {
  const count = await prisma.notification.count({
    where: { userId, isRead: false },
  });

  return { count };
}

export async function markAsRead(userId: string, notificationId: string) {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification || notification.userId !== userId) {
    return { success: false };
  }

  await prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });

  return { success: true };
}

export async function markAllAsRead(userId: string) {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });

  return { count: result.count };
}

const notificationCreateInput = (
  input: CreateNotificationInput
): Prisma.NotificationCreateInput => ({
  userId: input.userId,
  title: input.title,
  body: input.body,
  notificationType: input.notificationType,
  ...(input.data ? { data: input.data as Prisma.JsonObject } : {}),
});

export async function createNotification(input: CreateNotificationInput) {
  const notification = await prisma.notification.create({
    data: notificationCreateInput(input),
  });

  return notification;
}
