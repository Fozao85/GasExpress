interface AvailabilityBadgeProps {
  isOpen: boolean;
  stockStatus?: 'in_stock' | 'out_of_stock' | 'limited';
}

const variants: Record<string, string> = {
  open: 'bg-success-100 text-success-700',
  closed: 'bg-gray-100 text-gray-500',
  outOfStock: 'bg-error-100 text-error-700',
};

export function AvailabilityBadge({ isOpen, stockStatus }: AvailabilityBadgeProps) {
  const variant = !isOpen ? 'closed' : stockStatus === 'out_of_stock' ? 'outOfStock' : 'open';
  const label = !isOpen ? 'Closed' : stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Open';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}
      aria-label={label}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${!isOpen ? 'bg-gray-400' : stockStatus === 'out_of_stock' ? 'bg-error-500' : 'bg-success-500'}`}
      />
      {label}
    </span>
  );
}
