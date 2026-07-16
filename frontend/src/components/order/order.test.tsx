import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QuantityStepper } from './QuantityStepper';
import { CartItem } from './CartItem';
import { PriceSummary } from './PriceSummary';
import { AddressCard } from './AddressCard';
import { PaymentCard } from './PaymentCard';
import { OrderSummary } from './OrderSummary';
import { ConfirmationCard } from './ConfirmationCard';
import { EmptyCart } from './EmptyCart';
import { PromoInput } from './PromoInput';

const mockItem = {
  id: 'item-1',
  inventoryId: 'inv-1',
  cylinderSize: 14.5,
  description: 'Standard',
  price: 120,
  quantity: 2,
  stockQuantity: 10,
  inStock: true,
};

describe('QuantityStepper', () => {
  it('renders current quantity', () => {
    render(<QuantityStepper quantity={3} max={10} onChange={() => {}} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onChange with decremented value on minus', () => {
    const fn = vi.fn();
    render(<QuantityStepper quantity={3} max={10} onChange={fn} />);
    fireEvent.click(screen.getByLabelText('Decrease quantity'));
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('calls onChange with incremented value on plus', () => {
    const fn = vi.fn();
    render(<QuantityStepper quantity={3} max={10} onChange={fn} />);
    fireEvent.click(screen.getByLabelText('Increase quantity'));
    expect(fn).toHaveBeenCalledWith(4);
  });

  it('disables minus at min', () => {
    render(<QuantityStepper quantity={1} max={10} onChange={() => {}} />);
    expect(screen.getByLabelText('Decrease quantity')).toBeDisabled();
  });

  it('disables plus at max', () => {
    render(<QuantityStepper quantity={10} max={10} onChange={() => {}} />);
    expect(screen.getByLabelText('Increase quantity')).toBeDisabled();
  });
});

describe('CartItem', () => {
  it('renders cylinder size and price', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />);
    expect(screen.getByText('14.5kg Cylinder')).toBeInTheDocument();
    expect(screen.getByText('GHS 120.00')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />);
    expect(screen.getByText('Standard')).toBeInTheDocument();
  });

  it('renders subtotal', () => {
    render(<CartItem item={mockItem} onUpdateQuantity={() => {}} onRemove={() => {}} />);
    expect(screen.getByText((c) => c.includes('240.00'))).toBeInTheDocument();
  });

  it('calls onRemove when remove button clicked', () => {
    const fn = vi.fn();
    render(<CartItem item={mockItem} onUpdateQuantity={() => {}} onRemove={fn} />);
    fireEvent.click(screen.getByLabelText('Remove 14.5kg cylinder'));
    expect(fn).toHaveBeenCalledWith('item-1');
  });
});

describe('PriceSummary', () => {
  it('renders subtotal, delivery fee, and total', () => {
    render(<PriceSummary subtotal={240} deliveryFee={15} total={255} />);
    expect(screen.getByText('GHS 240.00')).toBeInTheDocument();
    expect(screen.getByText('GHS 255.00')).toBeInTheDocument();
  });

  it('shows Free delivery when fee is 0', () => {
    render(<PriceSummary subtotal={200} deliveryFee={0} total={200} />);
    expect(screen.getByText('Free')).toBeInTheDocument();
  });
});

describe('AddressCard', () => {
  const addr = {
    id: 'addr-1',
    label: 'Home',
    addressLine: '123 Main St',
    city: 'Accra',
    region: 'Greater Accra',
    isDefault: true,
    latitude: 5.6,
    longitude: 3.4,
  };

  it('renders address info', () => {
    render(<AddressCard address={addr} selected={false} onSelect={() => {}} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('Accra, Greater Accra')).toBeInTheDocument();
  });

  it('shows selected state', () => {
    render(<AddressCard address={addr} selected onSelect={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows unselected state', () => {
    render(<AddressCard address={addr} selected={false} onSelect={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('PaymentCard', () => {
  it('renders label and description', () => {
    render(
      <PaymentCard
        label="Cash on Delivery"
        description="Pay when delivered"
        selected={false}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('Cash on Delivery')).toBeInTheDocument();
    expect(screen.getByText('Pay when delivered')).toBeInTheDocument();
  });

  it('shows selected state', () => {
    render(<PaymentCard label="Cash" description="" selected onSelect={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });
});

describe('OrderSummary', () => {
  it('renders items and totals', () => {
    render(
      <OrderSummary
        items={[{ cylinderSize: 14.5, quantity: 2, unitPrice: 120 }]}
        subtotal={240}
        deliveryFee={15}
        total={255}
      />
    );
    expect(screen.getByText('14.5kg × 2')).toBeInTheDocument();
    expect(screen.getByText('GHS 255.00')).toBeInTheDocument();
  });

  it('shows Free delivery', () => {
    render(
      <OrderSummary
        items={[{ cylinderSize: 6, quantity: 1, unitPrice: 80 }]}
        subtotal={80}
        deliveryFee={0}
        total={80}
      />
    );
    expect(screen.getByText('Free')).toBeInTheDocument();
  });
});

describe('ConfirmationCard', () => {
  it('renders order confirmation details', () => {
    render(
      <ConfirmationCard
        orderNumber="GN-ABC123"
        total={255}
        estimatedDeliveryAt="2026-07-16T15:00:00Z"
        vendorName="Gas Vendor"
      />
    );
    expect(screen.getByText('Order Confirmed!')).toBeInTheDocument();
    expect(screen.getByText('GN-ABC123')).toBeInTheDocument();
    expect(screen.getByText('Gas Vendor')).toBeInTheDocument();
    expect(screen.getByText('GHS 255.00')).toBeInTheDocument();
  });
});

describe('EmptyCart', () => {
  it('renders empty cart message and browse button', () => {
    render(
      <BrowserRouter>
        <EmptyCart />
      </BrowserRouter>
    );
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Start Browsing')).toBeInTheDocument();
  });
});

describe('PromoInput', () => {
  it('renders input and apply button', () => {
    render(<PromoInput />);
    expect(screen.getByPlaceholderText('Promo code')).toBeInTheDocument();
    expect(screen.getByText('Apply')).toBeInTheDocument();
  });

  it('disables apply when input is empty', () => {
    render(<PromoInput />);
    expect(screen.getByText('Apply')).toBeDisabled();
  });
});
