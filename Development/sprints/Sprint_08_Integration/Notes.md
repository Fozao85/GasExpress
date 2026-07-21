# Notes — Sprint 08

## Decisions

- **Socket.IO** chosen over raw WebSocket for automatic reconnection, room support, and fallback transports
- **BullMQ** chosen over Bull v3 for better TypeScript support and modern API
- **ioredis** as Redis client (peer dependency of BullMQ)
- Socket.IO served on same HTTP server as Express (no separate port)
- Room naming: `order:<id>`, `vendor:<id>`, `rider:<id>`, `user:<id>`
- User room joined automatically on connect; vendor/rider/order rooms joined via `subscribe:*` events
- Notification queue has 3 retry attempts with exponential backoff by default
- Pino logger enhanced with correlation ID middleware (header: `x-correlation-id`)
- Circuit breaker: 5 failures → open for 30s → half-open (max 3 requests) → closed on success

## Technical Debt

- Socket event emit functions catch errors silently (graceful degradation when Socket.IO not initialized, e.g. in tests)
- `useSocket` hook has a stale closure edge case on reconnection (cleanup may reference old socket)
- Rate limiting currently global only (per-endpoint/per-user rate limiting not yet implemented)
- Payment retry queue not yet configured
- Payment providers are mock/placeholder implementations (no real gateway integration)
- `payment_method` enum in Prisma does not include `MTN_MOMO` or `ORANGE_MONEY` values (uses `PaymentMethod` enum from order creation, while `provider` on PaymentTransaction is a free string)

## AI-Generated Caveats

- Redis must be running for BullMQ and circuit breaker health check to work
- `notification.worker.ts` has placeholder implementations for push, SMS, email channels (only `in_app` is fully implemented)

## Future Improvements

- Add per-user rate limiting middleware
- Add WebSocket event integration tests (requires running Socket.IO server)
- Implement push notification service (Firebase / OneSignal)
- Configure payment retry queue
- Create tracking screen with live WebSocket updates
- Add `reconnect` event handling in `useSocket` to re-bind subscriptions
- Use `notification_preferences` table to filter notification delivery by channel
