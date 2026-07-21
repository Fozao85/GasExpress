import { useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { useInitiatePayment, useVerifyPayment } from '../../../hooks/usePayment';
import { useOrder } from '../../../hooks/useOrder';

const PROVIDERS = [
  {
    value: 'MOBILE_MONEY',
    label: 'Mobile Money',
    description: 'MTN MoMo, Vodafone Cash, AirtelTigo',
  },
  { value: 'MTN_MOMO', label: 'MTN MoMo', description: 'Pay with MTN Mobile Money' },
  { value: 'ORANGE_MONEY', label: 'Orange Money', description: 'Pay with Orange Money' },
] as const;

export function MobileMoneyPaymentScreen() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { data: order } = useOrder(orderId);
  const initiatePayment = useInitiatePayment();
  const verifyPayment = useVerifyPayment();

  const [provider, setProvider] = useState<string>('MOBILE_MONEY');
  const [phone, setPhone] = useState('');
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    initiatePayment.mutate(
      { orderId, provider: provider as any, phoneNumber: phone || undefined },
      {
        onSuccess: (result) => {
          setPaymentResult(result);
          setTimeout(async () => {
            try {
              await verifyPayment.mutateAsync({ transactionReference: result.reference });
              navigate(`/customer/payment/success?orderId=${orderId}`, { replace: true });
            } catch {
              navigate(`/customer/payment/failed?orderId=${orderId}`, { replace: true });
            }
          }, 2000);
        },
      }
    );
  };

  if (!order) return null;

  if (paymentResult) {
    return (
      <div className="px-4 pt-6 pb-12 text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⏳</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h1>
        <p className="text-sm text-gray-500 mb-2">{paymentResult.message}</p>
        <p className="text-xs text-gray-400">Reference: {paymentResult.reference}</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-12">
      <h1 className="text-xl font-bold text-gray-900 mb-6">Mobile Money Payment</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
        <p className="text-sm text-gray-500 mb-1">Order</p>
        <p className="font-semibold text-gray-900">{order.orderNumber}</p>
        <p className="text-sm text-gray-500 mt-2 mb-1">Amount</p>
        <p className="text-2xl font-bold text-primary-600">GHS {order.total.toFixed(2)}</p>
      </div>

      <form onSubmit={handleSubmit} data-testid="payment-form">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Provider</label>
          <div className="space-y-2">
            {PROVIDERS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setProvider(p.value)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                  provider === p.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      provider === p.value ? 'border-primary-500' : 'border-gray-300'
                    }`}
                  >
                    {provider === p.value && (
                      <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{p.label}</p>
                    <p className="text-xs text-gray-500">{p.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="e.g. +233501234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter the phone number linked to your mobile money account
          </p>
        </div>

        {initiatePayment.error && (
          <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
            {(initiatePayment.error as any)?.response?.data?.message ||
              'Payment failed. Please try again.'}
          </div>
        )}

        <Button type="submit" fullWidth size="lg" isLoading={initiatePayment.isPending}>
          Pay GHS {order.total.toFixed(2)}
        </Button>
      </form>
    </div>
  );
}
