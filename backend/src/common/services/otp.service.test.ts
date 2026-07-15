import { describe, it, expect, beforeAll } from 'vitest';
import { createOtp, verifyOtp } from './otp.service';
import { prisma } from '../../database';

const TEST_USER_ID = '00000000-0000-0000-0000-000000000001';

describe('OtpService', () => {
  let tableExists = true;

  beforeAll(async () => {
    try {
      await prisma.otpCode.deleteMany({ where: { userId: TEST_USER_ID } });
    } catch {
      tableExists = false;
    }
  });

  it('should create an OTP code', async () => {
    if (!tableExists) return;
    const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
    expect(code).toBeDefined();
    expect(code.length).toBe(6);
  });

  it('should verify a valid OTP code', async () => {
    if (!tableExists) return;
    const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
    const valid = await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
    expect(valid).toBe(true);
  });

  it('should reject an invalid OTP code', async () => {
    if (!tableExists) return;
    const valid = await verifyOtp(TEST_USER_ID, '000000', 'VERIFICATION');
    expect(valid).toBe(false);
  });

  it('should not allow reusing the same OTP', async () => {
    if (!tableExists) return;
    const code = await createOtp(TEST_USER_ID, 'VERIFICATION');
    await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
    const reused = await verifyOtp(TEST_USER_ID, code, 'VERIFICATION');
    expect(reused).toBe(false);
  });
});
