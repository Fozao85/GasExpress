# Database Checklist — Authentication

## Tables / Migrations
- [ ] users table (id, name, email, phone, password_hash, role, status)
- [ ] roles table (id, name, description)
- [ ] permissions table (id, name, resource, action)
- [ ] role_permissions table (id, role_id, permission_id)
- [ ] otp_codes table (id, user_id, code, type, expires_at, used)
- [ ] refresh_tokens table (id, user_id, token, expires_at)
- [ ] user_sessions table (id, user_id, token, ip, user_agent, expires_at)
- [ ] audit_logs table (id, user_id, action, resource, resource_id, details, ip, created_at)
- [ ] Indexes on email, phone, role, user_id
- [ ] Unique constraints on email, phone
