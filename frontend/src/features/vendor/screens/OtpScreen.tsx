import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, OtpInput } from '../../../components/ui';
import { useAuth } from '../../../contexts/AuthContext';

export function VendorOtpScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp, sendOtp } = useAuth();
  const phone = (location.state as any)?.phone || '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    setError('');
    setIsLoading(true);
    try {
      await verifyOtp(phone, code, 'VERIFICATION');
      navigate('/vendor/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setTimeLeft(60);
    try {
      await sendOtp(phone, 'VERIFICATION');
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Verify Your Business</h1>
        <p className="text-gray-600 mt-1">Enter the code sent to {phone}</p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto w-full">
        {error && <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">{error}</div>}
        <OtpInput value={code} onChange={setCode} error={error} />
        <Button fullWidth isLoading={isLoading} disabled={code.length !== 6} onClick={handleVerify}>
          Verify
        </Button>
        {timeLeft > 0 ? (
          <p className="text-center text-sm text-gray-500">Resend code in {timeLeft}s</p>
        ) : (
          <button
            onClick={handleResend}
            className="w-full text-center text-sm text-primary-500 hover:underline font-medium"
          >
            Resend code
          </button>
        )}
      </div>
    </div>
  );
}
