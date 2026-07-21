import { Worker } from 'bullmq';
import { config } from '../../config';
import { logger } from '../../common/middleware';

const connection = {
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password || undefined,
};

interface NotificationJobData {
  type: 'in_app' | 'push' | 'sms' | 'email';
  userId: string;
  title: string;
  body: string;
  notificationType: string;
  data?: Record<string, unknown>;
}

export function startNotificationWorker(): Worker {
  const worker = new Worker<NotificationJobData>(
    'notifications',
    async (job) => {
      const { type, userId, title, body, notificationType, data } = job.data;

      logger.info({ jobId: job.id, type, userId, notificationType }, 'Processing notification');

      switch (type) {
        case 'in_app': {
          const { notificationService } = await import('../../modules/notifications');
          await notificationService.createNotification({
            userId,
            title,
            body,
            notificationType,
            data,
          });
          break;
        }

        case 'push':
          logger.info({ userId, title }, 'Push notification placeholder');
          break;

        case 'sms':
          logger.info({ userId, body }, 'SMS notification placeholder');
          break;

        case 'email':
          logger.info({ userId, title }, 'Email notification placeholder');
          break;
      }
    },
    {
      connection,
      concurrency: 5,
    }
  );

  worker.on('completed', (job) => {
    logger.info({ jobId: job.id }, 'Notification job completed');
  });

  worker.on('failed', (job, err) => {
    logger.error({ jobId: job?.id, error: err.message }, 'Notification job failed');
  });

  logger.info('Notification worker started');
  return worker;
}
