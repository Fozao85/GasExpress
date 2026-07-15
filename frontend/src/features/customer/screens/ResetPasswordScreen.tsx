import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { useResetPasswordMutation } from '../../../hooks/useAuthMutations';

export function ResetPasswordScreen() {
  const location = useLocation();
  const phone = (location.state as any)?.phone || '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const mutation = useResetPasswordMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    mutation.mutate({ phone, code, password });
  };

  const error =
    localError || mutation.error
      ? (mutation.error as any)?.response?.data?.message || localError || 'Failed to reset password'
      : '';

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
        <p className="text-gray-600 mt-1">Enter the code and your new password</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
        {error && <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">{error}</div>}
        <Input
          label="Reset Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder="6-digit code"
        />
        <Input
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Reset Password
        </Button>
      </form>
    </div>
  );
}
