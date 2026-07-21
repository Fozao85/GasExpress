import { api } from './api';

export interface IntegrationHealth {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  latencyMs?: number;
  error?: string;
}

export interface QueueStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  paused: number;
}

export interface WebSocketStats {
  connectedClients: number;
  customers: number;
  vendors: number;
  riders: number;
  admins: number;
  activeRooms: number;
}

export interface PaymentStats {
  successful: number;
  failed: number;
  pending: number;
  webhookFailures: number;
}

export interface MediaMonitoringStats {
  totalUploads: number;
  storageUsed: number;
  uploadsToday: number;
  failedUploads: number;
}

export async function getPlatformHealth(): Promise<{ integrations: IntegrationHealth[] }> {
  const { data } = await api.get('/admin/health');
  return data.data;
}

export async function getQueueStats(): Promise<QueueStats> {
  const { data } = await api.get('/admin/monitoring/queue');
  return data.data;
}

export async function getFailedJobs(): Promise<any[]> {
  const { data } = await api.get('/admin/monitoring/queue/failed');
  return data.data.jobs;
}

export async function retryFailedJobs(): Promise<{ retried: number; total: number }> {
  const { data } = await api.post('/admin/monitoring/queue/retry');
  return data.data;
}

export async function purgeCompletedJobs(): Promise<{ purged: boolean }> {
  const { data } = await api.post('/admin/monitoring/queue/purge');
  return data.data;
}

export async function getWebSocketStats(): Promise<WebSocketStats> {
  const { data } = await api.get('/admin/monitoring/websocket');
  return data.data;
}

export async function getPaymentStats(): Promise<PaymentStats> {
  const { data } = await api.get('/admin/monitoring/payments');
  return data.data;
}

export async function getMediaStats(): Promise<MediaMonitoringStats> {
  const { data } = await api.get('/admin/monitoring/media');
  return data.data;
}
