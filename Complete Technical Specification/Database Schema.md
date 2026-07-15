Excellent. We're now entering the **System Design** phase. The database is the foundation of the platform because every feature—customers, vendors, riders, orders, tracking, and payments—depends on it.

For **GasNow**, I recommend using **PostgreSQL** because it provides excellent support for transactions, geospatial queries (via PostGIS), indexing, and scalability. Below is an MVP-oriented schema that is also designed to support future growth.

---

# GasNow Database Schema

## Database Overview

```text
Users
├── Customer Profiles
├── Vendor Profiles
├── Rider Profiles
│
├── Addresses
├── Orders
│   ├── Order Items
│   ├── Payments
│   ├── Delivery
│   ├── Tracking
│   └── Reviews
│
├── Vendor Inventory
├── Notifications
└── Audit Logs
```

---

# Entity Relationship Diagram (Conceptual)

```text
User
 |
 |1
 |------1 Customer
 |
 |------1 Vendor
 |
 |------1 Rider

Vendor
 |
 |1
 |------N Inventory

Customer
 |
 |1
 |------N Orders

Order
 |
 |------N Order Items
 |
 |------1 Payment
 |
 |------1 Delivery
 |
 |------N Tracking Events
 |
 |------1 Review

Rider
 |
 |------N Deliveries
```

---

# Tables

---

# 1. Users

Stores authentication information.

| Field         | Type                                 |
| ------------- | ------------------------------------ |
| id            | UUID                                 |
| full_name     | VARCHAR                              |
| phone         | VARCHAR UNIQUE                       |
| email         | VARCHAR NULL                         |
| password_hash | TEXT                                 |
| role          | ENUM(Customer, Vendor, Rider, Admin) |
| status        | ENUM(Active, Suspended, Pending)     |
| last_login    | TIMESTAMP                            |
| created_at    | TIMESTAMP                            |
| updated_at    | TIMESTAMP                            |

---

# 2. Customer Profiles

| Field              | Type         |
| ------------------ | ------------ |
| id                 | UUID         |
| user_id            | FK Users     |
| default_address_id | FK Addresses |
| preferred_payment  | VARCHAR      |
| loyalty_points     | INTEGER      |
| created_at         | TIMESTAMP    |

---

# 3. Vendor Profiles

| Field               | Type      |
| ------------------- | --------- |
| id                  | UUID      |
| user_id             | FK Users  |
| business_name       | VARCHAR   |
| business_license    | VARCHAR   |
| phone               | VARCHAR   |
| address             | TEXT      |
| latitude            | DECIMAL   |
| longitude           | DECIMAL   |
| opening_time        | TIME      |
| closing_time        | TIME      |
| verification_status | ENUM      |
| average_rating      | DECIMAL   |
| is_open             | BOOLEAN   |
| created_at          | TIMESTAMP |

---

# 4. Rider Profiles

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| user_id          | FK Users  |
| vehicle_type     | ENUM      |
| license_number   | VARCHAR   |
| national_id      | VARCHAR   |
| availability     | ENUM      |
| latitude         | DECIMAL   |
| longitude        | DECIMAL   |
| average_rating   | DECIMAL   |
| total_deliveries | INTEGER   |
| created_at       | TIMESTAMP |

---

# 5. Addresses

Customers may save multiple delivery addresses.

| Field        | Type     |
| ------------ | -------- |
| id           | UUID     |
| user_id      | FK Users |
| label        | VARCHAR  |
| address_line | TEXT     |
| city         | VARCHAR  |
| region       | VARCHAR  |
| latitude     | DECIMAL  |
| longitude    | DECIMAL  |
| is_default   | BOOLEAN  |

---

# 6. Cylinder Types

Instead of hardcoding gas sizes.

| Field       | Type    |
| ----------- | ------- |
| id          | UUID    |
| size_kg     | DECIMAL |
| description | VARCHAR |

Example

* 6kg
* 12.5kg
* 15kg
* 50kg

---

# 7. Vendor Inventory

| Field            | Type              |
| ---------------- | ----------------- |
| id               | UUID              |
| vendor_id        | FK Vendors        |
| cylinder_type_id | FK Cylinder Types |
| stock_quantity   | INTEGER           |
| price            | DECIMAL           |
| last_updated     | TIMESTAMP         |

---

# 8. Orders

Central table.

| Field               | Type          |
| ------------------- | ------------- |
| id                  | UUID          |
| customer_id         | FK Customer   |
| vendor_id           | FK Vendor     |
| rider_id            | FK Rider NULL |
| delivery_address_id | FK Address    |
| subtotal            | DECIMAL       |
| delivery_fee        | DECIMAL       |
| total               | DECIMAL       |
| payment_status      | ENUM          |
| order_status        | ENUM          |
| created_at          | TIMESTAMP     |

---

# Order Status

```text
Pending

Vendor Accepted

Preparing

Ready for Pickup

Rider Assigned

Picked Up

On The Way

Delivered

Cancelled
```

---

# 9. Order Items

Allows multiple cylinder sizes in one order.

