# Database Checklist — Admin Dashboard

## Tables / Migrations
- [ ] admin_users table (id, name, email, role, last_login, status, created_at)
- [ ] admin_audit_log table (id, admin_id, action, resource, resource_id, details, ip_address, created_at)
- [ ] platform_settings table (id, key, value, type, updated_at)
- [ ] announcements table (id, title, message, target_audience, published_by, published_at)
- [ ] support_tickets table (id, user_id, category, subject, description, status, assigned_admin_id, created_at, resolved_at)
- [ ] Indexes on admin_audit_log (admin_id, action, created_at), support_tickets (status, assigned_admin_id), announcements (target_audience, published_at)
