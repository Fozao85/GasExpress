# Sprint 06 — Rider Application

## Objective
Build the Rider Application that enables delivery partners to receive delivery requests, navigate to vendors and customers, complete deliveries, update live location, track earnings, and manage their delivery history.

## Rider Workflow
```
Available (Online) → Job Offered
    ↓
Accept ──→ Reject (auto-reassign)
    ↓
Navigate to Vendor
    ↓
Arrived at Vendor
    ↓
Picked Up
    ↓
Navigate to Customer
    ↓
Arrived at Customer
    ↓
Delivered (with proof)
    ↓
Earnings Updated
```

## Backend
- Rider availability (online/offline toggle)
- Job dispatch (real-time via WebSocket)
- Job management (accept, reject, status transitions)
- Location service (periodic updates)
- Earnings & metrics
- Proof of delivery

## Frontend
- Dashboard (with online/offline toggle)
- Jobs (available + active)
- Maps / Navigation
- Earnings (with charts)
- Delivery history
- Identity Verification / Pending Approval
- Profile
- Notifications
- Settings

## Deliverables
Riders can complete the full delivery lifecycle — from receiving job offers to delivery completion with earnings tracking.

## Definition of Done
- Rider can toggle online/offline; offline riders don't receive jobs
- Rider can view, accept, and reject jobs
- Full status flow: Accept → Arrived Vendor → Picked Up → Arrived Customer → Delivered
- Navigation to vendor and customer locations
- Location updates during active deliveries
- Earnings dashboard with daily/weekly/monthly breakdown
- Delivery history with filter
- Proof of delivery (photo upload)
- Identity Verification / Pending Approval screens functional
- Notifications for job offers and status changes
