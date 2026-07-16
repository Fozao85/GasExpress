import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as vendorController from './vendors.controller';

export const vendorRouter = Router();

/**
 * @openapi
 * /vendors:
 *   get:
 *     tags: [Vendors]
 *     summary: List vendors with filters and pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *       - in: query
 *         name: lat
 *         schema: { type: number }
 *       - in: query
 *         name: lng
 *         schema: { type: number }
 *       - in: query
 *         name: radius
 *         schema: { type: integer, default: 15 }
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [distance, rating, price] }
 *       - in: query
 *         name: category
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: availability
 *         schema: { type: string, enum: [open, all], default: open }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Paginated vendor list with distance/pricing info
 */
vendorRouter.get('/', vendorController.listVendors);

/**
 * @openapi
 * /vendors/nearby:
 *   get:
 *     tags: [Vendors]
 *     summary: Get nearby vendors by coordinates
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         schema: { type: number }
 *       - in: query
 *         name: lng
 *         required: true
 *         schema: { type: number }
 *       - in: query
 *         name: radius
 *         schema: { type: integer, default: 15 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: Nearby vendors sorted by distance
 */
vendorRouter.get('/nearby', vendorController.getNearbyVendors);

/**
 * @openapi
 * /vendors/search:
 *   get:
 *     tags: [Vendors]
 *     summary: Search vendors by name
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *       - in: query
 *         name: lat
 *         schema: { type: number }
 *       - in: query
 *         name: lng
 *         schema: { type: number }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 20 }
 *     responses:
 *       200:
 *         description: Vendor search results with pagination
 */
vendorRouter.get('/search', vendorController.searchVendors);

// Protected vendor management routes
vendorRouter.get('/me', authenticate, authorize('VENDOR'), vendorController.getMyProfile);
vendorRouter.patch('/me', authenticate, authorize('VENDOR'), vendorController.updateMyProfile);
vendorRouter.get(
  '/me/inventory',
  authenticate,
  authorize('VENDOR'),
  vendorController.getMyInventory
);
vendorRouter.post(
  '/me/inventory',
  authenticate,
  authorize('VENDOR'),
  vendorController.addInventoryItem
);
vendorRouter.patch(
  '/me/inventory/:inventoryId',
  authenticate,
  authorize('VENDOR'),
  vendorController.updateInventoryItem
);
vendorRouter.delete(
  '/me/inventory/:inventoryId',
  authenticate,
  authorize('VENDOR'),
  vendorController.deleteInventoryItem
);
vendorRouter.get('/me/orders', authenticate, authorize('VENDOR'), vendorController.getMyOrders);
vendorRouter.get(
  '/me/orders/:id',
  authenticate,
  authorize('VENDOR'),
  vendorController.getVendorOrderById
);
vendorRouter.patch(
  '/me/orders/:id/status',
  authenticate,
  authorize('VENDOR'),
  vendorController.updateOrderStatus
);
vendorRouter.get('/me/dashboard', authenticate, authorize('VENDOR'), vendorController.getDashboard);

/**
 * @openapi
 * /vendors/{id}:
 *   get:
 *     tags: [Vendors]
 *     summary: Get vendor details by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Vendor details with inventory and pricing
 *       404:
 *         description: Vendor not found
 */
vendorRouter.get('/:id', vendorController.getVendorById);

/**
 * @openapi
 * /vendors/{id}/availability:
 *   get:
 *     tags: [Vendors]
 *     summary: Check vendor availability
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Vendor availability status
 */
vendorRouter.get('/:id/availability', vendorController.getVendorAvailability);
