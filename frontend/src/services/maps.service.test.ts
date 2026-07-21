import { vi, describe, it, expect } from 'vitest';
import { api } from './api';
import { geocode, reverseGeocode, getDistance, getDirections } from './maps.service';

vi.mock('./api', () => ({
  api: {
    get: vi.fn(),
  },
}));

describe('maps.service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('geocode', () => {
    it('calls GET /maps/geocode with query', async () => {
      const mockResult = {
        data: { data: [{ latitude: 5.6, longitude: -0.19, formattedAddress: 'Accra, Ghana' }] },
      };
      (api.get as any).mockResolvedValue(mockResult);

      const result = await geocode('Accra');
      expect(api.get).toHaveBeenCalledWith('/maps/geocode', { params: { q: 'Accra' } });
      expect(result).toEqual(mockResult.data.data);
    });
  });

  describe('reverseGeocode', () => {
    it('calls GET /maps/reverse-geocode with lat/lng', async () => {
      const mockResult = { data: { data: { address: 'Accra, Ghana' } } };
      (api.get as any).mockResolvedValue(mockResult);

      const result = await reverseGeocode(5.6, -0.19);
      expect(api.get).toHaveBeenCalledWith('/maps/reverse-geocode', {
        params: { lat: 5.6, lng: -0.19 },
      });
      expect(result).toEqual(mockResult.data.data);
    });
  });

  describe('getDistance', () => {
    it('calls GET /maps/distance with origin and destination', async () => {
      const mockResult = { data: { data: { distanceKm: 5.2, durationMinutes: 15 } } };
      (api.get as any).mockResolvedValue(mockResult);

      const result = await getDistance('5.6,-0.19', '5.7,-0.18');
      expect(api.get).toHaveBeenCalledWith('/maps/distance', {
        params: { origin: '5.6,-0.19', destination: '5.7,-0.18' },
      });
      expect(result).toEqual(mockResult.data.data);
    });
  });

  describe('getDirections', () => {
    it('calls GET /maps/directions with origin and destination', async () => {
      const mockResult = {
        data: {
          data: {
            distanceKm: 5.2,
            durationMinutes: 15,
            polyline: 'abc',
            steps: [{ instruction: 'Go straight', distanceKm: 5.2 }],
          },
        },
      };
      (api.get as any).mockResolvedValue(mockResult);

      const result = await getDirections('5.6,-0.19', '5.7,-0.18');
      expect(api.get).toHaveBeenCalledWith('/maps/directions', {
        params: { origin: '5.6,-0.19', destination: '5.7,-0.18' },
      });
      expect(result).toEqual(mockResult.data.data);
    });
  });
});
