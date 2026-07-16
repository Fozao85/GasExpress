import { QuantityStepper } from './QuantityStepper';
import type { CartItem as CartItemType } from '../../services/order.service';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4" role="listitem">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{item.cylinderSize}kg Cylinder</h4>
          {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
        </div>
        <span className="text-lg font-bold text-primary-600">GHS {item.price.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between">
        <QuantityStepper
          quantity={item.quantity}
          max={item.stockQuantity}
          onChange={(qty) => onUpdateQuantity(item.id, qty)}
        />
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-error-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-error-300 rounded px-2 py-1"
          aria-label={`Remove ${item.cylinderSize}kg cylinder`}
        >
          Remove
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Subtotal: GHS {(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}
