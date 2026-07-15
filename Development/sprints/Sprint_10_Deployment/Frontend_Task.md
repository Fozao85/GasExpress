# Frontend — Deployment

## Build & Optimization
- [ ] Production build configured (Vite: `npm run build`)
- [ ] Code splitting and lazy loading verified
- [ ] Tree shaking verified (no unused imports in production bundle)
- [ ] Asset compression (JS/CSS minification, image optimization)
- [ ] Source maps configured (production: error-only or disabled)
- [ ] Environment variables injected at build time

## CDN & Hosting
- [ ] Deploy frontend to hosting platform (Vercel / Netlify / Cloudflare Pages)
- [ ] Configure CDN for static assets (images, fonts, JS bundles)
- [ ] Configure custom domain
- [ ] Configure HTTPS
- [ ] Configure cache headers (immutable for hashed assets, short TTL for HTML)

## Error Tracking
- [ ] Integrate Sentry / equivalent error tracker
- [ ] Source maps uploaded for minified error traces
- [ ] User context attached to errors (user ID, role, session)

## Performance
- [ ] Lighthouse production audit (target ≥ 90)
- [ ] Core Web Vitals verified (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Bundle size report generated
- [ ] Image lazy loading verified

## Launch Readiness
- [ ] Staging deployment verified with smoke tests
- [ ] Production deployment verified with smoke tests
- [ ] Rollback procedure tested (revert to previous deploy)
- [ ] Feature flags configured (if used)
