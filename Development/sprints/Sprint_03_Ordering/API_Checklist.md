# API Checklist — Ordering

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

## Request / Response Contracts

### POST /api/orders
```json
// Request
{
  "address_id": "uuid",
  "payment_method": "mobile_money|cash",
  "items": [{ "product_id": "uuid", "quantity": 1 }]
}
// Response 201
{
  "order_id": "uuid",
  "status": "pending",
  "total": 4500,
  "estimated_delivery_time": "2026-07-15T14:30:00Z"
}
```

### POST /api/payments/initiate
```json
// Request
{
  "order_id": "uuid",
  "gateway": "paystack|flutterwave"
}
// Response
{
  "payment_id": "uuid",
  "authorization_url": "https://...",
  "status": "pending"
}
```

### POST /api/payments/verify
```json
// Request
{
  "payment_id": "uuid",
  "reference": "txn_ref"
}
// Response
{
  "status": "success|failed",
  "order_id": "uuid"
}
```

## Endpoints
- [ ] POST /api/cart — 200, 400, 404
- [ ] GET /api/cart — 200
- [ ] PUT /api/cart/:item — 200, 404
- [ ] DELETE /api/cart/:item — 200, 404
- [ ] POST /api/orders — 201, 400, 422
- [ ] GET /api/orders — 200
- [ ] GET /api/orders/:id — 200, 404
- [ ] GET /api/orders/:id/status — 200 (returns status timeline)
- [ ] POST /api/orders/:id/cancel — 200, 400
- [ ] POST /api/payments/initiate — 200, 400, 422
- [ ] POST /api/payments/verify — 200, 400
- [ ] GET /api/payments/:id — 200, 404
- [ ] POST /api/addresses — 201
- [ ] GET /api/addresses — 200
- [ ] PUT /api/addresses/:id — 200, 404
