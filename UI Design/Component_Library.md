## Brief Explanation

A **Component Library** defines the reusable UI building blocks used across the GasNow applications. It ensures that every screen uses consistent buttons, cards, inputs, navigation, and states, making the design scalable and allowing AI coding tools to translate Figma designs into reusable frontend components more accurately.

Create this as:

```text
docs/ux/Component_Library.md
```

---

# GasNow Component Library (v1.0)

## 1. Component Philosophy

All GasNow applications should be built using reusable components instead of designing each screen independently.

Components must:

* Be reusable across Customer, Vendor, Rider, and Admin applications.
* Follow the GasNow Design System.
* Support different states (loading, error, disabled, success).
* Have clear properties and variants.
* Be accessible and responsive.

---

# 2. Buttons

## Primary Button

### Purpose

Used for the main action on a screen.

Examples:

* Login
* Register
* Place Order
* Accept Delivery
* Confirm Payment

### Properties

| Property   | Type     |
| ---------- | -------- |
| Text       | String   |
| Icon       | Optional |
| Loading    | Boolean  |
| Disabled   | Boolean  |
| Full Width | Boolean  |

### Dimensions

```
Height: 48px
Radius: 12px
Padding: 16px
```

### States

```
Default
Pressed
Loading
Disabled
Success
Error
```

---

## Secondary Button

### Purpose

Used for alternative actions.

Examples:

* Cancel
* View Details
* Edit

Properties:

* Text
* Icon
* Disabled

---

## Destructive Button

### Purpose

Used for dangerous actions.

Examples:

* Cancel Order
* Delete Account
* Remove Address

---

# 3. Input Components

---

# Text Input

### Used for:

* Name
* Phone Number
* Email
* Password
* Address

Properties:

```
Label
Placeholder
Value
Error Message
Icon
Password Visibility
```

States:

```
Default
Focused
Filled
Error
Disabled
```

---

# Phone Input

Used for authentication.

Contains:

* Country selector
* Phone number field
* Validation

---

# Password Input

Features:

* Hide/show password
* Validation message
* Security indicator

---

# OTP Input

Used for verification.

Properties:

```
Length: 6 digits
Auto focus
Resend timer
Error state
```

---

# 4. Navigation Components

---

# Mobile Bottom Navigation

Used in:

* Customer App
* Vendor App
* Rider App

## Customer Variant

```
Home
Orders
Notifications
Profile
```

---

## Vendor Variant

```
Dashboard
Orders
Inventory
Profile
```

---

## Rider Variant

```
Dashboard
Jobs
Earnings
Profile
```

Properties:

* Active tab
* Badge count
* Icon
* Label

---

# Top App Bar

Used on mobile screens.

Contains:

* Back button
* Title
* Actions
* Notification icon

Variants:

```
Default
Search
Profile
Transparent
```

---

# 5. Card Components

---

# Vendor Card

Used in:

* Home
* Vendor Listing
* Search Results

Structure:

```
-------------------

Image

Vendor Name

Rating ⭐

Distance

Delivery Time

Price

Availability Badge

-------------------
```

Properties:

```
Image
Name
Rating
Distance
Delivery Time
Price
Status
```

Variants:

```
Compact
Standard
Featured
```

---

# Order Card

Used for:

* Order History
* Vendor Orders
* Rider Jobs

Contains:

```
Order ID

Vendor/Customer

Items

Price

Status

Action Button
```

Variants:

```
Customer Order Card

Vendor Order Card

Rider Job Card
```

---

# Rider Card

Used in:

* Tracking screen

Contains:

```
Avatar

Name

Rating

Phone

ETA
```

---

# Address Card

Used in:

* Checkout
* Profile
* Address Selection

Contains:

```
Address Label

Full Address

Default Badge

Edit Action
```

---

# Payment Card

Used for:

* Checkout
* Payment Methods

Contains:

```
Payment Icon

Payment Name

Selected State
```

Variants:

```
Mobile Money

Cash

Saved Card
```

---

# 6. Status Components

---

# Status Badge

Used for displaying states.

## Order Status

