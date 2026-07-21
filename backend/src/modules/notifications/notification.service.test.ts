import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';

vi.mock('../../database', () => ({
  prisma: {
    notification: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      updateMany: vi.fn(),
    },
  },
}));

import * as notificationService from './notification.service';

const mockNotification = {
  id: 'notif-1',
  userId: 'user-1',
  title: 'Test Notification',
  body: 'This is a test',
  notificationType: 'test',
  isRead: false,
  data: null,
  createdAt: new Date('2026-07-20T10:00:00Z'),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('listNotifications', () => {
  it('returns paginated notifications', async () => {
    vi.mocked(prisma.notification.findMany).mockResolvedValue([mockNotification]);
    vi.mocked(prisma.notification.count).mockResolvedValue(1);

    const result = await notificationService.listNotifications('user-1', { page: 1, limit: 20 });

    expect(result.notifications).toHaveLength(1);
    expect(result.notifications[0].id).toBe('notif-1');
    expect(result.pagination).toEqual({ page: 1, limit: 20, total: 1, totalPages: 1 });
    expect(prisma.notification.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: { createdAt: 'desc' },
      skip: 0,
      take: 20,
    });
  });

  it('returns empty list when no notifications', async () => {
    vi.mocked(prisma.notification.findMany).mockResolvedValue([]);
    vi.mocked(prisma.notification.count).mockResolvedValue(0);

    const result = await notificationService.listNotifications('user-1', { page: 1, limit: 20 });

    expect(result.notifications).toHaveLength(0);
    expect(result.pagination.total).toBe(0);
  });

  it('respects pagination parameters', async () => {
    vi.mocked(prisma.notification.findMany).mockResolvedValue([]);
    vi.mocked(prisma.notification.count).mockResolvedValue(25);

    const result = await notificationService.listNotifications('user-1', { page: 2, limit: 10 });

    expect(result.pagination).toEqual({ page: 2, limit: 10, total: 25, totalPages: 3 });
    expect(prisma.notification.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: { createdAt: 'desc' },
      skip: 10,
      take: 10,
    });
  });
});

describe('getUnreadCount', () => {
  it('returns unread notification count', async () => {
    vi.mocked(prisma.notification.count).mockResolvedValue(3);

    const result = await notificationService.getUnreadCount('user-1');

    expect(result.count).toBe(3);
    expect(prisma.notification.count).toHaveBeenCalledWith({
      where: { userId: 'user-1', isRead: false },
    });
  });
});

describe('markAsRead', () => {
  it('marks a notification as read', async () => {
    vi.mocked(prisma.notification.findUnique).mockResolvedValue(mockNotification);

    const result = await notificationService.markAsRead('user-1', 'notif-1');

    expect(result.success).toBe(true);
    expect(prisma.notification.update).toHaveBeenCalledWith({
      where: { id: 'notif-1' },
      data: { isRead: true },
    });
  });

  it('returns false if notification not found', async () => {
    vi.mocked(prisma.notification.findUnique).mockResolvedValue(null);

    const result = await notificationService.markAsRead('user-1', 'nonexistent');

    expect(result.success).toBe(false);
    expect(prisma.notification.update).not.toHaveBeenCalled();
  });

  it('returns false if notification belongs to another user', async () => {
    vi.mocked(prisma.notification.findUnique).mockResolvedValue({
      ...mockNotification,
      userId: 'other-user',
    });

    const result = await notificationService.markAsRead('user-1', 'notif-1');

    expect(result.success).toBe(false);
    expect(prisma.notification.update).not.toHaveBeenCalled();
  });
});

describe('markAllAsRead', () => {
  it('marks all unread notifications as read', async () => {
    vi.mocked(prisma.notification.updateMany).mockResolvedValue({ count: 5 });

    const result = await notificationService.markAllAsRead('user-1');

    expect(result.count).toBe(5);
    expect(prisma.notification.updateMany).toHaveBeenCalledWith({
      where: { userId: 'user-1', isRead: false },
      data: { isRead: true },
    });
  });
});

describe('createNotification', () => {
  it('creates a notification with all fields', async () => {
    vi.mocked(prisma.notification.create).mockResolvedValue(mockNotification);

    const result = await notificationService.createNotification({
      userId: 'user-1',
      title: 'Test Notification',
      body: 'This is a test',
      notificationType: 'test',
    });

    expect(result.id).toBe('notif-1');
    expect(result.title).toBe('Test Notification');
    expect(prisma.notification.create).toHaveBeenCalled();
  });

  it('creates a notification with optional data', async () => {
    vi.mocked(prisma.notification.create).mockResolvedValue({
      ...mockNotification,
      data: { orderId: 'order-1' },
    });

    const result = await notificationService.createNotification({
      userId: 'user-1',
      title: 'Order Update',
      body: 'Your order has been updated',
      notificationType: 'order_update',
      data: { orderId: 'order-1' },
    });

    expect(result.data).toEqual({ orderId: 'order-1' });
  });
});
