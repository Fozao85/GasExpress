import { Router } from 'express';
import * as vendorController from '../vendors/vendors.controller';

const router = Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: List cylinder categories
 *     responses:
 *       200:
 *         description: List of cylinder sizes as categories
 */
router.get('/', vendorController.listCategories);

/**
 * @openapi
 * /categories/{id}/products:
 *   get:
 *     tags: [Categories]
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Products with vendor info and pricing
 *       404:
 *         description: Category not found
 */
router.get('/:id/products', vendorController.getProductsByCategory);

export { router as categoryRouter };
