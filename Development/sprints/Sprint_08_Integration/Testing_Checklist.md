# Testing Checklist — Integration

## Backend Tests
- [ ] Push notification sent successfully
- [ ] Payment webhook processes correctly
- [ ] Invalid webhook signature rejected
- [ ] Duplicate webhook events ignored (idempotency)
- [ ] File upload handles valid/invalid files (type, size validation)
- [ ] File upload compression works
- [ ] Maps geocoding returns correct results
- [ ] Queue workers process jobs and retry on failure
- [ ] Failed jobs route to dead letter queue after max retries
- [ ] External API timeout handled gracefully
- [ ] Circuit breaker trips after N failures
- [ ] Integration health endpoint returns correct status for all services

## Frontend Tests
- [ ] Notification tap opens correct screen
- [ ] Push notification permission flow
- [ ] Map renders with markers
- [ ] Upload flow completes with progress indicator
- [ ] Payment cancellation handled gracefully
- [ ] Deep links navigate to correct screen
- [ ] Offline mode detected and banner displayed
- [ ] Retry failed request on reconnect
