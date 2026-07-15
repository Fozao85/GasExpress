# Release Checklist

## Code Quality
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Code coverage > 80% (backend), > 70% (frontend)
- [ ] No P0/P1 bugs open
- [ ] Code reviewed and approved
- [ ] Linting and type checking passing

## Documentation
- [ ] API documentation updated (Swagger/OpenAPI)
- [ ] Environment variables documented
- [ ] Deployment guide updated
- [ ] Release notes prepared

## Database
- [ ] All migrations verified (rollback tested)
- [ ] Seed data tested
- [ ] Backup/restore procedure verified

## Configuration
- [ ] Environment variables checked (dev → staging → production)
- [ ] Feature flags configured
- [ ] Third-party API keys active and valid
- [ ] CORS origins configured for production domains

## Monitoring
- [ ] Error logging configured (Sentry / equivalent)
- [ ] Performance monitoring configured
- [ ] Uptime monitoring configured
- [ ] Alert thresholds defined (API latency, error rate, 5xx)
- [ ] Dashboard created for key metrics

## Infrastructure
- [ ] SSL/TLS certificates valid
- [ ] Database connection pooling configured
- [ ] Cache configured (Redis)
- [ ] Queue workers configured (Bull/Redis)
- [ ] File storage configured (S3 / Cloud Storage)
- [ ] CDN configured for static assets

## Security
- [ ] Security audit passed (no critical/high findings)
- [ ] Dependency vulnerabilities resolved
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] Helmet / security headers set

## Deployment
- [ ] Staging deployment verified
- [ ] Rollback plan documented
- [ ] Smoke tests pass on staging
- [ ] Database migration included in deployment script
- [ ] Health check endpoint verified
- [ ] Release tagged in version control

## Post-Deployment
- [ ] Production smoke tests pass
- [ ] Monitoring alerts active
- [ ] Backup confirmed running
- [ ] Team notified of release
