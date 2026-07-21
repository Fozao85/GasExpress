import { useGeolocation } from '../../hooks/useGeolocation';
import { useReverseGeocode, useDistance } from '../../hooks/useMaps';

interface VendorLocationMapProps {
  vendorName: string;
  vendorLat: number;
  vendorLng: number;
  vendorAddress: string;
}

export function VendorLocationMap({
  vendorName,
  vendorLat,
  vendorLng,
  vendorAddress,
}: VendorLocationMapProps) {
  const { latitude, longitude, isLoading: geoLoading } = useGeolocation();

  const userCoords = latitude && longitude ? `${latitude},${longitude}` : null;
  const vendorCoords = `${vendorLat},${vendorLng}`;

  const { data: address } = useReverseGeocode(vendorLat, vendorLng);
  const { data: distance } = useDistance(userCoords, vendorCoords);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Location</h3>

      {/* Static map placeholder */}
      <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-3">
        <div className="text-center">
          <span className="text-3xl">📍</span>
          <p className="text-sm text-gray-600 mt-1">{vendorName}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700">{vendorAddress}</p>

      {address && <p className="text-xs text-gray-500 mt-1">{address.address}</p>}

      {geoLoading && <p className="text-xs text-gray-400 mt-1">Detecting your location…</p>}

      {distance && !geoLoading && (
        <p className="text-sm font-medium text-primary-600 mt-2">
          {distance.distanceKm.toFixed(1)} km · ~{Math.round(distance.durationMinutes)} min away
        </p>
      )}

      {!latitude && !geoLoading && (
        <p className="text-xs text-gray-400 mt-1">Enable location sharing to see distance</p>
      )}
    </div>
  );
}
