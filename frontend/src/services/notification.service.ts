import { api } from './api';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  notificationType: string;
  isRead: boolean;
  data: Record<string, unknown> | null;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UnreadCountResponse {
  count: number;
}

export async function listNotifications(page = 1, limit = 20): Promise<NotificationsResponse> {
  const { data } = await api.get(`/notifications?page=${page}&limit=${limit}`);
  return data.data;
}

export async function getUnreadCount(): Promise<UnreadCountResponse> {
  const { data } = await api.get('/notifications/unread-count');
  return data.data;
}

export async function markAsRead(id: string): Promise<{ success: boolean }> {
  const { data } = await api.patch(`/notifications/${id}/read`);
  return data.data;
}

export async function markAllAsRead(): Promise<{ count: number }> {
  const { data } = await api.post('/notifications/read-all');
  return data.data;
}
