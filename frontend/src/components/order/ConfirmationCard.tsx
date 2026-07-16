interface ConfirmationCardProps {
  orderNumber: string;
  total: number;
  estimatedDeliveryAt: string | null;
  vendorName: string;
}

export function ConfirmationCard({
  orderNumber,
  total,
  estimatedDeliveryAt,
  vendorName,
}: ConfirmationCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-success-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Order Confirmed!</h2>
      <p className="text-sm text-gray-500 mb-4">Your order has been placed successfully</p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order Number</span>
          <span className="font-semibold text-gray-900">{orderNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vendor</span>
          <span className="font-semibold text-gray-900">{vendorName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Amount Paid</span>
          <span className="font-semibold text-success-600">GHS {total.toFixed(2)}</span>
        </div>
        {estimatedDeliveryAt && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Est. Delivery</span>
            <span className="font-semibold text-gray-900">
              {new Date(estimatedDeliveryAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
