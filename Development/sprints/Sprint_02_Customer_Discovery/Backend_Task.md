# Backend — Customer Discovery

## Architecture Tasks
- [ ] Create Vendor module (controller, service, repository)
- [ ] Create Category module (controller, service, repository)
- [ ] Create Product module (controller, service, repository)
- [ ] Create Location service (geocoding, distance calculation, proximity search)
- [ ] Create Vendor Ranking service (sort by distance, speed, price, rating)
- [ ] Create Availability service (stock check, operating hours validation)
- [ ] Create search/filter service (pagination, sorting, query builder)

## Location Service
- [ ] Capture customer coordinates (lat, lng) on search
- [ ] Calculate vendor distance from customer
- [ ] Sort vendors by proximity
- [ ] Filter vendors within delivery radius
- [ ] GET /api/vendors/nearby — Nearby vendors by coordinates

## Ranking
- [ ] Sort by distance (nearest first)
- [ ] Sort by delivery speed (fastest ETA)
- [ ] Sort by price (cheapest cylinder first)
- [ ] Sort by rating (highest first)

## Availability
- [ ] Vendor availability status (open/closed/busy)
- [ ] Delivery availability check (within radius + operating hours)
- [ ] Operating hours validation (day of week, time range)
- [ ] Out-of-stock vendor handling

## Tasks
- [ ] GET /api/vendors — List vendors with filters
- [ ] GET /api/vendors/:id — Vendor details with availability
- [ ] GET /api/vendors/search — Search vendors by name/location
- [ ] GET /api/vendors/nearby — Nearby vendors with distance
- [ ] GET /api/categories — List cylinder categories
- [ ] GET /api/categories/:id/products — Cylinders by category with stock
- [ ] GET /api/vendors/:id/availability — Check vendor availability
- [ ] Pagination, sorting, filtering middleware
