## Brief Explanation

**High-Fidelity Design Guidelines** define how the final polished GasNow interface should look and behave after moving from wireframes. It combines the Design System and Component Library into a complete visual direction that guides designers, Figma AI, and developers.

Create this as:

```text
docs/ux/High_Fidelity_Design_Guidelines.md
```

---

# GasNow High-Fidelity Design Guidelines (v1.0)

## 1. Purpose

The High-Fidelity Design Guidelines transform GasNow's low-fidelity wireframes into a polished, production-ready interface.

The design should communicate:

* Trust
* Speed
* Safety
* Convenience
* Local accessibility

The final product should feel like a modern delivery marketplace while maintaining the seriousness required for LPG services.

---

# 2. Visual Direction

## Design Style

GasNow uses a:

**Modern Marketplace + Energy Service Design Language**

Reference characteristics:

* Clean layouts
* Strong hierarchy
* Rounded cards
* Clear call-to-actions
* Friendly but professional interface
* Minimal cognitive load

Avoid:

* Overly complex screens
* Excessive decoration
* Too many colors
* Heavy gradients
* Cluttered layouts

---

# 3. Brand Personality

The interface should feel:

## Reliable

Users are trusting GasNow with an essential household product.

Use:

* Clear information
* Verified badges
* Order transparency

## Fast

Gas delivery is urgent.

Use:

* Prominent actions
* Short flows
* Clear delivery times

## Safe

Gas is safety-sensitive.

Use:

* Verification indicators
* Professional vendor profiles
* Clear status updates

## Accessible

Designed for different levels of digital literacy.

Use:

* Simple language
* Large touch targets
* Clear icons

---

# 4. Color Usage Guidelines

## Primary Blue

```text
#1565C0
```

Usage:

* Primary buttons
* Active navigation
* Important actions
* Links

Do not use:

* Large background areas
* Excessive decoration

---

## Energy Orange

```text
#FF8F00
```

Usage:

* Promotions
* Highlights
* Gas-related indicators
* Attention areas

---

## Success Green

```text
#2E7D32
```

Usage:

* Delivered
* Approved
* Completed
* Payment success

---

## Error Red

```text
#D32F2F
```

Usage:

* Failed payments
* Cancelled orders
* Validation errors

---

# 5. Typography Guidelines

## Font

Primary:

```text
Inter
```

Fallback:

```text
Roboto
```

---

## Hierarchy

### Screen Title

32px

Bold

Example:

"Find Gas Near You"

---

### Section Title

20px

Semi-bold

Example:

"Nearby Vendors"

---

### Body

14px-16px

Regular

Example:

"Delivery within 30 minutes"

---

### Supporting Text

12px

Regular

Example:

"Updated 2 minutes ago"

---

# 6. Layout Guidelines

## Mobile Frame

Primary:

```text
390 × 844
```

---

## Screen Padding

```text
16px horizontal
```

---

## Section Spacing

```text
24px vertical
```

---

## Card Spacing

```text
16px
```

---

# 7. Component Styling Guidelines

## Buttons

Primary button:

* Height: 48px
* Radius: 12px
* Bold text
* Full width on important mobile actions

Example:

Customer:

"Place Order"

Vendor:

"Accept Order"

Rider:

"Complete Delivery"

---

# Cards

All cards:

* White background
* Rounded corners
* Subtle shadow
* Internal padding: 16px

Used for:

* Vendors
* Orders
* Riders
* Payments

---

# Images

Use:

* Rounded image containers
* Proper aspect ratios
* Skeleton loading states

Examples:

Vendor:

```text
80px × 80px
```

Profile:

```text
48px × 48px
```

---

# 8. Application-Specific Guidelines

---

# Customer App

## Main Feeling

Convenient shopping experience.

Prioritize:

* Vendor discovery
* Fast ordering
* Delivery visibility

Important screens:

Home

Vendor Details

Checkout

Tracking

---

## Home Screen

Should emphasize:

1. Location

2. Search

3. Nearby vendors

4. Quick reorder

Layout:

```
Header

Location

Search

Promotion Banner

Quick Actions

Nearby Vendors

Recent Orders

Bottom Navigation
```

---

# Vendor App

## Main Feeling

Business management tool.

Prioritize:

* Incoming orders
* Inventory
* Revenue

Dashboard should immediately show:

* Pending orders
* Today's revenue
* Stock alerts

---

# Rider App

## Main Feeling

Fast delivery workspace.

Prioritize:

* Available jobs
* Navigation
* Earnings

Important:

Map and delivery status should dominate delivery screens.

---

# Admin Dashboard

## Main Feeling

Operational control center.

Prioritize:

* Data visibility
* Management actions
* Platform health

Use:

* Tables
* Charts
* Statistics cards

---

# 9. Animation Guidelines

Animations should be subtle.

Use:

## Page transitions

300ms

## Button feedback

150ms

## Loading

Smooth skeleton animation

Avoid:

* Excessive movement
* Distracting effects

---

# 10. Accessibility Guidelines

Minimum:

Touch targets:

```text
44px × 44px
```

Text:

Minimum:

```text
14px
```

Contrast:

Follow WCAG standards.

---

# 11. Responsive Guidelines

## Mobile

Primary experience.

Single column.

Bottom navigation.

## Tablet

Two-column layouts.

## Desktop Admin

Sidebar.

Data tables.

Multi-column dashboards.

---

# 12. High-Fi Figma Structure

```
GasNow High Fidelity

│
├── Cover
│
├── Design System
│
├── Components
│
├── Customer App
│   ├── Auth
│   ├── Home
│   ├── Ordering
│   ├── Tracking
│   └── Account
│
├── Vendor App
│
├── Rider App
│
└── Admin Dashboard
```



## Your UX documentation is now complete up to High-Fi generation:

```text
✅ User Flows
✅ Screen Specification
✅ Low-Fi Wireframes
✅ Design System
✅ Component Library
✅ High-Fidelity Design Guidelines
✅ AI High-Fi Prompt
```

The next logical artifact before coding is:

**AI Implementation Guide.md**

This is what you give your coding AI (Cursor, Claude Code, OpenCode, etc.) so it understands the entire product, architecture, design rules, and development constraints before generating code.
