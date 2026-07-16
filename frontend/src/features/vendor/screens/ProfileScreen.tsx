import { useState, useEffect } from 'react';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { useVendorProfile, useUpdateVendorProfile } from '../../../hooks/useVendor';

export function VendorProfileScreen() {
  const { data: profile, isLoading, error } = useVendorProfile();
  const updateMutation = useUpdateVendorProfile();

  const [form, setForm] = useState({
    businessName: '',
    phone: '',
    address: '',
    openingTime: '',
    closingTime: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        businessName: profile.businessName || '',
        phone: profile.phone || '',
        address: profile.address || '',
        openingTime: profile.openingTime || '',
        closingTime: profile.closingTime || '',
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync(form);
    } catch {
      /* handled by mutation error */
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
      <h1 className="text-xl font-bold text-gray-900 mb-4">Business Profile</h1>

      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-semibold text-gray-900">{profile.businessName}</p>
            <p className="text-sm text-gray-500">{profile.ownerName}</p>
          </div>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              profile.verificationStatus === 'VERIFIED'
                ? 'bg-success-100 text-success-700'
                : profile.verificationStatus === 'PENDING'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-error-100 text-error-700'
            }`}
          >
            {profile.verificationStatus}
          </span>
        </div>
        <p className="text-sm text-gray-500">{profile.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Business Name"
          value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <Input
          label="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Opening Time"
            type="time"
            value={form.openingTime}
            onChange={(e) => setForm({ ...form, openingTime: e.target.value })}
          />
          <Input
            label="Closing Time"
            type="time"
            value={form.closingTime}
            onChange={(e) => setForm({ ...form, closingTime: e.target.value })}
          />
        </div>

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
