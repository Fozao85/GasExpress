import crypto from 'crypto';
import { prisma } from '../../database';
import { OtpType } from '@prisma/client';

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;

function generateCode(): string {
  return crypto
    .randomInt(0, 10 ** OTP_LENGTH)
    .toString()
    .padStart(OTP_LENGTH, '0');
}

export async function createOtp(userId: string, type: OtpType): Promise<string> {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.otpCode.create({
    data: { userId, code, type, expiresAt },
  });

  return code;
}

export async function verifyOtp(userId: string, code: string, type: OtpType): Promise<boolean> {
  const otp = await prisma.otpCode.findFirst({
    where: {
      userId,
      code,
      type,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp) return false;

  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { used: true, usedAt: new Date() },
  });

  return true;
}
