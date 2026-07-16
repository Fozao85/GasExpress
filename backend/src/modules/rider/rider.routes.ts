import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as riderController from './rider.controller';

export const riderRouter = Router();

riderRouter.use(authenticate);
riderRouter.use(authorize('RIDER'));

riderRouter.get('/me/profile', riderController.getMyProfile);
riderRouter.patch('/me/profile', riderController.updateMyProfile);
riderRouter.patch('/me/availability', riderController.updateAvailability);
riderRouter.get('/me/available-orders', riderController.getAvailableOrders);
riderRouter.post('/me/orders/:id/accept', riderController.acceptOrder);
riderRouter.get('/me/orders', riderController.getMyOrders);
riderRouter.get('/me/orders/:id', riderController.getOrderById);
riderRouter.patch('/me/orders/:id/status', riderController.updateDeliveryStatus);
riderRouter.post('/me/orders/:id/tracking', riderController.submitTracking);
riderRouter.get('/me/history', riderController.getDeliveryHistory);
riderRouter.get('/me/dashboard', riderController.getDashboard);
