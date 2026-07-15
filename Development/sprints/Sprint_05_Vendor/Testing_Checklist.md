# Testing Checklist — Vendor Portal

## Backend Tests
- [ ] Dashboard returns correct stats
- [ ] Order accept/reject/preparing/ready/complete transitions all work
- [ ] Invalid status transitions rejected (e.g. accept → complete)
- [ ] Rejected orders removed from active queue
- [ ] Low stock alerts generated when quantity <= threshold
- [ ] Auto out-of-stock when quantity = 0
- [ ] Vendor cannot modify another vendor's inventory
- [ ] Dashboard metrics accurate against raw data
- [ ] Business settings persist correctly
- [ ] Revenue aggregation matches completed orders
- [ ] Profile update persists (name, hours, radius, logo)

## Frontend Tests
- [ ] Dashboard renders all KPI cards with correct values
- [ ] Dashboard loading state
- [ ] Order tabs filter correctly (Active vs History)
- [ ] Order detail shows timeline + status actions
- [ ] Inventory empty state
- [ ] Inventory low-stock warnings display
- [ ] Revenue chart no-data state
- [ ] Revenue chart data loads
- [ ] Notifications unread indicator
- [ ] Business profile updates successfully
- [ ] Business Verification flow (submit → pending → approved/rejected)
- [ ] Settings save correctly
