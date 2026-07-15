import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'].filter(
    (level) => process.env.LOG_LEVEL === 'debug' || level !== 'query'
  ) as ('query' | 'info' | 'warn' | 'error')[],
});
