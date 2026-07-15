# Sprint 07 — Admin Dashboard

## Objective
Build the web-based Admin Dashboard that enables platform administrators to monitor business performance, manage users, verify vendors and riders, oversee orders and payments, configure platform settings, and maintain operational security through auditing and analytics.

## Admin Roles
- **Super Admin** — Full platform access
- **Operations Admin** — User management, vendor/verification, orders
- **Finance Admin** — Payments, refunds, settlements
- **Support Admin** — Support tickets, announcements, read-only access
- **Read-only Analyst** — Dashboard, analytics, reports only

## Admin Workflows
```
Vendor Registration → Verification Review → Approve / Reject → Vendor Active → Audit Logged

User Reported → Admin Review → Suspend → Notification Sent → Audit Logged

Refund Requested → Finance Review → Approve / Reject → Payment Processed → Audit Logged
```

## Backend
- Analytics & reports
- User management (customers, vendors, riders)
- Admin roles & permissions (RBAC)
- Vendor / rider verification
- Order & payment oversight
- Refund management
- Support tickets
- System health monitoring
- Audit logging
- Platform settings & announcements

## Frontend
- Dashboard
- Tables (Customers, Vendors, Riders, Orders, Payments)
- Analytics & charts
- Admin users management
- Refunds
- Support tickets
- Audit logs
- Notifications & announcements
- Settings

## Deliverables
Complete operational control center with RBAC, auditing, refunds, and support tooling.

## Definition of Done
- All management tables functional with pagination and search
- Charts render with real aggregated data
- RBAC enforced (5 admin roles with scoped permissions)
- Vendor/rider verification workflow operational
- Refund management (approve/reject/history)
- Support ticket system functional
- System health dashboard shows API, DB, queue status
- Audit logs recorded for all admin actions
- Settings configurable and persisted
- Announcements can be created and pushed
