# Sprint 04 — Order Tracking

## Objective
Implement the complete delivery tracking system by enabling vendors to update order preparation, assigning riders, tracking rider location in real time, calculating ETA, and allowing customers to monitor the entire delivery lifecycle.

## Order Status Lifecycle
```
Order Created
    ↓
Vendor Accepted
    ↓
Preparing Order
    ↓
Ready for Pickup
    ↓
Rider Assigned
    ↓
Picked Up
    ↓
En Route
    ↓
Arrived
    ↓
Delivered
```

## Backend
- Order status management (9-state lifecycle)
- Rider assignment (auto + manual)
- Live tracking (WebSocket + REST)
- ETA calculation & updates
- Notifications (status changes, rider events)
- Delivery completion & receipt generation

## Frontend
- Tracking screen (map + timeline + rider + ETA)
- My Orders list (with filters)
- Delivery Completed
- Receipt

## Deliverables
Complete delivery tracking with real-time updates for customers, vendors, and riders.

## Definition of Done
- Order status updates flow through all 9 states
- Timeline reflects current status with history
- Rider assigned and displayed with contact
- ETA calculated and updates dynamically
- Live location updates via WebSocket
- Notifications sent on status transitions
- Receipt generated on delivery completion
- Security enforced (scoped access per role)
