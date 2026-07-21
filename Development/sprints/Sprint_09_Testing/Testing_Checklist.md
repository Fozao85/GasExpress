# Testing Checklist — UI Refinement & QA

## UI Polish Verification
- [ ] Customer App: all 10+ screens match Figma designs
- [ ] Vendor App: all 6+ screens match Figma designs
- [ ] Rider App: all 6+ screens match Figma designs
- [ ] Admin Dashboard: all 8+ screens match Figma designs
- [ ] Typography consistent across all apps
- [ ] Spacing consistent across all apps
- [ ] Colors match brand palette across all apps
- [ ] Icons consistent (style, size, alignment)
- [ ] Cards have uniform styling (border-radius, padding, shadows)
- [ ] Buttons consistent (sizes, colors, hover/active/focus)
- [ ] Forms consistent (inputs, labels, validation)
- [ ] Tables consistent (headers, rows, pagination)
- [ ] Navigation consistent within each app
- [ ] Responsive: mobile layout verified
- [ ] Responsive: tablet layout verified
- [ ] Responsive: desktop layout verified

## States Coverage
- [ ] Skeleton loaders present on all data-fetching screens
- [ ] Empty states present on all list screens
- [ ] Error states present on all failure scenarios
- [ ] Success states present on all mutation actions

## Animations
- [ ] Skeleton loaders animate correctly
- [ ] Page transitions smooth
- [ ] Button micro-interactions (hover/active)
- [ ] Card hover effects
- [ ] Modal/drawer transitions

## Regression Tests
- [ ] Backend: all unit + integration tests pass
- [ ] Frontend: all component + screen tests pass
- [ ] No regressions from Sprint 00-07 features

## Manual E2E
- [ ] Customer: Register → Browse → Order → Track → Receive
- [ ] Vendor: Register → Verify → Manage Inventory → Accept Order → Fulfill
- [ ] Rider: Register → Verify → Accept Job → Pick Up → Deliver → View Earnings
- [ ] Admin: Login → Dashboard → Manage Users → View Analytics → Settings
- [ ] Cross-role: customer orders → vendor accepts → rider delivers

## Accessibility (WCAG AA)
- [ ] Keyboard navigation (tab order, focus indicators)
- [ ] ARIA labels on all interactive elements
- [ ] Color contrast ≥ 4.5:1 for normal text
- [ ] Focus management in modals and drawers
- [ ] Screen reader (semantic HTML, alt text on images)

## Performance
- [ ] Lazy loading / code splitting verified
- [ ] Bundle size analyzed (no regressions)
- [ ] API p95 < 200ms
- [ ] LCP < 2.5s
- [ ] Lighthouse ≥ 90

## Security
- [ ] RBAC enforced (cross-role access blocked)
- [ ] Input validation (Zod schemas) on all endpoints
- [ ] Rate limiting configured
- [ ] No sensitive data exposed
- [ ] Dependency vulnerabilities resolved

## Code Quality
- [ ] Dead code removed
- [ ] No significant code duplication
- [ ] Consistent error handling patterns
- [ ] Standard response format everywhere
