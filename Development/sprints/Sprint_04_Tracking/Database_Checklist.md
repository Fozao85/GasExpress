# Database Checklist — Tracking

## Tables / Migrations
- [ ] deliveries table (id, order_id, rider_id, status, pickup_time, started_at, completed_at, estimated_arrival, actual_arrival)
- [ ] order_status_history table (id, order_id, status, note, created_by, created_at)
- [ ] rider_locations table (id, rider_id, lat, lng, updated_at) — current location
- [ ] rider_location_history table (id, rider_id, latitude, longitude, speed, heading, recorded_at)
- [ ] receipts table (id, order_id, receipt_number, items_json, totals_json, generated_at)
- [ ] Add rider_id FK to orders table
- [ ] Index on deliveries (order_id, rider_id, status)
- [ ] Index on order_status_history (order_id, created_at)
- [ ] Index on rider_location_history (rider_id, recorded_at)
