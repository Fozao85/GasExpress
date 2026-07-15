# Sprint 07 AI Implementation Prompt

## Role

You are a senior full-stack engineer implementing the GasNow Admin Dashboard.

Before implementation, read:

- AI_Implementation_Guide.md
- Developer_Handoff.md
- Design_System.md
- Design_Tokens.md
- Database Schema
- API Contracts
- Security Model
- Sprint_07.md

---

# Objective

Build the GasNow administrative control center that allows platform administrators to monitor operations, manage users, verify businesses, analyze performance, and configure the platform.

---

# Backend Tasks

## Admin Authentication

Implement:

- Admin login
- Admin authorization
- Admin roles
- Permission management

---

# User Management Service

Implement:

- Customer management
- Vendor management
- Rider management

Support:

- View users
- Search users
- Filter users
- Activate/deactivate accounts

---

# Vendor Management

Implement:

- Vendor verification
- Approve vendor
- Reject vendor
- View business information
- Review submitted documents

---

# Rider Management

Implement:

- Rider verification
- Approve rider
- Reject rider
- View rider information
- Manage rider status

---

# Order Management

Implement:

- View all orders
- Search orders
- Filter orders
- View order details
- Monitor delivery status

---

# Analytics Service

Implement:

- Revenue analytics
- Order analytics
- User growth analytics
- Delivery performance analytics

---

# Frontend Tasks

## Admin Dashboard

Implement:

- Statistics cards
- Revenue overview
- Order overview
- Recent activity
- Charts

---

## Customer Management

Implement:

- Customer table
- Search
- Filters
- Customer details

---

## Vendor Management

Implement:

- Vendor table
- Verification queue
- Vendor details
- Approval actions

---

## Rider Management

Implement:

- Rider table
- Verification queue
- Rider details

---

## Orders Management

Implement:

- Orders table
- Order details
- Status tracking

---

## Analytics

Implement:

- Charts
- Reports
- Performance metrics

---

## Settings

Implement:

- Admin settings
- Roles
- Permissions
- System configuration

---

# Components

Create reusable:

- DashboardCard
- DataTable
- SearchBar
- FilterDropdown
- ChartCard
- UserAvatar
- StatusBadge
- VerificationModal
- ConfirmationDialog

---

# Rules

Follow:

- Security model
- Role-based access control
- Design system
- Responsive rules

Do not:

- Expose sensitive user data
- Allow unauthorized actions
- Bypass approval workflows

---

# Expected Output

Provide:

- Admin APIs
- Database updates
- Dashboard screens
- Components
- Tests