import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartScreen } from './CartScreen';
import { CheckoutScreen } from './CheckoutScreen';
import { OrderConfirmationScreen } from './OrderConfirmationScreen';
import { OrdersScreen } from './OrdersScreen';

vi.mock('../../../hooks/useOrder', () => ({
  useCart: vi.fn(),
  useUpdateCartItem: vi.fn(),
  useRemoveCartItem: vi.fn(),
  useClearCart: vi.fn(),
  useAddresses: vi.fn(),
  useCreateAddress: vi.fn(),
  useCreateOrder: vi.fn(),
  useOrders: vi.fn(),
  useOrder: vi.fn(),
  useCancelOrder: vi.fn(),
  useOrderStatusHistory: vi.fn(),
  useInitiatePayment: vi.fn(),
  useAddToCart: vi.fn(),
}));

import * as useOrder from '../../../hooks/useOrder';

function createWrapper(initialEntries?: string[]) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries || ['/']}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

const mockCart = {
  id: 'cart-1',
  vendorId: 'vendor-1',
  vendorName: 'Test Gas Ltd',
  items: [
    {
      id: 'item-1',
      inventoryId: 'inv-1',
      cylinderSize: 14.5,
      description: 'Standard',
      price: 120,
      quantity: 2,
      stockQuantity: 10,
      inStock: true,
    },
    {
      id: 'item-2',
      inventoryId: 'inv-2',
      cylinderSize: 6,
      description: 'Small',
      price: 80,
      quantity: 1,
      stockQuantity: 5,
      inStock: true,
    },
  ],
  subtotal: 320,
  totalItems: 3,
};

const mockOrder = {
  id: 'order-1',
  orderNumber: 'GN-ABC123',
  status: 'PENDING',
  subtotal: 320,
  deliveryFee: 15,
  total: 335,
  paymentMethod: 'CASH',
  paymentStatus: 'PENDING',
  notes: null,
  estimatedDeliveryAt: '2026-07-16T15:00:00Z',
  createdAt: '2026-07-16T12:00:00Z',
  vendor: {
    id: 'vendor-1',
    businessName: 'Test Gas Ltd',
    phone: '+233501234567',
    address: '123 Main St',
  },
  address: {
    id: 'addr-1',
    label: 'Home',
    addressLine: '123 Main St',
    city: 'Accra',
    region: 'Greater Accra',
  },
  items: [
    {
      id: 'oi-1',
      cylinderSize: 14.5,
      description: 'Standard',
      quantity: 2,
      unitPrice: 120,
      subtotal: 240,
    },
    { id: 'oi-2', cylinderSize: 6, description: 'Small', quantity: 1, unitPrice: 80, subtotal: 80 },
  ],
  payment: { id: 'pay-1', paymentMethod: 'CASH', amount: 335, paymentStatus: 'PENDING' },
  statusHistory: [{ id: 'sh-1', status: 'PENDING', note: null, createdAt: '2026-07-16T12:00:00Z' }],
};

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(useOrder.useUpdateCartItem).mockReturnValue({ mutate: vi.fn() } as any);
  vi.mocked(useOrder.useRemoveCartItem).mockReturnValue({ mutate: vi.fn() } as any);
  vi.mocked(useOrder.useClearCart).mockReturnValue({ mutate: vi.fn() } as any);
  vi.mocked(useOrder.useCreateAddress).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
  } as any);
  vi.mocked(useOrder.useCreateOrder).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  } as any);
});

describe('CartScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<CartScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<CartScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load cart. Please try again.')).toBeInTheDocument();
  });

  it('renders empty cart when no items', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    } as any);
    render(<CartScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('renders cart items and totals', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    render(<CartScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('My Cart')).toBeInTheDocument();
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
    expect(screen.getByText('14.5kg Cylinder')).toBeInTheDocument();
    expect(screen.getByText('6kg Cylinder')).toBeInTheDocument();
    expect(
      screen.getByText((c) => c.includes('Proceed to Checkout') && c.includes('320.00'))
    ).toBeInTheDocument();
  });

  it('renders free delivery when subtotal >= 200', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: { ...mockCart, subtotal: 200 },
      isLoading: false,
      error: null,
    } as any);
    render(<CartScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Free')).toBeInTheDocument();
  });
});

