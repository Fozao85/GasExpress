import { useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useDirections } from '../../hooks/useMaps';

interface RiderNavigationProps {
  pickupLat: number;
  pickupLng: number;
  dropoffLat: number;
  dropoffLng: number;
  pickupAddress: string;
  dropoffAddress: string;
}

export function RiderNavigation({
  pickupLat,
  pickupLng,
  dropoffLat,
  dropoffLng,
  pickupAddress,
  dropoffAddress,
}: RiderNavigationProps) {
  const { latitude, longitude } = useGeolocation();
  const [showDirections, setShowDirections] = useState(false);

  const userLoc = latitude && longitude ? `${latitude},${longitude}` : null;
  const vendorLoc = `${pickupLat},${pickupLng}`;
  const customerLoc = `${dropoffLat},${dropoffLng}`;

  const { data: toPickup } = useDirections(userLoc, vendorLoc);
  const { data: toDropoff } = useDirections(vendorLoc, customerLoc);

  return (
    <div className="space-y-3">
      {/* Static map overview */}
      <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl">🗺️</span>
          <p className="text-sm text-gray-600 mt-1">Route overview</p>
        </div>
      </div>

      {/* Pickup (Vendor) */}
      <div className="bg-white rounded-xl border border-gray-100 p-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-primary-600">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400 uppercase">Pickup</p>
            <p className="text-sm text-gray-800 truncate">{pickupAddress}</p>
            {toPickup && (
              <p className="text-xs text-primary-600 mt-1">
                {toPickup.distanceKm.toFixed(1)} km · {Math.round(toPickup.durationMinutes)} min
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Dropoff (Customer) */}
      <div className="bg-white rounded-xl border border-gray-100 p-3">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-secondary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs font-bold text-secondary-600">B</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-400 uppercase">Dropoff</p>
            <p className="text-sm text-gray-800 truncate">{dropoffAddress}</p>
            {toDropoff && (
              <p className="text-xs text-secondary-600 mt-1">
                {toDropoff.distanceKm.toFixed(1)} km · {Math.round(toDropoff.durationMinutes)} min
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Directions Toggle */}
      <button
        onClick={() => setShowDirections((p) => !p)}
        className="w-full text-sm text-primary-600 font-medium hover:underline focus:outline-none"
      >
        {showDirections ? 'Hide Directions' : 'Show Turn-by-Turn Directions'}
      </button>

      {showDirections && toPickup && (
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">To Pickup (A)</h4>
          <ol className="space-y-2">
            {toPickup.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-gray-400 font-mono w-5 flex-shrink-0">{i + 1}.</span>
                <div>
                  <p className="text-gray-700">{step.instruction}</p>
                  {step.distanceKm > 0 && (
                    <p className="text-xs text-gray-400">{step.distanceKm.toFixed(2)} km</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {showDirections && toDropoff && (
        <div className="bg-white rounded-xl border border-gray-100 p-3">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">To Dropoff (B)</h4>
          <ol className="space-y-2">
            {toDropoff.steps.map((step, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="text-gray-400 font-mono w-5 flex-shrink-0">{i + 1}.</span>
                <div>
                  <p className="text-gray-700">{step.instruction}</p>
                  {step.distanceKm > 0 && (
                    <p className="text-xs text-gray-400">{step.distanceKm.toFixed(2)} km</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* ETA Summary */}
      {toPickup && toDropoff && (
        <div className="bg-primary-50 rounded-xl p-3 text-center">
          <p className="text-sm text-primary-700">
            Total: {(toPickup.distanceKm + toDropoff.distanceKm).toFixed(1)} km · ~
            {Math.round(toPickup.durationMinutes + toDropoff.durationMinutes)} min
          </p>
        </div>
      )}
    </div>
  );
}
