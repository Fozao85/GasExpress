import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../contexts/AuthContext';
import { AdminDashboardScreen } from './DashboardScreen';
import { AdminUsersScreen } from './UsersScreen';
import { AdminVendorsScreen } from './VendorsScreen';
import { AdminRidersScreen } from './RidersScreen';
import { AdminOrdersScreen } from './OrdersScreen';
import { AdminPromotionsScreen } from './PromotionsScreen';
import { AdminSettingsScreen } from './SettingsScreen';

vi.mock('../../../hooks/useAdmin', () => ({
  useAdminDashboard: vi.fn(),
  useUsers: vi.fn(),
  useUpdateUserStatus: vi.fn(),
  useDeleteUser: vi.fn(),
  usePendingVendors: vi.fn(),
  useApproveVendor: vi.fn(),
  useRejectVendor: vi.fn(),
  useSuspendVendor: vi.fn(),
  useReactivateVendor: vi.fn(),
  usePendingRiders: vi.fn(),
  useApproveRider: vi.fn(),
  useRejectRider: vi.fn(),
  useSuspendRider: vi.fn(),
  useReactivateRider: vi.fn(),
  useAdminOrders: vi.fn(),
  useAdminPromotions: vi.fn(),
  useCreateAdminPromotion: vi.fn(),
  useUpdateAdminPromotion: vi.fn(),
  useDeleteAdminPromotion: vi.fn(),
  usePlatformSettings: vi.fn(),
  useUpdatePlatformSettings: vi.fn(),
}));

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { fullName: 'Admin', role: 'ADMIN' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import * as useAdmin from '../../../hooks/useAdmin';

function createWrapper() {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 0 } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const mockDashboard = {
  totalCustomers: 100,
  totalVendors: 20,
  totalRiders: 15,
  activeVendors: 18,
  onlineRiders: 5,
  totalOrders: 500,
  pendingOrders: 10,
  preparingOrders: 5,
  readyOrders: 8,
  inTransitOrders: 3,
  completedOrders: 450,
  cancelledOrders: 24,
  revenueToday: 500,
  revenueThisWeek: 3500,
  revenueThisMonth: 15000,
  revenueTotal: 200000,
  averageVendorRating: 4.5,
  averageRiderRating: 4.2,
  lowInventoryVendors: 3,
  pendingVendorApprovals: 2,
  pendingRiderApprovals: 1,
};

const mockUsers = {
  users: [
    {
      id: 'u1',
      fullName: 'John',
      phone: '0551111111',
      email: null,
      role: 'CUSTOMER',
      status: 'ACTIVE',
      createdAt: '2026-01-01T00:00:00Z',
      lastLogin: null,
    },
  ],
  pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
};

const mockPendingVendors = [
  {
    id: 'v1',
    businessName: 'Test Gas',
    businessLicense: null,
    phone: '055',
    address: '123 St',
    ownerName: 'Owner',
    ownerPhone: '055',
    submittedAt: '2026-07-01T00:00:00Z',
  },
];

const mockPendingRiders = [
  {
    id: 'r1',
    userId: 'u2',
    fullName: 'Rider',
    phone: '055',
    vehicleType: 'Bike',
    licenseNumber: 'LN',
    nationalId: 'ID',
    registeredAt: '2026-07-01T00:00:00Z',
  },
];

const mockOrders = {
  orders: [
    {
      id: 'o1',
      orderNumber: 'GN-001',
      status: 'DELIVERED',
      customerName: 'John',
      vendorName: 'Test Gas',
      riderName: null,
      total: 115,
      deliveryFee: 15,
      paymentMethod: 'CASH',
      paymentStatus: 'PAID',
      itemCount: 2,
      createdAt: '2026-07-01T00:00:00Z',
    },
  ],
  pagination: { page: 1, limit: 20, total: 1, totalPages: 1 },
};

const mockPromotions = [
  {
    id: 'p1',
    title: 'Test Promo',
    discountType: 'PERCENTAGE',
    value: 10,
    startDate: '2026-07-01',
    endDate: '2026-07-31',
    active: true,
  },
];

const mockSettings = {
  defaultDeliveryFee: 15,
  freeDeliveryThreshold: 200,
  supportPhone: '0550000000',
  supportEmail: 'support@test.com',
  maintenanceMode: false,
  minimumInventoryAlert: 5,
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('AdminDashboardScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useAdmin.useAdminDashboard).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<AdminDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useAdmin.useAdminDashboard).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<AdminDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load dashboard.')).toBeDefined();
  });

  it('renders dashboard stats', () => {
    vi.mocked(useAdmin.useAdminDashboard).mockReturnValue({
      data: mockDashboard,
      isLoading: false,
      error: null,
    } as any);
    render(<AdminDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Admin Dashboard')).toBeDefined();
    expect(screen.getByText('100')).toBeDefined();
    expect(screen.getByText('20')).toBeDefined();
    expect(screen.getByText('GHS 500.00')).toBeDefined();
  });
});

