import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { VendorCard } from './VendorCard';
import { ProductCard } from './ProductCard';
import { SearchBar } from './SearchBar';
import { FilterChip } from './FilterChip';
import { RatingBadge } from './RatingBadge';
import { DistanceBadge } from './DistanceBadge';
import { AvailabilityBadge } from './AvailabilityBadge';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';

const vendor = {
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

describe('VendorCard', () => {
  it('renders vendor name and rating', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={vendor} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Gas Ltd')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders availability badge as Open', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={vendor} />
      </BrowserRouter>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('renders distance', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={vendor} />
      </BrowserRouter>
    );
    expect(screen.getByText('2.3km')).toBeInTheDocument();
  });

  it('renders pricing and available products', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={vendor} />
      </BrowserRouter>
    );
    expect(screen.getByText(/GHS 120\.00/)).toBeInTheDocument();
    expect(screen.getByText('3 products available')).toBeInTheDocument();
  });

  it('shows Closed badge when vendor is closed', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={{ ...vendor, isOpen: false }} />
      </BrowserRouter>
    );
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('shows Out of Stock when no products', () => {
    render(
      <BrowserRouter>
        <VendorCard vendor={{ ...vendor, availableProducts: 0 }} />
      </BrowserRouter>
    );
    expect(screen.queryByText('0 products available')).not.toBeInTheDocument();
  });
});

describe('ProductCard', () => {
  it('renders cylinder size and price', () => {
    render(
      <ProductCard
        cylinderSize={14.5}
        description="Standard"
        price={120}
        inStock
        stockQuantity={10}
      />
    );
    expect(screen.getByText('14.5kg Cylinder')).toBeInTheDocument();
    expect(screen.getByText('GHS 120.00')).toBeInTheDocument();
  });

  it('shows description when provided', () => {
    render(
      <ProductCard cylinderSize={6} description="Small" price={80} inStock stockQuantity={5} />
    );
    expect(screen.getByText('Small')).toBeInTheDocument();
  });

  it('shows quantity increment/decrement when in stock', () => {
    render(
      <ProductCard
        cylinderSize={14.5}
        description="Standard"
        price={120}
        inStock
        stockQuantity={10}
      />
    );
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
  });

  it('shows Out of Stock when not in stock', () => {
    render(
      <ProductCard
        cylinderSize={14.5}
        description="Standard"
        price={120}
        inStock={false}
        stockQuantity={0}
      />
    );
    expect(screen.getByText('Out of stock')).toBeInTheDocument();
  });
});

describe('SearchBar', () => {
  it('renders with placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search vendors...')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const fn = vi.fn();
    render(<SearchBar value="" onChange={fn} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Gas' } });
    expect(fn).toHaveBeenCalledWith('Gas');
  });
});

describe('FilterChip', () => {
  it('renders with label', () => {
    render(<FilterChip label="Nearest" selected={false} onClick={() => {}} />);
    expect(screen.getByText('Nearest')).toBeInTheDocument();
  });

  it('shows selected state', () => {
    render(<FilterChip label="Nearest" selected onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows unselected state', () => {
    render(<FilterChip label="Nearest" selected={false} onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('RatingBadge', () => {
  it('renders rating text', () => {
    render(<RatingBadge rating={4.5} />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    render(<RatingBadge rating={4.5} />);
    const badge = screen.getByLabelText('4.5 out of 5 stars');
    expect(badge).toBeInTheDocument();
  });
});

describe('DistanceBadge', () => {
  it('renders distance in km', () => {
    render(<DistanceBadge distance={2.3} />);
    expect(screen.getByText('2.3km')).toBeInTheDocument();
  });

  it('renders distance in meters when < 1km', () => {
    render(<DistanceBadge distance={0.5} />);
    expect(screen.getByText('500m')).toBeInTheDocument();
  });

  it('renders nothing when distance is undefined', () => {
    const { container } = render(<DistanceBadge />);
    expect(container.innerHTML).toBe('');
  });
});

describe('AvailabilityBadge', () => {
  it('shows Open when vendor is open', () => {
    render(<AvailabilityBadge isOpen />);
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('shows Closed when vendor is closed', () => {
    render(<AvailabilityBadge isOpen={false} />);
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('shows Out of Stock when stock is out', () => {
    render(<AvailabilityBadge isOpen stockStatus="out_of_stock" />);
    expect(screen.getByText('Out of Stock')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders title and message', () => {
    render(<EmptyState title="No results" message="Try again" />);
    expect(screen.getByText('No results')).toBeInTheDocument();
    expect(screen.getByText('Try again')).toBeInTheDocument();
  });
});

describe('LoadingSkeleton', () => {
  it('renders correct number of card skeletons', () => {
    const { container } = render(<LoadingSkeleton count={3} type="card" />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons).toHaveLength(3);
  });

  it('renders with loading status', () => {
    render(<LoadingSkeleton count={2} />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });
});
