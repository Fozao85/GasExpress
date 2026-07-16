import { Link } from 'react-router-dom';
import {
  useVendorDashboard,
  useVendorProfile,
  useUpdateVendorProfile,
} from '../../../hooks/useVendor';
import { LoadingSkeleton } from '../../../components/discovery';

const STAT_CARDS = [
  { key: 'totalOrders', label: 'Total Orders', icon: '📦', color: 'bg-blue-50 text-blue-600' },
  { key: 'pendingOrders', label: 'Pending', icon: '⏳', color: 'bg-amber-50 text-amber-600' },
  { key: 'activeOrders', label: 'Active', icon: '🔄', color: 'bg-indigo-50 text-indigo-600' },
  {
    key: 'completedOrders',
    label: 'Completed',
    icon: '✅',
    color: 'bg-success-50 text-success-700',
  },
];

const REVENUE_CARDS = [
  { key: 'todayRevenue', label: "Today's Revenue", prefix: 'GHS ' },
  { key: 'totalRevenue', label: 'Total Revenue', prefix: 'GHS ' },
  { key: 'todayOrders', label: "Today's Orders", prefix: '' },
  { key: 'lowStockItems', label: 'Low Stock Items', prefix: '' },
];

export function VendorDashboardScreen() {
  const { data: dashboard, isLoading, error } = useVendorDashboard();
  const { data: profile } = useVendorProfile();
  const toggleMutation = useUpdateVendorProfile();

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

  const { stats, business } = dashboard;

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            {profile?.businessName || 'Dashboard'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{business.verificationStatus}</p>
        </div>
        <button
          onClick={() => toggleMutation.mutate({ isOpen: !business.isOpen })}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            business.isOpen ? 'bg-success-100 text-success-700' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {business.isOpen ? 'Open' : 'Closed'}
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
        {REVENUE_CARDS.map((card) => (
          <div key={card.key} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">
              {card.prefix}
              {card.key === 'todayRevenue' || card.key === 'totalRevenue'
                ? (stats as any)[card.key].toFixed(2)
                : (stats as any)[card.key]}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-gray-900">Rating</h2>
          <span className="text-lg font-bold text-secondary-500">
            {stats.averageRating.toFixed(1)}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          <span className="text-gray-700 font-medium">{profile?.inventory.length || 0}</span>{' '}
          products listed
        </div>
      </div>

      <div className="space-y-3">
        <Link
          to="/vendor/orders"
          className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Incoming Orders</p>
              <p className="text-sm text-gray-500 mt-0.5">{stats.pendingOrders} orders pending</p>
            </div>
            <span className="text-primary-500 text-sm font-medium">View &rarr;</span>
          </div>
        </Link>
        <Link
          to="/vendor/inventory"
          className="block bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Inventory</p>
              <p className="text-sm text-gray-500 mt-0.5">
                {stats.lowStockItems} items low on stock
              </p>
            </div>
            <span className="text-primary-500 text-sm font-medium">Manage &rarr;</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
