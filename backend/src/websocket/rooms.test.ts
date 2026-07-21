import { describe, it, expect } from 'vitest';
import { orderRoom, vendorRoom, riderRoom, userRoom, RoomPrefix } from './rooms';

describe('Room helpers', () => {
  it('orderRoom returns correct prefixed string', () => {
    expect(orderRoom('abc')).toBe('order:abc');
  });

  it('vendorRoom returns correct prefixed string', () => {
    expect(vendorRoom('xyz')).toBe('vendor:xyz');
  });

  it('riderRoom returns correct prefixed string', () => {
    expect(riderRoom('123')).toBe('rider:123');
  });

  it('userRoom returns correct prefixed string', () => {
    expect(userRoom('usr')).toBe('user:usr');
  });

  it('RoomPrefix constants are readonly (TypeScript as const)', () => {
    expect(RoomPrefix.ORDER).toBe('order:');
    expect(RoomPrefix.VENDOR).toBe('vendor:');
    expect(RoomPrefix.RIDER).toBe('rider:');
    expect(RoomPrefix.USER).toBe('user:');
  });
});
