import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { useVendorOrder, useUpdateOrderStatus } from '../../../hooks/useVendor';

const STATUS_FLOW: Record<string, { next: string[]; label: string; color: string }> = {
  PENDING: {
    next: ['VENDOR_ACCEPTED', 'CANCELLED'],
    label: 'Accept Order',
    color: 'bg-success-500 text-white hover:bg-success-600',
  },
  VENDOR_ACCEPTED: {
    next: ['PREPARING', 'CANCELLED'],
    label: 'Start Preparing',
    color: 'bg-primary-500 text-white hover:bg-primary-600',
  },
  PREPARING: {
    next: ['READY_FOR_PICKUP', 'CANCELLED'],
    label: 'Mark Ready',
    color: 'bg-indigo-500 text-white hover:bg-indigo-600',
  },
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  VENDOR_ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-indigo-100 text-indigo-700',
  READY_FOR_PICKUP: 'bg-purple-100 text-purple-700',
  DELIVERED: 'bg-success-100 text-success-700',
  CANCELLED: 'bg-error-100 text-error-700',
};

export function VendorOrderDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useVendorOrder(id);
  const updateStatus = useUpdateOrderStatus();

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
        <Button variant="outline" className="mt-4" onClick={() => navigate('/vendor/orders')}>
          Back to Orders
        </Button>
      </div>
    );
  }

  const flow = STATUS_FLOW[order.status];

  return (
    <div className="px-4 pt-6 pb-12">
      <button
        onClick={() => navigate('/vendor/orders')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Orders
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {order.customerName} &bull; {order.customerPhone}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}
        >
          {order.status.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Items</h2>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.cylinderSize}kg {item.description ? `- ${item.description}` : ''} x
                {item.quantity}
              </span>
              <span className="font-medium text-gray-900">GHS {item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-3 border-gray-100" />
        <div className="space-y-1 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span>GHS {order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery Fee</span>
            <span>{order.deliveryFee > 0 ? `GHS ${order.deliveryFee.toFixed(2)}` : 'Free'}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>GHS {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Delivery Address</h2>
        <p className="text-sm text-gray-700">{order.address.addressLine}</p>
        {order.address.city && (
          <p className="text-sm text-gray-500 mt-0.5">
            {order.address.city}
            {order.address.region ? `, ${order.address.region}` : ''}
          </p>
        )}
      </div>

      {order.notes && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-sm text-gray-700">{order.notes}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Payment</h2>
        <div className="text-sm text-gray-700">
          <p>
            {order.paymentMethod || 'N/A'} &bull; {order.paymentStatus}
          </p>
        </div>
      </div>

      {flow && (
        <div className="space-y-2">
          {flow.next.map((nextStatus) => (
            <Button
              key={nextStatus}
              fullWidth
              className={
                nextStatus === 'CANCELLED'
                  ? 'bg-error-500 text-white hover:bg-error-600'
                  : flow.color
              }
              isLoading={updateStatus.isPending}
              onClick={() => updateStatus.mutate({ id: order.id, status: nextStatus })}
            >
              {nextStatus === 'CANCELLED' ? 'Cancel Order' : flow.label}
            </Button>
          ))}
          {updateStatus.error && (
            <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
              {(updateStatus.error as any)?.message || 'Failed to update order'}
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
