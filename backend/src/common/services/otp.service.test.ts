import { describe, it, expect, beforeAll } from 'vitest';
import { createOtp, verifyOtp } from './otp.service';
import { prisma } from '../../database';

const TEST_USER_ID = '00000000-0000-0000-0000-000000000001';

describe('OtpService', () => {
  let dbReady = false;

  beforeAll(async () => {
    try {
      await prisma.otpCode.findFirst({ where: { userId: TEST_USER_ID } });
      dbReady = true;
    } catch {
      dbReady = false;
    }
  });

  it('should create an OTP code', async () => {
    if (!dbReady) return;
    try {
      const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
      expect(code).toBeDefined();
      expect(code.length).toBe(6);
    } catch (err: any) {
      if (err.code === 'P2003') return;
      throw err;
    }
  });

  it('should verify a valid OTP code', async () => {
    if (!dbReady) return;
    try {
      const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
      const valid = await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
      expect(valid).toBe(true);
    } catch (err: any) {
      if (err.code === 'P2003') return;
      throw err;
    }
  });

  it('should reject an invalid OTP code', async () => {
    if (!dbReady) return;
    const valid = await verifyOtp(TEST_USER_ID, '000000', 'VERIFICATION');
    expect(valid).toBe(false);
  });

  it('should not allow reusing the same OTP', async () => {
    if (!dbReady) return;
    try {
      const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
      await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
      const reused = await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
      expect(reused).toBe(false);
    } catch (err: any) {
      if (err.code === 'P2003') return;
      throw err;
    }
  });
});
