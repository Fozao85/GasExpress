import { config } from '../../config';
import { recordSuccess, recordFailure } from '../../integrations';
import { isCircuitOpen } from '../../integrations/circuit-breaker';

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface GeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

interface ReverseGeocodeResult {
  address: string;
  city?: string;
  region?: string;
  country?: string;
}

interface DistanceResult {
  distanceKm: number;
  durationMinutes: number;
}

interface DirectionsResult {
  distanceKm: number;
  durationMinutes: number;
  polyline: string;
  steps: { instruction: string; distanceKm: number }[];
}

const MOCK_PLACES: Record<string, GeocodeResult[]> = {
  accra: [
    { latitude: 5.6037, longitude: -0.187, formattedAddress: 'Accra, Ghana' },
    { latitude: 5.63, longitude: -0.17, formattedAddress: 'Accra Central, Ghana' },
  ],
  'accra, ghana': [{ latitude: 5.6037, longitude: -0.187, formattedAddress: 'Accra, Ghana' }],
};

export async function geocode(query: string): Promise<GeocodeResult[]> {
  if (isCircuitOpen('maps_service')) {
    throw new Error('Maps service is unavailable');
  }

  const key = query.toLowerCase().trim();
  if (MOCK_PLACES[key]) {
    recordSuccess('maps_service');
    return MOCK_PLACES[key];
  }

  const words = key.split(',')[0].trim();
  if (MOCK_PLACES[words]) {
    recordSuccess('maps_service');
    return MOCK_PLACES[words];
  }

  if (/^\d/.test(key)) {
    recordSuccess('maps_service');
    return [
      {
        latitude: 5.6 + Math.random() * 0.1,
        longitude: -0.19 + Math.random() * 0.05,
        formattedAddress: query,
      },
    ];
  }

  recordFailure('maps_service');
  return [];
}

export async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  if (isCircuitOpen('maps_service')) {
    throw new Error('Maps service is unavailable');
  }

  const distToAccra = haversineDistance(lat, lng, 5.6037, -0.187);
  if (distToAccra < 50) {
    recordSuccess('maps_service');
    return {
      address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      city: 'Accra',
      region: 'Greater Accra',
      country: 'Ghana',
    };
  }

  recordSuccess('maps_service');
  return {
    address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    city: 'Unknown',
    region: 'Unknown',
    country: 'Ghana',
  };
}

export async function getDistance(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
): Promise<DistanceResult> {
  if (isCircuitOpen('maps_service')) {
    throw new Error('Maps service is unavailable');
  }

  const distanceKm = haversineDistance(originLat, originLng, destLat, destLng);
  const avgSpeedKmh = 30;
  const durationMinutes = Math.ceil((distanceKm / avgSpeedKmh) * 60);

  recordSuccess('maps_service');
  return { distanceKm: Math.round(distanceKm * 100) / 100, durationMinutes };
}

export async function getDirections(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
): Promise<DirectionsResult> {
  if (isCircuitOpen('maps_service')) {
    throw new Error('Maps service is unavailable');
  }

  const distanceKm = haversineDistance(originLat, originLng, destLat, destLng);
  const avgSpeedKmh = 30;
  const durationMinutes = Math.ceil((distanceKm / avgSpeedKmh) * 60);

  const midLat = (originLat + destLat) / 2;
  const midLng = (originLng + destLng) / 2;

  recordSuccess('maps_service');
  return {
    distanceKm: Math.round(distanceKm * 100) / 100,
    durationMinutes,
    polyline: `mock_polyline_${originLat}_${originLng}_${destLat}_${destLng}`,
    steps: [
      { instruction: `Head from start`, distanceKm: Math.round((distanceKm / 2) * 100) / 100 },
      {
        instruction: `Continue to destination`,
        distanceKm: Math.round((distanceKm / 2) * 100) / 100,
      },
    ],
  };
}
