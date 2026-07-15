import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/customer/welcome', { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary-500">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-2">GasNow</h1>
        <p className="text-primary-100 text-lg">Reliable gas delivery</p>
      </div>
    </div>
  );
}
