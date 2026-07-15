# GasNow Design System (v1.0)

## Overview

The GasNow Design System defines the visual language, reusable components, and UI standards for the entire GasNow ecosystem:

* Customer Mobile App
* Vendor Mobile App
* Rider Mobile App
* Admin Dashboard

The goal is to create a **consistent, scalable, and developer-ready UI system** that can be translated directly into React, Flutter, or any frontend framework.

---

# 1. Design Principles

## 1.1 Trust First

Gas delivery involves safety and payment. The interface should communicate:

* Reliability
* Transparency
* Safety
* Professionalism

---

## 1.2 Fast Actions

The main user goals should require minimal steps:

Customer:

```
Open App
↓
Find Gas
↓
Order
↓
Track
```

Vendor:

```
Receive Order
↓
Accept
↓
Prepare
```

Rider:

```
Accept Job
↓
Navigate
↓
Deliver
```

---

## 1.3 Clear Status Communication

Every important action must have a visible state:

Examples:

Order:

```
Pending
Accepted
Preparing
Picked Up
On Delivery
Delivered
Cancelled
```

Verification:

```
Submitted
Under Review
Approved
Rejected
```

---

# 2. Brand Identity

## Brand Personality

GasNow should feel:

* Reliable
* Fast
* Local
* Accessible
* Safe
* Modern

## Visual Direction

Style:

```
Modern Delivery Marketplace

+
Energy Industry Trust

+
African Local Commerce
```

Reference feeling:

* Uber
* Bolt
* Jumia
* Airbnb

but adapted for LPG delivery.

---

# 3. Color System

## Primary Colors

### GasNow Primary

Used for:

* Main buttons
* Active states
* Navigation highlights
* Important actions

```
Primary Blue

#1565C0
```

Meaning:

Trust + reliability

---

## Secondary Color

Used for:

* Highlights
* Promotions
* Rewards

```
Energy Orange

#FF8F00
```

Meaning:

Gas / energy / urgency

---

## Success

```
Green

#2E7D32
```

Used for:

* Delivered
* Completed
* Approved
* Payment success

---

## Warning

```
Amber

#F9A825
```

Used for:

* Low stock
* Pending
* Attention required

---

## Error

```
Red

#D32F2F
```

Used for:

* Failed payment
* Cancelled orders
* Errors

---

## Neutral Colors

### Background

```
White

#FFFFFF
```

### Surface

```
Light Gray

#F8F9FA
```

### Border

```
Gray 200

#E0E0E0
```

### Text Primary

```
Gray 900

#212121
```

### Text Secondary

```
Gray 600

#757575
```

### Disabled

```
Gray 400

#BDBDBD
```

---

# 4. Typography System

Recommended:

## Font

```
Inter
```

Alternative:

```
Roboto
```

---

## Type Scale

| Style      | Size | Weight    |
| ---------- | ---- | --------- |
| Display    | 32px | Bold      |
| Heading 1  | 28px | Bold      |
| Heading 2  | 24px | Semi Bold |
| Heading 3  | 20px | Semi Bold |
| Title      | 18px | Medium    |
| Body Large | 16px | Regular   |
| Body       | 14px | Regular   |
| Caption    | 12px | Regular   |
| Button     | 14px | Semi Bold |

---

# 5. Spacing System

Use an 8-point grid.

```
4px
8px
16px
24px
32px
40px
48px
64px
```

Examples:

Card padding:

```
16px
```

Screen padding:

```
16px
```

Section spacing:

```
24px
```

---

# 6. Border Radius

## Small

```
8px
```

Inputs

Badges

## Medium

```
12px
```

Cards

## Large

```
16px
```

Bottom sheets

Large containers

## Pill

```
999px
```

Chips

Status badges

---

# 7. Elevation System

## Level 0

Flat

```
No shadow
```

Used for:

* Background
* Lists

## Level 1

Cards

```
Small shadow
```

## Level 2

Floating elements

Used for:

* Bottom sheets
* Modals
* Floating buttons

---

# 8. Icon System

Recommended:

```
Material Symbols
```

or

```
Lucide Icons
```

---

## Icon Sizes

Small

```
16px
```

Medium

```
24px
```

