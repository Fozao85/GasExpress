import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { SearchBar, VendorCard, LoadingSkeleton, EmptyState } from '../../../components/discovery';
import { useNearbyVendors, usePromotions } from '../../../hooks/useDiscovery';

const QUICK_ACTIONS = [
  { label: 'Order Gas', icon: '🛢️', path: '/customer/vendors' },
  { label: 'My Orders', icon: '📦', path: '/customer/orders' },
  { label: 'Promotions', icon: '🏷️', path: '/customer/promotions' },
  { label: 'Support', icon: '💬', path: '/customer/support' },
];

export function HomeDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const {
    data: nearbyData,
    isLoading: nearbyLoading,
    error: nearbyError,
  } = useNearbyVendors({
    lat: 6.5244,
    lng: 3.3792,
    limit: 5,
  });

  const { data: promos } = usePromotions();

  const handleSearch = () => {
    if (search.trim()) navigate(`/customer/search?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="pb-8">
      {/* Greeting */}
      <section className="bg-primary-500 text-white px-4 pt-6 pb-8 -mx-4 -mt-4">
        <h1 className="text-xl font-bold">Hello, {user?.fullName?.split(' ')[0] || 'there'}!</h1>
        <p className="text-primary-100 text-sm mt-1">Find your nearest gas vendor</p>

        <div className="mt-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            onSubmit={handleSearch}
            placeholder="Search vendors..."
          />
        </div>
      </section>

      {/* Promotional Banner */}
      {promos && promos.length > 0 && (
        <section className="mt-4 -mx-4 px-4">
          <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl p-4 text-white">
            <p className="text-sm font-medium opacity-90">Special Offer</p>
            <p className="text-lg font-bold mt-1">{promos[0].title}</p>
            <p className="text-sm mt-1 opacity-90">
              {promos[0].discountType === 'PERCENTAGE'
                ? `${promos[0].value}% off`
                : `GHS ${promos[0].value} off`}
            </p>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="mt-6">
        <div className="grid grid-cols-4 gap-3">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label={action.label}
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Nearby Vendors */}
      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">Nearby Vendors</h2>
          <button
            onClick={() => navigate('/customer/vendors')}
            className="text-sm text-primary-500 font-medium hover:underline"
          >
            See All
          </button>
        </div>

        {nearbyLoading && <LoadingSkeleton count={3} />}

        {nearbyError && (
          <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
            Failed to load vendors. Please try again.
          </div>
        )}

        {nearbyData && nearbyData.vendors.length === 0 && (
          <EmptyState
            title="No vendors nearby"
            message="Check back later or expand your search area."
            icon="📍"
          />
        )}

        {nearbyData && nearbyData.vendors.length > 0 && (
          <div className="space-y-3">
            {nearbyData.vendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
