# Sprint 02 AI Implementation Prompt

## Role

You are a senior full-stack engineer implementing the GasNow Customer Discovery module.

Before implementation, read:

- AI_Implementation_Guide.md
- Developer_Handoff.md
- Design_System.md
- Design_Tokens.md
- Database Schema
- API Contracts
- Sprint_02.md

---

# Objective

Implement the customer discovery experience that allows customers to find available LPG vendors, browse products, and select a vendor for ordering.

---

# Backend Tasks

Implement:

## Vendor Discovery Service

Create:

- Vendor listing API
- Nearby vendors API
- Vendor search API
- Vendor filtering API
- Vendor details API

Support:

- Location-based search
- Vendor availability
- Vendor rating
- Distance calculation
- Delivery availability

---

## Product Discovery

Implement:

- Product categories
- LPG cylinder listing
- Product availability
- Product pricing

---

## Search

Support:

- Vendor name search
- Product search
- Location filtering

---

# Frontend Tasks

Implement Customer screens:

## Home

Features:

- Greeting section
- Location selector
- Search bar
- Promotional banner
- Quick actions
- Nearby vendor cards
- Recent orders

---

## Search Results

Implement:

- Search input
- Results list
- Empty state
- Loading state
- Error state

---

## Vendor Listing

Implement:

- Vendor cards
- Filters:

  - Nearest
  - Fastest
  - Cheapest
  - Top Rated

Display:

- Vendor image
- Name
- Rating
- Distance
- Price
- Availability

---

## Vendor Details

Implement:

- Vendor information
- LPG products
- Cylinder sizes
- Pricing
- Add to cart action

---

# Component Requirements

Create reusable:

- VendorCard
- ProductCard
- SearchBar
- FilterChip
- RatingBadge
- LocationCard
- EmptyState
- LoadingSkeleton

---

# Rules

Follow:

- High-Fi designs
- Component Library
- Design Tokens
- API Contracts

Do not:

- Create ordering logic
- Create payment logic
- Duplicate components

---

# Expected Output

Provide:

- Backend services created
- API endpoints created
- Database changes
- Frontend screens completed
- Components created
- Tests written