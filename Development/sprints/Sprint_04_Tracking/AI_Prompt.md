# Sprint 04 AI Implementation Prompt

## Role

You are a senior full-stack engineer implementing the GasNow delivery tracking system.

Before implementation, read:

- AI_Implementation_Guide.md
- Developer_Handoff.md
- Database Schema
- API Contracts
- Authentication Flow
- Sprint_04.md

---

# Objective

Implement the delivery lifecycle after an order has been placed.

Customers should be able to track their LPG delivery while vendors and riders update order progress.

---

# Backend Tasks

## Order Status Management

Implement delivery statuses:

- Pending
- Accepted
- Preparing
- Ready for Pickup
- Picked Up
- In Transit
- Delivered
- Cancelled

---

## Rider Assignment Service

Implement:

- Rider matching
- Rider assignment
- Delivery creation
- Delivery status updates

---

## Tracking Service

Implement:

- Rider location updates
- Customer tracking endpoint
- ETA calculation
- Delivery timeline

---

## Notification Service

Trigger notifications for:

- Order accepted
- Rider assigned
- Picked up
- Out for delivery
- Delivered
- Cancelled

---

# Frontend Tasks

## Customer App

Implement:

### Order Tracking

Features:

- Live map placeholder
- Rider information
- ETA
- Delivery timeline
- Current status

---

### Delivery Completed

Display:

- Success message
- Delivery summary
- Rating option

---

### Receipt

Display:

- Order details
- Payment information
- Vendor information

---

### Order History

Implement:

- All orders
- Completed orders
- Cancelled orders
- Ongoing orders

---

# Components

Create:

- OrderTimeline
- StatusBadge
- TrackingMap
- RiderCard
- ETAIndicator
- ReceiptCard
- OrderCard

---

# Rules

Follow:

- Existing order workflow
- API contracts
- Security model

Do not:

- Change order statuses without updating backend logic
- Expose rider private information
- Create fake tracking logic

---

# Expected Output

Provide:

- Tracking APIs
- Database changes
- Notification services
- Frontend screens
- Tests