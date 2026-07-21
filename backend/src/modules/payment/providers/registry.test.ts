import { describe, it, expect } from 'vitest';
import { getProvider, getAllProviders } from './registry';

describe('Payment Provider Registry', () => {
  it('returns CASH provider', () => {
    const provider = getProvider('CASH');
    expect(provider.name).toBe('CASH');
  });

  it('returns MOBILE_MONEY provider', () => {
    const provider = getProvider('MOBILE_MONEY');
    expect(provider.name).toBe('MOBILE_MONEY');
  });

  it('returns MTN_MOMO provider', () => {
    const provider = getProvider('MTN_MOMO');
    expect(provider.name).toBe('MTN_MOMO');
  });

  it('returns ORANGE_MONEY provider', () => {
    const provider = getProvider('ORANGE_MONEY');
    expect(provider.name).toBe('ORANGE_MONEY');
  });

  it('throws for unknown provider', () => {
    expect(() => getProvider('BITCOIN')).toThrow('Unknown payment provider');
  });

  it('getAllProviders returns all 4 providers', () => {
    const all = getAllProviders();
    expect(all).toHaveLength(4);
  });
});
