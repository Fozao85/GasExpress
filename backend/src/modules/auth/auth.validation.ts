import { z } from 'zod';
import { UserRole } from '@prisma/client';

const phoneRegex = /^\+?[1-9]\d{6,14}$/;

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2).max(100),
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    email: z.string().email().optional(),
    password: z.string().min(8).max(128),
    role: z.nativeEnum(UserRole),
    businessName: z.string().min(1).max(200).optional(),
    vehicleType: z.string().max(100).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    password: z.string().min(1),
  }),
});

export const otpSendSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    type: z.enum(['VERIFICATION', 'PASSWORD_RESET']),
  }),
});

export const otpVerifySchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    code: z.string().length(6),
    type: z.enum(['VERIFICATION', 'PASSWORD_RESET']),
  }),
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
    code: z.string().length(6),
    password: z.string().min(8).max(128),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type OtpSendInput = z.infer<typeof otpSendSchema>['body'];
export type OtpVerifyInput = z.infer<typeof otpVerifySchema>['body'];
export type RefreshInput = z.infer<typeof refreshSchema>['body'];
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>['body'];
