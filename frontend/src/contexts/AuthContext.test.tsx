import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { useAuth, AuthProvider } from './AuthContext';

vi.mock('../services/auth.service', () => ({
  getMe: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  verifyOtp: vi.fn(),
  sendOtp: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
  logout: vi.fn(),
}));

import * as authService from '../services/auth.service';

function TestConsumer() {
  const { user, isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div data-testid="loading">loading</div>;
  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      {user && <div data-testid="user-role">{user.role}</div>}
    </div>
  );
}

function renderWithProvider() {
  localStorage.setItem('accessToken', 'test-token');
  localStorage.setItem('refreshToken', 'test-refresh');
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('AuthContext', () => {
  it('restores session when getMe succeeds', async () => {
    vi.mocked(authService.getMe).mockResolvedValue({
      id: '1',
      fullName: 'Test',
      phone: '0550000000',
      email: null,
      role: 'CUSTOMER',
      status: 'ACTIVE',
    });

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    });
    expect(screen.getByTestId('user-role').textContent).toBe('CUSTOMER');
  });

  it('clears session on 401 error', async () => {
    const error = { response: { status: 401 }, isAxiosError: true };
    vi.mocked(authService.getMe).mockRejectedValue(error);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    });
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });

  it('keeps session on 500 error', async () => {
    const error = { response: { status: 500 }, isAxiosError: true };
    vi.mocked(authService.getMe).mockRejectedValue(error);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    });
    expect(localStorage.getItem('accessToken')).toBe('test-token');
    expect(localStorage.getItem('refreshToken')).toBe('test-refresh');
  });

  it('keeps session on network error (no response)', async () => {
    const error = { request: {}, isAxiosError: true, message: 'Network Error' };
    vi.mocked(authService.getMe).mockRejectedValue(error);

    renderWithProvider();

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    });
    expect(localStorage.getItem('accessToken')).toBe('test-token');
    expect(localStorage.getItem('refreshToken')).toBe('test-refresh');
  });

  it('stays unauthenticated when no token exists', async () => {
    localStorage.clear();
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    });
    expect(authService.getMe).not.toHaveBeenCalled();
  });
});
