# API Checklist — Vendor Portal

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
GET /api/vendor/orders

?page=1
&limit=20
&status=active|history|pending|preparing|ready|completed
&date=2026-07-15
&search=vendor+name
```

## Endpoints
- [ ] GET /api/vendor/dashboard — 200 — Dashboard stats
- [ ] GET /api/vendor/orders — 200 — Orders (with query params)
- [ ] PATCH /api/vendor/orders/:id/accept — 200, 400 — Accept order
- [ ] PATCH /api/vendor/orders/:id/reject — 200, 400 — Reject order
- [ ] PATCH /api/vendor/orders/:id/preparing — 200, 400 — Start preparing
- [ ] PATCH /api/vendor/orders/:id/ready — 200, 400 — Mark ready for pickup
- [ ] PATCH /api/vendor/orders/:id/complete — 200, 400 — Mark completed
- [ ] GET /api/vendor/inventory — 200 — List inventory
- [ ] POST /api/vendor/inventory — 201, 400 — Add stock
- [ ] PUT /api/vendor/inventory/:id — 200, 404 — Update stock
- [ ] GET /api/vendor/revenue — 200 — Revenue summary
- [ ] GET /api/vendor/analytics — 200 — Full analytics (sales, products, delivery, customers)
- [ ] GET /api/vendor/profile — 200 — Get business profile
- [ ] PUT /api/vendor/profile — 200, 400 — Update business profile
- [ ] POST /api/vendor/profile/logo — 200 — Upload logo
- [ ] GET /api/vendor/settings — 200 — Get vendor settings
- [ ] PUT /api/vendor/settings — 200 — Update settings (hours, radius, auto-accept)
- [ ] GET /api/vendor/notifications — 200 — Vendor notifications
