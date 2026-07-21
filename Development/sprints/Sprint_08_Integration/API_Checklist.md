# API Checklist — Platform Integrations

## Response Standards

Every API response must follow:

### Success
```json
{
  "success": true,
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

## Endpoints
- [x] POST /api/v1/payments/initiate — 201 (create payment intent)
- [x] POST /api/v1/payments/verify — 200 (verify payment)
- [x] POST /api/webhooks/payment/:provider — 200 (webhook, signature verified, idempotent)
- [x] GET /api/v1/payments/:id — 200 (get payment details)
- [ ] GET /api/maps/geocode?q= — 200 (forward geocode)
- [ ] GET /api/maps/reverse-geocode?lat=&lng= — 200 (reverse geocode)
- [ ] GET /api/maps/distance?origin=&destination= — 200 (distance)
- [ ] GET /api/maps/directions?origin=&destination= — 200 (route + ETA)
- [ ] POST /api/notifications/send — 201 (send notification)
- [x] GET /api/v1/notifications — 200 (list user notifications, paginated)
- [x] PATCH /api/v1/notifications/:id/read — 200 (mark read)
- [x] GET /api/v1/notifications/unread-count — 200 (unread count)
- [x] POST /api/v1/notifications/read-all — 200 (mark all read)
- [ ] POST /api/upload — 201 (file upload, validated, compressed)
- [ ] DELETE /api/upload/:id — 200, 404 (delete file)
- [ ] GET /api/upload/:id — 200 (serve file)
- [ ] GET /api/integrations/status — 200 (external service health)

## WebSocket / SSE Events
- [x] order:status — Order status update (broadcast to order room, vendor room, rider room, user room)
- [x] order:new — New order (vendor receives via vendor room)
- [ ] dispatch:new — New dispatch (rider receives)
- [ ] dispatch:assigned — Rider assigned (customer receives)

## Client Rooms
- [x] subscribe:vendor <vendorId> — Join vendor room
- [x] subscribe:rider <riderId> — Join rider room
- [x] subscribe:order <orderId> — Join order room
- [x] user:<userId> — Auto-joined on connect (user's personal room)
