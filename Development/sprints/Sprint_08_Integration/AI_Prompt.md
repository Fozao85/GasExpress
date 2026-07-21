# Sprint 08 AI Implementation Prompt

## Role

You are a senior integration engineer responsible for connecting all GasNow platform services.

Read:

- AI_Implementation_Guide.md
- Architecture Documentation
- API Contracts
- Security Model
- Sprint_08.md

---

# Objective

Integrate real payment processing, maps, notifications, real-time updates, file uploads, and platform services.

---

# Backend Integration Tasks

## Payment Integration

Implement a payment abstraction layer supporting:

- Mobile Money (phone number → confirm → pay)
- MTN MoMo
- Orange Money
- CASH (on-delivery, preserved)

Each provider via a common interface. Implement webhook handling with signature verification and idempotency.

---

## Maps Integration

Implement:

- Forward geocoding (address → coordinates)
- Reverse geocoding (coordinates → address)
- Distance calculation
- Route directions with ETA

---

## Notification System

Implement four channels via a central service:

- In-app notifications (notification center)
- Push notifications (Firebase / OneSignal)
- SMS (transactional alerts)
- Email (transactional)

Events: registration, approval, order placed → accepted → ready → assigned → delivered → cancelled.

---

## Real-Time Updates

Implement WebSocket or SSE with:

- JWT-authenticated connections
- Room-based subscriptions (per order, per vendor, per rider)
- Live order tracking, vendor dashboard, rider dispatch, customer status

---

## File Storage

Implement:

- Image uploads with validation (type, size)
- Image compression
- Upload for: vendor logo, rider photo, delivery proof

---

## Platform Services

Implement:

- Background job queue (Bull / Redis)
- Retry with exponential backoff
- Rate limiting middleware
- Structured logging
- External service health monitoring with circuit breaker

---

# Frontend Integration Tasks

See Frontend_Task.md for detailed checklist.

- Payments: Mobile Money, MTN MoMo, Orange Money, CASH UIs
- Maps: Vendor location, address picker, navigation, ETA, route
- Notifications: In-app center, push handling
- Real-Time: WebSocket/SSE connection, live updates
- Uploads: Vendor logo, rider photo, delivery proof

---

# Rules

Do not:

- Remove CASH payment support
- Store sensitive payment data insecurely
- Replace approved APIs

---

# Expected Output

Provide:

- Integrated payment processing with multiple providers
- Maps integration (geocoding, distance, directions)
- Multi-channel notification system
- Real-time updates via WebSocket/SSE
- File upload service
- Platform services (job queue, rate limiting, logging)
- Integration tests
- Environment configuration
