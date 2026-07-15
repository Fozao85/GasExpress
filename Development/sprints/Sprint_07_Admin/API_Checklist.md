# API Checklist — Admin Dashboard

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

## Query Parameters

All list endpoints support:

```
?page=1
&limit=20
&search=
&status=
&sort=created_at
&date_from=2026-07-01
&date_to=2026-07-15
```

## Endpoints
- [ ] GET /api/admin/dashboard — 200 — Platform stats
- [ ] GET /api/admin/customers — 200 — Paginated, searchable
- [ ] GET /api/admin/vendors — 200 — Paginated, filterable by status
- [ ] GET /api/admin/riders — 200 — Paginated, filterable by status
- [ ] GET /api/admin/orders — 200 — Paginated, filterable by status/date
- [ ] GET /api/admin/payments — 200 — Paginated, filterable by status/gateway
- [ ] GET /api/admin/analytics — 200 — Chart data
- [ ] PATCH /api/admin/users/:id/status — 200, 404 — Suspend/activate
- [ ] PATCH /api/admin/vendors/:id/verify — 200, 404 — Approve/reject
- [ ] GET /api/admin/roles — 200 — List admin roles
- [ ] GET /api/admin/users — 200 — List admin users
- [ ] POST /api/admin/users — 201 — Create admin user
- [ ] PATCH /api/admin/users/:id — 200 — Update admin user role
- [ ] GET /api/admin/refunds — 200 — Refund requests
- [ ] POST /api/admin/refunds/:id/approve — 200 — Approve refund
- [ ] POST /api/admin/refunds/:id/reject — 200, 400 — Reject refund
- [ ] GET /api/admin/tickets — 200 — Support tickets
- [ ] PATCH /api/admin/tickets/:id/status — 200 — Update ticket
- [ ] POST /api/admin/tickets/:id/resolve — 200 — Resolve ticket
- [ ] POST /api/admin/announcements — 201 — Create announcement
- [ ] GET /api/admin/audit-logs — 200 — Filterable audit trail
- [ ] GET /api/admin/health — 200 — API health
- [ ] GET /api/admin/system — 200 — System status (DB, queue, services)
- [ ] GET /api/admin/settings — 200 — Platform settings
- [ ] PUT /api/admin/settings — 200, 400 — Update settings
