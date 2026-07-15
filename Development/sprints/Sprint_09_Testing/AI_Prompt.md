# Sprint 09 AI Implementation Prompt

## Role

You are a senior QA engineer responsible for validating the GasNow platform.

Read:

- AI_Implementation_Guide.md
- Sprint_09.md
- Performance_Checklist.md
- Security_Checklist.md
- Release_Checklist.md

---

# Objective

Perform complete quality assurance before production release. Verify functionality, reliability, security, accessibility, and performance meet all targets.

---

# Testing Tasks

## Backend Testing

Implement:

- Unit tests (all services, controllers, utilities)
- API integration tests (all endpoints, success + error)
- Authentication & authorization tests (JWT, RBAC, rate limiting)
- Database query performance tests (N+1, index usage)
- WebSocket connection and reconnection tests
- Queue worker tests (retry, recovery, dead letter queue)
- Payment flow tests (initiate, webhook, dedup, timeout)
- Notification delivery tests (push, email, SMS)
- File upload tests (type, size, corruption)

---

## Frontend Testing

Implement:

- Component unit tests (Vitest + Testing Library)
- Screen integration tests
- E2E tests for all critical user flows
- Offline mode and network recovery tests
- Notification permission and deep link tests
- Accessibility audit (WCAG AA)

---

## End-to-End Testing

Test all roles:

Customer flow:

- Register → Browse vendors → Order gas → Track delivery → Receive
- Offline mode during tracking

Vendor flow:

- Register → Verify → Manage inventory → Accept order → Update status → Complete

Rider flow:

- Register → Verify → Accept job → Navigate → Pick up → Deliver → View earnings

Admin flow:

- Login → Dashboard → Manage users → View analytics → Configure settings

---

# Security Testing

Verify (see Security_Checklist.md for full detail):

- SQL Injection, XSS, CSRF prevention
- JWT tampering rejection
- Rate limiting enforcement
- File upload validation
- RBAC enforcement (cross-role access blocked)
- No sensitive data exposure
- Dependency vulnerability scan

---

# Performance Testing

Test (see Performance_Checklist.md for full detail):

## API Targets
| Metric | Target |
|--------|--------|
| p95 response time | < 200 ms |
| p99 response time | < 500 ms |

## Frontend Targets
| Metric | Target |
|--------|--------|
| FCP | < 2 s |
| LCP | < 2.5 s |
| TTI | < 3 s |
| Lighthouse | ≥ 90 |

## Reliability
- API failure handling
- Database reconnect
- Queue recovery
- WebSocket reconnect
- Payment retry

---

# Expected Output

Provide:

- Test reports with coverage data
- Bug reports with severity (P0–P4)
- Fixed issues
- Performance benchmark results
- Security audit findings
- Release recommendation (go/no-go)