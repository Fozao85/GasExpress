import { prisma } from '../../database';
import { NotFoundError, ForbiddenError, ValidationError } from '../../common/exceptions/app-error';
import { getProvider } from './providers';
import type { WebhookPayload } from './providers';
import { verifyMobileMoneySignature } from './providers/mobile-money.provider';
import { verifyMtnMoMoSignature } from './providers/mtn-momo.provider';
import { verifyOrangeMoneySignature } from './providers/orange-money.provider';
import { recordSuccess, recordFailure } from '../../integrations';

const signatureVerifiers: Record<string, (payload: string, signature: string) => boolean> = {
  MOBILE_MONEY: verifyMobileMoneySignature,
  MTN_MOMO: verifyMtnMoMoSignature,
  ORANGE_MONEY: verifyOrangeMoneySignature,
};

export async function initiatePayment(
  userId: string,
  input: { orderId: string; provider: string; phoneNumber?: string }
) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const order = await prisma.order.findUnique({
    where: { id: input.orderId },
    include: { payment: true, paymentTransaction: true },
  });

  if (!order) throw new NotFoundError('Order');
  if (order.customerId !== profile.id)
    throw new ForbiddenError('Order does not belong to customer');
  if (order.orderStatus === 'CANCELLED')
    throw new Error('Cannot initiate payment for cancelled order');

  if (order.paymentTransaction) {
    return {
      transactionId: order.paymentTransaction.id,
      reference: order.paymentTransaction.reference,
      status: order.paymentTransaction.status,
      message: 'Payment already initiated',
    };
  }

  const provider = getProvider(input.provider);
  const amount = Number(order.total);

  const result = await provider.initiate({
    orderId: order.id,
    userId,
    amount,
    phoneNumber: input.phoneNumber,
  });

  if (!result.success) {
    throw new ValidationError([
      { field: 'payment', message: result.message || 'Payment initiation failed' },
    ]);
  }

  const transaction = await prisma.paymentTransaction.create({
    data: {
      orderId: order.id,
      userId,
      provider: input.provider,
      amount,
      reference: result.transactionReference,
      providerReference: result.providerReference,
      phoneNumber: input.phoneNumber,
      status: result.status,
    },
  });

  if (input.provider === 'CASH') {
    await prisma.payment.update({
      where: { orderId: order.id },
      data: { paymentStatus: 'PAID', transactionReference: result.transactionReference },
    });
  }

  return {
    transactionId: transaction.id,
    reference: transaction.reference,
    status: transaction.status,
    providerReference: transaction.providerReference,
    authorizationUrl: result.authorizationUrl || null,
    message: result.message || null,
  };
}

export async function verifyPayment(userId: string, transactionReference: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const transaction = await prisma.paymentTransaction.findUnique({
    where: { reference: transactionReference },
    include: { order: true },
  });

  if (!transaction) throw new NotFoundError('Transaction');
  if (transaction.userId !== userId) throw new NotFoundError('Transaction');
  if (transaction.status !== 'PENDING') {
    return {
      transactionId: transaction.id,
      reference: transaction.reference,
      status: transaction.status,
      paidAt: transaction.updatedAt,
    };
  }

  const provider = getProvider(transaction.provider);
  const result = await provider.verify({
    transactionReference: transaction.reference,
    providerReference: transaction.providerReference || undefined,
  });

  const updated = await prisma.paymentTransaction.update({
    where: { id: transaction.id },
    data: {
      status: result.status,
      providerReference: result.providerReference || transaction.providerReference,
    },
  });

  if (result.success && result.status === 'SUCCESS') {
    await prisma.payment.update({
      where: { orderId: transaction.orderId },
      data: { paymentStatus: 'PAID', paidAt: result.paidAt || new Date() },
    });
    await prisma.order.update({
      where: { id: transaction.orderId },
      data: { paymentStatus: 'PAID' },
    });
  }

  return {
    transactionId: updated.id,
    reference: updated.reference,
    status: updated.status,
    paidAt: updated.updatedAt,
  };
}

export async function getPaymentById(customerId: string, paymentId: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: { select: { customerId: true, orderNumber: true } } },
  });

  if (!payment) throw new NotFoundError('Payment');
  if (payment.order.customerId !== profile.id) throw new NotFoundError('Payment');

  return {
    id: payment.id,
    orderId: payment.orderId,
    orderNumber: payment.order.orderNumber,
    amount: Number(payment.amount),
    paymentMethod: payment.paymentMethod,
    paymentStatus: payment.paymentStatus,
    transactionReference: payment.transactionReference,
    paidAt: payment.paidAt,
  };
}

export async function handleWebhook(providerName: string, payload: WebhookPayload) {
  const signHeader =
    (payload.headers['x-signature'] as string) ||
    (payload.headers['x-hub-signature'] as string) ||
    '';

  if (signHeader) {
    const verifier = signatureVerifiers[providerName];
    if (verifier) {
      const rawPayload =
        typeof payload.body === 'string' ? payload.body : JSON.stringify(payload.body);
      if (!verifier(rawPayload, signHeader)) {
        recordFailure(`payment_${providerName}`);
        return { success: false, message: 'Invalid signature' };
      }
    }
  }

  const body = payload.body as any;
  const idempotencyKey = body?.idempotencyKey || body?.id || '';

  if (idempotencyKey) {
    const existing = await prisma.paymentWebhookLog.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return { success: true, message: 'Already processed', id: existing.id };
    }
  }

  const log = await prisma.paymentWebhookLog.create({
    data: {
      provider: providerName,
      event: body?.event || null,
      payload: body || null,
      signature: signHeader || null,
      status: 'received',
      idempotencyKey: idempotencyKey || null,
    },
  });

  try {
    const provider = getProvider(providerName);
    const result = await provider.handleWebhook(payload);

    await prisma.paymentWebhookLog.update({
      where: { id: log.id },
      data: { status: 'processed' },
    });

    if (result.transactionReference) {
      const transaction = await prisma.paymentTransaction.findUnique({
        where: { reference: result.transactionReference },
      });
      if (transaction) {
        const status = result.status === 'SUCCESS' ? 'SUCCESS' : 'FAILED';
        await prisma.paymentTransaction.update({
          where: { id: transaction.id },
          data: { status },
        });

        if (result.status === 'SUCCESS') {
          await prisma.payment.update({
            where: { orderId: transaction.orderId },
            data: { paymentStatus: 'PAID', paidAt: new Date() },
          });
          await prisma.order.update({
            where: { id: transaction.orderId },
            data: { paymentStatus: 'PAID' },
          });
        }
      }
    }

    recordSuccess(`payment_${providerName}`);
    return { success: true, message: 'Webhook processed', id: log.id };
  } catch (error) {
    await prisma.paymentWebhookLog.update({
      where: { id: log.id },
      data: { status: 'failed' },
    });
    recordFailure(`payment_${providerName}`);
    return { success: false, message: String(error) };
  }
}
