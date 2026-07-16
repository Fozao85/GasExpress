import { Request, Response, NextFunction } from 'express';
import * as riderService from './rider.service';
import {
  riderProfileUpdateSchema,
  riderAvailabilitySchema,
  acceptOrderSchema,
  updateDeliveryStatusSchema,
  trackingEventSchema,
  riderOrderListSchema,
} from './rider.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validateBody(schema: any, data: any) {
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

export async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await riderService.getMyProfile(req.user!.sub);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateMyProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(riderProfileUpdateSchema, { body: req.body });
    const profile = await riderService.updateMyProfile(req.user!.sub, body);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(riderAvailabilitySchema, { body: req.body });
    const result = await riderService.updateAvailability(req.user!.sub, body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getAvailableOrders(_req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await riderService.getAvailableOrders();
    res.json({ success: true, data: { orders } });
  } catch (error) {
    next(error);
  }
}

export async function acceptOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(acceptOrderSchema, { params: req.params });
    const result = await riderService.acceptOrder(req.user!.sub, params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await riderService.getMyOrders(req.user!.sub);
    res.json({ success: true, data: { orders } });
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(acceptOrderSchema, { params: req.params });
    const order = await riderService.getOrderById(req.user!.sub, params.id);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function updateDeliveryStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = validateBody(updateDeliveryStatusSchema, {
      body: req.body,
      params: req.params,
    });
    const result = await riderService.updateDeliveryStatus(req.user!.sub, params.id, body);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function submitTracking(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = validateBody(trackingEventSchema, {
      body: req.body,
      params: req.params,
    });
    const event = await riderService.submitTracking(req.user!.sub, params.id, body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
}

export async function getDeliveryHistory(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateBody(riderOrderListSchema, { query: req.query });
    const result = await riderService.getDeliveryHistory(req.user!.sub, query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await riderService.getDashboard(req.user!.sub);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
