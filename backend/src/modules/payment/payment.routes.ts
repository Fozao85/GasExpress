import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as paymentController from './payment.controller';

export const paymentRouter = Router();

paymentRouter.use(authenticate);
paymentRouter.use(authorize('CUSTOMER'));

/**
 * @openapi
 * /payments/initiate:
 *   post:
 *     tags: [Payments]
 *     summary: Initiate payment for an order
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId]
 *             properties:
 *               orderId: { type: string, format: uuid }
 *               gateway: { type: string, enum: [paystack, flutterwave] }
 *     responses:
 *       200:
 *         description: Payment initiation response
 *       404:
 *         description: Order not found
 */
paymentRouter.post('/initiate', paymentController.initiatePayment);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Get payment details
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Payment details
 *       404:
 *         description: Payment not found
 */
paymentRouter.get('/:id', paymentController.getPaymentById);
