import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../contexts/AuthContext';
import { RiderDashboardScreen } from './DashboardScreen';
import { AvailableDeliveriesScreen } from './AvailableDeliveriesScreen';
import { ActiveDeliveryScreen } from './ActiveDeliveryScreen';
import { DeliveryHistoryScreen } from './DeliveryHistoryScreen';
import { RiderProfileScreen } from './ProfileScreen';

vi.mock('../../../hooks/useRider', () => ({
  useRiderDashboard: vi.fn(),
  useRiderProfile: vi.fn(),
  useUpdateRiderProfile: vi.fn(),
  useUpdateAvailability: vi.fn(),
  useAvailableOrders: vi.fn(),
  useAcceptOrder: vi.fn(),
  useMyOrders: vi.fn(),
  useDeliveryHistory: vi.fn(),
}));

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { fullName: 'Test Rider' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import * as useRider from '../../../hooks/useRider';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const mockDashboard = {
  stats: {
    availability: 'ONLINE',
    activeDeliveries: 2,
    todayDeliveries: 5,
    totalDeliveries: 50,
    todayEarnings: 75,
    totalEarnings: 750,
    averageRating: 4.5,
    availableOrders: 3,
  },
};

const mockProfile = {
  id: '1',
  fullName: 'Test Rider',
  phone: '0551234567',
  email: 'rider@test.com',
  vehicleType: 'Motorcycle',
  licenseNumber: 'LN123',
  nationalId: 'ID456',
  availability: 'ONLINE' as const,
  latitude: null,
  longitude: null,
  averageRating: 4.5,
  totalDeliveries: 50,
  createdAt: '2026-01-01T00:00:00Z',
};

const mockAvailableOrders = [
  {
    id: 'o1',
    orderNumber: 'GN-ABCD',
    vendorName: 'Test Gas',
    vendorAddress: '123 Shop St',
    vendorPhone: '0550000000',
    vendorLatitude: null,
    vendorLongitude: null,
    subtotal: 100,
    deliveryFee: 15,
    total: 115,
    paymentMethod: 'CASH',
    createdAt: '2026-07-16T10:00:00Z',
    items: [{ cylinderSize: 14.5, description: 'Large', quantity: 1 }],
    deliveryAddress: {
      addressLine: '456 Home St',
      city: 'Accra',
      region: 'Greater Accra',
      latitude: null,
      longitude: null,
    },
  },
];

const mockActiveOrders = [
  {
    id: 'o1',
    orderNumber: 'GN-ABCD',
    status: 'RIDER_ASSIGNED',
    vendorName: 'Test Gas',
    vendorAddress: '123 Shop St',
    vendorPhone: '0550000000',
    vendorLatitude: null,
    vendorLongitude: null,
    subtotal: 100,
    deliveryFee: 15,
    total: 115,
    paymentMethod: 'CASH',
    createdAt: '2026-07-16T10:00:00Z',
    items: [{ cylinderSize: 14.5, description: 'Large', quantity: 1 }],
    deliveryAddress: {
      addressLine: '456 Home St',
      city: 'Accra',
      region: 'Greater Accra',
      latitude: null,
      longitude: null,
    },
    recentStatuses: [{ status: 'RIDER_ASSIGNED', note: null, createdAt: '2026-07-16T10:00:00Z' }],
  },
];

const mockHistoryData = {
  deliveries: [
    {
      id: 'h1',
      orderNumber: 'GN-OLD1',
      vendorName: 'Test Gas',
      total: 115,
      createdAt: '2026-07-15T10:00:00Z',
      items: [{ cylinderSize: 14.5, description: 'Large', quantity: 1 }],
      pickupTime: '2026-07-15T10:30:00Z',
      completionTime: '2026-07-15T11:00:00Z',
    },
  ],
  pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('RiderDashboardScreen', () => {
  it('renders loading skeleton while fetching', () => {
    vi.mocked(useRider.useRiderDashboard).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<RiderDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useRider.useRiderDashboard).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<RiderDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load dashboard data.')).toBeDefined();
  });

  it('renders dashboard stats', () => {
    vi.mocked(useRider.useRiderDashboard).mockReturnValue({
      data: mockDashboard,
      isLoading: false,
      error: null,
    } as any);
    render(<RiderDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Rider Dashboard')).toBeDefined();
    expect(screen.getByText('Online')).toBeDefined();
    expect(screen.getByText('50')).toBeDefined();
    expect(screen.getByText(/75\.00/)).toBeDefined();
  });
});

describe('AvailableDeliveriesScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useRider.useAvailableOrders).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<AvailableDeliveriesScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useRider.useAvailableOrders).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    render(<AvailableDeliveriesScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No deliveries available')).toBeDefined();
  });

  it('renders available orders', () => {
    vi.mocked(useRider.useAvailableOrders).mockReturnValue({
      data: mockAvailableOrders,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useRider.useAcceptOrder).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
    } as any);
    render(<AvailableDeliveriesScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-ABCD')).toBeDefined();
    expect(screen.getByText('Test Gas')).toBeDefined();
    expect(screen.getByText('Accept Delivery')).toBeDefined();
  });
});

describe('ActiveDeliveryScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useRider.useMyOrders).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<ActiveDeliveryScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useRider.useMyOrders).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    render(<ActiveDeliveryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No active deliveries')).toBeDefined();
  });

  it('renders active orders', () => {
    vi.mocked(useRider.useMyOrders).mockReturnValue({
      data: mockActiveOrders,
      isLoading: false,
      error: null,
    } as any);
    render(<ActiveDeliveryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-ABCD')).toBeDefined();
    expect(screen.getByText('RIDER ASSIGNED')).toBeDefined();
  });
});

describe('DeliveryHistoryScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useRider.useDeliveryHistory).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<DeliveryHistoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders empty state', () => {
    vi.mocked(useRider.useDeliveryHistory).mockReturnValue({
      data: { deliveries: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    render(<DeliveryHistoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No deliveries yet')).toBeDefined();
  });

  it('renders delivery history items', () => {
    vi.mocked(useRider.useDeliveryHistory).mockReturnValue({
      data: mockHistoryData,
      isLoading: false,
      error: null,
    } as any);
    render(<DeliveryHistoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-OLD1')).toBeDefined();
    expect(screen.getByText('Test Gas')).toBeDefined();
  });
});

describe('RiderProfileScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useRider.useRiderProfile).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useRider.useUpdateRiderProfile).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
      isSuccess: false,
    } as any);
    render(<RiderProfileScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders profile form', () => {
    vi.mocked(useRider.useRiderProfile).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useRider.useUpdateRiderProfile).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
      isSuccess: false,
    } as any);
    render(<RiderProfileScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('My Profile')).toBeDefined();
    expect(screen.getByText('Test Rider')).toBeDefined();
    expect(screen.getByDisplayValue('Motorcycle')).toBeDefined();
  });
});
