import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import * as authService from '../services/auth.service';

export function useRegisterMutation(role: authService.RegisterInput['role']) {
  const navigate = useNavigate();
  const { register: contextRegister } = useAuth();

  return useMutation({
    mutationFn: (input: Omit<authService.RegisterInput, 'role'>) =>
      contextRegister({ ...input, role }),
    onSuccess: (_data, variables) => {
      const path =
        role === 'CUSTOMER' ? '/customer/otp' : role === 'VENDOR' ? '/vendor/otp' : '/rider/otp';
      navigate(path, { state: { phone: variables.phone, type: 'VERIFICATION' } });
    },
  });
}

export function useLoginMutation(role: string, dashboardPath: string) {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (input: authService.LoginInput) => {
      const result = await login(input.phone, input.password);
      if (result.user.role !== role) {
        throw new Error(`This account is not a ${role.toLowerCase()} account`);
      }
      return result;
    },
    onSuccess: () => {
      navigate(dashboardPath);
    },
  });
}

export function useVerifyOtpMutation() {
  const navigate = useNavigate();
  const { verifyOtp } = useAuth();

  return useMutation({
    mutationFn: (input: authService.OtpInput) => verifyOtp(input.phone, input.code, input.type),
    onSuccess: (_data, variables) => {
      if (variables.type === 'PASSWORD_RESET') {
        navigate('/customer/reset-password', { state: { phone: variables.phone } });
      } else {
        navigate('/customer/dashboard');
      }
    },
  });
}

export function useSendOtpMutation() {
  const { sendOtp } = useAuth();
  return useMutation({
    mutationFn: ({ phone, type }: { phone: string; type: 'VERIFICATION' | 'PASSWORD_RESET' }) =>
      sendOtp(phone, type),
  });
}

export function useForgotPasswordMutation() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  return useMutation({
    mutationFn: (phone: string) => forgotPassword(phone),
    onSuccess: (_data, phone) => {
      navigate('/customer/otp', { state: { phone, type: 'PASSWORD_RESET' } });
    },
  });
}

export function useResetPasswordMutation() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  return useMutation({
    mutationFn: ({ phone, code, password }: { phone: string; code: string; password: string }) =>
      resetPassword(phone, code, password),
    onSuccess: () => {
      navigate('/customer/login');
    },
  });
}
