import { Request, Response, NextFunction } from 'express';
import * as vendorService from './vendors.service';
import {
  listVendorsSchema,
  nearbyVendorsSchema,
  vendorIdSchema,
  searchVendorsSchema,
  categoryIdSchema,
  vendorProfileUpdateSchema,
  inventoryCreateSchema,
  inventoryUpdateSchema,
  inventoryIdSchema,
  updateOrderStatusSchema,
  vendorOrderListSchema,
} from './vendors.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validateQuery(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data.query;
}

function validateParams(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data.params;
}

export async function listVendors(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validateQuery(listVendorsSchema, { query: req.query });
    const result = await vendorService.listVendors(query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getNearbyVendors(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validateQuery(nearbyVendorsSchema, { query: req.query });
    const result = await vendorService.getNearbyVendors(query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getVendorById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = validateParams(vendorIdSchema, { params: req.params });
    const result = await vendorService.getVendorById(id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function searchVendors(req: Request, res: Response, next: NextFunction) {
  try {
    const query = validateQuery(searchVendorsSchema, { query: req.query });
    const result = await vendorService.searchVendors(query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function listCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await vendorService.listCategories();
    res.json({ success: true, data: { categories: result } });
  } catch (error) {
    next(error);
  }
}

export async function getProductsByCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = validateParams(categoryIdSchema, { params: req.params });
    const result = await vendorService.getProductsByCategory(id);
    res.json({ success: true, data: { products: result } });
  } catch (error) {
    next(error);
  }
}

export async function getVendorAvailability(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = validateParams(vendorIdSchema, { params: req.params });
    const result = await vendorService.getVendorAvailability(id);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function listPromotions(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await vendorService.listPromotions();
    res.json({ success: true, data: { promotions: result } });
  } catch (error) {
    next(error);
  }
}

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

export async function getMyProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const profile = await vendorService.getMyVendorProfile(req.user!.sub);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function updateMyProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(vendorProfileUpdateSchema, { body: req.body });
    const profile = await vendorService.updateMyVendorProfile(req.user!.sub, body);
    res.json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

export async function getMyInventory(req: Request, res: Response, next: NextFunction) {
  try {
    const inventory = await vendorService.getMyInventory(req.user!.sub);
    res.json({ success: true, data: { inventory } });
  } catch (error) {
    next(error);
  }
}

export async function addInventoryItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(inventoryCreateSchema, { body: req.body });
    const item = await vendorService.addInventoryItem(req.user!.sub, body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateInventoryItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = validateBody(inventoryUpdateSchema, {
      body: req.body,
      params: req.params,
    });
    const item = await vendorService.updateInventoryItem(req.user!.sub, params.inventoryId, body);
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteInventoryItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(inventoryIdSchema, { params: req.params });
    const result = await vendorService.deleteInventoryItem(req.user!.sub, params.inventoryId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = validateBody(vendorOrderListSchema, { query: req.query });
    const result = await vendorService.getMyOrders(req.user!.sub, query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getVendorOrderById(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(vendorIdSchema, { params: req.params });
    const order = await vendorService.getVendorOrderById(req.user!.sub, params.id);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function updateOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, params } = validateBody(updateOrderStatusSchema, {
      body: req.body,
      params: req.params,
    });
    const order = await vendorService.updateOrderStatus(req.user!.sub, params.id, body);
    res.json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
}

export async function getDashboard(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await vendorService.getDashboard(req.user!.sub);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}
