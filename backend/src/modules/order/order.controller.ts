import { Request, Response, NextFunction } from 'express';
import * as orderService from './order.service';
import { createOrderSchema, orderIdSchema, listOrdersSchema } from './order.validation';
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

export async function createOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(createOrderSchema, { body: req.body });
    const order = await orderService.createOrder(req.user!.id, body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function getOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateBody(listOrdersSchema, { query: req.query });
    const result = await orderService.getOrders(req.user!.id, query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(orderIdSchema, { params: req.params });
    const order = await orderService.getOrderById(req.user!.id, params.id);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function getOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(orderIdSchema, { params: req.params });
    const history = await orderService.getOrderStatusHistory(req.user!.id, params.id);
    res.json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
}

export async function cancelOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(orderIdSchema, { params: req.params });
    const order = await orderService.cancelOrder(req.user!.id, params.id);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}
