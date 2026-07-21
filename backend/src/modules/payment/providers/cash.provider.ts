import type {
  PaymentProvider,
  InitiatePaymentInput,
  InitiatePaymentResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  WebhookPayload,
} from './interface';
import { randomUUID } from 'crypto';

export const cashProvider: PaymentProvider = {
  name: 'CASH',

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    return {
      success: true,
      transactionReference: `CASH-${randomUUID().slice(0, 8)}`.toUpperCase(),
      status: 'PENDING',
      message: 'Pay on delivery',
    };
  },

  async verify(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    return {
      success: true,
      status: 'PENDING',
      message: 'Cash payment is verified on delivery',
    };
  },

  async handleWebhook(
    payload: WebhookPayload
  ): Promise<{ event: string; transactionReference?: string; status: string }> {
    return { event: 'payment.cash', status: 'PENDING' };
  },
};
