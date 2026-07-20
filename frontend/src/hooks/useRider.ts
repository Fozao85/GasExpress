import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as riderService from '../services/rider.service';

export function useRiderProfile() {
  return useQuery({
    queryKey: ['rider', 'profile'],
    queryFn: () => riderService.getRiderProfile(),
  });
}

export function useUpdateRiderProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof riderService.updateRiderProfile>[0]) =>
      riderService.updateRiderProfile(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['rider', 'profile'] }),
  });
}

export function useUpdateAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Parameters<typeof riderService.updateAvailability>[0]) =>
      riderService.updateAvailability(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rider', 'profile'] });
      qc.invalidateQueries({ queryKey: ['rider', 'dashboard'] });
    },
  });
}

export function useAvailableOrders() {
  return useQuery({
    queryKey: ['rider', 'availableOrders'],
    queryFn: () => riderService.getAvailableOrders(),
  });
}

export function useAcceptOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => riderService.acceptOrder(orderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rider', 'availableOrders'] });
      qc.invalidateQueries({ queryKey: ['rider', 'orders'] });
      qc.invalidateQueries({ queryKey: ['rider', 'dashboard'] });
    },
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ['rider', 'orders'],
    queryFn: () => riderService.getMyOrders(),
  });
}

export function useRiderOrder(id: string | undefined) {
  return useQuery({
    queryKey: ['rider', 'order', id],
    queryFn: () => riderService.getRiderOrderById(id!),
    enabled: !!id,
  });
}

export function useUpdateDeliveryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      id: string;
      status: string;
      note?: string;
      latitude?: number;
      longitude?: number;
    }) => riderService.updateDeliveryStatus(input.id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rider', 'orders'] });
      qc.invalidateQueries({ queryKey: ['rider', 'order'] });
      qc.invalidateQueries({ queryKey: ['rider', 'dashboard'] });
      qc.invalidateQueries({ queryKey: ['rider', 'history'] });
    },
  });
}

export function useSubmitTracking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { orderId: string; latitude: number; longitude: number }) =>
      riderService.submitTracking(input.orderId, input),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['rider', 'order', variables.orderId] });
    },
  });
}

export function useDeliveryHistory(params?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['rider', 'history', params],
    queryFn: () => riderService.getDeliveryHistory(params),
  });
}

export function useRejectOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => riderService.rejectOrder(orderId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rider', 'availableOrders'] });
      qc.invalidateQueries({ queryKey: ['rider', 'orders'] });
      qc.invalidateQueries({ queryKey: ['rider', 'dashboard'] });
    },
  });
}

export function useUpdateRiderLocation() {
  return useMutation({
    mutationFn: (input: { latitude: number; longitude: number }) =>
      riderService.updateRiderLocation(input),
  });
}

export function useRiderEarnings() {
  return useQuery({
    queryKey: ['rider', 'earnings'],
    queryFn: () => riderService.getRiderEarnings(),
  });
}

export function useRiderDashboard() {
  return useQuery({
    queryKey: ['rider', 'dashboard'],
    queryFn: () => riderService.getRiderDashboard(),
  });
}
