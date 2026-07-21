import { getIO } from './socket';
import { orderRoom, vendorRoom, userRoom } from './rooms';
import { logger } from '../common/middleware';

interface OrderEventPayload {
  orderId: string;
  orderNumber: string;
  status: string;
  customerId?: string;
  vendorId?: string;
  riderId?: string;
  [key: string]: unknown;
}

export function emitOrderStatusChange(orderId: string, payload: OrderEventPayload): void {
  try {
    const io = getIO();
    io.to(orderRoom(orderId)).emit('order:status', payload);
    io.to(userRoom(payload.customerId || '')).emit('order:status', payload);
    if (payload.vendorId) {
      io.to(vendorRoom(payload.vendorId)).emit('order:status', payload);
    }
    if (payload.riderId) {
      io.to(riderRoomForEmit(payload.riderId)).emit('order:status', payload);
    }
  } catch {
    logger.warn('Socket.IO not available, skipping event emit');
  }
}

export function emitNewOrder(vendorId: string, payload: OrderEventPayload): void {
  try {
    const io = getIO();
    io.to(vendorRoom(vendorId)).emit('order:new', payload);
    if (payload.customerId) {
      io.to(userRoom(payload.customerId)).emit('order:new', payload);
    }
  } catch {
    logger.warn('Socket.IO not available, skipping event emit');
  }
}

function riderRoomForEmit(riderId: string): string {
  return `rider:${riderId}`;
}
