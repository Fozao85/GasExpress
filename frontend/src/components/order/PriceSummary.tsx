interface PriceSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function PriceSummary({ subtotal, deliveryFee, total }: PriceSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>GHS {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Delivery fee</span>
        <span>
          {deliveryFee === 0 ? (
            <span className="text-success-600 font-medium">Free</span>
          ) : (
            `GHS ${deliveryFee.toFixed(2)}`
          )}
        </span>
      </div>
      <hr className="border-gray-100" />
      <div className="flex justify-between text-base font-bold text-gray-900">
        <span>Total</span>
        <span>GHS {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
