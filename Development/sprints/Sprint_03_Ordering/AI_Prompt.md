# Sprint 03 AI Implementation Prompt

## Role

You are a senior full-stack engineer implementing the GasNow ordering system.

Read:

- AI_Implementation_Guide.md
- Database Schema
- API Contracts
- Security Model
- Sprint_03.md

---

# Objective

Allow customers to create LPG orders from vendor products and complete checkout.

---

# Backend Tasks

Implement:

## Cart Service

Features:

- Add product
- Remove product
- Update quantity
- Calculate totals

---

## Order Service

Implement:

- Create order
- Order items
- Order status
- Vendor notification trigger

---

## Checkout Service

Support:

- Delivery address
- Payment selection
- Order confirmation

---

## Payment

Implement:

- Payment records
- Payment status
- Transaction reference

---

# Frontend Tasks

Implement:

## Shopping Cart

Features:

- Product list
- Quantity controls
- Price summary
- Remove item

---

## Checkout

Features:

- Delivery address
- Payment method

Supported:

- Mobile Money
- Cash on Delivery

---

## Address Selection

Implement:

- Saved addresses
- New address
- Location picker

---

## Order Confirmation

Display:

- Order number
- Vendor information
- Items
- Delivery estimate

---

# Components

Create:

- CartItem
- PriceSummary
- AddressCard
- PaymentCard
- OrderSummary
- ConfirmationCard

---

# Rules

Follow:

- Existing database schema
- API contracts
- Security model

Do not:

- Implement tracking
- Implement rider assignment

---

# Expected Output

Provide:

- Backend services
- API endpoints
- Database changes
- Frontend implementation
- Tests