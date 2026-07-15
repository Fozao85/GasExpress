import { app } from './app';
import { config } from './config';
import { prisma } from './database';
import { logger } from './common/middleware';

async function main(): Promise<void> {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL');

    app.listen(config.port, () => {
      logger.info(`GasNow API running on port ${config.port}`);
      logger.info(`Environment: ${config.env}`);
      logger.info(`Health check: http://localhost:${config.port}/api/v1/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, shutting down');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, shutting down');
  await prisma.$disconnect();
  process.exit(0);
});
