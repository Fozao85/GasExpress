# Backend — Platform Integrations

## Payments
- [x] Payment abstraction layer (interface for multiple providers)
- [x] Mobile Money integration (phone number → pay)
- [x] MTN MoMo integration
- [x] Orange Money integration
- [x] CASH payment flow preserved (no gateway needed)
- [x] Webhook endpoint: POST /api/webhooks/payment/:provider — unified callback handler
- [x] Webhook signature verification (HMAC per provider)
- [x] Idempotency key for duplicate webhook prevention
- [x] POST /api/v1/payments/initiate — Create payment intent
- [x] POST /api/v1/payments/verify — Verify payment status
- [x] Payment status: PENDING → SUCCESS / FAILED

## Maps
- [ ] Maps service: geocoding, reverse geocoding, distance matrix, directions
- [ ] GET /api/maps/geocode?q= — Forward geocode (address → coordinates)
- [ ] GET /api/maps/reverse-geocode?lat=&lng= — Reverse geocode
- [ ] GET /api/maps/distance?origin=&destination= — Distance calculation
- [ ] GET /api/maps/directions?origin=&destination= — Route + ETA

## Notifications
- [ ] Central notification service (unified interface: in-app, push, SMS, email)
- [ ] In-app notification model + CRUD API
- [ ] Push notification service (Firebase / OneSignal)
- [ ] SMS service (Twilio / equivalent)
- [ ] Email service (SendGrid / equivalent)
- [ ] Device token management (register, update, remove)
- [ ] POST /api/notifications/send — Send notification
- [ ] GET /api/notifications — List user notifications
- [ ] PATCH /api/notifications/:id/read — Mark as read
- [ ] Notification templates per event type

## Real-Time Updates
- [x] WebSocket or SSE server setup (Socket.IO)
- [x] Authenticated connection (JWT handshake)
- [x] Room-based subscriptions (per order, per vendor, per rider)
- [x] Order status events pushed to subscribed clients
- [x] Vendor dashboard live events (new order, status change)
- [x] Rider dispatch events (new job assignment)
- [x] Connection management (heartbeat, reconnect)

## File Uploads
- [ ] POST /api/upload — File upload (multipart, validated)
- [ ] File type validation (images: jpg, png, webp)
- [ ] File size validation (profile: 5MB max, proof: 10MB max)
- [ ] Image compression on upload
- [ ] DELETE /api/upload/:id — Delete uploaded file
- [ ] GET /api/upload/:id — Serve / download file

## Platform Services
- [x] Background job queue (BullMQ / Redis)
- [x] Notification queue (push, in-app, SMS, email)
- [ ] Payment retry queue
- [x] Dead letter queue for failed jobs (via BullMQ)
- [x] Retry with exponential backoff
- [x] Rate limiting middleware (express-rate-limit, global)
- [x] Correlation ID middleware (structured logging)
- [x] External service health check: GET /api/v1/integrations/status
- [x] Circuit breaker pattern for external API calls