describe('AdminUsersScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useAdmin.useUsers).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useAdmin.useUpdateUserStatus).mockReturnValue({ mutate: vi.fn() } as any);
    vi.mocked(useAdmin.useDeleteUser).mockReturnValue({ mutate: vi.fn() } as any);
    render(<AdminUsersScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders user list', () => {
    vi.mocked(useAdmin.useUsers).mockReturnValue({
      data: mockUsers,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useUpdateUserStatus).mockReturnValue({ mutate: vi.fn() } as any);
    vi.mocked(useAdmin.useDeleteUser).mockReturnValue({ mutate: vi.fn() } as any);
    render(<AdminUsersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('John')).toBeDefined();
    expect(screen.getByText('CUSTOMER')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useAdmin.useUsers).mockReturnValue({
      data: { users: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useUpdateUserStatus).mockReturnValue({ mutate: vi.fn() } as any);
    vi.mocked(useAdmin.useDeleteUser).mockReturnValue({ mutate: vi.fn() } as any);
    render(<AdminUsersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No users found')).toBeDefined();
  });
});

describe('AdminVendorsScreen', () => {
  it('renders pending vendors', () => {
    vi.mocked(useAdmin.usePendingVendors).mockReturnValue({
      data: mockPendingVendors,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useApproveVendor).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    vi.mocked(useAdmin.useRejectVendor).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    render(<AdminVendorsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Gas')).toBeDefined();
    expect(screen.getByText('Approve')).toBeDefined();
    expect(screen.getByText('Reject')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useAdmin.usePendingVendors).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useApproveVendor).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    vi.mocked(useAdmin.useRejectVendor).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    render(<AdminVendorsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No pending vendors')).toBeDefined();
  });
});

describe('AdminRidersScreen', () => {
  it('renders pending riders', () => {
    vi.mocked(useAdmin.usePendingRiders).mockReturnValue({
      data: mockPendingRiders,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useApproveRider).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    vi.mocked(useAdmin.useRejectRider).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    render(<AdminRidersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Rider')).toBeDefined();
    expect(screen.getByText('Approve')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useAdmin.usePendingRiders).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useApproveRider).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    vi.mocked(useAdmin.useRejectRider).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    } as any);
    render(<AdminRidersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No pending riders')).toBeDefined();
  });
});

describe('AdminOrdersScreen', () => {
  it('renders orders', () => {
    vi.mocked(useAdmin.useAdminOrders).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    } as any);
    render(<AdminOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-001')).toBeDefined();
    expect(screen.getByText('Test Gas')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useAdmin.useAdminOrders).mockReturnValue({
      data: { orders: [], pagination: { page: 1, limit: 20, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    render(<AdminOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No orders found')).toBeDefined();
  });
});

describe('AdminPromotionsScreen', () => {
  it('renders promotions', () => {
    vi.mocked(useAdmin.useAdminPromotions).mockReturnValue({
      data: mockPromotions,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useCreateAdminPromotion).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    } as any);
    vi.mocked(useAdmin.useUpdateAdminPromotion).mockReturnValue({ mutate: vi.fn() } as any);
    vi.mocked(useAdmin.useDeleteAdminPromotion).mockReturnValue({ mutate: vi.fn() } as any);
    render(<AdminPromotionsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Promo')).toBeDefined();
    expect(screen.getByText('10% off')).toBeDefined();
  });
});

describe('AdminSettingsScreen', () => {
  it('renders settings form', () => {
    vi.mocked(useAdmin.usePlatformSettings).mockReturnValue({
      data: mockSettings,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useAdmin.useUpdatePlatformSettings).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      isSuccess: false,
      error: null,
    } as any);
    render(<AdminSettingsScreen />, { wrapper: createWrapper() });
    expect(screen.getByDisplayValue('15')).toBeDefined();
    expect(screen.getByDisplayValue('0550000000')).toBeDefined();
  });
});
