import { api } from './api';

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress: string;
}

export interface ReverseGeocodeResult {
  address: string;
  city?: string;
  region?: string;
  country?: string;
}

export interface DistanceResult {
  distanceKm: number;
  durationMinutes: number;
}

export interface DirectionsResult {
  distanceKm: number;
  durationMinutes: number;
  polyline: string;
  steps: { instruction: string; distanceKm: number }[];
}

export async function geocode(query: string): Promise<GeocodeResult[]> {
  const { data } = await api.get('/maps/geocode', { params: { q: query } });
  return data.data;
}

export async function reverseGeocode(lat: number, lng: number): Promise<ReverseGeocodeResult> {
  const { data } = await api.get('/maps/reverse-geocode', { params: { lat, lng } });
  return data.data;
}

export async function getDistance(origin: string, destination: string): Promise<DistanceResult> {
  const { data } = await api.get('/maps/distance', { params: { origin, destination } });
  return data.data;
}

export async function getDirections(
  origin: string,
  destination: string
): Promise<DirectionsResult> {
  const { data } = await api.get('/maps/directions', { params: { origin, destination } });
  return data.data;
}