| Field            | Type              |
| ---------------- | ----------------- |
| id               | UUID              |
| order_id         | FK Orders         |
| cylinder_type_id | FK Cylinder Types |
| quantity         | INTEGER           |
| unit_price       | DECIMAL           |
| subtotal         | DECIMAL           |

---

# 10. Payments

| Field                 | Type      |
| --------------------- | --------- |
| id                    | UUID      |
| order_id              | FK Orders |
| payment_method        | ENUM      |
| transaction_reference | VARCHAR   |
| amount                | DECIMAL   |
| payment_status        | ENUM      |
| paid_at               | TIMESTAMP |

---

# 11. Delivery

| Field           | Type      |
| --------------- | --------- |
| id              | UUID      |
| order_id        | FK Orders |
| rider_id        | FK Rider  |
| pickup_time     | TIMESTAMP |
| departure_time  | TIMESTAMP |
| arrival_time    | TIMESTAMP |
| completion_time | TIMESTAMP |
| delivery_notes  | TEXT      |

---

# 12. Tracking Events

Stores the delivery timeline.

| Field       | Type        |
| ----------- | ----------- |
| id          | UUID        |
| delivery_id | FK Delivery |
| latitude    | DECIMAL     |
| longitude   | DECIMAL     |
| timestamp   | TIMESTAMP   |

---

# 13. Reviews

| Field         | Type        |
| ------------- | ----------- |
| id            | UUID        |
| order_id      | FK Orders   |
| customer_id   | FK Customer |
| vendor_rating | INTEGER     |
| rider_rating  | INTEGER     |
| comment       | TEXT        |
| created_at    | TIMESTAMP   |

---

# 14. Notifications

| Field             | Type      |
| ----------------- | --------- |
| id                | UUID      |
| user_id           | FK Users  |
| title             | VARCHAR   |
| body              | TEXT      |
| notification_type | VARCHAR   |
| is_read           | BOOLEAN   |
| created_at        | TIMESTAMP |

---

# 15. Promotions (Future)

| Field         | Type    |
| ------------- | ------- |
| id            | UUID    |
| title         | VARCHAR |
| discount_type | ENUM    |
| value         | DECIMAL |
| start_date    | DATE    |
| end_date      | DATE    |
| active        | BOOLEAN |

---

# 16. Audit Logs

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | FK Users  |
| action     | VARCHAR   |
| entity     | VARCHAR   |
| entity_id  | UUID      |
| ip_address | VARCHAR   |
| created_at | TIMESTAMP |

---

# Relationships Summary

```text
Users (1) ─────── (1) Customer

Users (1) ─────── (1) Vendor

Users (1) ─────── (1) Rider

Customer (1) ────< Orders

Vendor (1) ─────< Orders

Vendor (1) ─────< Inventory

Orders (1) ─────< Order Items

Orders (1) ─────(1) Payment

Orders (1) ─────(1) Delivery

Delivery (1) ───< Tracking Events

Orders (1) ─────(1) Review

Users (1) ─────< Notifications
```

---

# Suggested Indexes

To ensure fast lookups and support location-based searches, create indexes on:

* `users(phone)` *(unique)*
* `users(email)` *(unique where not null)*
* `vendor_profiles(verification_status)`
* `vendor_profiles(is_open)`
* `vendor_profiles(latitude, longitude)` *(or a PostGIS spatial index if using PostGIS)*
* `rider_profiles(availability)`
* `rider_profiles(latitude, longitude)` *(or PostGIS spatial index)*
* `orders(customer_id)`
* `orders(vendor_id)`
* `orders(rider_id)`
* `orders(order_status)`
* `orders(created_at)`
* `vendor_inventory(vendor_id, cylinder_type_id)` *(unique composite index)*

---

# Recommended Enums

```text
UserRole
---------
CUSTOMER
VENDOR
RIDER
ADMIN

OrderStatus
-----------
PENDING
VENDOR_ACCEPTED
PREPARING
READY_FOR_PICKUP
RIDER_ASSIGNED
PICKED_UP
ON_THE_WAY
DELIVERED
CANCELLED

PaymentMethod
-------------
CASH
MOBILE_MONEY
CARD

PaymentStatus
-------------
PENDING
AUTHORIZED
PAID
FAILED
REFUNDED

RiderAvailability
-----------------
ONLINE
OFFLINE
BUSY

VerificationStatus
------------------
PENDING
VERIFIED
REJECTED
SUSPENDED
```

## Design Notes

A few architectural decisions will make the platform easier to evolve:

* **Use UUIDs** for primary keys to simplify distributed systems and avoid predictable IDs.
* **Keep authentication (`users`) separate from role-specific profiles** (`customer_profiles`, `vendor_profiles`, `rider_profiles`). This keeps the model flexible if a user later becomes both a customer and a vendor.
* **Normalize cylinder types** into their own table so new sizes can be added without code changes.
* **Store delivery tracking as events** rather than overwriting a single location. This provides a complete history for customer support and analytics.
* **Plan for geospatial support** by using PostGIS from the start if possible, enabling efficient "find nearby vendors" and "find nearby riders" queries.

This schema provides a solid foundation for the MVP while leaving room for advanced features like subscriptions, loyalty programs, vendor analytics, and predictive refill reminders without requiring major redesign.
