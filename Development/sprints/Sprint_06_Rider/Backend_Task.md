# Backend — Rider

## Architecture Tasks
- [ ] Create Rider module (controller, service)
- [ ] Create Rider Job module (controller, service)
- [ ] Create Rider Earnings module (controller, service)
- [ ] Create Location service (periodic updates, geofencing)
- [ ] Create Real-time job dispatch service (WebSocket)
- [ ] Create Rider Availability service (online/offline)
- [ ] Create Proof of Delivery service (photo upload)

## Availability Service
- [ ] PUT /api/rider/status — Toggle Online/Offline
- [ ] Automatically stop receiving jobs when offline
- [ ] Return online status in dashboard

## Job Actions
- [ ] POST /api/rider/jobs/:id/accept — Accept a job
- [ ] POST /api/rider/jobs/:id/reject — Reject a job (auto-reassign)
- [ ] Auto-reassign rejected jobs to next available rider

## Delivery Status Flow
- [ ] POST /api/rider/jobs/:id/arrived-vendor — Arrived at vendor location
- [ ] POST /api/rider/jobs/:id/picked-up — Mark picked up from vendor
- [ ] POST /api/rider/jobs/:id/arrived-customer — Arrived at customer location
- [ ] POST /api/rider/jobs/:id/delivered — Mark delivered
- [ ] Validate status transitions: Accept → ArrivedVendor → PickedUp → ArrivedCustomer → Delivered
- [ ] Prevent accepting already-assigned jobs

## Proof of Delivery
- [ ] Upload delivery photo (optional, on delivered)
- [ ] Capture delivery timestamp
- [ ] Customer confirmation signature (extension point)

## Tasks
- [ ] GET /api/rider/dashboard — Rider dashboard stats (incl. online status)
- [ ] GET /api/rider/jobs — Available/active jobs (?page=&status=&type=&distance=)
- [ ] GET /api/rider/profile — Rider profile
- [ ] PUT /api/rider/profile — Update profile
- [ ] PUT /api/rider/status — Toggle availability
- [ ] POST /api/rider/jobs/:id/accept — Accept a job
- [ ] POST /api/rider/jobs/:id/reject — Reject a job
- [ ] POST /api/rider/jobs/:id/arrived-vendor — Arrived at vendor
- [ ] POST /api/rider/jobs/:id/picked-up — Mark picked up
- [ ] POST /api/rider/jobs/:id/arrived-customer — Arrived at customer
- [ ] POST /api/rider/jobs/:id/delivered — Mark delivered
- [ ] PUT /api/rider/location — Update rider location
- [ ] POST /api/rider/delivery/:id/photo — Upload proof of delivery photo
- [ ] GET /api/rider/earnings — Earnings summary
- [ ] GET /api/rider/history — Delivery history
