# Testing Checklist — Admin Dashboard

## Backend Tests
- [ ] Dashboard stats aggregation correct
- [ ] All list endpoints paginate correctly
- [ ] All list endpoints support search, filter, sort
- [ ] User status update works
- [ ] Vendor verification flow (pending → approved/rejected)
- [ ] RBAC permissions enforced (each role sees only authorized resources)
- [ ] Admin user CRUD works
- [ ] Audit logs created for every admin action
- [ ] Refund approval processed correctly (updates payment + notifies user)
- [ ] Refund rejection works
- [ ] Settings CRUD persists correctly
- [ ] Support ticket status transitions work
- [ ] System health endpoints return correct data
- [ ] Analytics totals validated against raw data

## Frontend Tests
- [ ] All tables render with data
- [ ] Empty table states display correctly
- [ ] Loading skeletons shown during data fetch
- [ ] Tab filters work correctly
- [ ] Search and filter combinations produce correct results
- [ ] Charts render with correct data
- [ ] Charts no-data state
- [ ] Detail panels show correct info
- [ ] Settings form validation
- [ ] Audit log table renders with filters
- [ ] Refund approve/reject actions work
- [ ] Admin user management (create, edit, deactivate)
