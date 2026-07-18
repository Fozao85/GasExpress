interface PaymentCardProps {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function PaymentCard({ label, description, selected, onSelect }: PaymentCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${selected ? 'border-primary-500 bg-primary-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
      aria-pressed={selected}
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? 'border-primary-500' : 'border-gray-300'}`}
        >
          {selected && <div className="w-3 h-3 rounded-full bg-primary-500" />}
        </div>
        <div>
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
    </button>
  );
}
