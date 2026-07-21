import type {
  PaymentProvider,
  InitiatePaymentInput,
  InitiatePaymentResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  WebhookPayload,
} from './interface';
import { randomUUID, createHmac } from 'crypto';

const ORANGE_SECRET = process.env.ORANGE_MONEY_SECRET || 'orange-secret-dev';

export const orangeMoneyProvider: PaymentProvider = {
  name: 'ORANGE_MONEY',

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    if (!input.phoneNumber) {
      return {
        success: false,
        transactionReference: '',
        status: 'FAILED',
        message: 'Phone number required',
      };
    }

    const reference = `ORN-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;

    return {
      success: true,
      transactionReference: reference,
      providerReference: `ORANGE-${randomUUID().slice(0, 12)}`,
      status: 'PENDING',
      message: `Orange Money request sent to ${input.phoneNumber}. Confirm on your phone.`,
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
      status: body?.status === 'COMPLETED' ? 'SUCCESS' : 'FAILED',
    };
  },
};

export function verifyOrangeMoneySignature(payload: string, signature: string): boolean {
  const expected = createHmac('sha256', ORANGE_SECRET).update(payload).digest('hex');
  return expected === signature;
}
