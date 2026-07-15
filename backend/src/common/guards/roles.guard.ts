import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../exceptions/app-error';
import { UserRole } from '@prisma/client';

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
}
