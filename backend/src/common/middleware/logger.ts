import { Request, Response, NextFunction } from 'express';
import pino from 'pino';
import { config } from '../../config';

const transport =
  config.env === 'development' ? { target: 'pino-pretty', options: { colorize: true } } : undefined;

const logger = pino({
  level: config.log.level,
  ...(transport ? { transport } : {}),
});

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: Date.now() - start,
    });
  });
  next();
}

export { logger };
