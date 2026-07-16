import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useVendorOrders } from '../../../hooks/useVendor';

const ORDER_STATUSES = [
  'ALL',
  'PENDING',
  'VENDOR_ACCEPTED',
  'PREPARING',
  'READY_FOR_PICKUP',
  'DELIVERED',
  'CANCELLED',
] as const;

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700',
  VENDOR_ACCEPTED: 'bg-blue-100 text-blue-700',
  PREPARING: 'bg-indigo-100 text-indigo-700',
  READY_FOR_PICKUP: 'bg-purple-100 text-purple-700',
  RIDER_ASSIGNED: 'bg-cyan-100 text-cyan-700',
  PICKED_UP: 'bg-info-100 text-info-800',
  ON_THE_WAY: 'bg-secondary-100 text-secondary-700',
  DELIVERED: 'bg-success-100 text-success-700',
  CANCELLED: 'bg-error-100 text-error-700',
};

export function VendorOrdersScreen() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [page, setPage] = useState(1);
  const limit = 10;

  const params = statusFilter === 'ALL' ? { page, limit } : { page, limit, status: statusFilter };
  const { data, isLoading, error } = useVendorOrders(params);

  return (
    <div className="px-4 pt-6 pb-12">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Orders</h1>

      <div
        className="flex gap-2 overflow-x-auto pb-2 mb-4"
        role="tablist"
        aria-label="Order status filter"
      >
        {ORDER_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
              statusFilter === status
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            role="tab"
            aria-selected={statusFilter === status}
          >
            {status === 'ALL' ? 'All' : status.replace(/_/g, ' ')}
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
              ? "You haven't received any orders yet"
              : `No orders with status "${statusFilter.replace(/_/g, ' ')}"`
          }
          icon="📋"
        />
      )}

      {data && data.orders.length > 0 && (
        <div className="space-y-3" role="list" aria-label="Orders">
          {data.orders.map((order) => (
            <button
              key={order.id}
              onClick={() => navigate(`/vendor/orders/${order.id}`)}
              className="w-full text-left bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
              role="listitem"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.customerName}</p>
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
            </button>
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
