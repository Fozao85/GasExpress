import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken, type AccessTokenPayload } from '../common/services/jwt.service';
import { config } from '../config';
import { userRoom, vendorRoom, riderRoom, orderRoom } from './rooms';
import { logger } from '../common/middleware';

let io: Server | null = null;

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.IO not initialized. Call initializeSocket first.');
  }
  return io;
}

interface AuthenticatedSocket extends Socket {
  user?: AccessTokenPayload;
}

function authenticateSocket(socket: AuthenticatedSocket, next: (err?: Error) => void): void {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token || typeof token !== 'string') {
    return next(new Error('Authentication required'));
  }

  try {
    const payload = verifyAccessToken(token);
    socket.user = payload;
    next();
  } catch {
    next(new Error('Invalid or expired token'));
  }
}

function registerSocketHandlers(socket: AuthenticatedSocket): void {
  const user = socket.user!;

  socket.join(userRoom(user.sub));

  socket.on('subscribe:vendor', (vendorId: string) => {
    socket.join(vendorRoom(vendorId));
  });

  socket.on('subscribe:rider', (riderId: string) => {
    socket.join(riderRoom(riderId));
  });

  socket.on('subscribe:order', (orderId: string) => {
    socket.join(orderRoom(orderId));
  });

  socket.on('unsubscribe:vendor', (vendorId: string) => {
    socket.leave(vendorRoom(vendorId));
  });

  socket.on('unsubscribe:rider', (riderId: string) => {
    socket.leave(riderRoom(riderId));
  });

  socket.on('unsubscribe:order', (orderId: string) => {
    socket.leave(orderRoom(orderId));
  });

  socket.on('disconnect', () => {
    logger.info({ userId: user.sub }, 'Socket disconnected');
  });
}

export function initializeSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: config.cors.origin,
      credentials: true,
    },
    pingInterval: 25000,
    pingTimeout: 20000,
  });

  io.use(authenticateSocket);

  io.on('connection', (rawSocket: Socket) => {
    const socket = rawSocket as AuthenticatedSocket;
    logger.info({ userId: socket.user?.sub }, 'Socket connected');
    registerSocketHandlers(socket);
  });

  logger.info('Socket.IO initialized');
  return io;
}
