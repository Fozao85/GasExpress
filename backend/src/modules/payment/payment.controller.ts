import { Request, Response, NextFunction } from 'express';
import * as paymentService from './payment.service';
import { initiatePaymentSchema, paymentIdSchema } from './payment.validation';
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

export async function initiatePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(initiatePaymentSchema, { body: req.body });
    const result = await paymentService.initiatePayment(req.user!.sub, body.orderId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getPaymentById(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(paymentIdSchema, { params: req.params });
    const payment = await paymentService.getPaymentById(req.user!.sub, params.id);
    res.json({ success: true, data: payment });
  } catch (error) {
    next(error);
  }
}
