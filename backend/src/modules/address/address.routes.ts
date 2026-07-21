import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as addressController from './address.controller';

export const addressRouter = Router();

addressRouter.use(authenticate);
addressRouter.use(authorize('CUSTOMER'));

/**
 * @openapi
 * /addresses:
 *   post:
 *     tags: [Addresses]
 *     summary: Create a new address
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [addressLine]
 *             properties:
 *               label: { type: string }
 *               addressLine: { type: string }
 *               city: { type: string }
 *               region: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               isDefault: { type: boolean }
 *     responses:
 *       201:
 *         description: Address created
 */
addressRouter.post('/', addressController.createAddress);

/**
 * @openapi
 * /addresses:
 *   get:
 *     tags: [Addresses]
 *     summary: List saved addresses
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: List of addresses
 */
addressRouter.get('/', addressController.listAddresses);

/**
 * @openapi
 * /addresses/{id}:
 *   put:
 *     tags: [Addresses]
 *     summary: Update an address
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label: { type: string }
 *               addressLine: { type: string }
 *               city: { type: string }
 *               region: { type: string }
 *               latitude: { type: number }
 *               longitude: { type: number }
 *               isDefault: { type: boolean }
 *     responses:
 *       200:
 *         description: Address updated
 *       404:
 *         description: Address not found
 */
addressRouter.put('/:id', addressController.updateAddress);

/**
 * @openapi
 * /addresses/{id}:
 *   delete:
 *     tags: [Addresses]
 *     summary: Delete an address
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Address deleted
 *       404:
 *         description: Address not found
 */
addressRouter.delete('/:id', addressController.deleteAddress);
