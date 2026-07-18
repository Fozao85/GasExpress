import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as vendorService from '../services/vendor.service';

export function useVendorProfile() {
  return useQuery({
    queryKey: ['vendor', 'profile'],
    queryFn: () => vendorService.getVendorProfile(),
  });
}

export function useUpdateVendorProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof vendorService.updateVendorProfile>[0]) =>
      vendorService.updateVendorProfile(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vendor', 'profile'] });
      qc.invalidateQueries({ queryKey: ['vendor', 'dashboard'] });
      qc.invalidateQueries({ queryKey: ['vendor', 'inventory'] });
    },
  });
}

export function useVendorInventory() {
  return useQuery({
    queryKey: ['vendor', 'inventory'],
    queryFn: () => vendorService.getVendorInventory(),
  });
}

export function useAddInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof vendorService.addInventoryItem>[0]) =>
      vendorService.addInventoryItem(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vendor', 'inventory'] }),
  });
}

export function useUpdateInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { inventoryId: string; stockQuantity?: number; price?: number }) =>
      vendorService.updateInventoryItem(input.inventoryId, {
        stockQuantity: input.stockQuantity,
        price: input.price,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vendor', 'inventory'] }),
  });
}

export function useDeleteInventoryItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (inventoryId: string) => vendorService.deleteInventoryItem(inventoryId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vendor', 'inventory'] }),
  });
}

export function useVendorOrders(params?: { page?: number; limit?: number; status?: string }) {
  return useQuery({
    queryKey: ['vendor', 'orders', params],
    queryFn: () => vendorService.getVendorOrders(params),
  });
}

export function useVendorOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['vendor', 'order', id],
    queryFn: () => vendorService.getVendorOrderById(id!),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; status: string; note?: string }) =>
      vendorService.updateOrderStatus(input.id, { status: input.status, note: input.note }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vendor', 'orders'] });
      qc.invalidateQueries({ queryKey: ['vendor', 'order'] });
      qc.invalidateQueries({ queryKey: ['vendor', 'dashboard'] });
    },
  });
}

export function useVendorDashboard() {
  return useQuery({
    queryKey: ['vendor', 'dashboard'],
    queryFn: () => vendorService.getVendorDashboard(),
  });
}

export function useCylinderTypes() {
  return useQuery({
    queryKey: ['cylinderTypes'],
    queryFn: () => vendorService.listCylinderTypes(),
  });
}

export function useCreateCylinderType() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof vendorService.createCylinderType>[0]) =>
      vendorService.createCylinderType(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cylinderTypes'] }),
  });
}
