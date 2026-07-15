# Deployment Checklist

## Infrastructure
- [ ] Production server / cloud provisioned
- [ ] PostgreSQL production instance running
- [ ] Redis instance running (if needed)
- [ ] Object storage configured (files/images)
- [ ] Domain DNS configured
- [ ] SSL certificates installed

## CI/CD
- [ ] Build pipeline passes
- [ ] Test suite passes in CI
- [ ] Docker images built and pushed
- [ ] Staging environment deployed
- [ ] Production deployment pipeline ready

## Database
- [ ] Migrations run on production
- [ ] Seed data loaded (admin user, defaults)
- [ ] Backup schedule configured
- [ ] Connection pooling configured

## Monitoring
- [ ] Error tracking (Sentry) configured
- [ ] Server monitoring (CPU, memory, disk)
- [ ] API endpoint monitoring
- [ ] Uptime monitoring
- [ ] Alert channels configured (Slack/Email)

## Security
- [ ] Environment variables set
- [ ] Rate limiting configured
- [ ] CORS configured
- [ ] HTTPS enforced
- [ ] Security headers set (Helmet)
- [ ] Database firewall rules applied

## Launch Readiness
- [ ] Rollback plan documented
- [ ] Runbook created
- [ ] Support contact established
- [ ] Post-launch monitoring schedule set
