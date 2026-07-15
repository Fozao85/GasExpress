# Backend — Authentication

## Architecture Tasks
- [ ] Create Auth module (folder structure with controller, service, guards)
- [ ] Create User entity/model with Prisma schema
- [ ] Create Auth controller (register, login, otp, refresh, password reset)
- [ ] Create Auth service (business logic for authentication flows)
- [ ] Create JWT service (token generation, verification, refresh)
- [ ] Create OTP service (code generation, sending, verification, expiry)
- [ ] Create password hashing service (bcrypt/argon2)
- [ ] Create authentication guard (JWT validation middleware)
- [ ] Create authorization middleware (role-based access control)
- [ ] Create password reset token service

## Tasks
- [ ] POST /api/auth/register — Create account
- [ ] POST /api/auth/login — Authenticate user
- [ ] POST /api/auth/otp/send — Send OTP
- [ ] POST /api/auth/otp/verify — Verify OTP
- [ ] POST /api/auth/refresh — Refresh JWT token
- [ ] POST /api/auth/forgot-password — Request reset
- [ ] POST /api/auth/reset-password — Reset password
- [ ] JWT middleware for protected routes
- [ ] Role-based authorization middleware (customer/vendor/rider/admin)
