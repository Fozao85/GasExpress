# Sprint 06 Acceptance Criteria

## Registration

Rider can:

- Create account
- Submit identity information
- Wait for approval

---

## Jobs

Rider can:

- View available deliveries
- Accept jobs
- Reject jobs
- View delivery details

---

## Rider Workflow

The system enforces this delivery lifecycle:

```
Available (Online) → Job Offered
    ↓
Accept ──→ Reject (auto-reassign)
    ↓
Navigate to Vendor
    ↓
Arrived at Vendor
    ↓
Picked Up
    ↓
Navigate to Customer
    ↓
Arrived at Customer
    ↓
Delivered (with proof)
    ↓
Earnings Updated
```

Invalid transitions must be rejected.

## Delivery

Rider can:

- Navigate to vendor
- Confirm arrival at vendor
- Confirm pickup
- Navigate to customer
- Confirm arrival at customer
- Complete delivery with optional photo proof

---

## Earnings

Rider can:

- View earnings
- View completed deliveries
- Track performance

---

## Security

System ensures:

- Riders only access assigned deliveries
- Location data is protected
- Delivery completion is validated

---

# Definition Of Success

Sprint 06 is complete when riders can complete the full delivery lifecycle from accepting a job to receiving earnings.