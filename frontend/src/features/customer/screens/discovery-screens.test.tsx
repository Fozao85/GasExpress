import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../../contexts/AuthContext';
import { HomeDashboard } from './HomeDashboard';
import { VendorListScreen } from './VendorListScreen';
import { VendorDetailScreen } from './VendorDetailScreen';
import { SearchResultsScreen } from './SearchResultsScreen';
import { PromotionsScreen } from './PromotionsScreen';

vi.mock('../../../hooks/useDiscovery', () => ({
  useNearbyVendors: vi.fn(),
  usePromotions: vi.fn(),
  useVendors: vi.fn(),
  useVendorDetail: vi.fn(),
  useSearchVendors: vi.fn(),
}));

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { fullName: 'John Doe' } }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import * as useDiscovery from '../../../hooks/useDiscovery';

function createWrapper(initialEntries?: string[]) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter initialEntries={initialEntries || ['/']}>{children}</MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const mockVendor = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  businessName: 'Test Gas Ltd',
  phone: '+233501234567',
  address: '123 Main St',
  latitude: 6.5,
  longitude: 3.4,
  averageRating: 4.5,
  isOpen: true,
  distance: 2.3,
  eta: 5,
  lowestPrice: 120,
  availableProducts: 3,
};

describe('HomeDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton while fetching', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders empty state when no nearby vendors', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: { vendors: [] },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByText('No vendors nearby')).toBeInTheDocument();
  });

  it('renders error state on API failure', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Network error'),
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load vendors. Please try again.')).toBeInTheDocument();
  });

  it('renders nearby vendor cards when data is available', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: { vendors: [mockVendor] },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
  });

  it('renders promo banner when promotions exist', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: { vendors: [] },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Summer Sale',
          discountType: 'PERCENTAGE',
          value: 10,
          validUntil: '2026-12-31',
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
  });

  it('renders quick action buttons', () => {
    vi.mocked(useDiscovery.useNearbyVendors).mockReturnValue({
      data: { vendors: [] },
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<HomeDashboard />, { wrapper: createWrapper() });
    expect(screen.getByText('Order Gas')).toBeInTheDocument();
    expect(screen.getByText('My Orders')).toBeInTheDocument();
    expect(screen.getByText('Promotions')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });
});

