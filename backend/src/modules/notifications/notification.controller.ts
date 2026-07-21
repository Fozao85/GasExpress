import { Request, Response, NextFunction } from 'express';
import * as notificationService from './notification.service';
import { paginationSchema, notificationIdSchema } from './notification.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validateQuery(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data;
}

function validateParams(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data;
}

export async function listNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateQuery(paginationSchema, { query: req.query });
    const result = await notificationService.listNotifications(req.user!.sub, query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getUnreadCount(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await notificationService.getUnreadCount(req.user!.sub);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function markAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateParams(notificationIdSchema, { params: req.params });
    const result = await notificationService.markAsRead(req.user!.sub, params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function markAllAsRead(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await notificationService.markAllAsRead(req.user!.sub);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}
