# Sprint Dependency Graph

## Overview
This document defines the dependency relationships between sprints. A sprint marked as "depends on" must have its deliverables complete before the dependent sprint can begin implementation.

## Dependency Map
```
Sprint 00 ──────────────────────────────────────────┐
  Project Setup                                      │
    │                                                │
    ▼                                                │
Sprint 01 ──────────────────────────────────────────┐│
  Authentication                                     ││
    │                                                ││
    ▼                                                ││
Sprint 02 ──────────────────────────────────────────┐││
  Customer Discovery                                 │││
    │                                                │││
    ▼                                                │││
Sprint 03 ────────┐                                  │││
  Ordering &       │                                  │││
  Checkout         │                                  │││
    │              │                                  │││
    ▼              ▼                                  │││
Sprint 04 ──── Sprint 05                              │││
  Tracking        Vendor Portal                       │││
    │              │                                  │││
    │              ▼                                  │││
    │         Sprint 06                               │││
    │           Rider                                 │││
    │              │                                  │││
    ▼──────────────▼                                  │││
Sprint 07                                             │││
  Admin Dashboard                                     │││
    │                                                 │││
    ▼                                                 ▼▼▼
Sprint 08 ──────────────────────────────────────────────┘
  Integration
    │
    ▼
Sprint 09
  Testing & QA
    │
    ▼
Sprint 10
  Deployment & Launch
```

## Detailed Dependencies

### Sprint 00 — Project Setup
Depends on: Nothing (foundation)
Required by: All sprints (tooling, repo structure, CI base)

### Sprint 01 — Authentication
Depends on: Sprint 00
Required by: Sprints 02, 03, 05, 06, 07 (all need auth)

### Sprint 02 — Customer Discovery
Depends on: Sprint 00, Sprint 01
Required by: Sprint 03 (browse before order)

### Sprint 03 — Ordering & Checkout
Depends on: Sprint 01, Sprint 02
Required by: Sprint 04 (order before track), Sprint 05 (vendors fulfill), Sprint 06 (riders deliver)

### Sprint 04 — Tracking
Depends on: Sprint 03, Sprint 06 (rider assignments)
Required by: Sprint 07 (admin views tracking), Sprint 08 (WebSocket integration)

### Sprint 05 — Vendor Portal
Depends on: Sprint 01, Sprint 02
Required by: Sprint 06 (vendors assign riders), Sprint 07 (admin manages vendors)

### Sprint 06 — Rider Application
Depends on: Sprint 01, Sprint 05 (vendor order flow)
Required by: Sprint 04 (riders enable tracking), Sprint 07 (admin manages riders)

### Sprint 07 — Admin Dashboard
Depends on: Sprints 01–06 (all user roles and data)
Required by: Sprint 08 (admin monitoring of integrations)

### Sprint 08 — Integration
Depends on: Sprints 00–07 (connects all existing services)
Required by: Sprint 09 (integration must work before testing)

### Sprint 09 — Testing & QA
Depends on: Sprint 08 (integrated system to test)
Required by: Sprint 10 (must pass QA before deployment)

### Sprint 10 — Deployment & Launch
Depends on: Sprint 09 (tested release candidate)
Required by: Production

## Parallel Execution Opportunities

| Parallel Group | Sprints | Shared Dependency |
|----------------|---------|-------------------|
| A | Sprint 02, Sprint 05 | Sprint 01 |
| B | Sprint 04, Sprint 06 | Sprint 03, Sprint 05 |

## Risk Notes
- Sprint 04 (Tracking) depends on Sprint 06 (Rider) — circular dependency risk. Recommendation: implement rider assignment as a stub/contract in Sprint 04, full implementation in Sprint 06.
- Sprint 08 (Integration) should not start until Sprints 00–07 are stable.
