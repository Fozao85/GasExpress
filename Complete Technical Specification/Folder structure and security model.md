Excellent. These are two of the last major design artifacts before implementation.

* **Folder Structure** defines how the codebase is organized to keep it maintainable and scalable.
* **Security Model** defines how the application protects users, data, and business operations from unauthorized access and abuse.

---

# 1. Folder Structure

## What is a Folder Structure?

A folder structure defines how the project's source code, configuration files, assets, and modules are organized. A well-designed structure improves maintainability, enables team collaboration, and makes it easier to add new features without creating tightly coupled code.

For GasNow, I recommend a **modular monorepo** using **Nx** or **Turborepo**, which allows the mobile apps, admin dashboard, and backend to share code and types.

---

# Recommended Project Structure

```text
gasnow/

├── apps/
│   │
│   ├── customer-app/          # Flutter Customer App
│   ├── rider-app/             # Flutter Rider App
│   ├── vendor-app/            # Flutter Vendor App
│   ├── admin-dashboard/       # Next.js Admin Panel
│   └── api/                   # NestJS Backend
│
├── packages/
│   ├── shared-types/
│   ├── shared-utils/
│   ├── ui-components/
│   ├── validation/
│   └── constants/
│
├── infrastructure/
│   ├── docker/
│   ├── nginx/
│   ├── terraform/
│   └── kubernetes/
│
├── docs/
│   ├── PRD/
│   ├── API/
│   ├── Database/
│   ├── Architecture/
│   └── UX/
│
├── scripts/
│
├── .github/
│
├── package.json
├── README.md
└── docker-compose.yml
```

---

# Backend Structure (NestJS)

```text
api/

src/

├── app.module.ts

├── config/
│   ├── database.config.ts
│   ├── auth.config.ts
│   ├── payment.config.ts
│   └── maps.config.ts

├── common/
│   ├── decorators/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── middleware/
│   ├── exceptions/
│   └── utils/

├── database/
│   ├── migrations/
│   ├── seeders/
│   └── prisma/

├── modules/

│   ├── auth/
│   ├── users/
│   ├── customers/
│   ├── vendors/
│   ├── riders/
│   ├── inventory/
│   ├── orders/
│   ├── delivery/
│   ├── tracking/
│   ├── payments/
│   ├── notifications/
│   ├── reviews/
│   ├── analytics/
│   └── admin/

├── integrations/
│   ├── momo/
│   ├── orange-money/
│   ├── sms/
│   ├── firebase/
│   └── maps/

└── main.ts
```

---

# Typical Module Structure

```text
orders/

├── controller.ts
├── service.ts
├── repository.ts
├── dto/
├── entities/
├── interfaces/
├── guards/
├── validators/
├── events/
├── order.module.ts
└── tests/
```

---

# Flutter App Structure

```text
customer-app/

lib/

├── app/
├── core/
│   ├── api/
│   ├── theme/
│   ├── constants/
│   ├── services/
│   ├── storage/
│   ├── routing/
│   └── widgets/
│
├── features/
│
│   ├── authentication/
│   ├── onboarding/
│   ├── home/
│   ├── vendors/
│   ├── orders/
│   ├── tracking/
│   ├── payments/
│   ├── profile/
│   ├── reviews/
│   └── notifications/
│
├── shared/
│
└── main.dart
```

---

# Admin Dashboard Structure

```text
admin-dashboard/

src/

├── components/
├── layouts/
├── pages/
├── hooks/
├── services/
├── api/
├── store/
├── types/
├── utils/
└── middleware/
```

---

# 2. Security Model

## What is a Security Model?

A security model defines the rules, controls, and mechanisms used to protect the platform from unauthorized access, data breaches, fraud, and malicious activity. It covers authentication, authorization, encryption, validation, monitoring, and operational safeguards to ensure that users can only perform actions they are permitted to perform.

---

# Security Architecture

```text
                    Internet

                        │

                 HTTPS / TLS 1.3

                        │

                 API Gateway

                        │

        Authentication & Rate Limiting

                        │

                JWT Verification

                        │

           Authorization (RBAC)

                        │

              Business Validation

                        │

             Database Access Layer

                        │

           PostgreSQL (Encrypted)
```

---

# Security Layers

## Layer 1 – Network Security

* HTTPS only
* TLS 1.3
* Secure HTTP headers
* Firewall
* Reverse proxy (Nginx)

---

## Layer 2 – Authentication

* Phone + OTP
* Strong password policy
* JWT Access Token
* Refresh Token Rotation
* Secure logout
* Device/session management

---

## Layer 3 – Authorization (RBAC)

### Customer

Can:

