# API Checklist — Rider

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

## Query Parameters

```
GET /api/rider/jobs

?page=1
&limit=20
&status=available|active|completed|cancelled
&distance=5
```

## Endpoints
- [ ] GET /api/rider/dashboard — 200 — Dashboard stats + online status
- [ ] GET /api/rider/jobs — 200 — Jobs list (with query params)
- [ ] GET /api/rider/profile — 200 — Rider profile
- [ ] PUT /api/rider/profile — 200 — Update profile
- [ ] PUT /api/rider/status — 200 — Toggle online/offline
- [ ] POST /api/rider/jobs/:id/accept — 200, 400, 409 — Accept job (409 if already assigned)
- [ ] POST /api/rider/jobs/:id/reject — 200, 400 — Reject job (auto-reassign)
- [ ] POST /api/rider/jobs/:id/arrived-vendor — 200, 400 — Arrived at vendor
- [ ] POST /api/rider/jobs/:id/picked-up — 200, 400 — Mark picked up
- [ ] POST /api/rider/jobs/:id/arrived-customer — 200, 400 — Arrived at customer
- [ ] POST /api/rider/jobs/:id/delivered — 200, 400 — Mark delivered
- [ ] PUT /api/rider/location — 200 — Update current location
- [ ] POST /api/rider/delivery/:id/photo — 200, 400 — Upload proof photo
- [ ] GET /api/rider/earnings — 200 — Earnings summary
- [ ] GET /api/rider/history — 200 — Delivery history
