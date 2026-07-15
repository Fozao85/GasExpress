# Testing Checklist — QA

## Coverage Thresholds
- [ ] Backend unit tests > 80%
- [ ] Frontend component tests > 70%
- [ ] API integration tests for all endpoints (200 + 4xx/5xx)
- [ ] E2E tests for all critical user flows

## Critical Flows (by role)
- [ ] Customer: Register → Browse → Order → Track → Receive
- [ ] Vendor: Register → Verify → Manage Inventory → Accept Order → Fulfill
- [ ] Rider: Register → Verify → Accept Job → Pick Up → Deliver
- [ ] Admin: Login → Manage Users → View Reports → Configure Settings

## Reliability
- [ ] Unexpected API failures handled gracefully
- [ ] Database reconnect works (connection pool recovery)
- [ ] Queue recovery after worker restart
- [ ] WebSocket reconnect with exponential backoff
- [ ] Payment retry on gateway timeout

## Security
- [ ] SQL Injection — parameterized queries verified
- [ ] XSS — input sanitized, CSP headers set
- [ ] CSRF — same-site cookies or tokens
- [ ] JWT Tampering — invalid signature rejected
- [ ] Rate Limiting — brute force blocked (login, OTP)
- [ ] File Upload — type/size validation, no executable files
- [ ] RBAC — cross-role access blocked
- [ ] Sensitive Data Exposure — no passwords/tokens in logs or responses

## Accessibility (WCAG AA)
- [ ] Color contrast meets AA ratio (4.5:1 normal text)
- [ ] Keyboard navigation (tab order, focus indicators)
- [ ] Screen reader (aria labels, semantic HTML)
- [ ] Focus management (modals, drawers)
- [ ] Large text scaling (200% without loss)

## Performance
- [ ] API p95 < 200ms
- [ ] API p99 < 500ms
- [ ] First Contentful Paint (FCP) < 2s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Time to Interactive (TTI) < 3s
- [ ] Lighthouse score ≥ 90
- [ ] WebSocket latency < 1s
- [ ] Map load < 2s
- [ ] Database queries (p95) < 50ms

## Offline & Network
- [ ] Offline mode renders cached state
- [ ] Retry after reconnect
- [ ] Poor network simulation (3G throttling)
- [ ] Upload queue with retry on reconnect

## Notifications
- [ ] Push permission denied flow
- [ ] Deep link navigation from notification
- [ ] Background notification handling
