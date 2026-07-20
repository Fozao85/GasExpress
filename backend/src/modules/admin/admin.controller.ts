import { Request, Response, NextFunction } from 'express';
import * as adminService from './admin.service';
import {
  listUsersSchema,
  userIdSchema,
  updateUserStatusSchema,
  vendorIdSchema,
  listOrdersSchema,
  promotionSchema,
  promotionUpdateSchema,
  settingsUpdateSchema,
} from './admin.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validateBody(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data;
}

export async function getDashboard(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await adminService.getDashboard();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateBody(listUsersSchema, { query: req.query });
    const result = await adminService.listUsers(query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(userIdSchema, { params: req.params });
    const user = await adminService.getUserById(params.id);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { params, body } = validateBody(updateUserStatusSchema, {
      params: req.params,
      body: req.body,
    });
    const result = await adminService.updateUserStatus(req.user!.sub, params.id, body.status);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(userIdSchema, { params: req.params });
    const result = await adminService.deleteUser(req.user!.sub, params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getPendingVendors(_req: Request, res: Response, next: NextFunction) {
  try {
    const vendors = await adminService.getPendingVendors();
    res.json({ success: true, data: { vendors } });
  } catch (error) {
    next(error);
  }
}

export async function approveVendor(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.approveVendor(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function rejectVendor(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.rejectVendor(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function suspendVendor(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.suspendVendor(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function reactivateVendor(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.reactivateVendor(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getPendingRiders(_req: Request, res: Response, next: NextFunction) {
  try {
    const riders = await adminService.getPendingRiders();
    res.json({ success: true, data: { riders } });
  } catch (error) {
    next(error);
  }
}

export async function approveRider(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.approveRider(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function rejectRider(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.rejectRider(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function suspendRider(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.suspendRider(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function reactivateRider(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const result = await adminService.reactivateRider(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function listOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateBody(listOrdersSchema, { query: req.query });
    const result = await adminService.listOrders(query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getOrderDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(userIdSchema, { params: req.params });
    const order = await adminService.getOrderDetail(params.id);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function cancelOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(userIdSchema, { params: req.params });
    const result = await adminService.cancelOrder(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function listPromotions(_req: Request, res: Response, next: NextFunction) {
  try {
    const promotions = await adminService.listPromotions();
    res.json({ success: true, data: { promotions } });
  } catch (error) {
    next(error);
  }
}

export async function createPromotion(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(promotionSchema, { body: req.body });
    const promo = await adminService.createPromotion(body);
    res.status(201).json({ success: true, data: promo });
  } catch (error) {
    next(error);
  }
}

export async function updatePromotion(req: Request, res: Response, next: NextFunction) {
  try {
    const { params, body } = validateBody(promotionUpdateSchema, {
      params: req.params,
      body: req.body,
    });
    const promo = await adminService.updatePromotion(params.id, body);
    res.json({ success: true, data: promo });
  } catch (error) {
    next(error);
  }
}

export async function deletePromotion(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(userIdSchema, { params: req.params });
    const result = await adminService.deletePromotion(params.id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getSettings(_req: Request, res: Response, next: NextFunction) {
  try {
    const settings = await adminService.getSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(settingsUpdateSchema, { body: req.body });
    const settings = await adminService.updateSettings(body);
    res.json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}
