# Backend — Tracking

## Architecture Tasks
- [ ] Create Tracking module (controller, service)
- [ ] Create Delivery module (controller, service, repository)
- [ ] Create Order status management service (state machine)
- [ ] Create WebSocket gateway for live tracking
- [ ] Create Rider assignment service (auto + manual)
- [ ] Create ETA calculation service
- [ ] Create Tracking notification service
- [ ] Create Receipt generation service

## Rider Assignment
- [ ] Find available riders near vendor
- [ ] Calculate nearest rider
- [ ] Auto-assign rider on "Ready for Pickup"
- [ ] Manual rider reassignment fallback
- [ ] POST /api/orders/:id/assign-rider

## ETA Service
- [ ] Calculate estimated arrival time from rider location to customer
- [ ] Update ETA after each rider location update
- [ ] Return ETA through GET /api/orders/:id/eta
- [ ] Handle ETA recalculation on route deviation

## Notifications
- [ ] Notify customer when rider assigned
- [ ] Notify customer when rider starts trip
- [ ] Notify customer upon arrival
- [ ] Notify customer after delivery completed

## Delivery Completion
- [ ] Verify delivery completion (rider confirms)
- [ ] Update order status to "Delivered"
- [ ] Trigger receipt generation
- [ ] Release any delivery holds

## Tasks
- [ ] GET /api/orders/:id/tracking — Full tracking info
- [ ] GET /api/orders/:id/eta — Current ETA
- [ ] GET /api/orders/:id/timeline — Status history
- [ ] PATCH /api/orders/:id/status — Update order status
- [ ] POST /api/orders/:id/assign-rider — Assign rider
- [ ] POST /api/riders/location — Rider pushes location
- [ ] GET /api/riders/:id/location — Get rider location
- [ ] WebSocket /events — Live location + status updates
