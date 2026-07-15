# Database Checklist — Rider

## Tables / Migrations
- [ ] rider_jobs table (id, rider_id, order_id, status, accepted_at, arrived_vendor_at, picked_up_at, arrived_customer_at, delivered_at)
- [ ] rider_earnings table (id, rider_id, order_id, delivery_fee, bonus, platform_fee, net_amount, payout_status, earned_at)
- [ ] rider_locations table (id, rider_id, lat, lng, updated_at) — current location
- [ ] rider_status table (rider_id FK, is_online, last_online, availability_reason)
- [ ] rider_metrics table (rider_id FK, total_deliveries, rating, completion_rate, on_time_rate)
- [ ] delivery_proofs table (id, delivery_id, photo_url, timestamp, customer_confirmed)
- [ ] Indexes on rider_jobs (rider_id, status), rider_earnings (rider_id), rider_locations (rider_id)
