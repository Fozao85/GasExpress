import { useState, type FormEvent } from 'react';
import { Button, Input } from '../../../components/ui';
import { useLoginMutation } from '../../../hooks/useAuthMutations';

export function AdminLoginScreen() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const mutation = useLoginMutation('ADMIN', '/admin/dashboard');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-900">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white">GasNow Admin</h1>
        <p className="text-gray-400 mt-1">Sign in to the dashboard</p>
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
        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Sign In
        </Button>
      </form>
    </div>
  );
}
