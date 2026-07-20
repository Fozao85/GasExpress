import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton } from '../../../components/discovery';
import { usePlatformSettings, useUpdatePlatformSettings } from '../../../hooks/useAdmin';

export function AdminSettingsScreen() {
  const navigate = useNavigate();
  const { data: settings, isLoading, error } = usePlatformSettings();
  const updateSettings = useUpdatePlatformSettings();

  const [form, setForm] = useState({
    defaultDeliveryFee: 0,
    freeDeliveryThreshold: 0,
    supportPhone: '',
    supportEmail: '',
    maintenanceMode: false,
    minimumInventoryAlert: 0,
  });

  useEffect(() => {
    if (settings) {
      setForm({
        defaultDeliveryFee: settings.defaultDeliveryFee,
        freeDeliveryThreshold: settings.freeDeliveryThreshold,
        supportPhone: settings.supportPhone || '',
        supportEmail: settings.supportEmail || '',
        maintenanceMode: settings.maintenanceMode,
        minimumInventoryAlert: settings.minimumInventoryAlert,
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync(form);
    } catch {
      /* ignore */
    }
  };

  if (isLoading)
    return (
      <div className="p-6">
        <LoadingSkeleton count={1} type="detail" />
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load settings.
        </div>
      </div>
    );

  return (
    <div className="p-6 pb-12 max-w-lg">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Platform Settings</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <Input
          label="Default Delivery Fee (GHS)"
          type="number"
          value={form.defaultDeliveryFee}
          onChange={(e) => setForm({ ...form, defaultDeliveryFee: Number(e.target.value) })}
        />
        <Input
          label="Free Delivery Threshold (GHS)"
          type="number"
          value={form.freeDeliveryThreshold}
          onChange={(e) => setForm({ ...form, freeDeliveryThreshold: Number(e.target.value) })}
        />
        <Input
          label="Support Phone"
          value={form.supportPhone}
          onChange={(e) => setForm({ ...form, supportPhone: e.target.value })}
        />
        <Input
          label="Support Email"
          type="email"
          value={form.supportEmail}
          onChange={(e) => setForm({ ...form, supportEmail: e.target.value })}
        />
        <Input
          label="Minimum Inventory Alert"
          type="number"
          value={form.minimumInventoryAlert}
          onChange={(e) => setForm({ ...form, minimumInventoryAlert: Number(e.target.value) })}
        />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.maintenanceMode}
            onChange={(e) => setForm({ ...form, maintenanceMode: e.target.checked })}
          />
          Maintenance Mode
        </label>

        {updateSettings.isSuccess && (
          <div className="p-3 bg-success-50 text-success-700 rounded-lg text-sm">
            Settings saved successfully.
          </div>
        )}
        {updateSettings.error && (
          <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm">
            Failed to save settings.
          </div>
        )}

        <Button type="submit" fullWidth isLoading={updateSettings.isPending}>
          Save Settings
        </Button>
      </form>
    </div>
  );
}
