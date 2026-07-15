import { describe, it, expect } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { signAccessToken } from '../services/jwt.service';
import { authenticate } from './auth.guard';

function mockReq(headers: Record<string, string>): Partial<Request> {
  return { headers: headers as any } as Request;
}

function mockRes(): Partial<Response> {
  const res: Partial<Response> = {};
  res.status = (code: number) => {
    res.statusCode = code;
    return res as Response;
  };
  res.json = (data: any) => data;
  return res;
}

describe('AuthGuard', () => {
  it('should throw if no authorization header', () => {
    const req = mockReq({});
    expect(() =>
      authenticate(req as Request, mockRes() as Response, (() => {}) as NextFunction)
    ).toThrow('Missing or invalid authorization header');
  });

  it('should throw if token is missing after Bearer', () => {
    const req = mockReq({ authorization: 'Bearer ' });
    expect(() =>
      authenticate(req as Request, mockRes() as Response, (() => {}) as NextFunction)
    ).toThrow();
  });

  it('should throw if token is invalid', () => {
    const req = mockReq({ authorization: 'Bearer invalid-token' });
    expect(() =>
      authenticate(req as Request, mockRes() as Response, (() => {}) as NextFunction)
    ).toThrow();
  });

  it('should pass with valid token', () => {
    const token = signAccessToken('user-1', 'CUSTOMER');
    const req = mockReq({ authorization: `Bearer ${token}` });
    let nextCalled = false;
    authenticate(
      req as Request,
      mockRes() as Response,
      (() => {
        nextCalled = true;
      }) as NextFunction
    );
    expect(nextCalled).toBe(true);
    expect((req as any).user).toBeDefined();
    expect((req as any).user.sub).toBe('user-1');
  });
});
