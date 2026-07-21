import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../database';
import * as monitoringService from './monitoring.service';

vi.mock('../../database', () => ({
  prisma: {
    payment: { count: vi.fn() },
    paymentWebhookLog: { count: vi.fn() },
    media: { count: vi.fn(), aggregate: vi.fn() },
  },
}));

vi.mock('../../integrations', () => ({
  getIntegrationsHealth: vi.fn().mockResolvedValue([
    { name: 'database', status: 'healthy' },
    { name: 'redis', status: 'healthy' },
  ]),
}));

vi.mock('../media', () => ({
  getMediaStats: vi.fn().mockResolvedValue({
    totalUploads: 5,
    storageUsed: 2000000,
    uploadsToday: 1,
    failedUploads: 0,
  }),
}));

describe('MonitoringService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getPlatformHealth', () => {
    it('returns integration health status', async () => {
      const health = await monitoringService.getPlatformHealth();
      expect(health.integrations).toHaveLength(2);
      expect(health.integrations[0].name).toBe('database');
      expect(health.integrations[0].status).toBe('healthy');
    });
  });

  describe('getPaymentStats', () => {
    it('returns payment statistics', async () => {
      vi.mocked(prisma.payment.count).mockResolvedValueOnce(50);
      vi.mocked(prisma.payment.count).mockResolvedValueOnce(5);
      vi.mocked(prisma.payment.count).mockResolvedValueOnce(10);
      vi.mocked(prisma.paymentWebhookLog.count).mockResolvedValueOnce(2);

      const stats = await monitoringService.getPaymentStats();

      expect(stats.successful).toBe(50);
      expect(stats.failed).toBe(5);
      expect(stats.pending).toBe(10);
      expect(stats.webhookFailures).toBe(2);
    });
  });

  describe('getMediaMonitoringStats', () => {
    it('returns media statistics', async () => {
      const stats = await monitoringService.getMediaMonitoringStats();
      expect(stats.totalUploads).toBe(5);
      expect(stats.uploadsToday).toBe(1);
    });
  });
});
