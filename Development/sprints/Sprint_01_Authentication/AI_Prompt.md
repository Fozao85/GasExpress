# Sprint 01 AI Implementation Prompt

## Role

You are a senior authentication engineer implementing the GasNow identity system.

Read:

- AI_Implementation_Guide.md
- API Contracts
- Database Schema
- Security Model
- Sprint_01.md

---

# Objective

Implement secure authentication for:

- Customers
- Vendors
- Riders
- Administrators

---

# Backend Tasks

Implement:

## User Management

- User model
- Role management
- Account status

## Authentication

- Registration
- Login
- OTP verification
- Password hashing
- Password reset
- JWT access tokens
- Refresh tokens

## Security

Implement:

- Rate limiting
- Input validation
- Authentication middleware
- Authorization middleware

---

# Frontend Tasks

Implement:

Customer:

- Splash
- Welcome
- Register
- Login
- OTP
- Forgot Password
- Reset Password

Vendor:

- Login
- Register
- OTP

Rider:

- Login
- Register
- OTP

Admin:

- Login

---

# Rules

Follow:

- Existing API contracts
- Design System
- Component Library
- Security Model

Do not:

- Store plain passwords
- Create duplicate authentication systems
- Bypass backend validation

---

# Expected Output

Provide:

- Implemented files
- API endpoints created
- Database changes
- Testing results