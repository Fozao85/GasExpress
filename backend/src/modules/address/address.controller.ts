import { Request, Response, NextFunction } from 'express';
import * as addressService from './address.service';
import { createAddressSchema, updateAddressSchema } from './address.validation';
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

export async function listAddresses(req: Request, res: Response, next: NextFunction) {
  try {
    const addresses = await addressService.listAddresses(req.user!.sub);
    res.json({ success: true, data: { addresses } });
  } catch (error) {
    next(error);
  }
}

export async function createAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(createAddressSchema, { body: req.body });
    const address = await addressService.createAddress(req.user!.sub, body);
    res.status(201).json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
}

export async function updateAddress(req: Request, res: Response, next: NextFunction) {
  try {
    const { params, body } = validateBody(updateAddressSchema, {
      params: req.params,
      body: req.body,
    });
    const address = await addressService.updateAddress(req.user!.sub, params.id, body);
    res.json({ success: true, data: address });
  } catch (error) {
    next(error);
  }
}
