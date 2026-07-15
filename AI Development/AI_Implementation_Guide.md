Excellent. At this stage you're transitioning from **Design** to **Development**. The two documents below are exactly what professional product teams produce before engineering begins.

---

# 1. AI Implementation Guide

## Brief Description

The **AI Implementation Guide** is the master instruction document for AI coding tools. It defines the project's architecture, coding standards, implementation rules, and constraints so every generated piece of code follows the same conventions and aligns with the technical and design specifications.

**Create this file:**

```text
docs/development/AI_Implementation_Guide.md
```

---

# GasNow AI Implementation Guide

## 1. Project Overview

### Project Name

GasNow

### Description

GasNow is an on-demand LPG gas delivery marketplace connecting customers, vendors, delivery riders, and administrators through mobile and web applications.

---

## 2. Project Architecture

Architecture Pattern:

* Clean Architecture
* Feature-First Architecture
* Modular Design
* Repository Pattern
* Service Layer
* REST API

Do not modify the architecture without updating the technical specification.

---

## 3. Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* React Query (TanStack Query)

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL

### Authentication

* JWT
* Refresh Tokens
* OTP Verification

### Storage

* Cloud Storage for images/documents

---

## 4. Folder Structure

Follow the approved folder structure exactly.

Do not:

* Rename folders
* Create duplicate folders
* Mix features together

---

## 5. Design Rules

Use:

* Design System
* Component Library
* Design Tokens

Never:

* Hardcode colors
* Hardcode spacing
* Hardcode font sizes

Always use design tokens.

---

## 6. Component Rules

Components must:

* Be reusable
* Be modular
* Be typed
* Have proper props
* Be documented

Never duplicate UI.

---

## 7. API Rules

Follow API Contracts exactly.

Never:

* Invent endpoints
* Rename endpoints
* Change request formats
* Change response structures

Always consume the existing API contracts.

---

## 8. Database Rules

Never modify:

* Table names
* Relationships
* Constraints

Use migrations for all schema changes.

---

## 9. Authentication Rules

Support:

* Customer
* Vendor
* Rider
* Admin

Implement:

* JWT
* Refresh Token
* OTP
* Role-Based Access Control

---

## 10. State Management

Use:

* React Context for global app settings (theme, auth state if appropriate)
* React Query for server state
* Local component state where suitable

Avoid unnecessary global state.

---

## 11. Routing Rules

Protect authenticated routes.

Separate routes by user role.

Redirect unauthorized users.

---

## 12. Coding Standards

Use:

* TypeScript strict mode
* Functional components
* Async/Await
* Meaningful variable names
* SOLID principles

---

## 13. Error Handling

Every feature must support:

* Loading
* Success
* Empty
* Error

Never leave users without feedback.

---

## 14. Accessibility

Support:

* Keyboard navigation (Admin)
* Screen readers where applicable
* Color contrast
* Proper labels
* Minimum touch target of 44×44px

---

## 15. Performance

Optimize:

* Images
* API calls
* Lazy loading
* Code splitting
* Component rendering

---

## 16. Security

Never:

* Store passwords
* Expose secrets
* Trust client-side validation

Always:

* Validate server-side
* Sanitize inputs
* Use HTTPS
* Verify JWTs

---

## 17. Testing

Generate:

* Unit Tests
* Integration Tests
* API Tests

Critical user flows must be tested.

---

## 18. Git Rules

* Small commits
* Feature branches
* Pull Requests
* Meaningful commit messages

---

## 19. Definition of Done

A feature is complete only when:

* UI matches High-Fi
* Uses Design System
* Uses reusable components
* Uses API Contracts
* Passes tests
* Has no lint errors
* Has no TypeScript errors

---

## 20. AI Rules

When generating code:

* Follow the PRD
* Follow the Architecture
* Follow the Database Schema
* Follow the API Contracts
* Follow the Design System
* Follow the Component Library
* Do not invent functionality
* Do not change approved designs
* Generate production-ready code only

---
