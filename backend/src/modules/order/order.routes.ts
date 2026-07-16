import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as orderController from './order.controller';

export const orderRouter = Router();

orderRouter.use(authenticate);
orderRouter.use(authorize('CUSTOMER'));

/**
 * @openapi
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Create order from cart
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [addressId, paymentMethod]
 *             properties:
 *               addressId: { type: string, format: uuid }
 *               paymentMethod: { type: string, enum: [CASH, MOBILE_MONEY] }
 *               notes: { type: string, maxLength: 500 }
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Validation error
 *       422:
 *         description: Business logic error (stock, vendor closed, etc.)
 */
orderRouter.post('/', orderController.createOrder);

/**
 * @openapi
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: List customer orders
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated order list
 */
orderRouter.get('/', orderController.getOrders);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Get order details
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 */
orderRouter.get('/:id', orderController.getOrderById);

/**
 * @openapi
 * /orders/{id}/status:
 *   get:
 *     tags: [Orders]
 *     summary: Get order status history
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Status history list
 */
orderRouter.get('/:id/status', orderController.getOrderStatus);

/**
 * @openapi
 * /orders/{id}/cancel:
 *   post:
 *     tags: [Orders]
 *     summary: Cancel a pending order
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Order cancelled
 *       400:
 *         description: Order cannot be cancelled (not pending)
 */
orderRouter.post('/:id/cancel', orderController.cancelOrder);
