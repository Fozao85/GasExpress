# Database Checklist — Customer Discovery

## Tables / Migrations
- [ ] vendors table (id, name, owner, phone, email, address, status, rating, is_open)
- [ ] vendor_locations table (id, vendor_id, latitude, longitude, address, delivery_radius)
- [ ] vendor_business_hours table (id, vendor_id, day, opening_time, closing_time, is_active)
- [ ] vendor_documents table (id, vendor_id, type, url, verified)
- [ ] categories table (id, name, description, image_url)
- [ ] products table (id, vendor_id, category_id, name, cylinder_size, price, stock_quantity, availability_status)
- [ ] promotions table (id, vendor_id, title, description, discount, code, valid_from, valid_to, is_active)
- [ ] Indexes on vendor_locations (latitude, longitude), products (vendor_id, availability_status), categories
- [ ] Spatial index on vendor_locations for proximity queries
