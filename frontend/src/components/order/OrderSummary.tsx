interface OrderSummaryProps {
  items: { cylinderSize: number; quantity: number; unitPrice: number }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function OrderSummary({ items, subtotal, deliveryFee, total }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
      <div className="space-y-2 mb-4">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm text-gray-600">
            <span>
              {item.cylinderSize}kg × {item.quantity}
            </span>
            <span>GHS {(item.unitPrice * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <hr className="border-gray-100 mb-2" />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>GHS {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span>
            {deliveryFee === 0 ? (
              <span className="text-success-600">Free</span>
            ) : (
              `GHS ${deliveryFee.toFixed(2)}`
            )}
          </span>
        </div>
      </div>
      <hr className="border-gray-100 my-2" />
      <div className="flex justify-between text-base font-bold text-gray-900">
        <span>Total</span>
        <span>GHS {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
