import { prisma } from '../../database';
import { NotFoundError, ForbiddenError } from '../../common/exceptions/app-error';

export async function initiatePayment(customerId: string, orderId: string) {
  const profile = await prisma.customerProfile.findUnique({ where: { userId: customerId } });
  if (!profile) throw new NotFoundError('Customer profile');

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { payment: true },
  });

  if (!order) throw new NotFoundError('Order');
  if (order.customerId !== profile.id) {
    throw new ForbiddenError('Order does not belong to customer');
  }

  if (order.orderStatus === 'CANCELLED') {
    throw new Error('Cannot initiate payment for cancelled order');
  }

  const payment = order.payment;
  if (!payment) throw new NotFoundError('Payment record');

  return {
    paymentId: payment.id,
    orderId: order.id,
    orderNumber: order.orderNumber,
    amount: Number(payment.amount),
    paymentMethod: payment.paymentMethod,
    paymentStatus: payment.paymentStatus,
    authorizationUrl: null,
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
