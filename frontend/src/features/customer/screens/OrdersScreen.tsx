import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useOrders } from '../../../hooks/useOrder';

const ORDER_STATUSES = [
  { label: 'All', value: 'ALL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Processing', value: 'VENDOR_ACCEPTED,PREPARING,READY_FOR_PICKUP' },
  { label: 'Out for Delivery', value: 'RIDER_ASSIGNED,PICKED_UP,ON_THE_WAY' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  VENDOR_ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-indigo-100 text-indigo-700',
  READY_FOR_PICKUP: 'bg-purple-100 text-purple-700',
  RIDER_ASSIGNED: 'bg-sky-100 text-sky-700',
  PICKED_UP: 'bg-teal-100 text-teal-700',
  ON_THE_WAY: 'bg-cyan-100 text-cyan-700',
  DELIVERED: 'bg-success-100 text-success-700',
  CANCELLED: 'bg-error-100 text-error-700',
};

export function OrdersScreen() {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const limit = 10;

  const statusParam = statusFilter === 'ALL' ? undefined : statusFilter;
  const params = { page, limit, ...(statusParam ? { status: statusParam } : {}) };
  const { data, isLoading, error } = useOrders(params);

  return (
    <div className="px-4 pt-6 pb-12">
      <h1 className="text-xl font-bold text-gray-900 mb-4">My Orders</h1>

      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-4"
        role="tablist"
        aria-label="Order status filter"
      >
        {ORDER_STATUSES.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatusFilter(tab.value);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
              statusFilter === tab.value
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            role="tab"
            aria-selected={statusFilter === tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSkeleton count={3} />}

      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load orders. Please try again.
        </div>
      )}

      {data && data.orders.length === 0 && (
        <EmptyState
          title="No orders found"
          message={
            statusFilter === 'ALL'
              ? "You haven't placed any orders yet"
              : `No orders with status "${ORDER_STATUSES.find((t) => t.value === statusFilter)?.label || statusFilter}"`
          }
          icon="📦"
        />
      )}

      {data && data.orders.length > 0 && (
        <div className="space-y-3" role="list" aria-label="Orders">
          {data.orders.map((order) => (
            <Link
              key={order.id}
              to={`/customer/orders/${order.id}/confirmation`}
              className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
              role="listitem"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.vendor.businessName}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}
                >
                  {order.status.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </span>
                <span className="font-semibold text-gray-900">GHS {order.total.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(order.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </Link>
          ))}
        </div>
      )}

      {data && data.pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm text-gray-500 px-2">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= data.pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
