# Backend — Admin Dashboard

## Architecture Tasks
- [ ] Create Admin module (controller, service)
- [ ] Create Admin Dashboard service (aggregation, stats)
- [ ] Create User Management service (CRUD, status changes)
- [ ] Create Vendor Verification service
- [ ] Create Analytics service (reports, chart data, aggregation)
- [ ] Create Platform Settings service
- [ ] Create Admin RBAC service (roles, permissions)
- [ ] Create Refund Management service
- [ ] Create Support Ticket service
- [ ] Create System Health monitoring service
- [ ] Create Announcement service
- [ ] Create Audit Logging middleware

## Admin Roles & RBAC
- [ ] Super Admin role (full access)
- [ ] Operations Admin role (users, vendors, orders)
- [ ] Finance Admin role (payments, refunds)
- [ ] Support Admin role (tickets, announcements)
- [ ] Read-only Analyst role (dashboard, reports)
- [ ] GET /api/admin/roles — List admin roles
- [ ] GET /api/admin/users — List admin users
- [ ] POST /api/admin/users — Create admin user
- [ ] PATCH /api/admin/users/:id — Update admin user role/status

## Refund Management
- [ ] Review refund requests
- [ ] POST /api/admin/refunds/:id/approve — Approve refund
- [ ] POST /api/admin/refunds/:id/reject — Reject refund
- [ ] GET /api/admin/refunds — Refund history

## Support
- [ ] GET /api/admin/tickets — List support tickets
- [ ] PATCH /api/admin/tickets/:id/status — Update ticket status
- [ ] POST /api/admin/tickets/:id/resolve — Resolve ticket
- [ ] POST /api/admin/announcements — Create announcement

## System Health
- [ ] GET /api/admin/health — API health status
- [ ] GET /api/admin/system — Database, queue, service status
- [ ] Active user count monitoring

## Audit Logging
- [ ] Record all admin actions (CRUD, status changes, refunds)
- [ ] GET /api/admin/audit-logs — Filterable audit trail

## Tasks
- [ ] GET /api/admin/dashboard — Platform stats
- [ ] GET /api/admin/customers — List customers (?page=&limit=&search=&status=)
- [ ] GET /api/admin/vendors — List vendors (?page=&limit=&search=&status=)
- [ ] GET /api/admin/riders — List riders (?page=&limit=&search=&status=)
- [ ] GET /api/admin/orders — List orders (?page=&limit=&status=&date=)
- [ ] GET /api/admin/payments — List transactions (?page=&limit=&status=&gateway=)
- [ ] GET /api/admin/analytics — Revenue/orders charts data
- [ ] PATCH /api/admin/users/:id/status — Suspend/activate users
- [ ] PATCH /api/admin/vendors/:id/verify — Verify vendor
- [ ] GET /api/admin/settings — Platform settings
- [ ] PUT /api/admin/settings — Update settings
