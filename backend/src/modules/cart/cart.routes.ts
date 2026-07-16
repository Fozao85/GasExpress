import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as cartController from './cart.controller';

export const cartRouter = Router();

cartRouter.use(authenticate);
cartRouter.use(authorize('CUSTOMER'));

/**
 * @openapi
 * /cart:
 *   post:
 *     tags: [Cart]
 *     summary: Add item to cart
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [inventoryId, vendorId, quantity]
 *             properties:
 *               inventoryId: { type: string, format: uuid }
 *               vendorId: { type: string, format: uuid }
 *               quantity: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Updated cart
 *       400:
 *         description: Validation error
 */
cartRouter.post('/', cartController.addToCart);

/**
 * @openapi
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get current cart
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Current cart or null
 */
cartRouter.get('/', cartController.getCart);

/**
 * @openapi
 * /cart/{itemId}:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart item quantity
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity: { type: integer, minimum: 1 }
 *     responses:
 *       200:
 *         description: Updated cart
 *       404:
 *         description: Cart item not found
 */
cartRouter.put('/:itemId', cartController.updateCartItem);

/**
 * @openapi
 * /cart/{itemId}:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove item from cart
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Updated cart (null if cart is now empty)
 *       404:
 *         description: Cart item not found
 */
cartRouter.delete('/:itemId', cartController.removeCartItem);

/**
 * @openapi
 * /cart:
 *   delete:
 *     tags: [Cart]
 *     summary: Clear entire cart
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Cart cleared
 */
cartRouter.delete('/', cartController.clearCart);
