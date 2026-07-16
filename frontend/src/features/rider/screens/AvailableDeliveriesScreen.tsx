import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useAvailableOrders, useAcceptOrder } from '../../../hooks/useRider';

export function AvailableDeliveriesScreen() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useAvailableOrders();
  const acceptMutation = useAcceptOrder();

  const handleAccept = async (orderId: string) => {
    try {
      await acceptMutation.mutateAsync(orderId);
      navigate('/rider/active');
    } catch {
      /* handled by mutation */
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load available deliveries.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-12">
      <button
        onClick={() => navigate('/rider/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Available Deliveries</h1>

      {(!orders || orders.length === 0) && (
        <EmptyState
          title="No deliveries available"
          message="Check back later for new orders"
          icon="📭"
        />
      )}

      <div className="space-y-3" role="list" aria-label="Available deliveries">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border border-gray-100 p-4"
            role="listitem"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                <p className="text-xs text-gray-500">{order.vendorName}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Ready for pickup
              </span>
            </div>

            <div className="space-y-1 text-sm mb-3">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-700">
                  {item.cylinderSize}kg {item.description || ''} x{item.quantity}
                </p>
              ))}
            </div>

            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Delivery to</span>
              <span className="text-gray-700 font-medium">{order.deliveryAddress.addressLine}</span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-500">Total</span>
              <span className="font-semibold text-gray-900">GHS {order.total.toFixed(2)}</span>
            </div>

            <Button
              fullWidth
              onClick={() => handleAccept(order.id)}
              isLoading={acceptMutation.isPending}
            >
              Accept Delivery
            </Button>
            {acceptMutation.error && (
              <div className="mt-2 p-2 bg-error-50 text-error-700 rounded-lg text-xs" role="alert">
                {(acceptMutation.error as any)?.message || 'Failed to accept'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
