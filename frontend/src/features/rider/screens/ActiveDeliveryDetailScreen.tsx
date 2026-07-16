import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { useRiderOrder, useUpdateDeliveryStatus } from '../../../hooks/useRider';

const STATUS_FLOW: Record<string, { next: string; label: string; color: string }> = {
  RIDER_ASSIGNED: {
    next: 'PICKED_UP',
    label: 'Mark Picked Up',
    color: 'bg-primary-500 text-white hover:bg-primary-600',
  },
  PICKED_UP: {
    next: 'ON_THE_WAY',
    label: 'On My Way',
    color: 'bg-indigo-500 text-white hover:bg-indigo-600',
  },
  ON_THE_WAY: {
    next: 'DELIVERED',
    label: 'Mark Delivered',
    color: 'bg-success-500 text-white hover:bg-success-600',
  },
};

const STATUS_BADGES: Record<string, string> = {
  RIDER_ASSIGNED: 'bg-blue-100 text-blue-700',
  PICKED_UP: 'bg-indigo-100 text-indigo-700',
  ON_THE_WAY: 'bg-secondary-100 text-secondary-700',
  DELIVERED: 'bg-success-100 text-success-700',
};

export function ActiveDeliveryDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useRiderOrder(id);
  const updateStatus = useUpdateDeliveryStatus();

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={1} type="detail" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Order not found.
        </div>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/rider/active')}>
          Back to Active Deliveries
        </Button>
      </div>
    );
  }

  const flow = STATUS_FLOW[order.status];

  return (
    <div className="px-4 pt-6 pb-12">
      <button
        onClick={() => navigate('/rider/active')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Active Deliveries
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {order.customerName} &bull; {order.customerPhone}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_BADGES[order.status] || 'bg-gray-100 text-gray-600'}`}
        >
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Pickup from Vendor</h2>
        <p className="text-sm text-gray-700">{order.vendorName}</p>
        <p className="text-sm text-gray-500 mt-0.5">{order.vendorAddress}</p>
        <p className="text-sm text-gray-500">{order.vendorPhone}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Delivery to Customer</h2>
        <p className="text-sm text-gray-700">{order.deliveryAddress.addressLine}</p>
        {order.deliveryAddress.city && (
          <p className="text-sm text-gray-500 mt-0.5">
            {order.deliveryAddress.city}
            {order.deliveryAddress.region ? `, ${order.deliveryAddress.region}` : ''}
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Items</h2>
        <div className="space-y-1 text-sm">
          {order.items.map((item, idx) => (
            <p key={idx} className="text-gray-700">
              {item.cylinderSize}kg {item.description || ''} x{item.quantity}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>GHS {order.total.toFixed(2)}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {order.paymentMethod || 'N/A'} &bull; {order.paymentStatus}
        </div>
      </div>

      {order.delivery && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Delivery Timeline</h2>
          <div className="space-y-2 text-sm">
            {order.delivery.pickupTime && (
              <div className="flex justify-between">
                <span className="text-gray-500">Picked up</span>
                <span className="text-gray-700">
                  {new Date(order.delivery.pickupTime).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
            {order.delivery.departureTime && (
              <div className="flex justify-between">
                <span className="text-gray-500">Departed</span>
                <span className="text-gray-700">
                  {new Date(order.delivery.departureTime).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
            {order.delivery.arrivalTime && (
              <div className="flex justify-between">
                <span className="text-gray-500">Arrived</span>
                <span className="text-gray-700">
                  {new Date(order.delivery.arrivalTime).toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {flow && (
        <div className="space-y-2">
          <Button
            fullWidth
            className={flow.color}
            isLoading={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: order.id, status: flow.next })}
          >
            {flow.label}
          </Button>
          {updateStatus.error && (
            <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
              {(updateStatus.error as any)?.message || 'Failed to update status'}
            </div>
          )}
          {updateStatus.isSuccess && (
            <div className="p-3 bg-success-50 text-success-700 rounded-lg text-sm" role="alert">
              Status updated! {flow.next === 'DELIVERED' && 'Delivery completed.'}
            </div>
          )}
        </div>
      )}

      {order.statusHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-gray-900 mb-3">Status History</h2>
          <div className="space-y-3">
            {order.statusHistory.map((entry) => (
              <div key={entry.id} className="flex gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {entry.status.replace(/_/g, ' ')}
                  </p>
                  {entry.note && <p className="text-xs text-gray-500">{entry.note}</p>}
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(entry.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
