import { useQuery } from '@tanstack/react-query';
import * as mapsService from '../services/maps.service';

export function useGeocode(query: string) {
  return useQuery({
    queryKey: ['geocode', query],
    queryFn: () => mapsService.geocode(query),
    enabled: query.length >= 3,
  });
}

export function useReverseGeocode(lat: number | null, lng: number | null) {
  return useQuery({
    queryKey: ['reverseGeocode', lat, lng],
    queryFn: () => mapsService.reverseGeocode(lat!, lng!),
    enabled: lat !== null && lng !== null,
  });
}

export function useDistance(origin: string | null, destination: string | null) {
  return useQuery({
    queryKey: ['distance', origin, destination],
    queryFn: () => mapsService.getDistance(origin!, destination!),
    enabled: !!origin && !!destination,
  });
}

export function useDirections(origin: string | null, destination: string | null) {
  return useQuery({
    queryKey: ['directions', origin, destination],
    queryFn: () => mapsService.getDirections(origin!, destination!),
    enabled: !!origin && !!destination,
  });
}
