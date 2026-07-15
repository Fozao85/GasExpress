# Performance Checklist

## API Performance

| Metric | Target | Tool |
|--------|--------|------|
| API p95 response time | < 200 ms | k6 / Artillery |
| API p99 response time | < 500 ms | k6 / Artillery |
| Endpoint throughput | Varies by endpoint | k6 / Artillery |
| Database query time (p95) | < 50 ms | Prisma logging / EXPLAIN ANALYZE |

### Tasks
- [ ] Load test all GET endpoints (vendors, products, orders)
- [ ] Load test POST endpoints (order creation, payment)
- [ ] Load test WebSocket connections (100+ concurrent)
- [ ] Database query optimization (N+1 prevention, index usage)
- [ ] Pagination performance on large datasets
- [ ] File upload performance (timeout at 30s for large files)

## Frontend Performance

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 2 s | Lighthouse / Web Vitals |
| Largest Contentful Paint (LCP) | < 2.5 s | Lighthouse / Web Vitals |
| Time to Interactive (TTI) | < 3 s | Lighthouse |
| Lighthouse Performance score | ≥ 90 | Lighthouse |
| First Input Delay (FID) | < 100 ms | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |

### Tasks
- [ ] Lighthouse desktop audit
- [ ] Lighthouse mobile audit
- [ ] Bundle size analysis (code splitting, tree shaking)
- [ ] Image optimization (lazy loading, WebP, compression)
- [ ] Font loading optimization
- [ ] Map component load time < 2s
- [ ] List rendering performance (virtualization for 100+ items)

## Reliability

| Scenario | Expected behavior |
|----------|-------------------|
| Unexpected API failure | Graceful error + retry |
| Database disconnect | Auto-reconnect + queue backlog |
| Queue worker crash | Recovery on restart |
| WebSocket disconnect | Auto-reconnect with exponential backoff |
| Payment gateway timeout | Retry with notification |
| File upload failure | Retry with progress reset |

### Tasks
- [ ] API failure handling tested
- [ ] Database reconnect tested
- [ ] Queue recovery after restart
- [ ] WebSocket reconnect with backoff
- [ ] Payment retry flow tested
- [ ] Upload resume / retry tested
