import { Router } from 'express';
import { authenticate, authorize } from '../../common/guards';
import * as adminController from './admin.controller';

export const adminRouter = Router();

adminRouter.use(authenticate);
adminRouter.use(authorize('ADMIN'));

adminRouter.get('/dashboard', adminController.getDashboard);

adminRouter.get('/users', adminController.listUsers);
adminRouter.get('/users/:id', adminController.getUserById);
adminRouter.patch('/users/:id/status', adminController.updateUserStatus);
adminRouter.delete('/users/:id', adminController.deleteUser);

adminRouter.get('/vendors/pending', adminController.getPendingVendors);
adminRouter.patch('/vendors/:id/approve', adminController.approveVendor);
adminRouter.patch('/vendors/:id/reject', adminController.rejectVendor);
adminRouter.patch('/vendors/:id/suspend', adminController.suspendVendor);
adminRouter.patch('/vendors/:id/reactivate', adminController.reactivateVendor);

adminRouter.get('/riders/pending', adminController.getPendingRiders);
adminRouter.patch('/riders/:id/approve', adminController.approveRider);
adminRouter.patch('/riders/:id/reject', adminController.rejectRider);
adminRouter.patch('/riders/:id/suspend', adminController.suspendRider);
adminRouter.patch('/riders/:id/reactivate', adminController.reactivateRider);

adminRouter.get('/orders', adminController.listOrders);
adminRouter.get('/orders/:id', adminController.getOrderDetail);
adminRouter.post('/orders/:id/cancel', adminController.cancelOrder);

adminRouter.get('/promotions', adminController.listPromotions);
adminRouter.post('/promotions', adminController.createPromotion);
adminRouter.put('/promotions/:id', adminController.updatePromotion);
adminRouter.delete('/promotions/:id', adminController.deletePromotion);

adminRouter.get('/settings', adminController.getSettings);
adminRouter.patch('/settings', adminController.updateSettings);
