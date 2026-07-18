import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { useLoginMutation } from '../../../hooks/useAuthMutations';

export function LoginScreen() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const mutation = useLoginMutation('CUSTOMER', '/customer/dashboard');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-1">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
        {mutation.error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            {(mutation.error as any)?.message || 'Login failed'}
          </div>
        )}

        <Input
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="text-right">
          <Link to="/customer/forgot-password" className="text-sm text-primary-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/role-select" className="text-primary-500 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}