```
Pending

Accepted

Preparing

Picked Up

On Delivery

Delivered

Cancelled
```

---

## Inventory Status

```
In Stock

Low Stock

Out of Stock
```

---

## Verification Status

```
Pending

Approved

Rejected
```

Properties:

```
Label
Type
Icon
```

---

# 7. Search Components

---

# Search Bar

Used in:

* Home
* Vendor Listing
* Orders

Properties:

```
Placeholder

Search Icon

Filter Button

Clear Button
```

States:

```
Default
Typing
No Results
```

---

# Filter Chips

Used for:

* Vendor filtering
* Order filtering
* Reports

Examples:

```
Nearest

Fastest

Cheapest

Top Rated
```

States:

```
Selected

Unselected
```

---

# 8. Order Components

---

# Quantity Selector

Used for cylinder selection.

Contains:

```
Minus Button

Quantity

Plus Button
```

Rules:

Minimum:

```
1
```

Maximum:

```
Available Stock
```

---

# Order Timeline

Used in:

* Order Tracking

Steps:

```
Order Placed

Accepted

Preparing

Picked Up

Delivered
```

States:

```
Completed

Current

Upcoming
```

---

# Map Component

Used in:

* Tracking
* Delivery
* Address Selection

Contains:

```
Map Area

Location Marker

Route Line

ETA Card
```

Variants:

```
Customer Tracking Map

Rider Navigation Map
```

---

# 9. Feedback Components

---

# Loading Components

## Spinner

Used for:

* Button loading
* Page loading

## Skeleton Loader

Used for:

* Vendor cards
* Order cards
* Lists

---

# Empty State

Structure:

```
Illustration

Title

Description

Action Button
```

Examples:

```
No Orders Yet

No Vendors Available

No Notifications
```

---

# Error State

Structure:

```
Error Icon

Message

Retry Button
```

Examples:

```
Unable to load vendors

Payment failed

Network error
```

---

# 10. Modal Components

---

# Confirmation Modal

Used for:

* Cancel order
* Logout
* Delete actions

Structure:

```
Title

Description

Cancel Button

Confirm Button
```

---

# Bottom Sheet

Used for:

* Filters
* Payment selection
* Address selection

Contains:

```
Header

Content

Actions
```

---

# 11. Notification Components

---

# Notification Item

Contains:

```
Icon

Title

Description

Time

Read Status
```

Types:

```
Order

Payment

Delivery

System

Promotion
```

---

# 12. Chart Components

Used in:

* Vendor Revenue Dashboard
* Admin Analytics

Components:

```
Bar Chart

Line Chart

Statistics Card

Progress Indicator
```

---

# 13. Dashboard Components

---

# Statistic Card

Used for:

* Vendor Dashboard
* Rider Dashboard
* Admin Dashboard

Contains:

```
Title

Value

Trend

Icon
```

Examples:

```
Today's Orders

Revenue

Deliveries

Earnings
```

---

# 14. Component Naming Convention

Use consistent names:

```
ButtonPrimary

ButtonSecondary

VendorCard

OrderCard

StatusBadge

SearchBar

BottomNavigation

AddressCard

PaymentCard

MapView
```

---

# 15. Component Organization in Figma

```
GasNow Design System

│
├── Foundations
│
├── Components
│
│── Buttons
│   ├── Primary
│   ├── Secondary
│   └── Destructive
│
├── Inputs
│
├── Cards
│
├── Navigation
│
├── Status
│
├── Feedback
│
├── Maps
│
└── Charts
```

---

# 16. Component Usage Rule

Before creating a new UI element:

1. Check if an existing component exists.
2. Extend the existing component if possible.
3. Create a new component only when necessary.
4. Document every new component.

---

## Result

With:

✅ Design_System.md
✅ Component_Library.md
✅ Screen_Specification.md
✅ LowFi Wireframes

your Figma design phase now has the same structure that professional product teams use.

The next document after this should be **High-Fidelity Design Guidelines / AI High-Fi Prompt**, which tells Figma AI how to transform your grayscale wireframes into the final polished GasNow interface.
