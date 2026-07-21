import { prisma } from '../../database';
import { getIntegrationsHealth } from '../../integrations';
import { getMediaStats } from '../media';

export async function getPlatformHealth() {
  const integrations = await getIntegrationsHealth();

  return { integrations };
}

export async function getQueueStats() {
  try {
    const { notificationQueue } = await import('../../queue');
    const counts = await notificationQueue.getJobCounts();
    return {
      waiting: counts.waiting || 0,
      active: counts.active || 0,
      completed: counts.completed || 0,
      failed: counts.failed || 0,
      delayed: counts.delayed || 0,
      paused: counts.paused || 0,
    };
  } catch {
    return { waiting: 0, active: 0, completed: 0, failed: 0, delayed: 0, paused: 0 };
  }
}

export async function getFailedJobs() {
  try {
    const { notificationQueue } = await import('../../queue');
    const failed = await notificationQueue.getJobs('failed', 0, 50);
    return failed.map((j) => ({
      id: j.id,
      name: j.name,
      data: j.data,
      failedReason: j.failedReason,
      attemptsMade: j.attemptsMade,
      timestamp: j.timestamp,
    }));
  } catch {
    return [];
  }
}

export async function retryFailedJobs() {
  try {
    const { notificationQueue } = await import('../../queue');
    const failed = await notificationQueue.getJobs('failed', 0, 50);
    const results = await Promise.allSettled(failed.map((j) => j.retry()));
    return {
      retried: results.filter((r) => r.status === 'fulfilled').length,
      total: failed.length,
    };
  } catch {
    return { retried: 0, total: 0 };
  }
}

export async function purgeCompletedJobs() {
  try {
    const { notificationQueue } = await import('../../queue');
    await notificationQueue.clean(0, 0, 'completed');
    return { purged: true };
  } catch {
    return { purged: false };
  }
}

export async function getWebSocketStats() {
  try {
    const { getIO } = await import('../../websocket');
    const io = getIO();
    const clients = await io.fetchSockets();

    const rooms: Record<string, number> = {};
    for (const socket of clients) {
      for (const room of socket.rooms) {
        if (room !== socket.id) {
          rooms[room] = (rooms[room] || 0) + 1;
        }
      }
    }

    const roles = { customers: 0, vendors: 0, riders: 0, admins: 0 };
    for (const socket of clients) {
      const role = (socket.data as any)?.role;
      if (role === 'CUSTOMER') roles.customers++;
      else if (role === 'VENDOR') roles.vendors++;
      else if (role === 'RIDER') roles.riders++;
      else if (role === 'ADMIN') roles.admins++;
    }

    return {
      connectedClients: clients.length,
      ...roles,
      activeRooms: Object.keys(rooms).length,
    };
  } catch {
    return { connectedClients: 0, customers: 0, vendors: 0, riders: 0, admins: 0, activeRooms: 0 };
  }
}

export async function getPaymentStats() {
  const [successful, failed, pending, webhookFailures] = await Promise.all([
    prisma.payment.count({ where: { paymentStatus: 'PAID' } }),
    prisma.payment.count({ where: { paymentStatus: 'FAILED' } }),
    prisma.payment.count({ where: { paymentStatus: 'PENDING' } }),
    prisma.paymentWebhookLog.count({ where: { status: { not: 'processed' } } }),
  ]);

  return { successful, failed, pending, webhookFailures };
}

export async function getMapsStats() {
  return {
    totalGeocodingRequests: 0,
    totalReverseGeocodingRequests: 0,
    totalRoutingRequests: 0,
    providerFailures: 0,
  };
}

export async function getMediaMonitoringStats() {
  return getMediaStats();
}

export async function getWorkerStatus() {
  return {
    notificationWorker: 'running',
    failedWorkers: 0,
    restartCount: 0,
  };
}