* Place orders
* View own orders
* Manage own profile
* Save addresses
* Submit reviews

Cannot:

* Access vendor or admin data
* Modify another user's information

---

### Vendor

Can:

* Manage inventory
* Accept or reject orders
* Update business profile
* View sales reports

Cannot:

* Access customer accounts
* Access other vendors' data
* Perform administrative actions

---

### Rider

Can:

* Accept delivery jobs
* Update delivery status
* Share live location
* View assigned deliveries

Cannot:

* Edit inventory
* View unrelated customer data
* Access admin functionality

---

### Admin

Can:

* Manage users
* Verify vendors
* Verify riders
* Resolve disputes
* View analytics
* Suspend accounts

---

# Role Hierarchy

```text
                  Admin
                    │
      ┌─────────────┼─────────────┐
      │             │             │
   Vendor        Rider       Customer
```

---

# JWT Claims

```json
{
  "sub": "uuid",
  "role": "CUSTOMER",
  "permissions": [
    "orders:create",
    "orders:view",
    "profile:update"
  ],
  "exp": 1720000000
}
```

---

# Permission Matrix

| Permission       | Customer |  Vendor |     Rider    | Admin |
| ---------------- | :------: | :-----: | :----------: | :---: |
| Register         |     ✅    |    ✅    |       ✅      |   ❌   |
| Login            |     ✅    |    ✅    |       ✅      |   ✅   |
| Place Order      |     ✅    |    ❌    |       ❌      |   ❌   |
| Accept Order     |     ❌    |    ✅    |       ❌      |   ❌   |
| Accept Delivery  |     ❌    |    ❌    |       ✅      |   ❌   |
| Manage Inventory |     ❌    |    ✅    |       ❌      |   ❌   |
| Track Orders     |  ✅ (own) | ✅ (own) | ✅ (assigned) |   ✅   |
| Manage Users     |     ❌    |    ❌    |       ❌      |   ✅   |
| Verify Accounts  |     ❌    |    ❌    |       ❌      |   ✅   |
| View Analytics   |     ❌    | Limited |    Limited   |  Full |

---

# Data Protection

### Passwords

* Argon2 (preferred) or bcrypt hashing.
* Never store plaintext passwords.

### Sensitive Data

Encrypt at rest:

* National ID numbers
* Business licenses
* Driver's license details
* Payment references
* Refresh tokens (hashed)

### In Transit

* HTTPS everywhere.
* TLS 1.3.
* Secure WebSocket (`wss://`) connections for live tracking.

---

# Input Validation

Every request should validate:

* Required fields.
* Data types.
* Phone number formats.
* Maximum string lengths.
* Allowed enum values.
* Uploaded file types and sizes.
* SQL injection and XSS protections through parameterized queries and output encoding.

---

# Rate Limiting

| Endpoint       | Limit                        |
| -------------- | ---------------------------- |
| Login          | 5 attempts / 15 min          |
| Register       | 3 attempts / hour / phone    |
| OTP Request    | 3 requests / 10 min          |
| Password Reset | 3 requests / hour            |
| Order Creation | 30 requests / hour           |
| API (general)  | 100 requests / minute / user |

---

# Fraud Prevention

* Verify vendor business licenses before activation.
* Verify rider identity and driver's license.
* Prevent multiple accounts with the same verified phone number.
* Detect abnormal ordering or delivery patterns.
* Record immutable audit logs for sensitive operations.

---

# Logging & Auditing

Record events such as:

* Login/logout.
* Failed login attempts.
* Password changes.
* Role changes.
* Vendor/rider approval decisions.
* Inventory updates.
* Payment events.
* Order status changes.

---

# Secure File Uploads

For documents and profile images:

* Accept only approved file types (e.g., JPG, PNG, PDF).
* Enforce maximum file size limits.
* Scan uploads for malware.
* Store files in private object storage.
* Serve access through signed URLs rather than exposing storage paths.

---

# Incident Response

If suspicious activity is detected:

1. Log the event.
2. Notify administrators.
3. Temporarily suspend high-risk actions (or the account if necessary).
4. Require re-authentication or identity verification.
5. Allow administrators to investigate using audit logs.

---

## Recommended Security Standards

To align with industry best practices, design the platform around:

* **OWASP Top 10** to mitigate common web application vulnerabilities.
* **JWT Best Practices**, including short-lived access tokens and refresh token rotation.
* **Principle of Least Privilege**, ensuring users only receive the permissions necessary for their role.
* **Defense in Depth**, with multiple independent security controls rather than relying on a single mechanism.

This layered approach gives GasNow a strong security foundation that is appropriate for an on-demand marketplace handling personal information, business verification documents, location data, and financial transactions.
