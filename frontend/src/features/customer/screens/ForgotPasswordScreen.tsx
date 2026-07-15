import { useState, type FormEvent } from 'react';
import { Button, Input } from '../../../components/ui';
import { useForgotPasswordMutation } from '../../../hooks/useAuthMutations';

export function ForgotPasswordScreen() {
  const [phone, setPhone] = useState('');
  const mutation = useForgotPasswordMutation();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(phone);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
        <p className="text-gray-600 mt-1">Enter your phone number to receive a reset code</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
        {mutation.error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            {(mutation.error as any)?.response?.data?.message || 'Failed to send reset code'}
          </div>
        )}
        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Send Reset Code
        </Button>
      </form>
    </div>
  );
}
