import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '../services/auth.service';
import * as authService from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<AuthResponse>;
  register: (input: RegisterInput) => Promise<any>;
  verifyOtp: (phone: string, code: string, type: 'VERIFICATION' | 'PASSWORD_RESET') => Promise<any>;
  sendOtp: (phone: string, type: 'VERIFICATION' | 'PASSWORD_RESET') => Promise<any>;
  forgotPassword: (phone: string) => Promise<any>;
  resetPassword: (phone: string, code: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

import type { RegisterInput, AuthResponse } from '../services/auth.service';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      authService
        .getMe()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    const result = await authService.login({ phone, password });
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    setUser(result.user);
    return result;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    return authService.register(input);
  }, []);

  const verifyOtp = useCallback(
    async (phone: string, code: string, type: 'VERIFICATION' | 'PASSWORD_RESET') => {
      return authService.verifyOtp({ phone, code, type });
    },
    []
  );

  const sendOtp = useCallback(async (phone: string, type: 'VERIFICATION' | 'PASSWORD_RESET') => {
    return authService.sendOtp(phone, type);
  }, []);

  const forgotPassword = useCallback(async (phone: string) => {
    return authService.forgotPassword(phone);
  }, []);

  const resetPassword = useCallback(async (phone: string, code: string, password: string) => {
    return authService.resetPassword(phone, code, password);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      /* ignore */
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        verifyOtp,
        sendOtp,
        forgotPassword,
        resetPassword,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
