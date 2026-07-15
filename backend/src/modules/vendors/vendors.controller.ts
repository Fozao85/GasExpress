import { Request, Response, NextFunction } from 'express';
import * as vendorService from './vendors.service';
import {
  listVendorsSchema,
  nearbyVendorsSchema,
  vendorIdSchema,
  searchVendorsSchema,
  categoryIdSchema,
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
