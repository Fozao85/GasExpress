import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import {
  useAdminPromotions,
  useCreateAdminPromotion,
  useUpdateAdminPromotion,
  useDeleteAdminPromotion,
} from '../../../hooks/useAdmin';

export function AdminPromotionsScreen() {
  const navigate = useNavigate();
  const { data: promotions, isLoading, error } = useAdminPromotions();
  const createPromo = useCreateAdminPromotion();
  const updatePromo = useUpdateAdminPromotion();
  const deletePromo = useDeleteAdminPromotion();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    discount: 0,
    startDate: '',
    endDate: '',
    isActive: true,
  });

  const handleCreate = async () => {
    try {
      await createPromo.mutateAsync({
        ...form,
        startDate: new Date(form.startDate).toISOString(),
        endDate: new Date(form.endDate).toISOString(),
      });
      setShowForm(false);
      setForm({ title: '', discount: 0, startDate: '', endDate: '', isActive: true });
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="p-6 pb-12">
      <button
        onClick={() => navigate('/admin/dashboard')}
        className="text-sm text-primary-500 font-medium mb-4 hover:underline"
      >
        &larr; Back to Dashboard
      </button>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Promotion'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Input
            label="Discount (%)"
            type="number"
            value={form.discount}
            onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
          />
          <Input
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
          <Input
            label="End Date"
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>
          <Button fullWidth onClick={handleCreate} isLoading={createPromo.isPending}>
            Create Promotion
          </Button>
        </div>
      )}

      {isLoading && <LoadingSkeleton count={3} />}
      {error && (
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load promotions.
        </div>
      )}

      {promotions && promotions.length === 0 && (
        <EmptyState title="No promotions" message="Create your first promotion" icon="🏷️" />
      )}

      {promotions && promotions.length > 0 && (
        <div className="space-y-3">
          {promotions.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-900">{p.title}</p>
                  <p className="text-sm text-gray-500">{p.value}% off</p>
                  <p className="text-xs text-gray-400">
                    {new Date(p.startDate).toLocaleDateString()} -{' '}
                    {new Date(p.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updatePromo.mutate({ id: p.id, isActive: !p.active })}
                    className={`px-2 py-1 rounded text-xs font-medium ${p.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {p.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete this promotion?')) deletePromo.mutate(p.id);
                    }}
                    className="text-xs px-2 py-1 rounded bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
