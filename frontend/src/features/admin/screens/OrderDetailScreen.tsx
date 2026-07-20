import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { useAdminOrder, useCancelAdminOrder } from '../../../hooks/useAdmin';

export function AdminOrderDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useAdminOrder(id);
  const cancelOrder = useCancelAdminOrder();

  if (isLoading)
    return (
      <div className="p-6">
        <LoadingSkeleton count={1} type="detail" />
      </div>
    );

  if (error || !order)
    return (
      <div className="p-6">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Order not found.
        </div>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </Button>
      </div>
    );

  const canCancel = !['DELIVERED', 'CANCELLED'].includes(order.status);

  return (
    <div className="p-6 pb-12">
      <button
        onClick={() => navigate('/admin/orders')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Orders
      </button>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Created{' '}
            {new Date(order.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-900 mb-2">Customer</h2>
          <p className="text-sm text-gray-700">{order.customer.name}</p>
          <p className="text-sm text-gray-500">{order.customer.phone}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-900 mb-2">Vendor</h2>
          <p className="text-sm text-gray-700">{order.vendor.businessName}</p>
          <p className="text-sm text-gray-500">{order.vendor.phone}</p>
          <p className="text-sm text-gray-500">{order.vendor.address}</p>
        </div>
      </div>

      {order.rider && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Rider</h2>
          <p className="text-sm text-gray-700">{order.rider.name}</p>
          <p className="text-sm text-gray-500">{order.rider.phone}</p>
          {order.rider.vehicleType && (
            <p className="text-sm text-gray-500">{order.rider.vehicleType}</p>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Items</h2>
        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.cylinderSize}kg {item.description || ''} x{item.quantity}
              </span>
              <span className="text-gray-900 font-medium">GHS {item.subtotal.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee</span>
            <span>GHS {order.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>GHS {order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {order.delivery && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
          <h2 className="font-semibold text-gray-900 mb-2">Delivery Timeline</h2>
          <div className="space-y-1 text-sm text-gray-600">
            {order.delivery.pickupTime && (
              <p>Picked up: {new Date(order.delivery.pickupTime).toLocaleString()}</p>
            )}
            {order.delivery.departureTime && (
              <p>Departed: {new Date(order.delivery.departureTime).toLocaleString()}</p>
            )}
            {order.delivery.arrivalTime && (
              <p>Arrived: {new Date(order.delivery.arrivalTime).toLocaleString()}</p>
            )}
            {order.delivery.completionTime && (
              <p>Delivered: {new Date(order.delivery.completionTime).toLocaleString()}</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Status History</h2>
        <div className="space-y-2">
          {order.statusHistory.map((h) => (
            <div key={h.id} className="flex gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-primary-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900">{h.status}</p>
                {h.note && <p className="text-xs text-gray-500">{h.note}</p>}
                <p className="text-xs text-gray-400">{new Date(h.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {canCancel && (
        <Button
          fullWidth
          variant="outline"
          className="text-red-600 border-red-300 hover:bg-red-50"
          isLoading={cancelOrder.isPending}
          onClick={() => cancelOrder.mutate(order.id)}
        >
          Cancel Order
        </Button>
      )}
    </div>
  );
}

function statusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-gray-100 text-gray-600',
    VENDOR_ACCEPTED: 'bg-blue-100 text-blue-700',
    PREPARING: 'bg-yellow-100 text-yellow-700',
    READY_FOR_PICKUP: 'bg-indigo-100 text-indigo-700',
    RIDER_ASSIGNED: 'bg-cyan-100 text-cyan-700',
    PICKED_UP: 'bg-teal-100 text-teal-700',
    ON_THE_WAY: 'bg-purple-100 text-purple-700',
    DELIVERED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-600';
}
