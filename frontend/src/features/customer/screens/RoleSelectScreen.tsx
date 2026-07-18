import { useNavigate } from 'react-router-dom';

const roles = [
  {
    id: 'CUSTOMER' as const,
    title: 'Customer',
    description: 'Order gas for home delivery',
    icon: '🏠',
    route: '/customer/register',
  },
  {
    id: 'VENDOR' as const,
    title: 'Vendor',
    description: 'Register your gas business',
    icon: '🏪',
    route: '/vendor/register',
  },
  {
    id: 'RIDER' as const,
    title: 'Rider',
    description: 'Deliver gas and earn',
    icon: '🛵',
    route: '/rider/register',
  },
];

export function RoleSelectScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Join GasNow</h1>
        <p className="text-gray-600 mt-1">Select how you want to use the platform</p>
      </div>

      <div className="max-w-sm mx-auto w-full space-y-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(role.route)}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all text-left"
          >
            <span className="text-3xl">{role.icon}</span>
            <div>
              <p className="font-semibold text-gray-900">{role.title}</p>
              <p className="text-sm text-gray-500">{role.description}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-600 mt-8">
        Already have an account?{' '}
        <button
          onClick={() => navigate('/customer/login')}
          className="text-primary-500 font-medium hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
