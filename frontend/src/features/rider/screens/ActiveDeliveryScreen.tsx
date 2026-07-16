import { useNavigate } from 'react-router-dom';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useMyOrders } from '../../../hooks/useRider';

const STATUS_FLOW: Record<string, { label: string; next: string; color: string }> = {
  RIDER_ASSIGNED: {
    label: 'Mark Picked Up',
    next: 'PICKED_UP',
    color: 'bg-primary-500 text-white hover:bg-primary-600',
  },
  PICKED_UP: {
    label: 'On My Way',
    next: 'ON_THE_WAY',
    color: 'bg-indigo-500 text-white hover:bg-indigo-600',
  },
  ON_THE_WAY: {
    label: 'Mark Delivered',
    next: 'DELIVERED',
    color: 'bg-success-500 text-white hover:bg-success-600',
  },
};

const STATUS_BADGES: Record<string, string> = {
  RIDER_ASSIGNED: 'bg-blue-100 text-blue-700',
  PICKED_UP: 'bg-indigo-100 text-indigo-700',
  ON_THE_WAY: 'bg-secondary-100 text-secondary-700',
  DELIVERED: 'bg-success-100 text-success-700',
};

export function ActiveDeliveryScreen() {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useMyOrders();

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={2} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load active deliveries.
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
      <h1 className="text-xl font-bold text-gray-900 mb-4">Active Deliveries</h1>

      {(!orders || orders.length === 0) && (
        <EmptyState
          title="No active deliveries"
          message="Accept an available delivery to get started"
          icon="🛵"
        />
      )}

      <div className="space-y-3" role="list" aria-label="Active deliveries">
        {orders?.map((order) => {
          const flow = STATUS_FLOW[order.status];
          return (
            <button
              key={order.id}
              onClick={() => navigate(`/rider/orders/${order.id}`)}
              className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
              role="listitem"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.vendorName}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGES[order.status] || 'bg-gray-100 text-gray-600'}`}
                >
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {order.items.reduce((s, i) => s + i.quantity, 0)} item(s)
                </span>
                <span className="font-semibold text-gray-900">GHS {order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{order.deliveryAddress.addressLine}</span>
                {flow && <span className="text-primary-500 font-medium">{flow.label}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
