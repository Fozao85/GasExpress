import type { PaymentProvider } from './interface';
import { cashProvider } from './cash.provider';
import { mobileMoneyProvider } from './mobile-money.provider';
import { mtnMoMoProvider } from './mtn-momo.provider';
import { orangeMoneyProvider } from './orange-money.provider';

const providerMap: Record<string, PaymentProvider> = {
  CASH: cashProvider,
  MOBILE_MONEY: mobileMoneyProvider,
  MTN_MOMO: mtnMoMoProvider,
  ORANGE_MONEY: orangeMoneyProvider,
};

export function getProvider(name: string): PaymentProvider {
  const provider = providerMap[name];
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`);
  }
  return provider;
}

export function getAllProviders(): PaymentProvider[] {
  return Object.values(providerMap);
}
