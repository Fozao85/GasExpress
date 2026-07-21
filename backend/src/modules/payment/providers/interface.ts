export interface InitiatePaymentInput {
  orderId: string;
  userId: string;
  amount: number;
  currency?: string;
  phoneNumber?: string;
  metadata?: Record<string, unknown>;
}

export interface InitiatePaymentResult {
  success: boolean;
  transactionReference: string;
  providerReference?: string;
  authorizationUrl?: string;
  status: string;
  message?: string;
}

export interface VerifyPaymentInput {
  transactionReference: string;
  providerReference?: string;
}

export interface VerifyPaymentResult {
  success: boolean;
  status: string;
  providerReference?: string;
  paidAt?: Date;
  message?: string;
}

export interface WebhookPayload {
  provider: string;
  body: unknown;
  headers: Record<string, string | string[] | undefined>;
}

export interface PaymentProvider {
  name: string;
  initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult>;
  verify(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
  handleWebhook(
    payload: WebhookPayload
  ): Promise<{ event: string; transactionReference?: string; status: string }>;
}
