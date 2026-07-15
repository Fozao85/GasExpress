## Brief Description

The **Design Tokens** file is the single source of truth for all visual design values used across the GasNow platform. Instead of hardcoding colors, spacing, typography, or shadows in code, developers and AI coding tools reference these tokens to ensure consistency between the Figma designs and the final application.

Create this file as:

```text
docs/ux/Design_Tokens.md
```

---

# GasNow Design Tokens (v1.0)

## 1. Overview

These design tokens define the visual foundation for all GasNow applications:

* Customer App
* Vendor App
* Rider App
* Admin Dashboard

All interfaces should reference these tokens instead of using hardcoded values.

---

# 2. Brand Colors

## Primary

| Token               | Value   | Usage               |
| ------------------- | ------- | ------------------- |
| `color-primary-50`  | #E8F1FB | Light backgrounds   |
| `color-primary-100` | #D0E3F7 | Hover backgrounds   |
| `color-primary-200` | #A7C9EF | Selected items      |
| `color-primary-300` | #7DAFE7 | Highlights          |
| `color-primary-400` | #5495DF | Secondary buttons   |
| `color-primary-500` | #1565C0 | Primary Brand Color |
| `color-primary-600` | #1257A6 | Hover               |
| `color-primary-700` | #0E4788 | Active              |
| `color-primary-800` | #0B376A | Dark                |
| `color-primary-900` | #07284D | Deep Dark           |

---

## Secondary

| Token                 | Value   |
| --------------------- | ------- |
| `color-secondary-500` | #FF8F00 |

Usage

* Promotions
* Featured vendors
* Discounts
* Highlighted actions

---

## Success

| Token               | Value   |
| ------------------- | ------- |
| `color-success-500` | #2E7D32 |

Used for:

* Delivered
* Success
* Verified
* Completed

---

## Warning

| Token               | Value   |
| ------------------- | ------- |
| `color-warning-500` | #F9A825 |

Used for:

* Pending
* Low stock
* Attention

---

## Error

| Token             | Value   |
| ----------------- | ------- |
| `color-error-500` | #D32F2F |

Used for:

* Failed payment
* Cancelled
* Validation

---

## Info

| Token            | Value   |
| ---------------- | ------- |
| `color-info-500` | #0288D1 |

---

# 3. Neutral Colors

| Token            | Value   |
| ---------------- | ------- |
| `color-white`    | #FFFFFF |
| `color-gray-50`  | #F9FAFB |
| `color-gray-100` | #F3F4F6 |
| `color-gray-200` | #E5E7EB |
| `color-gray-300` | #D1D5DB |
| `color-gray-400` | #9CA3AF |
| `color-gray-500` | #6B7280 |
| `color-gray-600` | #4B5563 |
| `color-gray-700` | #374151 |
| `color-gray-800` | #1F2937 |
| `color-gray-900` | #111827 |
| `color-black`    | #000000 |

---

# 4. Typography

## Font Family

```text
font-family-primary = Inter
font-family-secondary = Roboto
```

---

## Font Weights

| Token         | Value |
| ------------- | ----- |
| font-light    | 300   |
| font-regular  | 400   |
| font-medium   | 500   |
| font-semibold | 600   |
| font-bold     | 700   |

---

## Font Sizes

| Token     | Size |
| --------- | ---- |
| text-xs   | 12px |
| text-sm   | 14px |
| text-base | 16px |
| text-lg   | 18px |
| text-xl   | 20px |
| text-2xl  | 24px |
| text-3xl  | 30px |
| text-4xl  | 36px |

---

## Line Heights

| Token       | Value |
| ----------- | ----- |
| line-tight  | 1.2   |
| line-normal | 1.5   |
| line-loose  | 1.75  |

---

# 5. Spacing

Use an 8px spacing system.

| Token    | Value |
| -------- | ----- |
| space-0  | 0px   |
| space-1  | 4px   |
| space-2  | 8px   |
| space-3  | 12px  |
| space-4  | 16px  |
| space-5  | 20px  |
| space-6  | 24px  |
| space-8  | 32px  |
| space-10 | 40px  |
| space-12 | 48px  |
| space-16 | 64px  |

---

# 6. Border Radius

