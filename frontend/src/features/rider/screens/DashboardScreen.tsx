import { Link } from 'react-router-dom';
import { useRiderDashboard, useUpdateAvailability } from '../../../hooks/useRider';
import { LoadingSkeleton } from '../../../components/discovery';

const STAT_CARDS = [
  { key: 'activeDeliveries', label: 'Active', icon: '🛵', color: 'bg-blue-50 text-blue-600' },
  { key: 'todayDeliveries', label: "Today's", icon: '✅', color: 'bg-success-50 text-success-700' },
  { key: 'availableOrders', label: 'Available', icon: '📋', color: 'bg-amber-50 text-amber-600' },
  {
    key: 'totalDeliveries',
    label: 'Total Done',
    icon: '🏆',
    color: 'bg-indigo-50 text-indigo-600',
  },
];

export function RiderDashboardScreen() {
  const { data: dashboard, isLoading, error } = useRiderDashboard();
  const toggleMutation = useUpdateAvailability();

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={3} type="detail" />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load dashboard data.
        </div>
      </div>
    );
  }

  const { stats } = dashboard;
  const isOnline = stats.availability === 'ONLINE';

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Rider Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{stats.totalDeliveries} total deliveries</p>
        </div>
        <button
          onClick={() => toggleMutation.mutate({ availability: isOnline ? 'OFFLINE' : 'ONLINE' })}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            isOnline ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {isOnline ? 'Online' : 'Offline'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className={`${card.color} rounded-xl p-4`}>
            <div className="text-2xl mb-1">{card.icon}</div>
            <p className="text-2xl font-bold">{(stats as any)[card.key]}</p>
            <p className="text-sm mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Today's Earnings</p>
          <p className="text-xl font-bold text-gray-900">GHS {stats.todayEarnings.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
          <p className="text-xl font-bold text-gray-900">GHS {stats.totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Rating</h2>
          <span className="text-lg font-bold text-secondary-500">
            {stats.averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to="/rider/available"
          className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Available Deliveries</p>
              <p className="text-sm text-gray-500 mt-0.5">{stats.availableOrders} orders ready</p>
            </div>
            <span className="text-primary-500 text-sm font-medium">View &rarr;</span>
          </div>
        </Link>
        <Link
          to="/rider/active"
          className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Active Deliveries</p>
              <p className="text-sm text-gray-500 mt-0.5">{stats.activeDeliveries} in progress</p>
            </div>
            <span className="text-primary-500 text-sm font-medium">View &rarr;</span>
          </div>
        </Link>
        <Link
          to="/rider/history"
          className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Delivery History</p>
              <p className="text-sm text-gray-500 mt-0.5">{stats.totalDeliveries} completed</p>
            </div>
            <span className="text-primary-500 text-sm font-medium">View &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
