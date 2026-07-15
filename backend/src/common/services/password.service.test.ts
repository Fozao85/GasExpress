import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from './password.service';

describe('PasswordService', () => {
  it('should hash a password', async () => {
    const hash = await hashPassword('StrongP@ss123');
    expect(hash).toBeDefined();
    expect(hash).not.toBe('StrongP@ss123');
  });

  it('should verify correct password', async () => {
    const hash = await hashPassword('StrongP@ss123');
    const valid = await comparePassword('StrongP@ss123', hash);
    expect(valid).toBe(true);
  });

  it('should reject wrong password', async () => {
    const hash = await hashPassword('StrongP@ss123');
    const valid = await comparePassword('WrongPassword', hash);
    expect(valid).toBe(false);
  });

  it('should produce different hashes for same password', async () => {
    const hash1 = await hashPassword('SamePassword');
    const hash2 = await hashPassword('SamePassword');
    expect(hash1).not.toBe(hash2);
  });
});