| Token       | Value  |
| ----------- | ------ |
| radius-none | 0px    |
| radius-sm   | 8px    |
| radius-md   | 12px   |
| radius-lg   | 16px   |
| radius-xl   | 24px   |
| radius-full | 9999px |

---

# 7. Shadows

## Small

```text
0px 1px 3px rgba(0,0,0,0.10)
```

Used for:

* Buttons
* Inputs

---

## Medium

```text
0px 4px 12px rgba(0,0,0,0.12)
```

Used for:

* Cards
* Modals

---

## Large

```text
0px 8px 24px rgba(0,0,0,0.15)
```

Used for:

* Dialogs
* Bottom Sheets

---

# 8. Borders

| Token         | Value |
| ------------- | ----- |
| border-thin   | 1px   |
| border-medium | 2px   |
| border-thick  | 4px   |

Default border color:

```text
color-gray-200
```

---

# 9. Opacity

| Token            | Value |
| ---------------- | ----- |
| opacity-disabled | 40%   |
| opacity-overlay  | 60%   |
| opacity-hidden   | 0%    |
| opacity-visible  | 100%  |

---

# 10. Icons

## Sizes

| Token    | Value |
| -------- | ----- |
| icon-sm  | 16px  |
| icon-md  | 20px  |
| icon-lg  | 24px  |
| icon-xl  | 32px  |
| icon-xxl | 48px  |

---

# 11. Buttons

## Heights

| Token     | Value |
| --------- | ----- |
| button-sm | 40px  |
| button-md | 48px  |
| button-lg | 56px  |

Padding:

```text
Horizontal: 16px
Vertical: 12px
```

---

# 12. Inputs

Height

```text
48px
```

Border Radius

```text
radius-md
```

Padding

```text
16px
```

---

# 13. Cards

Default Radius

```text
radius-lg
```

Internal Padding

```text
space-4
```

Gap

```text
space-4
```

---

# 14. Navigation

Bottom Navigation Height

```text
72px
```

Top App Bar

```text
64px
```

Sidebar Width (Admin)

```text
280px
```

---

# 15. Breakpoints

| Token   | Width  |
| ------- | ------ |
| mobile  | 390px  |
| tablet  | 768px  |
| laptop  | 1024px |
| desktop | 1440px |

---

# 16. Animation

| Token            | Value |
| ---------------- | ----- |
| animation-fast   | 150ms |
| animation-normal | 300ms |
| animation-slow   | 500ms |

Easing

```text
ease-in-out
```

---

# 17. Z-Index

| Token      | Value |
| ---------- | ----- |
| z-dropdown | 100   |
| z-sticky   | 200   |
| z-modal    | 500   |
| z-toast    | 800   |
| z-tooltip  | 900   |

---

# 18. Status Colors

| Status    | Token               |
| --------- | ------------------- |
| Pending   | color-warning-500   |
| Accepted  | color-info-500      |
| Preparing | color-primary-500   |
| Picked Up | color-secondary-500 |
| Delivered | color-success-500   |
| Cancelled | color-error-500     |

---

# 19. Chart Colors

```text
Revenue → color-primary-500

Orders → color-secondary-500

Completed → color-success-500

Cancelled → color-error-500

Pending → color-warning-500
```

---

# 20. Accessibility Tokens

Minimum touch target

```text
44px × 44px
```

Minimum font size

```text
14px
```

Minimum contrast

```text
WCAG AA compliant
```

---

# 21. Naming Convention

Use these token prefixes consistently:

```text
color-*
space-*
radius-*
text-*
font-*
shadow-*
border-*
icon-*
animation-*
z-*
```

Example:

```text
color-primary-500
space-4
radius-md
text-lg
shadow-medium
animation-normal
```

---

# 22. Implementation Notes

These tokens should be the **single source of truth** for both design and development. During implementation, they should be exported into:

* CSS Custom Properties (CSS Variables)
* Tailwind CSS theme configuration
* React theme/provider files
* React Native style constants (if applicable)
* Flutter `ThemeData` and constants (if a Flutter app is built later)

reference these tokens rather than generating hardcoded visual values, ensuring that every application in the GasNow ecosystem remains visually consistent and easy to maintain.
