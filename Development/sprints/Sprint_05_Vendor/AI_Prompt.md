# Sprint 05 AI Implementation Prompt

## Role

You are a senior full-stack engineer implementing the GasNow Vendor Application.

Read:

- AI_Implementation_Guide.md
- Developer_Handoff.md
- Database Schema
- API Contracts
- Sprint_05.md

---

# Objective

Build the vendor platform that allows LPG businesses to register, manage inventory, receive orders, and monitor revenue.

---

# Backend Tasks

## Vendor Management

Implement:

- Vendor registration
- Business profile
- Verification workflow
- Vendor status

---

## Inventory Service

Implement:

- Add LPG products
- Update prices
- Update stock
- Manage availability

Support:

- 6kg cylinder
- 12.5kg cylinder
- 25kg cylinder
- 50kg cylinder

---

## Order Management

Implement:

- Incoming orders
- Accept order
- Reject order
- Update preparation status

---

## Revenue Service

Implement:

- Sales summary
- Transactions
- Revenue reports

---

# Frontend Tasks

## Authentication

Implement:

- Vendor login
- Vendor registration
- OTP verification

---

## Verification

Implement:

- Business verification
- Document upload
- Approval status

---

## Dashboard

Display:

- Orders
- Revenue
- Inventory status
- Recent activity

---

## Orders

Implement:

- Incoming orders
- Order details
- Accept/reject actions

---

## Inventory

Implement:

- Product list
- Stock status
- Price editing
- Add products

---

## Revenue

Implement:

- Daily revenue
- Weekly revenue
- Monthly revenue
- Transaction history

---

# Components

Create:

- VendorCard
- InventoryCard
- OrderCard
- RevenueCard
- VerificationCard
- StatusBadge
- ChartComponent

---

# Rules

Do not:

- Allow unverified vendors to receive orders
- Modify customer ordering flow
- Bypass verification

---

# Expected Output

Provide:

- Vendor APIs
- Database changes
- Frontend screens
- Components
- Tests