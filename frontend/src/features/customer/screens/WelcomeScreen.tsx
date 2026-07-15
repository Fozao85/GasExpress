import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui';

const slides = [
  {
    title: 'Order Gas Online',
    description: 'Browse verified vendors and order cooking gas from the comfort of your home.',
    icon: '🛵',
  },
  {
    title: 'Fast Delivery',
    description: 'Get your gas cylinders delivered to your doorstep within minutes.',
    icon: '⚡',
  },
  {
    title: 'Track in Real-Time',
    description: 'Track your delivery from pickup to drop-off with live updates.',
    icon: '📍',
  },
];

export function WelcomeScreen() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const current = slides[slide];
  const isLast = slide === slides.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
      <div className="text-6xl mb-8">{current.icon}</div>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">{current.title}</h2>
      <p className="text-gray-600 text-center mb-12 max-w-sm">{current.description}</p>

      <div className="flex gap-2 mb-12">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-colors ${i === slide ? 'bg-primary-500 w-6' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <div className="w-full max-w-xs space-y-3">
        {isLast ? (
          <>
            <Button fullWidth onClick={() => navigate('/customer/register')}>
              Create Account
            </Button>
            <Button variant="outline" fullWidth onClick={() => navigate('/customer/login')}>
              I already have an account
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={() => setSlide(slide + 1)}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
