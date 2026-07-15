import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { useRegisterMutation } from '../../../hooks/useAuthMutations';

export function RegisterScreen() {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', password: '' });
  const mutation = useRegisterMutation('CUSTOMER');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 bg-gray-50">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600 mt-1">Sign up to start ordering gas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto w-full">
        {mutation.error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            {(mutation.error as any)?.response?.data?.message || 'Registration failed'}
          </div>
        )}

        <Input
          label="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <Input
          label="Phone Number"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+233501234567"
          required
        />
        <Input
          label="Email (optional)"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
        />

        <Button type="submit" fullWidth isLoading={mutation.isPending}>
          Create Account
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/customer/login" className="text-primary-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
