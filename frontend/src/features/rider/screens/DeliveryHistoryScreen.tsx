import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useDeliveryHistory } from '../../../hooks/useRider';

export function DeliveryHistoryScreen() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useDeliveryHistory({ page, limit });

  return (
    <div className="px-4 pt-6 pb-12">
      <button
        onClick={() => navigate('/rider/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Delivery History</h1>

      {isLoading && <LoadingSkeleton count={3} />}

      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load delivery history.
        </div>
      )}

      {data && data.deliveries.length === 0 && (
        <EmptyState
          title="No deliveries yet"
          message="Complete your first delivery to see it here"
          icon="📜"
        />
      )}

      {data && data.deliveries.length > 0 && (
        <div className="space-y-3" role="list" aria-label="Delivery history">
          {data.deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white rounded-xl border border-gray-100 p-4"
              role="listitem"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{delivery.orderNumber}</p>
                  <p className="text-xs text-gray-500">{delivery.vendorName}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-700">
                  Delivered
                </span>
              </div>

              <div className="text-sm text-gray-500 mb-2">
                {delivery.items.map((item, idx) => (
                  <span key={idx}>
                    {item.cylinderSize}kg{item.description ? ` ${item.description}` : ''} x
                    {item.quantity}
                    {idx < delivery.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-900">GHS {delivery.total.toFixed(2)}</span>
                <span className="text-gray-400 text-xs">
                  {new Date(delivery.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {delivery.pickupTime && delivery.completionTime && (
                <div className="text-xs text-gray-400 mt-1">
                  Duration:{' '}
                  {Math.round(
                    (new Date(delivery.completionTime).getTime() -
                      new Date(delivery.pickupTime).getTime()) /
                      60000
                  )}{' '}
                  mins
                </div>
              )}
            </div>
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
