import { describe, it, expect, beforeEach } from 'vitest';
import { isCircuitOpen, recordSuccess, recordFailure, getServiceStatus } from './circuit-breaker';

describe('CircuitBreaker', () => {
  beforeEach(() => {
    for (let i = 0; i < 5; i++) {
      recordSuccess('test-service');
    }
  });

  it('starts closed and allows requests', () => {
    expect(isCircuitOpen('fresh-service')).toBe(false);
  });

  it('opens after threshold failures', () => {
    const serviceName = 'failing-service';
    for (let i = 0; i < 5; i++) {
      recordFailure(serviceName);
    }
    expect(isCircuitOpen(serviceName)).toBe(true);
  });

  it('returns healthy status for closed circuit', () => {
    expect(getServiceStatus('healthy-service')).toEqual({
      name: 'healthy-service',
      status: 'healthy',
    });
  });

  it('returns unhealthy status for open circuit', () => {
    for (let i = 0; i < 5; i++) {
      recordFailure('unhealthy-svc');
    }
    expect(getServiceStatus('unhealthy-svc')).toEqual({
      name: 'unhealthy-svc',
      status: 'unhealthy',
    });
  });

  it('resets to closed after success', () => {
    const serviceName = 'reset-service';
    for (let i = 0; i < 5; i++) {
      recordFailure(serviceName);
    }
    expect(isCircuitOpen(serviceName)).toBe(true);

    recordSuccess(serviceName);
    expect(isCircuitOpen(serviceName)).toBe(false);
  });
});
