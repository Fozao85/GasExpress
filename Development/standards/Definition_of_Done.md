# Definition of Done

A user story or task is considered **Done** when all of the following criteria are met:

## Code
- [ ] Code reviewed and approved by at least one peer
- [ ] Code follows project coding standards
- [ ] No lint errors or warnings
- [ ] TypeScript strict mode passes with no errors

## Testing
- [ ] Unit tests written and passing (> 80% coverage)
- [ ] Integration tests written and passing for API endpoints
- [ ] Edge cases covered (empty states, error states, loading states)
- [ ] E2E test passes for the critical user flow (where applicable)

## Documentation
- [ ] API response contracts documented in sprint files
- [ ] Swagger/OpenAPI annotations added (where applicable)
- [ ] Environment variables documented
- [ ] Database migrations documented

## Quality
- [ ] No P0 or P1 bugs open
- [ ] All acceptance criteria from sprint Definition of Done met
- [ ] Performance benchmarks met (API p95 < 200ms, etc.)
- [ ] Accessibility checked (keyboard nav, screen reader)

## Integration
- [ ] Changes merged to `develop` branch
- [ ] CI pipeline passes on the merged branch
- [ ] No breaking changes to dependent services

## Deployment (Sprint 10+ only)
- [ ] Deployment guide updated
- [ ] Rollback plan documented
- [ ] Monitoring configured for new features
