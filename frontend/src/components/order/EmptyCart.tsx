import { useNavigate } from 'react-router-dom';
import { Button } from '../ui';

export function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <span className="text-5xl mb-4" role="img" aria-hidden="true">
        🛒
      </span>
      <h3 className="text-lg font-semibold text-gray-900 text-center">Your cart is empty</h3>
      <p className="text-sm text-gray-500 text-center mt-1 max-w-xs">
        Browse nearby vendors to add gas cylinders to your cart
      </p>
      <Button className="mt-6" onClick={() => navigate('/customer/vendors')}>
        Start Browsing
      </Button>
    </div>
  );
}
