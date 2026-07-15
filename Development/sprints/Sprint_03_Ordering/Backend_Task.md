# Backend — Ordering

## Architecture Tasks
- [ ] Create Cart module (controller, service, repository)
- [ ] Create Order module (controller, service, repository)
- [ ] Create OrderItem entity/model
- [ ] Create Payment module (controller, service)
- [ ] Create Address module (controller, service, repository)
- [ ] Create Notification module (order-placed event)
- [ ] Create checkout service (order creation, validation, payment)
- [ ] Create pricing service (subtotal, delivery fee, service fee, discounts)
- [ ] Create stock reservation service (reserve, release on cancel/expiry)

## Cart Service
- [ ] Validate product availability before adding
- [ ] Validate vendor availability
- [ ] Prevent ordering unavailable products
- [ ] Calculate subtotal
- [ ] Calculate delivery fee
- [ ] Calculate total
- [ ] POST /api/cart — Add to cart
- [ ] GET /api/cart — Get cart
- [ ] PUT /api/cart/:item — Update quantity
- [ ] DELETE /api/cart/:item — Remove item

## Address Service
- [ ] Save customer addresses
- [ ] Retrieve saved addresses
- [ ] Select / set delivery address
- [ ] Validate delivery area (within vendor radius)

## Order Processing
- [ ] Generate unique order number
- [ ] Create order items from cart
- [ ] Reserve inventory (reduce stock)
- [ ] Notify vendor of new order
- [ ] Create delivery record (Pending status)
- [ ] POST /api/orders — Place order
- [ ] GET /api/orders — List user orders
- [ ] GET /api/orders/:id — Order details
- [ ] GET /api/orders/:id/status — Order status timeline
- [ ] POST /api/orders/:id/cancel — Cancel order (releases stock)

## Payment APIs
- [ ] POST /api/payments/initiate — Start payment with gateway
- [ ] POST /api/payments/verify — Verify payment callback
- [ ] GET /api/payments/:id — Payment details
- [ ] Handle payment gateway callbacks / webhooks
- [ ] Update payment status (pending, success, failed, refunded)
