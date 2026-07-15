import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import {
  registerSchema,
  loginSchema,
  otpSendSchema,
  otpVerifySchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './auth.validation';
import { ValidationError } from '../../common/exceptions/app-error';

function validate(schema: any, data: any) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    throw new ValidationError(errors);
  }
  return result.data.body;
}

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(registerSchema, { body: req.body });
    const result = await authService.registerUser(input);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(loginSchema, { body: req.body });
    const result = await authService.loginUser(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function sendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(otpSendSchema, { body: req.body });
    const result = await authService.sendOtp(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(otpVerifySchema, { body: req.body });
    const result = await authService.verifyOtpCode(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(refreshSchema, { body: req.body });
    const result = await authService.refreshTokens(input.refreshToken);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(forgotPasswordSchema, { body: req.body });
    const result = await authService.forgotPassword(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const input = validate(resetPasswordSchema, { body: req.body });
    const result = await authService.resetPassword(input);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getMe(req.user!.sub);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    await authService.logoutUser(req.user!.sub);
    res.json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
}
