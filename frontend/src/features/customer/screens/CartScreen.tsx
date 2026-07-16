import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { CartItem, PriceSummary, EmptyCart, PromoInput } from '../../../components/order';
import {
  useCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from '../../../hooks/useOrder';

export function CartScreen() {
  const navigate = useNavigate();
  const { data: cart, isLoading, error } = useCart();
  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();
  const clearMutation = useClearCart();

  if (isLoading) return <LoadingSkeleton count={3} />;
  if (error) {
    return (
      <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
        Failed to load cart. Please try again.
      </div>
    );
  }
  if (!cart || cart.items.length === 0) return <EmptyCart />;

  const subtotal = cart.subtotal;
  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const total = subtotal + deliveryFee;

  return (
    <div className="px-4 pt-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">My Cart</h1>
        <button
          onClick={() => {
            if (window.confirm('Clear all items?')) clearMutation.mutate();
          }}
          className="text-sm text-error-500 font-medium hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-primary-500" />
          <span className="font-medium text-gray-700">{cart.vendorName}</span>
        </div>
        <div className="space-y-3" role="list" aria-label="Cart items">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(itemId, qty) => updateMutation.mutate({ itemId, quantity: qty })}
              onRemove={(itemId) => removeMutation.mutate(itemId)}
            />
          ))}
        </div>
      </div>

      <PriceSummary subtotal={subtotal} deliveryFee={deliveryFee} total={total} />

      <div className="mt-4">
        <PromoInput />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <Button fullWidth size="lg" onClick={() => navigate('/customer/checkout')}>
          Proceed to Checkout — GHS {total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
}
