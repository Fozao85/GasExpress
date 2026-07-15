# Testing Checklist — Tracking

## Backend Tests
- [ ] Tracking endpoint returns full timeline + rider + ETA
- [ ] Status transitions respect 9-state order flow
- [ ] Invalid status transitions rejected (e.g. "Delivered" → "Preparing")
- [ ] Rider assignment works (auto nearest + manual)
- [ ] Rider cannot update another rider's delivery
- [ ] ETA recalculates correctly after location update
- [ ] Location updates stored correctly in history
- [ ] Notifications sent on each status transition
- [ ] WebSocket connection established and receives events
- [ ] Customers only see their own orders
- [ ] Vendors only manage their own orders
- [ ] Receipt generated on delivery completion

## Frontend Tests
- [ ] Timeline renders correct steps with active/completed states
- [ ] Rider info card displays name, rating, vehicle, call/chat
- [ ] ETA updates dynamically
- [ ] Map loads correctly with rider + destination pins
- [ ] Tracking reconnects after WebSocket disconnect
- [ ] Offline state handled gracefully
- [ ] Tracking loading skeleton displays
- [ ] Tracking error state with retry
- [ ] Delivery Completed screen shows summary + rate CTA
- [ ] Receipt displays correct items and totals
