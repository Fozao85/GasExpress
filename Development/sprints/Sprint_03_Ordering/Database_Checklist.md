# Database Checklist — Ordering

## Tables / Migrations
- [ ] carts table (id, user_id, vendor_id, created_at, updated_at)
- [ ] cart_items table (id, cart_id, product_id, quantity)
- [ ] addresses table (id, user_id, label, address_line, latitude, longitude, is_default)
- [ ] orders table (id, user_id, vendor_id, order_number, status, subtotal, delivery_fee, total, payment_method, delivery_address_id, notes)
- [ ] order_items table (id, order_id, product_id, quantity, unit_price)
- [ ] order_status_history table (id, order_id, status, note, created_by, created_at)
- [ ] payments table (id, order_id, amount, gateway, status, reference, gateway_response)
- [ ] notifications table (id, user_id, type, title, message, read_status, created_at)
- [ ] Indexes on carts (user_id), addresses (user_id), orders (user_id, status), order_status_history (order_id), payments (order_id, reference)
