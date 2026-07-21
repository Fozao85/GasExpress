import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export function correlationId(req: Request, _res: Response, next: NextFunction): void {
  const id = (req.headers['x-correlation-id'] as string) || randomUUID();
  req.headers['x-correlation-id'] = id;
  next();
}
