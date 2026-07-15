import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, OtpInput } from '../../../components/ui';
import { useVerifyOtpMutation, useSendOtpMutation } from '../../../hooks/useAuthMutations';

export function OtpScreen() {
  const location = useLocation();
  const phone = (location.state as any)?.phone || '';
  const otpType: 'VERIFICATION' | 'PASSWORD_RESET' =
    (location.state as any)?.type || 'VERIFICATION';
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  const verifyMutation = useVerifyOtpMutation();
  const sendOtpMutation = useSendOtpMutation();

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    if (code.length !== 6) return;
    verifyMutation.mutate({ phone, code, type: otpType });
  };

  const handleResend = () => {
    setTimeLeft(60);
    sendOtpMutation.mutate({ phone, type: otpType });
  };

  const error = verifyMutation.error || sendOtpMutation.error;

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Verify OTP</h1>
        <p className="text-gray-600 mt-1">Enter the code sent to {phone}</p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto w-full">
        {error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            {(error as any)?.response?.data?.message || 'Invalid code'}
          </div>
        )}

        <OtpInput value={code} onChange={setCode} error={undefined} />

        <Button
          fullWidth
          isLoading={verifyMutation.isPending}
          disabled={code.length !== 6}
          onClick={handleVerify}
        >
          Verify
        </Button>

        <div className="text-center">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-500">Resend code in {timeLeft}s</p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-primary-500 hover:underline font-medium"
              disabled={sendOtpMutation.isPending}
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
