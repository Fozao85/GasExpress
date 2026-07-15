# Database Checklist — Vendor Portal

## Tables / Migrations
- [ ] vendor_inventory table (id, vendor_id, product_id, price, stock_quantity, low_stock_threshold, availability_status, updated_at)
- [ ] vendor_settings table (vendor_id FK, opening_time, closing_time, delivery_radius, auto_accept_orders, notification_preferences)
- [ ] vendor_daily_metrics table (id, vendor_id, date, orders_count, revenue, average_order_value, cancelled_orders)
- [ ] vendor_business_documents table (id, vendor_id, type, url, status, verified_at)
- [ ] notifications table (id, user_id, type, title, body, read, created_at)
- [ ] Index on vendor_inventory (vendor_id, availability_status)
- [ ] Index on vendor_daily_metrics (vendor_id, date)
- [ ] Index on notifications (user_id, read, created_at)
