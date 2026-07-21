import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';

export function PaymentFailedScreen() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');

  return (
    <div className="px-4 pt-12 pb-12 text-center">
      <div className="w-20 h-20 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">❌</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
      <p className="text-gray-500 mb-8">
        Your payment could not be processed. Please try again or choose a different payment method.
      </p>
      <div className="space-y-3">
        {orderId && (
          <Button fullWidth onClick={() => navigate(`/customer/payment/${orderId}`)}>
            Try Again
          </Button>
        )}
        <Link to="/customer/orders">
          <Button fullWidth variant="outline">
            My Orders
          </Button>
        </Link>
        <Link to="/customer/dashboard">
          <Button fullWidth variant="outline">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
