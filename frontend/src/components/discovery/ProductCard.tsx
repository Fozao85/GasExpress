import { useState } from 'react';

interface ProductCardProps {
  cylinderSize: number;
  description: string | null;
  price: number;
  inStock: boolean;
  stockQuantity: number;
  onAddToCart?: (quantity: number) => void;
}

export function ProductCard({
  cylinderSize,
  description,
  price,
  inStock,
  stockQuantity,
  onAddToCart,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div
      className={`bg-white rounded-xl border p-4 ${inStock ? 'border-gray-100' : 'border-gray-100 opacity-60'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{cylinderSize}kg Cylinder</h4>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
        <span className="text-lg font-bold text-primary-600">GHS {price.toFixed(2)}</span>
      </div>

      {inStock ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-center font-medium" aria-live="polite">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(stockQuantity, quantity + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(quantity)}
              className="px-4 py-1.5 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      ) : (
        <span className="text-sm text-error-500 font-medium">Out of stock</span>
      )}
    </div>
  );
}
