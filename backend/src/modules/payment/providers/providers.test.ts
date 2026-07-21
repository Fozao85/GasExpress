import { describe, it, expect } from 'vitest';
import { cashProvider } from './cash.provider';
import { mobileMoneyProvider, verifyMobileMoneySignature } from './mobile-money.provider';
import { mtnMoMoProvider, verifyMtnMoMoSignature } from './mtn-momo.provider';
import { orangeMoneyProvider, verifyOrangeMoneySignature } from './orange-money.provider';

describe('CASH provider', () => {
  it('initiates without phone', async () => {
    const result = await cashProvider.initiate({ orderId: 'o1', userId: 'u1', amount: 100 });
    expect(result.success).toBe(true);
    expect(result.transactionReference).toMatch(/^CASH-/);
    expect(result.status).toBe('PENDING');
  });

  it('verifies as pending', async () => {
    const result = await cashProvider.verify({ transactionReference: 'CASH-123' });
    expect(result.success).toBe(true);
    expect(result.status).toBe('PENDING');
  });
});

describe('Mobile Money provider', () => {
  it('fails without phone number', async () => {
    const result = await mobileMoneyProvider.initiate({ orderId: 'o1', userId: 'u1', amount: 100 });
    expect(result.success).toBe(false);
    expect(result.status).toBe('FAILED');
  });

  it('initiates with phone number', async () => {
    const result = await mobileMoneyProvider.initiate({
      orderId: 'o1',
      userId: 'u1',
      amount: 100,
      phoneNumber: '+233501234567',
    });
    expect(result.success).toBe(true);
    expect(result.transactionReference).toMatch(/^MM-/);
    expect(result.status).toBe('PENDING');
  });

  it('verifies as success', async () => {
    const result = await mobileMoneyProvider.verify({ transactionReference: 'MM-123' });
    expect(result.success).toBe(true);
    expect(result.status).toBe('SUCCESS');
  });
});

describe('MTN MoMo provider', () => {
  it('fails without phone number', async () => {
    const result = await mtnMoMoProvider.initiate({ orderId: 'o1', userId: 'u1', amount: 100 });
    expect(result.success).toBe(false);
  });

  it('initiates with phone', async () => {
    const result = await mtnMoMoProvider.initiate({
      orderId: 'o1',
      userId: 'u1',
      amount: 100,
      phoneNumber: '+233501234567',
    });
    expect(result.success).toBe(true);
    expect(result.transactionReference).toMatch(/^MTN-/);
  });
});

describe('Orange Money provider', () => {
  it('fails without phone number', async () => {
    const result = await orangeMoneyProvider.initiate({ orderId: 'o1', userId: 'u1', amount: 100 });
    expect(result.success).toBe(false);
  });

  it('initiates with phone', async () => {
    const result = await orangeMoneyProvider.initiate({
      orderId: 'o1',
      userId: 'u1',
      amount: 100,
      phoneNumber: '+233501234567',
    });
    expect(result.success).toBe(true);
    expect(result.transactionReference).toMatch(/^ORN-/);
  });
});

describe('Signature verification', () => {
  it('mobile money signature verification works', () => {
    const signature = verifyMobileMoneySignature('test-payload', 'wrong-sig');
    expect(signature).toBe(false);
  });

  it('mtn momo signature verification works', () => {
    const signature = verifyMtnMoMoSignature('test-payload', 'wrong-sig');
    expect(signature).toBe(false);
  });

  it('orange money signature verification works', () => {
    const signature = verifyOrangeMoneySignature('test-payload', 'wrong-sig');
    expect(signature).toBe(false);
  });
});
