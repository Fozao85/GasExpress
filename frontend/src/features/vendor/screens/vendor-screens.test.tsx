import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../contexts/AuthContext';
import { VendorDashboardScreen } from './DashboardScreen';
import { VendorOrdersScreen } from './OrdersScreen';
import { VendorInventoryScreen } from './InventoryScreen';
import { VendorProfileScreen } from './ProfileScreen';

vi.mock('../../../hooks/useVendor', () => ({
  useVendorDashboard: vi.fn(),
  useVendorProfile: vi.fn(),
  useUpdateVendorProfile: vi.fn(),
  useVendorOrders: vi.fn(),
  useVendorInventory: vi.fn(),
  useAddInventoryItem: vi.fn(),
  useUpdateInventoryItem: vi.fn(),
  useDeleteInventoryItem: vi.fn(),
  useCylinderTypes: vi.fn(),
  useCreateCylinderType: vi.fn(),
}));

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { fullName: 'Test Vendor' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import * as useVendor from '../../../hooks/useVendor';

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
    totalOrders: 50,
    pendingOrders: 5,
    activeOrders: 3,
    completedOrders: 40,
    todayOrders: 8,
    totalRevenue: 5000,
    todayRevenue: 350,
    lowStockItems: 2,
    averageRating: 4.5,
  },
  business: {
    isOpen: true,
    verificationStatus: 'VERIFIED',
  },
};

const mockProfile = {
  id: '1',
  businessName: 'Test Gas Shop',
  ownerName: 'Test Vendor',
  email: 'test@example.com',
  phone: '0551234567',
  address: '123 Test St',
  latitude: null,
  longitude: null,
  isOpen: true,
  openingTime: '08:00',
  closingTime: '18:00',
  verificationStatus: 'VERIFIED',
  averageRating: 4.5,
  totalOrders: 50,
  inventory: [],
};

const mockOrders = {
  orders: [
    {
      id: '1',
      orderNumber: 'GN-ABCD',
      customerName: 'John Doe',
      customerPhone: '0550000000',
      status: 'PENDING',
      paymentMethod: 'CASH',
      paymentStatus: 'PENDING',
      subtotal: 100,
      deliveryFee: 15,
      total: 115,
      notes: null,
      estimatedDeliveryAt: null,
      createdAt: '2026-07-16T10:00:00Z',
      items: [
        {
          id: 'i1',
          cylinderSize: 14.5,
          description: 'Large',
          quantity: 1,
          unitPrice: 100,
          subtotal: 100,
        },
      ],
      address: { id: 'a1', addressLine: '456 Main St', city: 'Accra', region: 'Greater Accra' },
      lastStatus: null,
    },
  ],
  pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
};

const mockInventory = [
  {
    id: 'inv1',
    cylinderTypeId: 'ct1',
    cylinderSize: 14.5,
    description: 'Large',
    price: 100,
    stockQuantity: 10,
    inStock: true,
  },
  {
    id: 'inv2',
    cylinderTypeId: 'ct2',
    cylinderSize: 6,
    description: 'Small',
    price: 50,
    stockQuantity: 0,
    inStock: false,
  },
];

const mockCylinderTypes = [
  { id: 'ct1', name: '14.5kg', sizeKg: 14.5, description: 'Large' },
  { id: 'ct2', name: '6kg', sizeKg: 6, description: 'Small' },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe('VendorDashboardScreen', () => {
  it('renders loading skeleton while fetching', () => {
    vi.mocked(useVendor.useVendorDashboard).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<VendorDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state on API failure', () => {
    vi.mocked(useVendor.useVendorDashboard).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);
    render(<VendorDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load dashboard data.')).toBeDefined();
  });

  it('renders dashboard stats', () => {
    vi.mocked(useVendor.useVendorDashboard).mockReturnValue({
      data: mockDashboard,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
    } as any);
    render(<VendorDashboardScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Gas Shop')).toBeDefined();
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('50')).toBeDefined();
  });
});

describe('VendorOrdersScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useVendor.useVendorOrders).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<VendorOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useVendor.useVendorOrders).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<VendorOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load orders. Please try again.')).toBeDefined();
  });

  it('renders empty state when no orders', () => {
    vi.mocked(useVendor.useVendorOrders).mockReturnValue({
      data: { orders: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    render(<VendorOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText("You haven't received any orders yet")).toBeDefined();
  });

  it('renders orders list', () => {
    vi.mocked(useVendor.useVendorOrders).mockReturnValue({
      data: mockOrders,
      isLoading: false,
      error: null,
    } as any);
    render(<VendorOrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-ABCD')).toBeDefined();
    expect(screen.getByText('John Doe')).toBeDefined();
  });
});

describe('VendorInventoryScreen', () => {
  const mockMutation = { mutateAsync: vi.fn(), isPending: false, error: null };

  it('renders loading skeleton', () => {
    vi.mocked(useVendor.useVendorInventory).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useVendor.useCylinderTypes).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useVendor.useAddInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useUpdateInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useDeleteInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useCreateCylinderType).mockReturnValue(mockMutation as any);
    render(<VendorInventoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useVendor.useVendorInventory).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    vi.mocked(useVendor.useCylinderTypes).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useAddInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useUpdateInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useDeleteInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useCreateCylinderType).mockReturnValue(mockMutation as any);
    render(<VendorInventoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load inventory.')).toBeDefined();
  });

  it('renders empty state when no inventory', () => {
    vi.mocked(useVendor.useVendorInventory).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useCylinderTypes).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useAddInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useUpdateInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useDeleteInventoryItem).mockReturnValue(mockMutation as any);
    vi.mocked(useVendor.useCreateCylinderType).mockReturnValue(mockMutation as any);
    render(<VendorInventoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No products listed')).toBeDefined();
  });

  it('renders inventory items', () => {
    vi.mocked(useVendor.useVendorInventory).mockReturnValue({
      data: mockInventory,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useCylinderTypes).mockReturnValue({
      data: mockCylinderTypes,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useAddInventoryItem).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useUpdateInventoryItem).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useDeleteInventoryItem).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useCreateCylinderType).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
    } as any);
    render(<VendorInventoryScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('14.5kg - Large')).toBeDefined();
    expect(screen.getByText('6kg - Small')).toBeDefined();
  });
});

describe('VendorProfileScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useVendor.useUpdateVendorProfile).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
      isSuccess: false,
    } as any);
    render(<VendorProfileScreen />, { wrapper: createWrapper() });
    expect(screen.getByRole('status')).toBeDefined();
  });

  it('renders error state', () => {
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    vi.mocked(useVendor.useUpdateVendorProfile).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
      isSuccess: false,
    } as any);
    render(<VendorProfileScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load profile.')).toBeDefined();
  });

  it('renders profile form with vendor data', () => {
    vi.mocked(useVendor.useVendorProfile).mockReturnValue({
      data: mockProfile,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useVendor.useUpdateVendorProfile).mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
      error: null,
      isSuccess: false,
    } as any);
    render(<VendorProfileScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Business Profile')).toBeDefined();
    expect(screen.getByDisplayValue('Test Gas Shop')).toBeDefined();
    expect(screen.getByDisplayValue('0551234567')).toBeDefined();
  });
});
