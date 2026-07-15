# Backend — Vendor Portal

## Architecture Tasks
- [ ] Create Vendor Dashboard module (controller, service)
- [ ] Create Vendor Order module (controller, service)
- [ ] Create Vendor Inventory module (controller, service)
- [ ] Create Vendor Analytics module (controller, service)
- [ ] Create Vendor Notification module (controller, service)
- [ ] Create Vendor Settings module (controller, service)
- [ ] Create Vendor Profile module (controller, service)

## Business Profile
- [ ] GET /api/vendor/profile — Get business profile
- [ ] PUT /api/vendor/profile — Update business info
- [ ] Upload business logo
- [ ] Update operating hours
- [ ] Update delivery radius

## Inventory Rules
- [ ] Automatically mark product Out of Stock when quantity = 0
- [ ] Trigger Low Stock alerts when quantity <= threshold
- [ ] Prevent ordering unavailable products (enforce on order placement)
- [ ] GET /api/vendor/inventory — List inventory
- [ ] POST /api/vendor/inventory — Add stock
- [ ] PUT /api/vendor/inventory/:id — Update stock

## Order Management (full lifecycle)
- [ ] PATCH /api/vendor/orders/:id/accept — Accept incoming order
- [ ] PATCH /api/vendor/orders/:id/reject — Reject order (removed from active queue)
- [ ] PATCH /api/vendor/orders/:id/preparing — Mark as preparing
- [ ] PATCH /api/vendor/orders/:id/ready — Mark ready for pickup
- [ ] PATCH /api/vendor/orders/:id/complete — Mark completed
- [ ] Notify rider dispatch when ready

## Analytics
- [ ] Sales summary (total, daily, weekly, monthly)
- [ ] Product performance (best-selling cylinder)
- [ ] Delivery performance (average delivery time)
- [ ] Customer statistics (repeat customers, order frequency)
- [ ] Cancelled orders rate
- [ ] GET /api/vendor/dashboard — Dashboard stats
- [ ] GET /api/vendor/orders — Incoming orders (query: ?page=&status=&date=&search=)
- [ ] GET /api/vendor/revenue — Revenue analytics
- [ ] GET /api/vendor/analytics — Full analytics suite
- [ ] GET /api/vendor/notifications — Vendor notifications
