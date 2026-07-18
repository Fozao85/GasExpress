import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useOrder';

export function MainLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { data: cart } = useCart();
  const cartCount = cart?.totalItems ?? 0;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-sticky">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (user?.role === 'CUSTOMER') navigate('/customer/dashboard');
                else if (user?.role === 'VENDOR') navigate('/vendor/dashboard');
                else if (user?.role === 'RIDER') navigate('/rider/dashboard');
                else navigate('/');
              }}
              className="text-xl font-bold text-primary-500"
            >
              GasNow
            </button>
          </div>
          <div className="flex items-center gap-4">
            {user?.role === 'CUSTOMER' && (
              <button
                onClick={() => navigate('/customer/cart')}
                className="relative text-gray-500 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg p-1"
                aria-label={`Cart with ${cartCount} items`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            )}
            {(user?.role === 'VENDOR' || user?.role === 'RIDER') && (
              <button
                onClick={() =>
                  navigate(user?.role === 'VENDOR' ? '/vendor/profile' : '/rider/profile')
                }
                className="text-gray-500 hover:text-primary-500 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg p-1"
                aria-label="Profile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-error-600 font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
