import type {
  PaymentProvider,
  InitiatePaymentInput,
  InitiatePaymentResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  WebhookPayload,
} from './interface';
import { randomUUID } from 'crypto';
import { createHmac } from 'crypto';

const PROVIDER_SECRET = process.env.MOBILE_MONEY_SECRET || 'mm-secret-dev';

export const mobileMoneyProvider: PaymentProvider = {
  name: 'MOBILE_MONEY',

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    if (!input.phoneNumber) {
      return {
        success: false,
        transactionReference: '',
        status: 'FAILED',
        message: 'Phone number required',
      };
    }

    const reference = `MM-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;

    return {
      success: true,
      transactionReference: reference,
      providerReference: `PROV-${randomUUID().slice(0, 12)}`,
      status: 'PENDING',
      message: `Payment request sent to ${input.phoneNumber}. Please check your phone and enter PIN.`,
    };
  },

  async verify(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    return {
      success: true,
      status: 'SUCCESS',
      providerReference: input.providerReference,
      paidAt: new Date(),
    };
  },

  async handleWebhook(
    payload: WebhookPayload
  ): Promise<{ event: string; transactionReference?: string; status: string }> {
    const body = payload.body as any;
    return {
      event: body?.event || 'payment.unknown',
      transactionReference: body?.transactionRef,
      status: body?.status === 'successful' ? 'SUCCESS' : 'FAILED',
    };
  },
};

export function verifyMobileMoneySignature(payload: string, signature: string): boolean {
  const expected = createHmac('sha256', PROVIDER_SECRET).update(payload).digest('hex');
  return expected === signature;
}
