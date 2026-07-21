import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MobileMoneyPaymentScreen } from './MobileMoneyPaymentScreen';
import { PaymentSuccessScreen } from './PaymentSuccessScreen';
import { PaymentFailedScreen } from './PaymentFailedScreen';

vi.mock('../../../hooks/usePayment', () => ({
  useInitiatePayment: vi.fn(),
  useVerifyPayment: vi.fn(),
}));

vi.mock('../../../hooks/useOrder', () => ({
  useOrder: vi.fn(),
}));

const mockUseParams = vi.fn(() => ({ orderId: 'order-1' }));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useParams: () => mockUseParams() };
});

import { useOrder } from '../../../hooks/useOrder';
import { useInitiatePayment, useVerifyPayment } from '../../../hooks/usePayment';

const mockOrder = {
  id: 'order-1',
  orderNumber: 'GN-123',
  total: 255,
  vendor: { businessName: 'Test Gas' },
  address: { addressLine: '123 St', city: 'Accra' },
  items: [],
  subtotal: 240,
  deliveryFee: 15,
  payment: { paymentMethod: 'MOBILE_MONEY', paymentStatus: 'PENDING' },
  status: 'PENDING',
};

function createWrapper(initialEntries = ['/customer/payment/order-1']) {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useOrder).mockReturnValue({ data: mockOrder, isLoading: false, error: null } as any);
  vi.mocked(useInitiatePayment).mockReturnValue({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  } as any);
  vi.mocked(useVerifyPayment).mockReturnValue({ mutateAsync: vi.fn(), isPending: false } as any);
});

describe('MobileMoneyPaymentScreen', () => {
  it('renders payment form with provider selection', () => {
    render(<MobileMoneyPaymentScreen />, { wrapper: createWrapper() });
    expect(screen.getByText('Mobile Money Payment')).toBeDefined();
    expect(screen.getByText('MTN MoMo')).toBeDefined();
    expect(screen.getByText('Orange Money')).toBeDefined();
    expect(screen.getByText('GHS 255.00')).toBeDefined();
  });

  it('renders phone number input', () => {
    render(<MobileMoneyPaymentScreen />, { wrapper: createWrapper() });
    expect(screen.getByPlaceholderText(/e\.g\. \+233/)).toBeDefined();
    expect(screen.getByText('Pay GHS 255.00')).toBeDefined();
  });

  it('calls initiatePayment on submit', () => {
    const mockMutate = vi.fn();
    vi.mocked(useInitiatePayment).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    } as any);

    const { container } = render(<MobileMoneyPaymentScreen />, { wrapper: createWrapper() });
    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    form!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    expect(mockMutate).toHaveBeenCalled();
  });
});

describe('PaymentSuccessScreen', () => {
  it('renders success message', () => {
    render(<PaymentSuccessScreen />, {
      wrapper: createWrapper(['/customer/payment/success?orderId=order-1']),
    });
    expect(screen.getByText('Payment Successful!')).toBeDefined();
    expect(screen.getByText('View Order Details')).toBeDefined();
    expect(screen.getByText('My Orders')).toBeDefined();
    expect(screen.getByText('Continue Shopping')).toBeDefined();
  });
});

describe('PaymentFailedScreen', () => {
  it('renders failure message with retry', () => {
    render(<PaymentFailedScreen />, {
      wrapper: createWrapper(['/customer/payment/failed?orderId=order-1']),
    });
    expect(screen.getByText('Payment Failed')).toBeDefined();
    expect(screen.getByText('Try Again')).toBeDefined();
    expect(screen.getByText('My Orders')).toBeDefined();
  });
});
