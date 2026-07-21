import { describe, it, expect, beforeEach } from 'vitest';
import { geocode, reverseGeocode, getDistance, getDirections } from './maps.service';
import { recordSuccess } from '../../integrations/circuit-breaker';

describe('MapsService', () => {
  beforeEach(() => {
    for (let i = 0; i < 5; i++) recordSuccess('maps_service');
  });

  describe('geocode', () => {
    it('returns results for known places', async () => {
      const results = await geocode('Accra');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].formattedAddress).toContain('Accra');
    });

    it('returns empty array for unknown places', async () => {
      const results = await geocode('xyznonexistent');
      expect(results).toEqual([]);
    });

    it('handles address-like queries', async () => {
      const results = await geocode('123 Main St');
      expect(results.length).toBe(1);
      expect(results[0].latitude).toBeDefined();
    });
  });

  describe('reverseGeocode', () => {
    it('returns Accra for coordinates near Accra', async () => {
      const result = await reverseGeocode(5.6, -0.19);
      expect(result.city).toBe('Accra');
    });

    it('returns Unknown for far coordinates', async () => {
      const result = await reverseGeocode(10.0, 10.0);
      expect(result.city).toBe('Unknown');
    });
  });

  describe('getDistance', () => {
    it('returns distance and duration', async () => {
      const result = await getDistance(5.6, -0.19, 5.63, -0.17);
      expect(result.distanceKm).toBeGreaterThan(0);
      expect(result.durationMinutes).toBeGreaterThan(0);
    });

    it('returns 0 for same coordinates', async () => {
      const result = await getDistance(5.6, -0.19, 5.6, -0.19);
      expect(result.distanceKm).toBe(0);
    });
  });

  describe('getDirections', () => {
    it('returns directions with steps', async () => {
      const result = await getDirections(5.6, -0.19, 5.63, -0.17);
      expect(result.distanceKm).toBeGreaterThan(0);
      expect(result.steps.length).toBeGreaterThan(0);
      expect(result.polyline).toContain('mock_polyline');
    });
  });
});
