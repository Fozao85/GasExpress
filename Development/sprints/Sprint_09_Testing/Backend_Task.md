# Backend — Testing

## Unit & Integration
- [ ] Unit tests for all services
- [ ] Integration tests for all API endpoints
- [ ] Database query performance review (index scan, N+1 detection)

## Authentication & Authorization
- [ ] Authentication/authorization test suite
- [ ] JWT tampering tests
- [ ] RBAC enforcement tests
- [ ] Rate limiting tests

## Payments
- [ ] Payment flow test suite (initiate → verify → webhook)
- [ ] Duplicate webhook handling
- [ ] Expired payment handling
- [ ] Cancelled payment handling
- [ ] Partial payment edge cases
- [ ] Network timeout during payment

## WebSocket
- [ ] WebSocket connection tests
- [ ] Reconnection after disconnect
- [ ] Event delivery verification

## Queue Workers
- [ ] Queue worker tests (notifications, emails, SMS, retries)
- [ ] Retry mechanism tests (exponential backoff)
- [ ] Failed job recovery tests
- [ ] Dead letter queue routing

## Notifications
- [ ] Push notification delivery tests
- [ ] SMS notification tests
- [ ] Email notification tests

## File Uploads
- [ ] Upload size limit enforcement
- [ ] Invalid file type rejection
- [ ] Corrupted image handling
- [ ] Compression verification

## Security
- [ ] Security scan (dependencies, headers, SQL injection, XSS, CSRF)
- [ ] Sensitive data exposure check

## Performance
- [ ] Load testing with k6/Artillery
- [ ] API p95 < 200ms verification
