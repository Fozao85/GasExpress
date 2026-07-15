# Testing Checklist — Authentication

## Backend Tests
- [ ] User registration — success + duplicate + invalid data
- [ ] Login — valid + wrong password + unverified
- [ ] OTP send — success + rate limit + invalid phone
- [ ] OTP verify — correct + expired + wrong code
- [ ] JWT — valid + expired + malformed token
- [ ] RBAC — correct role access + forbidden

## Security Tests
- [ ] Password hashing verification (plaintext never stored)
- [ ] OTP brute-force prevention (rate limit + expiry)
- [ ] Rate limit enforcement on login and OTP endpoints
- [ ] Token reuse prevention (refresh token rotation)
- [ ] Session invalidation on logout
- [ ] SQL injection prevention on all inputs

## Frontend Tests
- [ ] Form validation on register/login
- [ ] OTP auto-focus and paste behavior
- [ ] Navigation guards for authenticated routes
