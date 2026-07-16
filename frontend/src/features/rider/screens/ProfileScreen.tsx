import { useState, useEffect } from 'react';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { useRiderProfile, useUpdateRiderProfile } from '../../../hooks/useRider';

export function RiderProfileScreen() {
  const { data: profile, isLoading, error } = useRiderProfile();
  const updateMutation = useUpdateRiderProfile();

  const [form, setForm] = useState({
    vehicleType: '',
    licenseNumber: '',
    nationalId: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        vehicleType: profile.vehicleType || '',
        licenseNumber: profile.licenseNumber || '',
        nationalId: profile.nationalId || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(form);
    } catch {
      /* handled by mutation */
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={1} type="detail" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load profile.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-12">
      <h1 className="text-xl font-bold text-gray-900 mb-4">My Profile</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <p className="font-semibold text-gray-900">{profile.fullName}</p>
        <p className="text-sm text-gray-500">{profile.phone}</p>
        {profile.email && <p className="text-sm text-gray-500">{profile.email}</p>}
        <div className="mt-2 flex items-center gap-4 text-sm">
          <span className="text-gray-500">{profile.totalDeliveries} deliveries</span>
          <span className="text-secondary-500 font-medium">
            {profile.averageRating.toFixed(1)} rating
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Vehicle Type"
          value={form.vehicleType}
          onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
          placeholder="e.g. Motorcycle, Bicycle"
        />
        <Input
          label="License Number"
          value={form.licenseNumber}
          onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
        />
        <Input
          label="National ID"
          value={form.nationalId}
          onChange={(e) => setForm({ ...form, nationalId: e.target.value })}
        />

        {updateMutation.error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
            {(updateMutation.error as any)?.message || 'Failed to update profile'}
          </div>
        )}

        {updateMutation.isSuccess && (
          <div className="p-3 bg-success-50 text-success-700 rounded-lg text-sm" role="alert">
            Profile updated successfully
          </div>
        )}

        <Button type="submit" fullWidth isLoading={updateMutation.isPending}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
