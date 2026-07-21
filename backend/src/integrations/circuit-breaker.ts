import { logger } from '../common/middleware';

enum CircuitState {
  CLOSED,
  OPEN,
  HALF_OPEN,
}

interface CircuitBreakerOptions {
  failureThreshold: number;
  resetTimeoutMs: number;
  halfOpenMaxRequests: number;
}

interface ServiceState {
  state: CircuitState;
  failureCount: number;
  lastFailureTime: number | null;
  halfOpenRequests: number;
}

const services: Map<string, ServiceState> = new Map();

const defaultOptions: CircuitBreakerOptions = {
  failureThreshold: 5,
  resetTimeoutMs: 30000,
  halfOpenMaxRequests: 3,
};

function getState(serviceName: string): ServiceState {
  if (!services.has(serviceName)) {
    services.set(serviceName, {
      state: CircuitState.CLOSED,
      failureCount: 0,
      lastFailureTime: null,
      halfOpenRequests: 0,
    });
  }
  return services.get(serviceName)!;
}

export function isCircuitOpen(serviceName: string): boolean {
  const state = getState(serviceName);

  if (state.state === CircuitState.OPEN) {
    if (
      state.lastFailureTime &&
      Date.now() - state.lastFailureTime >= defaultOptions.resetTimeoutMs
    ) {
      state.state = CircuitState.HALF_OPEN;
      state.halfOpenRequests = 0;
      logger.info({ serviceName }, 'Circuit breaker half-open');
      return false;
    }
    return true;
  }

  if (state.state === CircuitState.HALF_OPEN) {
    if (state.halfOpenRequests >= defaultOptions.halfOpenMaxRequests) {
      return true;
    }
    state.halfOpenRequests++;
    return false;
  }

  return false;
}

export function recordSuccess(serviceName: string): void {
  const state = getState(serviceName);
  state.failureCount = 0;
  state.state = CircuitState.CLOSED;
  state.halfOpenRequests = 0;
}

export function recordFailure(serviceName: string): void {
  const state = getState(serviceName);
  state.failureCount++;
  state.lastFailureTime = Date.now();

  if (state.failureCount >= defaultOptions.failureThreshold) {
    state.state = CircuitState.OPEN;
    logger.warn({ serviceName, failures: state.failureCount }, 'Circuit breaker opened');
  }
}

export function getServiceStatus(serviceName: string): { name: string; status: string } {
  const state = getState(serviceName);
  const statusMap: Record<CircuitState, string> = {
    [CircuitState.CLOSED]: 'healthy',
    [CircuitState.OPEN]: 'unhealthy',
    [CircuitState.HALF_OPEN]: 'degraded',
  };
  return { name: serviceName, status: statusMap[state.state] };
}
