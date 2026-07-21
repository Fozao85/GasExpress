import { api } from './api';

export interface InitiatePaymentInput {
  orderId: string;
  provider: 'CASH' | 'MOBILE_MONEY' | 'MTN_MOMO' | 'ORANGE_MONEY';
  phoneNumber?: string;
}

export interface InitiatePaymentResult {
  transactionId: string;
  reference: string;
  status: string;
  providerReference?: string;
  authorizationUrl?: string;
  message?: string;
}

export interface VerifyPaymentInput {
  transactionReference: string;
}

export interface VerifyPaymentResult {
  transactionId: string;
  reference: string;
  status: string;
  paidAt?: string;
}

export async function initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
  const { data } = await api.post('/payments/initiate', input);
  return data.data;
}

export async function verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
  const { data } = await api.post('/payments/verify', input);
  return data.data;
}

export async function getPaymentById(id: string): Promise<any> {
  const { data } = await api.get(`/payments/${id}`);
  return data.data;
}
