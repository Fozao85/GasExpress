import { useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../../../hooks/useAdmin';
import { LoadingSkeleton } from '../../../components/discovery';
import { StatsCard } from '../components/StatsCard';

const STAT_CARDS = [
  { key: 'totalCustomers', label: 'Customers', icon: '👤', color: 'bg-blue-50' },
  { key: 'totalVendors', label: 'Vendors', icon: '🏪', color: 'bg-green-50' },
  { key: 'totalRiders', label: 'Riders', icon: '🛵', color: 'bg-amber-50' },
  { key: 'activeVendors', label: 'Active Vendors', icon: '✅', color: 'bg-teal-50' },
  { key: 'onlineRiders', label: 'Online Riders', icon: '📡', color: 'bg-indigo-50' },
  { key: 'totalOrders', label: 'Total Orders', icon: '📦', color: 'bg-purple-50' },
  { key: 'pendingVendorApprovals', label: 'Pending Vendor Apps', icon: '⏳', color: 'bg-red-50' },
  { key: 'pendingRiderApprovals', label: 'Pending Rider Apps', icon: '⏳', color: 'bg-orange-50' },
];

const ORDER_STATS = [
  { key: 'pendingOrders', label: 'Pending', color: 'text-yellow-600' },
  { key: 'preparingOrders', label: 'Preparing', color: 'text-blue-600' },
  { key: 'readyOrders', label: 'Ready', color: 'text-indigo-600' },
  { key: 'inTransitOrders', label: 'In Transit', color: 'text-purple-600' },
  { key: 'completedOrders', label: 'Completed', color: 'text-green-600' },
  { key: 'cancelledOrders', label: 'Cancelled', color: 'text-red-600' },
];

export function AdminDashboardScreen() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useAdminDashboard();

  if (isLoading)
    return (
      <div className="p-6">
        <LoadingSkeleton count={6} type="detail" />
      </div>
    );

  if (error || !data)
    return (
      <div className="p-6">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load dashboard.
        </div>
      </div>
    );

  return (
    <div className="p-6 pb-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {STAT_CARDS.map((card) => (
          <StatsCard
            key={card.key}
            label={card.label}
            value={(data as any)[card.key]}
            icon={card.icon}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Revenue Today</p>
          <p className="text-xl font-bold text-gray-900">GHS {data.revenueToday.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Revenue This Week</p>
          <p className="text-xl font-bold text-gray-900">GHS {data.revenueThisWeek.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-sm text-gray-500 mb-1">Revenue This Month</p>
          <p className="text-xl font-bold text-gray-900">GHS {data.revenueThisMonth.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Order Status Distribution</h2>
          <div className="space-y-2">
            {ORDER_STATS.map((s) => (
              <div key={s.key} className="flex justify-between text-sm">
                <span className={s.color}>{s.label}</span>
                <span className="font-semibold">{(data as any)[s.key]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h2 className="font-semibold text-gray-900 mb-3">Ratings</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Vendor Rating</span>
              <span className="font-semibold">{data.averageVendorRating.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Avg Rider Rating</span>
              <span className="font-semibold">{data.averageRiderRating.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Low Inventory Vendors</span>
              <span className="font-semibold text-red-600">{data.lowInventoryVendors}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <NavCard label="Users" path="/admin/users" stats={`${data.totalCustomers} customers`} />
        <NavCard
          label="Vendors"
          path="/admin/vendors"
          stats={`${data.pendingVendorApprovals} pending`}
        />
        <NavCard
          label="Riders"
          path="/admin/riders"
          stats={`${data.pendingRiderApprovals} pending`}
        />
        <NavCard label="Orders" path="/admin/orders" stats={`${data.totalOrders} total`} />
        <NavCard label="Promotions" path="/admin/promotions" />
        <NavCard label="Settings" path="/admin/settings" />
        <NavCard label="Platform Health" path="/admin/health" stats="Integration status" />
      </div>
    </div>
  );
}

function NavCard({ label, path, stats }: { label: string; path: string; stats?: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(path)}
      className="text-left bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 transition-colors"
    >
      <p className="font-semibold text-gray-900">{label}</p>
      {stats && <p className="text-sm text-gray-500 mt-0.5">{stats}</p>}
      <span className="text-primary-500 text-sm font-medium block mt-1">View &rarr;</span>
    </button>
  );
}