describe('CheckoutScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({ data: undefined, isLoading: false } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state for cart', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({ data: [], isLoading: false } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load cart. Please try again.')).toBeInTheDocument();
  });

  it('renders checkout form with address and payment options', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({
      data: [
        {
          id: 'addr-1',
          label: 'Home',
          addressLine: '123 Main St',
          city: 'Accra',
          region: 'Greater Accra',
          isDefault: true,
          latitude: null,
          longitude: null,
        },
      ],
      isLoading: false,
    } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Checkout')).toBeInTheDocument();
    expect(screen.getByText('Delivery Address')).toBeInTheDocument();
    expect(screen.getByText('Payment Method')).toBeInTheDocument();
    expect(screen.getByText('Cash on Delivery')).toBeInTheDocument();
    expect(screen.getByText('Mobile Money')).toBeInTheDocument();
    expect(
      screen.getByText((c) => c.includes('Place Order') && c.includes('320.00'))
    ).toBeInTheDocument();
  });

  it('shows add new address button', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({ data: [], isLoading: false } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('+ Add New Address')).toBeInTheDocument();
  });

  it('navigates to cart when cart is empty', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({ data: [], isLoading: false } as any);
    const { container } = render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(container.innerHTML).toBe('');
  });

  it('disables place order button when no address is selected', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({ data: [], isLoading: false } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    const button = screen.getByText((c) => c.includes('Place Order'))?.closest('button');
    expect(button).toBeDisabled();
  });

  it('shows loading state on place order button during submission', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({
      data: [
        {
          id: 'addr-1',
          label: 'Home',
          addressLine: '123 Main St',
          city: 'Accra',
          region: 'Greater Accra',
          isDefault: true,
          latitude: null,
          longitude: null,
        },
      ],
      isLoading: false,
    } as any);
    vi.mocked(useOrder.useCreateOrder).mockReturnValue({
      mutate: vi.fn(),
      isPending: true,
      error: null,
    } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    const button = screen.getByText((c) => c.includes('Place Order'))?.closest('button');
    expect(button).toBeDisabled();
  });

  it('shows error message when order creation fails', () => {
    vi.mocked(useOrder.useCart).mockReturnValue({
      data: mockCart,
      isLoading: false,
      error: null,
    } as any);
    vi.mocked(useOrder.useAddresses).mockReturnValue({
      data: [
        {
          id: 'addr-1',
          label: 'Home',
          addressLine: '123 Main St',
          city: 'Accra',
          region: 'Greater Accra',
          isDefault: true,
          latitude: null,
          longitude: null,
        },
      ],
      isLoading: false,
    } as any);
    vi.mocked(useOrder.useCreateOrder).mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
      error: { response: { data: { message: 'Insufficient stock' } } },
    } as any);
    render(<CheckoutScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Insufficient stock')).toBeInTheDocument();
  });
});

describe('OrderConfirmationScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useOrder.useOrder).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<OrderConfirmationScreen />, {
      wrapper: createWrapper(['/customer/orders/order-1/confirmation']),
    });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useOrder.useOrder).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<OrderConfirmationScreen />, {
      wrapper: createWrapper(['/customer/orders/order-1/confirmation']),
    });
    expect(screen.getByText('Failed to load order details.')).toBeInTheDocument();
  });

  it('renders confirmation details', () => {
    vi.mocked(useOrder.useOrder).mockReturnValue({
      data: mockOrder,
      isLoading: false,
      error: null,
    } as any);
    render(<OrderConfirmationScreen />, {
      wrapper: createWrapper(['/customer/orders/order-1/confirmation']),
    });
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('GN-ABC123')).toBeInTheDocument();
    expect(screen.getAllByText('Test Gas Ltd').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('View My Orders')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });
});

describe('OrdersScreen', () => {
  it('renders loading skeleton', () => {
    vi.mocked(useOrder.useOrders).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);
    render(<OrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    vi.mocked(useOrder.useOrders).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed'),
    } as any);
    render(<OrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Failed to load orders. Please try again.')).toBeInTheDocument();
  });

  it('renders empty state when no orders', () => {
    vi.mocked(useOrder.useOrders).mockReturnValue({
      data: { orders: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    render(<OrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText("You haven't placed any orders yet")).toBeInTheDocument();
  });

  it('renders orders list', () => {
    vi.mocked(useOrder.useOrders).mockReturnValue({
      data: { orders: [mockOrder], pagination: { page: 1, limit: 10, total: 1, totalPages: 1 } },
      isLoading: false,
      error: null,
    } as any);
    render(<OrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('GN-ABC123')).toBeInTheDocument();
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
    expect(screen.getByText('GHS 335.00')).toBeInTheDocument();
    expect(screen.getAllByText('PENDING').length).toBeGreaterThanOrEqual(1);
  });

  it('renders status filter tabs', () => {
    vi.mocked(useOrder.useOrders).mockReturnValue({
      data: { orders: [], pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } },
      isLoading: false,
      error: null,
    } as any);
    render(<OrdersScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('PENDING')).toBeInTheDocument();
    expect(screen.getByText('DELIVERED')).toBeInTheDocument();
    expect(screen.getByText('CANCELLED')).toBeInTheDocument();
  });
});
