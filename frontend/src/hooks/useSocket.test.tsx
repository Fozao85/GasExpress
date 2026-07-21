import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useSocket } from './useSocket';

const mockIo = vi.fn();
const mockSocket = {
  on: vi.fn().mockReturnThis(),
  off: vi.fn(),
  emit: vi.fn(),
  disconnect: vi.fn(),
  connect: vi.fn(),
};

vi.mock('socket.io-client', () => ({
  io: (...args: any[]) => mockIo(...args) || mockSocket,
}));

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

beforeEach(() => {
  mockIo.mockReturnValue(mockSocket);
});

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  );
}

describe('useSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      user: { id: 'u1', role: 'CUSTOMER' },
      isAuthenticated: true,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('connects when authenticated', () => {
    const { unmount } = renderHook(() => useSocket(), { wrapper: createWrapper() });
    expect(mockIo).toHaveBeenCalled();
    unmount();
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });

  it('does not connect when unauthenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
    } as any);

    renderHook(() => useSocket(), { wrapper: createWrapper() });
    expect(mockIo).not.toHaveBeenCalled();
  });

  it('subscribe emits subscribe:event to socket', () => {
    const { result } = renderHook(() => useSocket(), { wrapper: createWrapper() });
    act(() => {
      result.current.subscribe('vendor', 'vendor-1');
    });
    expect(mockSocket.emit).toHaveBeenCalledWith('subscribe:vendor', 'vendor-1');
  });

  it('unsubscribe emits unsubscribe:event to socket', () => {
    const { result } = renderHook(() => useSocket(), { wrapper: createWrapper() });
    act(() => {
      result.current.unsubscribe('order', 'order-1');
    });
    expect(mockSocket.emit).toHaveBeenCalledWith('unsubscribe:order', 'order-1');
  });

  it('on registers event listener and returns cleanup', () => {
    const { result } = renderHook(() => useSocket(), { wrapper: createWrapper() });
    const callback = vi.fn();
    const cleanup = result.current.on('order:status', callback);
    expect(mockSocket.on).toHaveBeenCalledWith('order:status', callback);
    act(() => {
      cleanup();
    });
    expect(mockSocket.off).toHaveBeenCalledWith('order:status', callback);
  });
});
