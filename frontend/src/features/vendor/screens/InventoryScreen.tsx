import { useState } from 'react';
import { Button, Input } from '../../../components/ui';
import { LoadingSkeleton, EmptyState } from '../../../components/discovery';
import {
  useVendorInventory,
  useAddInventoryItem,
  useUpdateInventoryItem,
  useDeleteInventoryItem,
  useCylinderTypes,
  useCreateCylinderType,
} from '../../../hooks/useVendor';

export function VendorInventoryScreen() {
  const { data: inventory, isLoading, error } = useVendorInventory();
  const { data: cylinderTypes } = useCylinderTypes();
  const addMutation = useAddInventoryItem();
  const updateMutation = useUpdateInventoryItem();
  const deleteMutation = useDeleteInventoryItem();
  const createTypeMutation = useCreateCylinderType();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ cylinderTypeId: '', stockQuantity: 0, price: 0 });
  const [editForm, setEditForm] = useState({ stockQuantity: 0, price: 0 });

  const [isCustomType, setIsCustomType] = useState(false);
  const [customForm, setCustomForm] = useState({ name: '', sizeKg: 0, description: '', color: '' });

  const getItemLabel = (item: {
    name: string | null;
    cylinderSize: number;
    cylinderTypeId: string;
  }) => {
    if (item.name) return item.name;
    const type = cylinderTypes?.find((ct) => ct.id === item.cylinderTypeId);
    return type?.name || `${item.cylinderSize}kg`;
  };

  const resetForms = () => {
    setForm({ cylinderTypeId: '', stockQuantity: 0, price: 0 });
    setCustomForm({ name: '', sizeKg: 0, description: '', color: '' });
    setIsCustomType(false);
    setShowAddForm(false);
  };

  const handleAdd = async () => {
    try {
      if (isCustomType) {
        if (!customForm.name || customForm.sizeKg <= 0) return;
        const newType = await createTypeMutation.mutateAsync(customForm);
        await addMutation.mutateAsync({ ...form, cylinderTypeId: newType.id });
      } else {
        if (!form.cylinderTypeId) return;
        await addMutation.mutateAsync(form);
      }
      resetForms();
    } catch {
      /* handled by mutation error */
    }
  };

  const handleUpdate = async (inventoryId: string) => {
    try {
      await updateMutation.mutateAsync({ inventoryId, ...editForm });
      setEditingId(null);
    } catch {
      /* handled by mutation error */
    }
  };

  const handleDelete = async (inventoryId: string) => {
    if (!window.confirm('Remove this inventory item?')) return;
    try {
      await deleteMutation.mutateAsync(inventoryId);
    } catch {
      /* handled by mutation error */
    }
  };

  if (isLoading) {
    return (
      <div className="px-4 pt-6 pb-12">
        <LoadingSkeleton count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-6 pb-12">
        <div className="p-4 bg-error-50 text-error-700 rounded-xl text-sm" role="alert">
          Failed to load inventory.
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
        <Button size="sm" onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          Add Product
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-gray-900">New Product</h2>
            <div className="flex bg-gray-100 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setIsCustomType(false)}
                className={`px-3 py-1 rounded-md transition-colors ${!isCustomType ? 'bg-white shadow-sm font-medium text-gray-900' : 'text-gray-500'}`}
              >
                Existing
              </button>
              <button
                type="button"
                onClick={() => setIsCustomType(true)}
                className={`px-3 py-1 rounded-md transition-colors ${isCustomType ? 'bg-white shadow-sm font-medium text-gray-900' : 'text-gray-500'}`}
              >
                Custom
              </button>
            </div>
          </div>

          {isCustomType ? (
            <>
              <Input
                label="Product Name"
                value={customForm.name}
                onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                placeholder="e.g. Premium Refill"
              />
              <Input
                label="Size (kg)"
                type="number"
                step="0.5"
                min={0.5}
                value={customForm.sizeKg || ''}
                onChange={(e) =>
                  setCustomForm({ ...customForm, sizeKg: parseFloat(e.target.value) || 0 })
                }
              />
              <Input
                label="Colour"
                value={customForm.color}
                onChange={(e) => setCustomForm({ ...customForm, color: e.target.value })}
                placeholder="e.g. Red, Blue"
              />
              <Input
                label="Description"
                value={customForm.description}
                onChange={(e) => setCustomForm({ ...customForm, description: e.target.value })}
                placeholder="Brief description"
              />
            </>
          ) : (
            <select
              value={form.cylinderTypeId}
              onChange={(e) => setForm({ ...form, cylinderTypeId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500"
            >
              <option value="">Select cylinder type</option>
              {cylinderTypes?.map((ct) => (
                <option key={ct.id} value={ct.id}>
                  {ct.name} {ct.color ? `(${ct.color})` : ''} - GHS {ct.sizeKg}kg
                </option>
              ))}
            </select>
          )}

          <Input
            label="Stock Quantity"
            type="number"
            min={0}
            value={form.stockQuantity}
            onChange={(e) => setForm({ ...form, stockQuantity: parseInt(e.target.value) || 0 })}
          />
          <Input
            label="Price (GHS)"
            type="number"
            step="0.01"
            min={0}
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
          />
          <div className="flex gap-2">
            <Button
              onClick={handleAdd}
              isLoading={addMutation.isPending || createTypeMutation.isPending}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={resetForms}>
              Cancel
            </Button>
          </div>
          {(addMutation.error || createTypeMutation.error) && (
            <div className="p-3 bg-error-50 text-error-700 rounded-lg text-sm" role="alert">
              {(addMutation.error || createTypeMutation.error) &&
              ((addMutation.error || createTypeMutation.error) as any)?.response?.data?.errors
                ?.length
                ? ((addMutation.error || createTypeMutation.error) as any).response.data.errors
                    .map((e: any) => e.message)
                    .join(', ')
                : ((addMutation.error || createTypeMutation.error) as any)?.response?.data
                    ?.message ||
                  ((addMutation.error || createTypeMutation.error) as any)?.message ||
                  'Failed to add item'}
            </div>
          )}
        </div>
      )}

      {(!inventory || inventory.length === 0) && (
        <EmptyState
          title="No products listed"
          message="Add your first cylinder product to start receiving orders"
          icon="📦"
        />
      )}

      <div className="space-y-3" role="list" aria-label="Inventory">
        {inventory?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 p-4"
            role="listitem"
          >
            {editingId === item.id ? (
              <div className="space-y-3">
                <p className="font-medium text-gray-900">
                  {getItemLabel(item)}
                  {item.description ? ` - ${item.description}` : ''}
                </p>
                <Input
                  label="Stock Quantity"
                  type="number"
                  min={0}
                  value={editForm.stockQuantity}
                  onChange={(e) =>
                    setEditForm({ ...editForm, stockQuantity: parseInt(e.target.value) || 0 })
                  }
                />
                <Input
                  label="Price (GHS)"
                  type="number"
                  step="0.01"
                  min={0}
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })
                  }
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdate(item.id)}
                    isLoading={updateMutation.isPending}
                  >
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">
                      {getItemLabel(item)}
                      {item.description ? ` - ${item.description}` : ''}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">GHS {item.price.toFixed(2)}</p>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.inStock
                        ? 'bg-success-100 text-success-700'
                        : 'bg-error-100 text-error-700'
                    }`}
                  >
                    {item.inStock ? `${item.stockQuantity} in stock` : 'Out of stock'}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingId(item.id);
                      setEditForm({ stockQuantity: item.stockQuantity, price: item.price });
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-error-500 hover:bg-error-50"
                    onClick={() => handleDelete(item.id)}
                    isLoading={deleteMutation.isPending}
                  >
                    Remove
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
