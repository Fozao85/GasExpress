# Testing Checklist — Rider

## Backend Tests
- [ ] Dashboard returns correct stats + online status
- [ ] Job acceptance flow works end-to-end
- [ ] Full status transitions: Accept → ArrivedVendor → PickedUp → ArrivedCustomer → Delivered
- [ ] Invalid transitions rejected (e.g. Delivered → ArrivedVendor)
- [ ] Job rejection auto-reassigns to next available rider
- [ ] Rider cannot accept an already assigned job
- [ ] Offline rider cannot receive or accept jobs
- [ ] Location updates stored correctly for active jobs only
- [ ] Earnings calculated correctly after delivery completion
- [ ] Proof of delivery photo upload works
- [ ] Profile update persists

## Frontend Tests
- [ ] Dashboard renders with online/offline toggle
- [ ] Dashboard offline state (toggle to offline, jobs stop)
- [ ] Jobs list renders available and active jobs
- [ ] Jobs empty state when no jobs available
- [ ] Job card shows accept/reject actions
- [ ] Navigation view works with map
- [ ] Navigation permission denied state
- [ ] Earnings breakdown displays with chart
- [ ] Earnings no-data state
- [ ] History list with filters
- [ ] Profile update works
- [ ] Identity Verification flow
