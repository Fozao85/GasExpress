# Security Checklist

## Authentication & Authorization
- [ ] JWT tampering rejected (invalid signature, expired, malformed)
- [ ] Rate limiting on login endpoints (brute force protection)
- [ ] RBAC enforced (Customer, Vendor, Rider, Admin roles)
- [ ] Cross-role data access blocked (vendor cannot access rider endpoints)
- [ ] Password requirements enforced (min length, complexity)
- [ ] Password hashing verified (bcrypt/argon2)
- [ ] OTP expiry and rate limiting
- [ ] Session timeout / token refresh flow

## API Security
- [ ] SQL injection prevention (Prisma parameterized queries)
- [ ] XSS prevention (input sanitization, CSP headers)
- [ ] CSRF protection (same-site cookies, CSRF tokens)
- [ ] Request size limits enforced
- [ ] CORS configured correctly (only allowed origins)
- [ ] Helmet security headers set
- [ ] Rate limiting on all API endpoints
- [ ] Input validation on all endpoints (zod / joi schemas)

## Data Protection
- [ ] Sensitive data not exposed in API responses (passwords, tokens)
- [ ] Personal data encrypted at rest
- [ ] Payment data handled via gateway (no raw card storage)
- [ ] API keys and secrets in environment variables, not code
- [ ] File upload validation (type, size, no executable files)

## Infrastructure
- [ ] Dependencies scanned for vulnerabilities (npm audit / Snyk)
- [ ] HTTPS enforced (no HTTP fallback)
- [ ] Database connection encrypted
- [ ] Logging without sensitive data (no passwords, tokens in logs)
- [ ] Error messages don't leak stack traces or internals

## WebSocket Security
- [ ] WebSocket connections authenticated (JWT handshake)
- [ ] Room/event access scoped (customer only sees own order)
- [ ] Connection limits per user

## Payment Security
- [ ] Webhook signature verified (HMAC)
- [ ] Idempotency prevents duplicate payment processing
- [ ] Payment failure doesn't leave order in inconsistent state
- [ ] Refund authorization checked (Finance Admin only)

## Mobile Security
- [ ] API keys not hardcoded in mobile app
- [ ] Certificate pinning considered
- [ ] Secure storage for tokens (Keychain / Keystore)
