# Sprint 05 — Vendor Portal

## Objective
Build the Vendor Portal that enables LPG businesses to manage inventory, process customer orders, monitor deliveries, analyze revenue, manage business settings, and communicate with customers through the GasNow platform.

## Vendor Order Lifecycle
```
New Order (Incoming)
    ↓
Accept  ──→  Reject (removed from queue)
    ↓
Preparing
    ↓
Ready for Pickup
    ↓
Rider Assigned → Picked Up → Completed
```

## Backend
- Business profile management (info, logo, hours, radius)
- Order management (accept, reject, prepare, ready, complete)
- Inventory management (CRUD + low stock alerts + auto out-of-stock)
- Revenue and analytics (sales, product performance, delivery metrics)
- Notifications
- Vendor settings

## Frontend
- Dashboard
- Orders
- Inventory
- Revenue / Analytics
- Business Verification / Pending Approval
- Profile
- Settings
- Notifications

## Deliverables
Vendors can fully manage their LPG business — from accepting orders to tracking inventory and reviewing revenue analytics.

## Definition of Done
- Vendor can accept, reject, prepare, and complete orders
- Vendor order lifecycle transitions enforced
- Inventory CRUD works with low-stock alerts and auto out-of-stock
- Revenue dashboard shows accurate analytics
- Business profile editable (info, logo, hours, radius)
- Business Verification and Pending Approval screens functional
- Notifications received for key events
- Vendors only access their own data
