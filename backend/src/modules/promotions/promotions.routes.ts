import { Router } from 'express';
import * as vendorController from '../vendors/vendors.controller';

const router = Router();

/**
 * @openapi
 * /promotions:
 *   get:
 *     tags: [Promotions]
 *     summary: List active promotions
 *     responses:
 *       200:
 *         description: Active promotions list
 */
router.get('/', vendorController.listPromotions);

export { router as promotionRouter };
