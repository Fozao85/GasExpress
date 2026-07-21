import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useGeolocation } from './useGeolocation';

describe('useGeolocation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: vi.fn(),
      },
      writable: true,
      configurable: true,
    });
  });

  it('returns loading state initially', () => {
    (navigator.geolocation.getCurrentPosition as any).mockImplementation(() => {});

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets coordinates on success', () => {
    const mockPosition = {
      coords: { latitude: 5.6037, longitude: -0.187 },
    };
    (navigator.geolocation.getCurrentPosition as any).mockImplementation((success: any) =>
      success(mockPosition)
    );

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.latitude).toBe(5.6037);
    expect(result.current.longitude).toBe(-0.187);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error on failure', () => {
    const mockError = { message: 'User denied geolocation' };
    (navigator.geolocation.getCurrentPosition as any).mockImplementation((_: any, error: any) =>
      error(mockError)
    );

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.latitude).toBeNull();
    expect(result.current.longitude).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('User denied geolocation');
  });

  it('handles missing geolocation API', () => {
    Object.defineProperty(navigator, 'geolocation', { value: undefined, configurable: true });

    const { result } = renderHook(() => useGeolocation());
    expect(result.current.error).toBe('Geolocation not supported');
    expect(result.current.isLoading).toBe(false);
  });
});
