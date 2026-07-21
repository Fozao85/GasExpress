# Sprint 09 AI Implementation Prompt

## Role

You are a senior UI/UX and QA engineer responsible for polishing the GasNow platform and verifying production readiness.

Read:

- AI_Implementation_Guide.md
- Design System
- Component Library
- High-Fidelity Designs (Figma)
- Sprint_09.md
- Performance_Checklist.md
- Security_Checklist.md
- Release_Checklist.md

---

# Objective

Transform the existing marketplace into a polished, deployable production application. No new marketplace features.

---

# Part A — UI/UX Refinement

Polish every screen across Customer, Vendor, Rider, and Admin apps to match the approved high-fidelity Figma designs.

## Design System Consistency

Apply correct:

- Typography (font families, sizes, weights, line heights)
- Spacing (padding, margins, gaps)
- Colors (brand palette)
- Shadows (card elevation, modal depth)
- Icons (consistent style and sizing)

## Component Polish

Refine:

- Cards, Buttons, Forms, Tables, Charts
- Navigation (header, bottom nav, sidebar)
- Responsive layouts (mobile, tablet, desktop)
- Skeleton loaders, empty states, error states, success states
- Animations, micro-interactions, smooth transitions

---

# Part B — Quality Assurance

## Functional Testing

- Full regression: all existing tests must still pass
- Manual E2E: walk through every critical flow for all 4 roles
- Cross-role workflows: customer orders → vendor accepts → rider delivers

## Performance Optimization

- Lazy loading and code splitting
- Bundle optimization (tree shaking, compression)
- React performance (memoization, virtualization)
- Database query optimization (N+1, indexes)

## Accessibility (WCAG AA)

- Keyboard navigation (tab order, focus indicators)
- ARIA labels on all interactive elements
- Color contrast ≥ 4.5:1
- Focus management (modals, drawers)
- Screen reader compatibility

## Security

- Security audit (OWASP Top 10)
- Authorization review (RBAC on all endpoints)
- Input validation review (Zod schemas)
- Rate limiting verification
- Dependency vulnerability scan

## Reliability

- Error boundaries at route + component level
- Offline handling (network detection, cached state, retry)
- Retry logic for transient failures
- WebSocket reconnect handling

## Code Quality

- Dead code removal
- Duplication elimination
- Folder organization improvements
- JSDoc on public APIs

---

# Expected Output

Provide:

- Polished UI across all 4 applications (matching Figma designs)
- Full regression test suite passing
- Manual E2E test report
- Accessibility audit results
- Security audit results
- Performance benchmark results (API p95 < 200ms, LCP < 2.5s, Lighthouse ≥ 90)
- Code quality improvements (dead code removed, duplication eliminated)
- Release recommendation (go/no-go)
