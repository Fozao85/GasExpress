import { useParams, Link } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { ConfirmationCard } from '../../../components/order';
import { useOrder } from '../../../hooks/useOrder';

export function OrderConfirmationScreen() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id);

  if (isLoading) return <LoadingSkeleton count={2} />;
  if (error || !order) {
    return (
      <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
        Failed to load order details.
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-12">
      <ConfirmationCard
        orderNumber={order.orderNumber}
        total={order.total}
        estimatedDeliveryAt={order.estimatedDeliveryAt}
        vendorName={order.vendor.businessName}
      />

      <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 space-y-3">
        <h3 className="font-semibold text-gray-900">Delivery Details</h3>
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-800">{order.vendor.businessName}</p>
          <p>{order.vendor.address}</p>
          <p>{order.vendor.phone}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-800">Delivering to</p>
          <p>{order.address.addressLine}</p>
          {order.address.city && (
            <p>
              {order.address.city}
              {order.address.region ? `, ${order.address.region}` : ''}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 space-y-3">
        <h3 className="font-semibold text-gray-900">Order Items</h3>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div>
              <p className="font-medium text-gray-900">{item.cylinderSize}kg Cylinder</p>
              {item.description && <p className="text-gray-500">{item.description}</p>}
              <p className="text-gray-400">x{item.quantity}</p>
            </div>
            <span className="font-semibold text-gray-900">GHS {item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <hr className="border-gray-100" />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="text-gray-900">GHS {order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="text-gray-900">
            {order.deliveryFee === 0 ? 'Free' : `GHS ${order.deliveryFee.toFixed(2)}`}
          </span>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-primary-600">GHS {order.total.toFixed(2)}</span>
        </div>
      </div>

      {order.payment && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mt-3 space-y-2">
          <h3 className="font-semibold text-gray-900">Payment</h3>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Method</span>
              <span className="font-medium">
                {order.payment.paymentMethod === 'MOBILE_MONEY'
                  ? 'Mobile Money'
                  : 'Cash on Delivery'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-medium ${order.payment.paymentStatus === 'PAID' ? 'text-success-600' : 'text-amber-600'}`}
              >
                {order.payment.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        <Link to="/customer/orders">
          <Button fullWidth variant="outline">
            View My Orders
          </Button>
        </Link>
        <Link to="/customer/dashboard">
          <Button fullWidth>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
