# Backend — Code Quality & Performance

## Code Quality
- [ ] Remove dead code (unused controllers, services, routes, utilities)
- [ ] Remove duplicated logic across modules (extract shared helpers)
- [ ] Review and improve folder organization where inconsistent
- [ ] Add JSDoc comments to all public service methods and controllers
- [ ] Ensure consistent error handling patterns across all modules
- [ ] Standardize response format across all endpoints

## Performance
- [ ] Database query optimization: detect and fix N+1 queries
- [ ] Add missing database indexes based on query patterns
- [ ] Verify pagination efficiency on list endpoints
- [ ] API response time review (target p95 < 200ms)
- [ ] Lazy-load relations in Prisma queries where possible

## Security Review
- [ ] All endpoints have proper RBAC middleware
- [ ] Input validation (Zod schemas) present on all endpoints
- [ ] Rate limiting configured and verified on login/OTP endpoints
- [ ] No sensitive data exposed in API responses or logs
- [ ] Dependency audit (npm audit) — resolve findings

## Reliability
- [ ] Error boundaries documented for all external service calls
- [ ] Retry logic for transient database connection failures
- [ ] Connection pool configuration review
