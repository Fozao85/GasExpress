import jwt from 'jsonwebtoken';
import { config } from '../../config';

export interface AccessTokenPayload {
  sub: string;
  role: string;
  type: 'access';
}

export interface RefreshTokenPayload {
  sub: string;
  type: 'refresh';
  jti: string;
}

export function signAccessToken(userId: string, role: string): string {
  const expiresIn: string = config.jwt.expiresIn;
  return jwt.sign({ sub: userId, role, type: 'access' as const }, config.jwt.secret, {
    expiresIn,
  } as jwt.SignOptions);
}

export function signRefreshToken(userId: string, jti: string): string {
  const expiresIn: string = config.jwt.refreshExpiresIn;
  return jwt.sign({ sub: userId, type: 'refresh' as const, jti }, config.jwt.refreshSecret, {
    expiresIn,
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, config.jwt.secret) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, config.jwt.refreshSecret) as RefreshTokenPayload;
}
