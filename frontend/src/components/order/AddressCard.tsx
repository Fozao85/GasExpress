import type { Address } from '../../services/order.service';

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
}

export function AddressCard({ address, selected, onSelect }: AddressCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${selected ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
      aria-pressed={selected}
      aria-label={`${address.label || 'Address'}: ${address.addressLine}`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-primary-500' : 'border-gray-300'}`}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-primary-500" />}
        </div>
        <div>
          {address.label && <p className="font-medium text-gray-900 text-sm">{address.label}</p>}
          <p className="text-sm text-gray-600">{address.addressLine}</p>
          {address.city && (
            <p className="text-xs text-gray-400">
              {address.city}
              {address.region ? `, ${address.region}` : ''}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
