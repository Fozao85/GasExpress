import { Request, Response, NextFunction } from 'express';
import * as paymentService from './payment.service';
import { initiatePaymentSchema, paymentIdSchema, verifyPaymentSchema } from './payment.validation';
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
    const result = await paymentService.initiatePayment(req.user!.sub, body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function verifyPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(verifyPaymentSchema, { body: req.body });
    const result = await paymentService.verifyPayment(req.user!.sub, body.transactionReference);
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

export async function handleWebhook(req: Request, res: Response, next: NextFunction) {
  try {
    const providerName = req.params.provider?.toUpperCase() || 'MOBILE_MONEY';
    const result = await paymentService.handleWebhook(providerName, {
      provider: providerName,
      body: req.body,
      headers: req.headers as Record<string, string | string[] | undefined>,
    });
    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    next(error);
  }
}
