# Testing Checklist — Customer Discovery

## Backend Tests
- [ ] Vendor list returns paginated results
- [ ] Search returns relevant vendors by name and location
- [ ] Nearby vendors sorted correctly by distance
- [ ] Vendors outside delivery radius excluded
- [ ] Out-of-stock vendors filtered from results
- [ ] Closed vendors handled correctly (marked unavailable)
- [ ] Vendor detail returns all fields including products and hours
- [ ] Categories list works
- [ ] Filtering by status/location/sort works correctly
- [ ] Sorting by distance, speed, price, rating all work
- [ ] Operating hours validation (open during business hours, closed otherwise)

## Frontend Tests
- [ ] Home screen renders all sections (header, address, promo, actions, vendors, orders)
- [ ] Loading skeleton appears while data loads
- [ ] Empty state appears when no vendors found
- [ ] Error state appears on API failure
- [ ] Vendor list loads and displays cards with correct data
- [ ] Search input filters results
- [ ] Sort tabs update results correctly
- [ ] Vendor detail shows cylinder options with pricing
- [ ] Filter chips update results
- [ ] Vendor card navigation works
- [ ] Availability badge shows correct status (Open/Closed/Out of Stock)
