import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as paymentController from './payment.controller';

export const paymentRouter = Router();
export const webhookRouter = Router();

paymentRouter.use(authenticate);
paymentRouter.use(authorize('CUSTOMER'));

paymentRouter.post('/initiate', paymentController.initiatePayment);
paymentRouter.post('/verify', paymentController.verifyPayment);
paymentRouter.get('/:id', paymentController.getPaymentById);

webhookRouter.post('/payment/:provider', paymentController.handleWebhook);
