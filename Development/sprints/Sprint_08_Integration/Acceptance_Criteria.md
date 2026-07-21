# Sprint 08 Acceptance Criteria

## Payment Flow
System supports:
- [x] Mobile Money payment (phone → confirm → success)
- [x] MTN MoMo payment
- [x] Orange Money payment
- [x] CASH payment (on-delivery) preserved
- [x] Payment abstraction layer (swap providers without code changes)
- [x] Webhook signature verified per provider (HMAC SHA256/SHA384)
- [x] Idempotency prevents duplicate webhook processing
- [x] Payment status: PENDING → SUCCESS / FAILED

---

## Notifications
System supports four channels:
- In-app notifications (notification center, mark read)
- Push notifications (Firebase / OneSignal)
- SMS (transactional alerts)
- Email (transactional)

Events triggered for:
- Registration, vendor/rider approval, order lifecycle (placed → accepted → ready → assigned → delivered → cancelled)

---

## Maps
System supports:
- Forward geocoding (address → coordinates)
- Reverse geocoding (coordinates → address)
- Distance calculation
- Route directions with ETA

---

## Real-Time Updates
System supports:
- [x] WebSocket or SSE connections (Socket.IO)
- [x] JWT-authenticated connections
- [x] Room-based subscriptions (per order, per vendor, per rider)
- [x] Live order status updates
- [x] Vendor dashboard live updates
- [ ] Rider dispatch live updates (structure ready)
- [x] Customer order status updates (via user room)

---

## File Uploads
System supports:
- [ ] File type validation (jpg, png, webp)
- [ ] File size validation (profile 5MB, proof 10MB)
- [ ] Image compression
- [ ] Upload for vendor logo, rider photo, delivery proof

---

## Platform Services
System implements:
- [x] Background job queue (BullMQ / Redis)
- [x] Notification queue (in-app, push, SMS, email)
- [ ] Payment retry queue
- [x] Dead letter queue for failed jobs (BullMQ built-in)
- [x] Retry with exponential backoff
- [x] Rate limiting (global, express-rate-limit)
- [x] Correlation ID (structured logging enhancement)
- [x] External service health monitoring with circuit breaker

---

## Integration
All applications communicate successfully with backend services. Payment, maps, notifications, real-time, and file uploads work as one integrated platform.

# Definition Of Success

Sprint 08 is complete when payments (Mobile Money, MTN MoMo, Orange Money, CASH), maps, notifications (in-app, push, SMS, email), real-time updates (WebSocket/SSE), file uploads, and platform services (job queue, rate limiting, logging) are all functional and integrated.
