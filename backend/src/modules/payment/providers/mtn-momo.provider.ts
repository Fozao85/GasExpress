import type {
  PaymentProvider,
  InitiatePaymentInput,
  InitiatePaymentResult,
  VerifyPaymentInput,
  VerifyPaymentResult,
  WebhookPayload,
} from './interface';
import { randomUUID, createHmac } from 'crypto';

const MTN_SECRET = process.env.MTN_MOMO_SECRET || 'mtn-secret-dev';

export const mtnMoMoProvider: PaymentProvider = {
  name: 'MTN_MOMO',

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    if (!input.phoneNumber) {
      return {
        success: false,
        transactionReference: '',
        status: 'FAILED',
        message: 'Phone number required',
      };
    }

    const reference = `MTN-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`;

    return {
      success: true,
      transactionReference: reference,
      providerReference: `MOMO-${randomUUID().slice(0, 12)}`,
      status: 'PENDING',
      message: `MTN MoMo payment request sent to ${input.phoneNumber}. Approve on your phone.`,
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

export function verifyMtnMoMoSignature(payload: string, signature: string): boolean {
  const expected = createHmac('sha384', MTN_SECRET).update(payload).digest('hex');
  return expected === signature;
}
