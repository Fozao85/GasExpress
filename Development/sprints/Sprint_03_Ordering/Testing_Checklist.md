# Testing Checklist — Ordering

## Backend Tests
- [ ] Add to cart — new item + existing item (quantity merge)
- [ ] Cart CRUD operations
- [ ] Order cannot be created without address
- [ ] Order cannot contain unavailable product
- [ ] Place order — success + insufficient stock + invalid address
- [ ] Stock reduces after successful order
- [ ] Payment failure cancels order and releases stock
- [ ] Vendor receives notification after order creation
- [ ] Duplicate orders prevented (idempotency)
- [ ] Order listing — paginated + filtered by status
- [ ] Cancel order — valid transition + invalid status + stock released
- [ ] Order status history recorded on every transition
- [ ] Address CRUD operations

## Frontend Tests
- [ ] Cart updates quantity correctly
- [ ] Empty cart state displays correctly
- [ ] Checkout form validation
- [ ] Payment loading state shown during processing
- [ ] Payment failure state with retry option
- [ ] Order confirmation displays correct info
- [ ] Network error state handled gracefully
- [ ] Order success animation plays
