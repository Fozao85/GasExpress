# Sprint 09 Acceptance Criteria

## Feature Test Matrix
All major user journeys must pass E2E:

| Role | Flows |
|------|-------|
| Customer | Register, Login, Browse vendors, Order gas, Track delivery, Receive |
| Vendor | Register, Verify, Manage inventory, Accept/fulfill orders, View revenue, Settings |
| Rider | Register, Verify, Accept job, Navigate, Pick up, Deliver, View earnings |
| Admin | Login, Dashboard, Analytics, User management, Settings |

---

## Backend Quality

Must have:

- Unit tests > 80% coverage
- API integration tests for all endpoints (success + error)
- No P0/P1 bugs
- Queue worker tests (retry, recovery, DLQ)
- Payment flow tests (webhook, dedup, timeout)
- WebSocket connection and reconnection tests

---

## Frontend Quality

Must have:

- Component tests > 70% coverage
- E2E tests for all critical flows
- Responsive layouts (mobile, tablet, desktop)
- Cross-browser testing passed (Chrome, Firefox, Safari, Edge)

---

## Performance

Must meet targets:

| Metric | Target |
|--------|--------|
| API p95 | < 200 ms |
| API p99 | < 500 ms |
| FCP | < 2 s |
| LCP | < 2.5 s |
| TTI | < 3 s |
| Lighthouse | ≥ 90 |

---

## Reliability

System must handle:

- Unexpected API failures (graceful error + retry)
- Database disconnect (auto-reconnect)
- Queue worker crash (recovery on restart)
- WebSocket disconnect (auto-reconnect)
- Payment gateway timeout (retry with notification)

---

## Security

Must verify:

- SQL Injection prevented (parameterized queries)
- XSS prevented (input sanitization, CSP)
- CSRF protected
- JWT tampering rejected
- Rate limiting enforced
- File upload validated (type, size)
- RBAC enforced across all roles
- No sensitive data in logs or responses
- Dependency vulnerabilities resolved (npm audit)

---

## Accessibility (WCAG AA)

Must verify:

- Color contrast ≥ 4.5:1
- Keyboard navigation works (tab order, focus indicators)
- Screen reader compatibility (aria labels, semantic HTML)
- Focus management in modals and drawers
- Text scaling to 200% without loss

---

## Offline & Mobile

Must handle:

- Offline mode with cached state
- Retry failed requests on reconnect
- Poor network (3G throttling)
- Push permission denied gracefully
- Deep link navigation from notifications

---

## Release Readiness

Release checklist must complete:

- All tests passing
- No P0/P1 bugs
- Monitoring configured
- Error logging enabled
- Database migrations verified
- Backup/restore tested
- Rollback plan documented
- Release notes prepared

---

# Definition Of Success

Sprint 09 is complete when the GasNow platform is stable, secure, performant, accessibility-audited, and ready for production deployment with all quality gates passed.