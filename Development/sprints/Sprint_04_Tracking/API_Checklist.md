# API Checklist — Tracking

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

## WebSocket Events

```
order.created
order.accepted
order.preparing
order.ready_for_pickup
rider.assigned      → { riderId, name, phone, vehicle }
rider.location.updated  → { lat, lng, speed, heading }
order.en_route
order.arrived
delivery.completed
```

## Endpoints
- [ ] GET /api/orders/:id/tracking — 200, 404 — Full tracking state
- [ ] GET /api/orders/:id/eta — 200 — Current ETA
- [ ] GET /api/orders/:id/timeline — 200 — Status history array
- [ ] PATCH /api/orders/:id/status — 200, 400, 404 — Transition status
- [ ] POST /api/orders/:id/assign-rider — 200, 400 — Assign rider to order
- [ ] POST /api/riders/location — 200 — Rider pushes current location
- [ ] GET /api/riders/:id/location — 200 — Get rider's latest location
- [ ] WebSocket /ws/tracking?orderId= — Live location + status updates
