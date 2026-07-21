import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../../../components/ui';

export function PaymentSuccessScreen() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="px-4 pt-12 pb-12 text-center">
      <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">✅</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p className="text-gray-500 mb-8">
        Your payment has been processed successfully. Your order is being prepared.
      </p>
      <div className="space-y-3">
        {orderId && (
          <Link to={`/customer/orders/${orderId}/confirmation`}>
            <Button fullWidth variant="outline">
              View Order Details
            </Button>
          </Link>
        )}
        <Link to="/customer/orders">
          <Button fullWidth variant="outline">
            My Orders
          </Button>
        </Link>
        <Link to="/customer/dashboard">
          <Button fullWidth>Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
}
