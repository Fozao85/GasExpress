# Sprint 08 — Platform Integrations

## Objective

Complete all external integrations required for a production marketplace. Replace selection-only payments with real payment processing, add maps, notifications, real-time updates, file uploads, and supporting platform services.

## Status

> **Phase 1 (Notifications)**: ✅ Complete — Backend notification module (service, controller, routes), frontend notification center screen, bell icon with unread badge, integration with order service
> **Phase 2 (Real-Time Platform)**: ✅ Complete — Socket.IO WebSocket server with JWT auth, room-based subscriptions, order events emitted on status changes, BullMQ job queue with notification worker, integrations health endpoint, circuit breaker, correlation ID logging, frontend useSocket hook with 5 tests
> **Phase 3 (Payments)**: ✅ Complete — Payment abstraction layer (4 providers), webhook endpoint with signature verification + idempotency, initiate/verify endpoints, Prisma models, frontend Mobile Money flow with provider selection, success/failure screens
> **Phase 4 (Maps)**: ◻️ Not started
> **Phase 5 (File Uploads)**: ◻️ Not started

### Payments

Integrate real payment processing while preserving CASH support:
- Mobile Money
- MTN MoMo
- Orange Money
- Payment abstraction layer (swap providers without changing business logic)
- Webhook handling with signature verification and idempotency

### Maps

Integrate Google Maps or Mapbox:
- Vendor location display on discovery screens
- Customer address picker with geocoding
- Rider navigation and route visualization
- Distance calculation for delivery fee estimation
- ETA computation

### Notifications

Implement four channels:
- In-app notifications (notification center)
- Push notifications (Firebase / OneSignal)
- SMS (transactional)
- Email (transactional)

Trigger notifications for:
- Registration welcome
- Vendor approval / rejection
- Rider approval / rejection
- Order placed → Vendor notified
- Order accepted → Customer notified
- Ready for pickup → Customer notified
- Rider assigned → Customer + Rider notified
- Delivered → Customer notified
- Cancelled → All parties notified

### Real-Time Updates

Replace polling where appropriate:
- WebSocket or Server-Sent Events
- Live order tracking for customers
- Vendor dashboard live updates
- Rider dispatch live updates
- Customer order status real-time updates

### File Uploads

Support:
- Vendor logo / business license upload
- Rider profile photo / license upload
- Delivery proof photo

### Platform Services

- Central notification service (single interface for all channels)
- Background job queue (Bull / Redis)
- Retry handling with exponential backoff
- Rate limiting (per-endpoint, per-user)
- Improved structured logging

## Deliverables

Fully integrated platform with real payment processing, maps, notifications, real-time updates, file uploads, and supporting platform services.

## Definition of Done

- Payments: Mobile Money, MTN MoMo, Orange Money process end-to-end; CASH still works; webhook signature verified; idempotency prevents duplicates
- Maps: Geocoding, distance calculation, ETA, route visualization all functional
- Notifications: In-app, push, SMS, email all deliver; events fire for all lifecycle triggers
- Real-Time: WebSocket/SSE replaces polling for order tracking, vendor dashboard, rider dispatch, customer status
- File Uploads: Vendor logo, rider photo, delivery proof all upload with validation and compression
- Platform Services: Job queue executes reliably; retry handles transient failures; rate limiting blocks abuse; logging captures structured events
