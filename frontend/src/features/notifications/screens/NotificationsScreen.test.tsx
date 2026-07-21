import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationsScreen } from './NotificationsScreen';

vi.mock('../../../hooks/useNotifications', () => ({
  useNotifications: vi.fn(),
  useUnreadCount: vi.fn(),
  useMarkAsRead: vi.fn(),
  useMarkAllAsRead: vi.fn(),
}));

import * as useNotifications from '../../../hooks/useNotifications';

const mockNotifications = [
  {
    id: 'n1',
    userId: 'u1',
    title: 'Order Placed',
    body: 'Your order #123 has been placed',
    notificationType: 'order_placed',
    isRead: false,
    data: null,
    createdAt: '2026-07-20T10:00:00Z',
  },
  {
    id: 'n2',
    userId: 'u1',
    title: 'Order Delivered',
    body: 'Your order #123 has been delivered',
    notificationType: 'order_delivered',
    isRead: true,
    data: null,
    createdAt: '2026-07-19T10:00:00Z',
  },
];

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useNotifications.useMarkAsRead).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as any);
  vi.mocked(useNotifications.useMarkAllAsRead).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as any);
});

describe('NotificationsScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useNotifications.useNotifications).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useNotifications.useUnreadCount).mockReturnValue({
      data: { count: 0 },
      isLoading: false,
    } as any);

    render(<NotificationsScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
    expect(screen.getByText('Notifications')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useNotifications.useNotifications).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    vi.mocked(useNotifications.useUnreadCount).mockReturnValue({
      data: { count: 0 },
      isLoading: false,
    } as any);

    render(<NotificationsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load notifications.')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useNotifications.useNotifications).mockReturnValue({
      data: { notifications: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useNotifications.useUnreadCount).mockReturnValue({
      data: { count: 0 },
      isLoading: false,
    } as any);

    render(<NotificationsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText("You're all caught up!")).toBeDefined();
  });

  it('renders notification list', () => {
    vi.mocked(useNotifications.useNotifications).mockReturnValue({
      data: {
        notifications: mockNotifications,
        pagination: { page: 1, limit: 20, total: 2, totalPages: 1 },
      },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useNotifications.useUnreadCount).mockReturnValue({
      data: { count: 1 },
      isLoading: false,
    } as any);

    render(<NotificationsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Order Placed')).toBeDefined();
    expect(screen.getByText('Order Delivered')).toBeDefined();
    expect(screen.getByText('1 unread')).toBeDefined();
    expect(screen.getByText('Mark all read')).toBeDefined();
  });

  it('shows unread badge and mark read button', () => {
    const unread = { ...mockNotifications[0], isRead: false };
    vi.mocked(useNotifications.useNotifications).mockReturnValue({
      data: {
        notifications: [unread],
        pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
      },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useNotifications.useUnreadCount).mockReturnValue({
      data: { count: 1 },
      isLoading: false,
    } as any);

    render(<NotificationsScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText(/Mark.*Order Placed.*as read/)).toBeDefined();
  });
});
