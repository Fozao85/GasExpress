import crypto from 'crypto';
import { prisma } from '../../database';
import { hashPassword, comparePassword } from '../../common/services/password.service';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../../common/services/jwt.service';
import { createOtp, verifyOtp } from '../../common/services/otp.service';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../common/exceptions/app-error';
import type {
  RegisterInput,
  LoginInput,
  OtpSendInput,
  OtpVerifyInput,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './auth.validation';

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (existing) {
    throw new ConflictError('Phone number already registered');
  }

  if (input.email) {
    const emailUser = await prisma.user.findFirst({ where: { email: input.email } });
    if (emailUser) {
      throw new ConflictError('Email already registered');
    }
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      fullName: input.fullName,
      phone: input.phone,
      email: input.email ?? null,
      passwordHash,
      role: input.role,
      status: 'PENDING',
    },
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (input.role === 'VENDOR') {
    await prisma.vendorProfile.create({
      data: {
        userId: user.id,
        businessName: (input as any).businessName || input.fullName,
        phone: input.phone,
        address: '',
        verificationStatus: 'PENDING',
        isOpen: false,
      },
    });
  }

  if (input.role === 'RIDER') {
    await prisma.riderProfile.create({
      data: {
        userId: user.id,
        vehicleType: (input as any).vehicleType || null,
      },
    });
  }

  const otpCode = await createOtp(user.id, 'VERIFICATION');

  return { user, otpCode };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user) {
    throw new UnauthorizedError('Invalid phone or password');
  }

  if (user.status === 'SUSPENDED') {
    throw new UnauthorizedError('Account has been suspended');
  }

  const valid = await comparePassword(input.password, user.passwordHash);
  if (!valid) {
    throw new UnauthorizedError('Invalid phone or password');
  }

  const jti = crypto.randomUUID();
  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id, jti);

  const refreshExpiresMs = parseDuration(config.jwt.refreshExpiresIn);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + refreshExpiresMs),
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  };
}

export async function sendOtp(input: OtpSendInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user) {
    throw new NotFoundError('User');
  }

  const otpCode = await createOtp(user.id, input.type as any);
  return { otpCode };
}

export async function verifyOtpCode(input: OtpVerifyInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user) {
    throw new NotFoundError('User');
  }

  const valid = await verifyOtp(user.id, input.code, input.type as any);
  if (!valid) {
    throw new ValidationError([{ field: 'code', message: 'Invalid or expired OTP code' }]);
  }

  if (input.type === 'VERIFICATION') {
    await prisma.user.update({
      where: { id: user.id },
      data: { status: 'ACTIVE' },
    });
  }

  return { verified: true };
}

export async function refreshTokens(refreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new UnauthorizedError('Invalid or expired refresh token');
  }

  const stored = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (!stored || stored.expiresAt < new Date()) {
    throw new UnauthorizedError('Refresh token has expired');
  }

  await prisma.refreshToken.delete({ where: { id: stored.id } });

  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, role: true },
  });

  if (!user) {
    throw new UnauthorizedError('User no longer exists');
  }

  const jti = crypto.randomUUID();
  const newAccessToken = signAccessToken(user.id, user.role);
  const newRefreshToken = signRefreshToken(user.id, jti);

  const refreshExpiresMs = parseDuration(config.jwt.refreshExpiresIn);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + refreshExpiresMs),
    },
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

export async function forgotPassword(input: ForgotPasswordInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user) {
    throw new NotFoundError('User');
  }

  const otpCode = await createOtp(user.id, 'PASSWORD_RESET');
  return { otpCode };
}

export async function resetPassword(input: ResetPasswordInput) {
  const user = await prisma.user.findUnique({ where: { phone: input.phone } });
  if (!user) {
    throw new NotFoundError('User');
  }

  const valid = await verifyOtp(user.id, input.code, 'PASSWORD_RESET');
  if (!valid) {
    throw new ValidationError([{ field: 'code', message: 'Invalid or expired reset code' }]);
  }

  const passwordHash = await hashPassword(input.password);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  await prisma.refreshToken.deleteMany({ where: { userId: user.id } });

  return { success: true };
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new NotFoundError('User');
  }

  return user;
}

export async function logoutUser(userId: string) {
  await prisma.refreshToken.deleteMany({ where: { userId } });
}

import { config } from '../../config';

function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([smhd])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case 's':
      return value * 1000;
    case 'm':
      return value * 60 * 1000;
    case 'h':
      return value * 60 * 60 * 1000;
    case 'd':
      return value * 24 * 60 * 60 * 1000;
    default:
      return 7 * 24 * 60 * 60 * 1000;
  }
}
