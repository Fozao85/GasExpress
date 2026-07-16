import { Request, Response, NextFunction } from 'express';
import * as cartService from './cart.service';
import { addToCartSchema, updateCartItemSchema, cartItemIdSchema } from './cart.validation';
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

export async function getCart(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await cartService.getCart(req.user!.sub);
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req: Request, res: Response, next: NextFunction) {
  try {
    const { body } = validateBody(addToCartSchema, { body: req.body });
    const cart = await cartService.addToCart(req.user!.sub, body);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { params, body } = validateBody(updateCartItemSchema, {
      params: req.params,
      body: req.body,
    });
    const cart = await cartService.updateCartItemQuantity(
      req.user!.sub,
      params.itemId,
      body.quantity
    );
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { params } = validateBody(cartItemIdSchema, { params: req.params });
    const cart = await cartService.removeCartItem(req.user!.sub, params.itemId);
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req: Request, res: Response, next: NextFunction) {
  try {
    await cartService.clearCart(req.user!.sub);
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
}
