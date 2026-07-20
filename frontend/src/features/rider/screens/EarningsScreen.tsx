import { useNavigate } from 'react-router-dom';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useRiderEarnings } from '../../../hooks/useRider';

const PERIODS = [
  { key: 'today', label: 'Today', color: 'bg-primary-50 text-primary-700', icon: '💰' },
  { key: 'week', label: 'This Week', color: 'bg-indigo-50 text-indigo-700', icon: '📊' },
  { key: 'month', label: 'This Month', color: 'bg-amber-50 text-amber-700', icon: '📈' },
  { key: 'allTime', label: 'All Time', color: 'bg-green-50 text-green-700', icon: '🏆' },
];

export function RiderEarningsScreen() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useRiderEarnings();

  return (
    <div className="px-4 pt-6 pb-12">
      <button
        onClick={() => navigate('/rider/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-xl font-bold text-gray-900 mb-4">Earnings</h1>

      {isLoading && <LoadingSkeleton count={4} type="detail" />}

      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load earnings data.
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {PERIODS.map((period) => {
              const p = data.periods[period.key as keyof typeof data.periods];
              return (
                <div key={period.key} className={`${period.color} rounded-xl p-4`}>
                  <div className="text-2xl mb-1">{period.icon}</div>
                  <p className="text-2xl font-bold">GHS {p.earnings.toFixed(2)}</p>
                  <p className="text-sm mt-0.5">{period.label}</p>
                  <p className="text-xs mt-0.5 text-gray-500">{p.deliveries} delivery(ies)</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="font-semibold text-gray-900 mb-3">Recent Deliveries</h2>
            {data.recentDeliveries.length === 0 ? (
              <EmptyState
                title="No deliveries yet"
                message="Complete deliveries to see earnings here"
                icon="📜"
              />
            ) : (
              <div className="space-y-3">
                {data.recentDeliveries.map((d) => (
                  <div
                    key={d.id}
                    className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{d.orderNumber}</p>
                      <p className="text-xs text-gray-500">{d.vendorName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        GHS {d.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(d.completedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
