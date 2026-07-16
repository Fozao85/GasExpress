interface QuantityStepperProps {
  quantity: number;
  min?: number;
  max: number;
  onChange: (qty: number) => void;
}

export function QuantityStepper({ quantity, min = 1, max, onChange }: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-8 text-center font-medium" aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-40"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
