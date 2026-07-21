import { prisma } from '../database';
import { getServiceStatus } from './circuit-breaker';

interface IntegrationHealth {
  name: string;
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  latencyMs?: number;
  error?: string;
}

async function checkDatabase(): Promise<IntegrationHealth> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { name: 'database', status: 'healthy', latencyMs: Date.now() - start };
  } catch (error) {
    return { name: 'database', status: 'unhealthy', error: String(error) };
  }
}

async function checkRedis(): Promise<IntegrationHealth> {
  const start = Date.now();
  try {
    const { default: IORedis } = await import('ioredis');
    const { config } = await import('../config');
    const redis = new IORedis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      connectTimeout: 3000,
      maxRetriesPerRequest: 1,
      retryStrategy: () => null,
    });
    await redis.ping();
    await redis.quit();
    return { name: 'redis', status: 'healthy', latencyMs: Date.now() - start };
  } catch {
    return { name: 'redis', status: 'unhealthy', latencyMs: Date.now() - start };
  }
}

async function checkBullMQ(): Promise<IntegrationHealth> {
  try {
    const { notificationQueue } = await import('../queue');
    const jobCounts = await notificationQueue.getJobCounts();
    return {
      name: 'bullmq',
      status: 'healthy',
      latencyMs: 0,
    };
  } catch (error) {
    return { name: 'bullmq', status: 'unhealthy', error: String(error) };
  }
}

const externalServices = ['payment_gateway', 'maps_service', 'sms_provider', 'email_provider'];

export async function getIntegrationsHealth(): Promise<IntegrationHealth[]> {
  const results = await Promise.allSettled([
    checkDatabase(),
    checkRedis(),
    checkBullMQ(),
    ...externalServices.map((name) => {
      const status = getServiceStatus(name);
      return Promise.resolve({
        name,
        status: status.status === 'healthy' ? ('healthy' as const) : ('degraded' as const),
      });
    }),
  ]);

  return results.map((r) =>
    r.status === 'fulfilled'
      ? r.value
      : { name: 'unknown', status: 'unknown' as const, error: r.reason }
  );
}
