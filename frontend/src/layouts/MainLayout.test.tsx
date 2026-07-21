import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './MainLayout';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockGetCart = vi.fn();
vi.mock('../hooks/useOrder', () => ({
  useCart: (enabled?: boolean) => {
    mockGetCart(enabled);
    return { data: undefined, isLoading: false };
  },
}));

vi.mock('../hooks/useNotifications', () => ({
  useUnreadCount: () => ({ data: { count: 0 }, isLoading: false }),
}));

import { useAuth } from '../contexts/AuthContext';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('MainLayout conditional cart', () => {
  it('calls useCart with enabled=false for VENDOR role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'VENDOR', fullName: 'Test Vendor' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(mockGetCart).toHaveBeenCalledWith(false);
  });

  it('calls useCart with enabled=false for RIDER role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'RIDER', fullName: 'Test Rider' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(mockGetCart).toHaveBeenCalledWith(false);
  });

  it('calls useCart with enabled=true for CUSTOMER role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'CUSTOMER', fullName: 'Test Customer' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(mockGetCart).toHaveBeenCalledWith(true);
  });

  it('calls useCart with enabled=false for ADMIN role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'ADMIN', fullName: 'Test Admin' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(mockGetCart).toHaveBeenCalledWith(false);
  });

  it('shows cart icon only for CUSTOMER role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'CUSTOMER', fullName: 'Test Customer' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(screen.getByLabelText(/Cart/)).toBeDefined();
  });

  it('shows profile icon for VENDOR role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'VENDOR', fullName: 'Test Vendor' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Profile')).toBeDefined();
  });

  it('shows profile icon for RIDER role', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'RIDER', fullName: 'Test Rider' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Profile')).toBeDefined();
  });

  it('shows logout for all roles', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'CUSTOMER', fullName: 'Test' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(screen.getByText('Logout')).toBeDefined();
  });

  it('shows notification bell for all roles', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { role: 'CUSTOMER', fullName: 'Test' },
      logout: vi.fn(),
    } as any);

    render(<MainLayout />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Notifications')).toBeDefined();
  });
});
