import { describe, it, expect } from 'vitest';
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './jwt.service';

describe('JwtService', () => {
  it('should sign and verify an access token', () => {
    const token = signAccessToken('user-1', 'CUSTOMER');
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.role).toBe('CUSTOMER');
    expect(payload.type).toBe('access');
  });

  it('should sign and verify a refresh token', () => {
    const token = signRefreshToken('user-1', 'uuid-123');
    const payload = verifyRefreshToken(token);
    expect(payload.sub).toBe('user-1');
    expect(payload.jti).toBe('uuid-123');
    expect(payload.type).toBe('refresh');
  });

  it('should reject invalid access token', () => {
    expect(() => verifyAccessToken('invalid-token')).toThrow();
  });

  it('should reject invalid refresh token', () => {
    expect(() => verifyRefreshToken('invalid-token')).toThrow();
  });

  it('should reject access token on refresh secret', () => {
    const token = signAccessToken('user-1', 'CUSTOMER');
    expect(() => verifyRefreshToken(token)).toThrow();
  });
});