describe('VendorListScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton', () => {
    vi.mocked(useDiscovery.useVendors).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<VendorListScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    vi.mocked(useDiscovery.useVendors).mockReturnValue({
      data: { vendors: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);

    render(<VendorListScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No vendors found')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useDiscovery.useVendors).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);

    render(<VendorListScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load vendors. Please try again.')).toBeInTheDocument();
  });

  it('renders vendor cards when data is available', () => {
    vi.mocked(useDiscovery.useVendors).mockReturnValue({
      data: { vendors: [mockVendor], pagination: { page: 1, limit: 10, total: 1, totalPages: 1 } },
      isLoading: false,
      error: null,
    } as any);

    render(<VendorListScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
  });

  it('renders sort tabs', () => {
    vi.mocked(useDiscovery.useVendors).mockReturnValue({
      data: { vendors: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);

    render(<VendorListScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Nearest')).toBeInTheDocument();
    expect(screen.getByText('Fastest')).toBeInTheDocument();
    expect(screen.getByText('Top Rated')).toBeInTheDocument();
    expect(screen.getByText('Cheapest')).toBeInTheDocument();
  });
});

describe('VendorDetailScreen', () => {
  const detailPath = '/customer/vendors/550e8400-e29b-41d4-a716-446655440001';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton', () => {
    vi.mocked(useDiscovery.useVendorDetail).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<VendorDetailScreen />, { wrapper: createWrapper([detailPath]) });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useDiscovery.useVendorDetail).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Not found'),
    } as any);

    render(<VendorDetailScreen />, { wrapper: createWrapper([detailPath]) });
    expect(
      screen.getByText('Failed to load vendor details. Please try again.')
    ).toBeInTheDocument();
  });

  it('renders vendor info and inventory', () => {
    const vendorDetail = {
      id: mockVendor.id,
      businessName: 'Test Gas Ltd',
      ownerName: 'John Doe',
      phone: '+233501234567',
      email: 'john@test.com',
      address: '123 Main St',
      latitude: 6.5,
      longitude: 3.4,
      averageRating: 4.5,
      isOpen: true,
      openingTime: '08:00',
      closingTime: '18:00',
      verificationStatus: 'VERIFIED',
      lowestPrice: 120,
      inventory: [
        {
          id: '660e8400-e29b-41d4-a716-446655440010',
          cylinderTypeId: '770e8400-e29b-41d4-a716-446655440020',
          cylinderSize: 14.5,
          description: 'Standard',
          price: 120,
          stockQuantity: 10,
          inStock: true,
        },
      ],
    };

    vi.mocked(useDiscovery.useVendorDetail).mockReturnValue({
      data: vendorDetail,
      isLoading: false,
      error: null,
    } as any);

    render(<VendorDetailScreen />, { wrapper: createWrapper([detailPath]) });

    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('14.5kg Cylinder')).toBeInTheDocument();
    expect(screen.getByText('GHS 120.00')).toBeInTheDocument();
  });

  it('shows Open badge when vendor is open', () => {
    vi.mocked(useDiscovery.useVendorDetail).mockReturnValue({
      data: {
        id: mockVendor.id,
        businessName: 'Test Gas',
        ownerName: 'John',
        phone: '+233',
        email: null,
        address: 'Accra',
        latitude: null,
        longitude: null,
        averageRating: 0,
        isOpen: true,
        openingTime: null,
        closingTime: null,
        verificationStatus: 'VERIFIED',
        lowestPrice: null,
        inventory: [],
      },
      isLoading: false,
      error: null,
    } as any);

    render(<VendorDetailScreen />, { wrapper: createWrapper([detailPath]) });
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows Back button and action buttons', () => {
    vi.mocked(useDiscovery.useVendorDetail).mockReturnValue({
      data: {
        id: mockVendor.id,
        businessName: 'Test Gas',
        ownerName: 'John',
        phone: '+233',
        email: null,
        address: 'Accra',
        latitude: null,
        longitude: null,
        averageRating: 0,
        isOpen: true,
        openingTime: null,
        closingTime: null,
        verificationStatus: 'VERIFIED',
        lowestPrice: null,
        inventory: [],
      },
      isLoading: false,
      error: null,
    } as any);

    render(<VendorDetailScreen />, { wrapper: createWrapper([detailPath]) });

    expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });
});

describe('SearchResultsScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders initial empty state', () => {
    vi.mocked(useDiscovery.useSearchVendors).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    } as any);

    render(<SearchResultsScreen />, { wrapper: createWrapper(['/customer/search']) });
    expect(screen.getByText('Search for vendors')).toBeInTheDocument();
  });

  it('renders loading skeleton when searching', () => {
    vi.mocked(useDiscovery.useSearchVendors).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<SearchResultsScreen />, { wrapper: createWrapper(['/customer/search?q=gas']) });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useDiscovery.useSearchVendors).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);

    render(<SearchResultsScreen />, { wrapper: createWrapper(['/customer/search?q=gas']) });
    expect(screen.getByText('Search failed. Please try again.')).toBeInTheDocument();
  });

  it('renders search results', () => {
    vi.mocked(useDiscovery.useSearchVendors).mockReturnValue({
      data: { vendors: [mockVendor], pagination: { page: 1, limit: 20, total: 1, totalPages: 1 } },
      isLoading: false,
      error: null,
    } as any);

    render(<SearchResultsScreen />, { wrapper: createWrapper(['/customer/search?q=test']) });
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
    expect(screen.getByText('1 vendor found')).toBeInTheDocument();
  });
});

describe('PromotionsScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading skeleton', () => {
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(<PromotionsScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    render(<PromotionsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('No active promotions')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);

    render(<PromotionsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load promotions. Please try again.')).toBeInTheDocument();
  });

  it('renders promotion cards', () => {
    vi.mocked(useDiscovery.usePromotions).mockReturnValue({
      data: [
        {
          id: '1',
          title: 'Summer Sale',
          discountType: 'PERCENTAGE',
          value: 10,
          validUntil: '2026-12-31T00:00:00.000Z',
        },
      ],
      isLoading: false,
      error: null,
    } as any);

    render(<PromotionsScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Summer Sale')).toBeInTheDocument();
    expect(screen.getByText('10% off')).toBeInTheDocument();
  });
});
