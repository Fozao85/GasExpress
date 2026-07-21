import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as adminService from '../services/admin.service';

export function usePlatformHealth() {
  return useQuery({
    queryKey: ['admin', 'health'],
    queryFn: adminService.getPlatformHealth,
    refetchInterval: 30000,
  });
}

export function useQueueStats() {
  return useQuery({
    queryKey: ['admin', 'queue'],
    queryFn: adminService.getQueueStats,
    refetchInterval: 15000,
  });
}

export function useFailedJobs() {
  return useQuery({
    queryKey: ['admin', 'queue', 'failed'],
    queryFn: adminService.getFailedJobs,
  });
}

export function useRetryFailedJobs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.retryFailedJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'queue'] });
    },
  });
}

export function usePurgeCompletedJobs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: adminService.purgeCompletedJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'queue'] });
    },
  });
}

export function useWebSocketStats() {
  return useQuery({
    queryKey: ['admin', 'websocket'],
    queryFn: adminService.getWebSocketStats,
    refetchInterval: 15000,
  });
}

export function usePaymentStats() {
  return useQuery({
    queryKey: ['admin', 'payments'],
    queryFn: adminService.getPaymentStats,
  });
}

export function useMediaStats() {
  return useQuery({
    queryKey: ['admin', 'media'],
    queryFn: adminService.getMediaStats,
  });
}
