import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminService from '../services/admin.service';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: () => adminService.getAdminDashboard(),
  });
}

export function useUsers(params?: {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminService.getUsers(params),
  });
}

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ['admin', 'user', id],
    queryFn: () => adminService.getUserById(id!),
    enabled: !!id,
  });
}

export function useUpdateUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      adminService.updateUserStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
}

export function usePendingVendors() {
  return useQuery({
    queryKey: ['admin', 'vendors', 'pending'],
    queryFn: () => adminService.getPendingVendors(),
  });
}

export function useApproveVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.approveVendor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'vendors'] });
      qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useRejectVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.rejectVendor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'vendors'] });
    },
  });
}

export function useSuspendVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.suspendVendor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'vendors'] });
    },
  });
}

export function useReactivateVendor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.reactivateVendor(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'vendors'] });
    },
  });
}

export function usePendingRiders() {
  return useQuery({
    queryKey: ['admin', 'riders', 'pending'],
    queryFn: () => adminService.getPendingRiders(),
  });
}

export function useApproveRider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.approveRider(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'riders'] });
      qc.invalidateQueries({ queryKey: ['admin', 'dashboard'] });
    },
  });
}

export function useRejectRider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.rejectRider(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'riders'] });
    },
  });
}

export function useSuspendRider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.suspendRider(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'riders'] });
    },
  });
}

export function useReactivateRider() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.reactivateRider(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'riders'] });
    },
  });
}

export function useAdminOrders(params?: {
  page?: number;
  limit?: number;
  status?: string;
  vendorId?: string;
  customerId?: string;
  riderId?: string;
  paymentMethod?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: ['admin', 'orders', params],
    queryFn: () => adminService.getAdminOrders(params),
  });
}

export function useAdminOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: () => adminService.getAdminOrderDetail(id!),
    enabled: !!id,
  });
}

export function useCancelAdminOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.cancelAdminOrder(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'orders'] });
      qc.invalidateQueries({ queryKey: ['admin', 'order'] });
    },
  });
}

export function useAdminPromotions() {
  return useQuery({
    queryKey: ['admin', 'promotions'],
    queryFn: () => adminService.getAdminPromotions(),
  });
}

export function useCreateAdminPromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof adminService.createAdminPromotion>[0]) =>
      adminService.createAdminPromotion(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

export function useUpdateAdminPromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...input
    }: { id: string } & Partial<{
      title: string;
      description: string;
      discount: number;
      startDate: string;
      endDate: string;
      isActive: boolean;
    }>) => adminService.updateAdminPromotion(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

export function useDeleteAdminPromotion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteAdminPromotion(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'promotions'] });
    },
  });
}

export function usePlatformSettings() {
  return useQuery({
    queryKey: ['admin', 'settings'],
    queryFn: () => adminService.getPlatformSettings(),
  });
}

export function useUpdatePlatformSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Parameters<typeof adminService.updatePlatformSettings>[0]>) =>
      adminService.updatePlatformSettings(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'settings'] });
    },
  });
}