Large

```
32px
```

Hero

```
48px
```

---

# 9. Button System

## Primary Button

Used for main actions.

Example:

```
Confirm Order
Accept Delivery
Pay Now
```

Properties:

Height:

```
48px
```

Radius:

```
12px
```

Full width on mobile.

---

## Secondary Button

Used for alternative actions.

Example:

```
Cancel
View Details
```

---

## Destructive Button

Used for:

```
Cancel Order
Delete Account
```

---

## Button States

Every button must support:

```
Default

Pressed

Loading

Disabled

Success

Error
```

---

# 10. Form Components

## Text Field

Used for:

* Phone number
* Password
* Address

Specifications:

Height:

```
48px
```

Radius:

```
12px
```

States:

```
Default

Focused

Error

Disabled
```

---

## OTP Input

Properties:

```
6 digits

48px boxes

Auto focus

Error state
```

---

# 11. Card Components

## Vendor Card

Used in:

Customer Home

Vendor Listing

Structure:

```
--------------------------------

Image

Vendor Name

Rating ★

Distance

Delivery Time

Price

Availability Badge

--------------------------------
```

---

## Order Card

Structure:

```
--------------------------------

Order ID

Vendor

Cylinder Type

Price

Status Badge

View Details

--------------------------------
```

---

## Rider Card

Structure:

```
Avatar

Name

Rating

Phone

ETA
```

---

# 12. Status Components

## Status Badge

Examples:

Order:

```
Pending
Accepted
Delivered
Cancelled
```

Inventory:

```
In Stock
Low Stock
Out of Stock
```

Verification:

```
Pending
Approved
Rejected
```

---

# 13. Navigation System

## Customer Bottom Navigation

Items:

```
Home

Orders

Notifications

Profile
```

Height:

```
64px
```

---

## Vendor Bottom Navigation

```
Dashboard

Orders

Inventory

Profile
```

---

## Rider Bottom Navigation

```
Dashboard

Jobs

Earnings

Profile
```

---

# 14. Map Components

Used in:

* Order Tracking
* Rider Navigation
* Delivery Address

Components:

## Map Card

Contains:

* Map placeholder
* Location marker
* ETA

## Rider Location Marker

Contains:

* Rider icon
* Live position

---

# 15. Feedback Components

## Toast

Used for:

* Success messages
* Errors

---

## Snackbar

Examples:

```
Order placed successfully
```

```
Payment failed
```

---

## Empty State

Structure:

```
Illustration

Title

Description

Action Button
```

Example:

"No orders yet"

"Your previous orders will appear here"

---

## Loading State

Components:

* Skeleton cards
* Spinner
* Progress indicator

---

## Error State

Structure:

```
Error icon

Message

Retry button
```

---

# 16. Modal Components

Used for:

* Confirmations
* Filters
* Payments

Structure:

```
Title

Description

Actions
```

---

# 17. Mobile Layout Rules

## Screen Width

Primary:

```
390px
```

Minimum supported:

```
320px
```

---

## Screen Padding

```
16px left/right
```

---

## Touch Targets

Minimum:

```
44px × 44px
```

---

# 18. Responsive Rules

## Mobile

Single column layout

Bottom navigation

## Tablet

Two-column layouts where useful

## Desktop Admin

Sidebar navigation

Grid dashboards

Tables

Charts

---

# 19. Design Tokens

Example token structure:

```json
{
 "colors": {
   "primary": "#1565C0",
   "secondary": "#FF8F00",
   "success": "#2E7D32",
   "error": "#D32F2F"
 },

 "spacing": {
   "xs":4,
   "sm":8,
   "md":16,
   "lg":24,
   "xl":32
 },

 "radius": {
   "sm":8,
   "md":12,
   "lg":16
 },

 "typography": {
   "font":"Inter"
 }
}
```

---

# 20. Figma Structure

Your Figma file should now be organized as:

```
GasNow Design System

├── Cover
│
├── Foundations
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   ├── Radius
│   └── Shadows
│
├── Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Navigation
│   ├── Badges
│   ├── Modals
│   └── States
│
├── Customer App
│
├── Vendor App
│
├── Rider App
│
└── Admin Dashboard
```


