import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { AddressCard, PaymentCard, OrderSummary } from '../../../components/order';
import { useCart, useAddresses, useCreateOrder, useCreateAddress } from '../../../hooks/useOrder';

export function CheckoutScreen() {
  const navigate = useNavigate();
  const { data: cart, isLoading: cartLoading, error: cartError } = useCart();
  const { data: addresses, isLoading: addrLoading } = useAddresses();
  const createOrder = useCreateOrder();
  const createAddress = useCreateAddress();

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MOBILE_MONEY'>('CASH');
  const [notes, setNotes] = useState('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    addressLine: '',
    city: '',
    region: '',
  });

  if (cartLoading || addrLoading) return <LoadingSkeleton count={3} />;
  if (cartError) {
    return (
      <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
        Failed to load cart. Please try again.
      </div>
    );
  }
  if (!cart || cart.items.length === 0) {
    navigate('/customer/cart', { replace: true });
    return null;
  }

  const subtotal = cart.subtotal;
  const deliveryFee = subtotal >= 200 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const hasAddresses = addresses && addresses.length > 0;
  const effectiveAddress = hasAddresses ? selectedAddressId || addresses![0].id : null;

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!effectiveAddress) return;
    createOrder.mutate(
      { addressId: effectiveAddress, paymentMethod, notes: notes.trim() || undefined },
      {
        onSuccess: (order) => {
          navigate(`/customer/orders/${order.id}/confirmation`, { replace: true });
        },
      }
    );
  };

  return (
    <div className="px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Delivery Address</h2>
          {hasAddresses && (
            <div className="space-y-2 mb-3">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  selected={effectiveAddress === addr.id}
                  onSelect={() => {
                    setSelectedAddressId(addr.id);
                    setShowNewAddress(false);
                  }}
                />
              ))}
            </div>
          )}
          {showNewAddress ? (
            <div className="space-y-2 bg-white rounded-xl border border-gray-100 p-4">
              <Input
                label="Label (e.g. Home, Work)"
                value={newAddress.label}
                onChange={(e) => setNewAddress((p) => ({ ...p, label: e.target.value }))}
              />
              <Input
                label="Address Line"
                required
                value={newAddress.addressLine}
                onChange={(e) => setNewAddress((p) => ({ ...p, addressLine: e.target.value }))}
              />
              <div className="flex gap-2">
                <Input
                  label="City"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress((p) => ({ ...p, city: e.target.value }))}
                  className="flex-1"
                />
                <Input
                  label="Region"
                  value={newAddress.region}
                  onChange={(e) => setNewAddress((p) => ({ ...p, region: e.target.value }))}
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewAddress(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  isLoading={createAddress.isPending}
                  onClick={() => {
                    if (!newAddress.addressLine.trim()) return;
                    createAddress.mutate(
                      {
                        label: newAddress.label.trim() || undefined,
                        addressLine: newAddress.addressLine.trim(),
                        city: newAddress.city.trim() || undefined,
                        region: newAddress.region.trim() || undefined,
                      },
                      {
                        onSuccess: (addr) => {
                          setSelectedAddressId(addr.id);
                          setShowNewAddress(false);
                          setNewAddress({ label: '', addressLine: '', city: '', region: '' });
                        },
                      }
                    );
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={() => setShowNewAddress(true)}>
              + Add New Address
            </Button>
          )}
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Payment Method</h2>
          <div className="space-y-2">
            <PaymentCard
              label="Cash on Delivery"
              description="Pay when your gas is delivered"
              selected={paymentMethod === 'CASH'}
              onSelect={() => setPaymentMethod('CASH')}
            />
            <PaymentCard
              label="Mobile Money"
              description="Pay via MTN Mobile Money or Vodafone Cash"
              selected={paymentMethod === 'MOBILE_MONEY'}
              onSelect={() => setPaymentMethod('MOBILE_MONEY')}
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Order Notes</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions for delivery (optional)"
            rows={3}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
          />
        </section>

        <OrderSummary
          items={cart.items.map((i) => ({
            cylinderSize: i.cylinderSize,
            quantity: i.quantity,
            unitPrice: i.price,
          }))}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />

        {createOrder.error && (
          <div className="mt-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
            {(createOrder.error as any)?.response?.data?.message ||
              'Failed to place order. Please try again.'}
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={createOrder.isPending}
            disabled={!effectiveAddress}
          >
            Place Order — GHS {total.toFixed(2)}
          </Button>
        </div>
      </form>
    </div>
  );
}
