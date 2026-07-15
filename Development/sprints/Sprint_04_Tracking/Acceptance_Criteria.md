# Sprint 04 Acceptance Criteria

## Order Status Lifecycle

The system must enforce the following 9-state order workflow:

```
Order Created       → Customer places order
    ↓
Vendor Accepted     → Vendor confirms order
    ↓
Preparing Order     → Vendor preparing LPG
    ↓
Ready for Pickup    → Vendor marks ready
    ↓
Rider Assigned      → System auto-assigns or vendor assigns rider
    ↓
Picked Up           → Rider picks up from vendor
    ↓
En Route            → Rider traveling to customer
    ↓
Arrived             → Rider at customer location
    ↓
Delivered           → Customer confirms delivery
```

Invalid transitions (e.g. Delivered → Preparing) must be rejected.

## Order Tracking

Customers can:

- View current order status
- View delivery timeline with all past transitions
- See assigned rider information (name, rating, vehicle, plate, phone)
- View estimated delivery time

---

## Delivery Updates

System supports:

- Vendor preparation updates
- Rider pickup updates
- Delivery completion updates

---

## Notifications

Users receive notifications when:

- Order status changes
- Rider is assigned
- Delivery completes

---

## Security

System must ensure:

- Customers only see their own orders
- Riders only update assigned deliveries
- Vendors only manage their orders

---

## UI Requirements

Tracking screens must:

- Match High-Fi designs
- Support loading states
- Support offline/error states

---

# Definition Of Success

Sprint 04 is complete when customers can track an LPG order from confirmation until successful delivery.