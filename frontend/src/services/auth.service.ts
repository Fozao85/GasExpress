import { api } from './api';

export interface RegisterInput {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role: 'CUSTOMER' | 'VENDOR' | 'RIDER' | 'ADMIN';
}

export interface LoginInput {
  phone: string;
  password: string;
}

export interface OtpInput {
  phone: string;
  code: string;
  type: 'VERIFICATION' | 'PASSWORD_RESET';
}

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  role: string;
  status: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export async function register(input: RegisterInput) {
  const { data } = await api.post('/auth/register', input);
  return data.data;
}

export async function login(input: LoginInput) {
  const { data } = await api.post('/auth/login', input);
  return data.data as AuthResponse;
}

export async function sendOtp(phone: string, type: 'VERIFICATION' | 'PASSWORD_RESET') {
  const { data } = await api.post('/auth/otp/send', { phone, type });
  return data.data;
}

export async function verifyOtp(input: OtpInput) {
  const { data } = await api.post('/auth/otp/verify', input);
  return data.data;
}

export async function refreshToken(refreshToken: string) {
  const { data } = await api.post('/auth/refresh', { refreshToken });
  return data.data;
}

export async function forgotPassword(phone: string) {
  const { data } = await api.post('/auth/forgot-password', { phone });
  return data.data;
}

export async function resetPassword(phone: string, code: string, password: string) {
  const { data } = await api.post('/auth/reset-password', { phone, code, password });
  return data.data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data.data as User;
}

export async function logout() {
  await api.post('/auth/logout');
}
