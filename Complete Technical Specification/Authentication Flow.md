Great. The **Authentication Flow** is one of the most important parts of the system because it defines **how users securely access the platform**. For GasNow, I recommend using **Phone Number + OTP + JWT Authentication**, as phone numbers are more common and reliable than email in many African markets.

---

# Authentication Flow

## What is the Authentication Flow?

The Authentication Flow describes **how users register, verify their identity, log in, maintain an active session, and securely access protected resources** within the application. It also defines how the system handles password recovery, token refresh, logout, and role-based access.

---

# Authentication Strategy

### Primary Authentication Method

* Phone Number
* OTP Verification
* Password
* JWT Access Token
* Refresh Token

---

## Supported User Roles

* Customer
* Vendor
* Rider
* Admin

All users authenticate through the same system, with access determined by their assigned role.

---

# Authentication Architecture

```text
                User

                  │
                  ▼

      Enter Phone Number

                  │
                  ▼

        Create Account/Login

                  │
                  ▼

          Verify OTP Code

                  │
                  ▼

       Password Authentication

                  │
                  ▼

      JWT Access Token Issued

                  │
                  ▼

     Access Protected Resources

                  │
                  ▼

         Refresh Token (Silent)

                  │
                  ▼

            Logout
```

---

# Registration Flow

```text
User opens GasNow

        │

Tap Register

        │

Choose Account Type
(Customer / Vendor / Rider)

        │

Enter Details

• Full Name
• Phone Number
• Password

        │

Submit Registration

        │

System validates input

        │

Phone number already exists?

 ┌──────────────┐
 │ Yes          │
 │ Return Error │
 └──────────────┘

        │ No

Generate OTP

        │

Send SMS

        │

User enters OTP

        │

OTP Valid?

 ┌─────────────┐
 │ No          │
 │ Retry OTP   │
 └─────────────┘

        │ Yes

Create User

        │

Generate JWT

        │

Registration Complete
```

---

# Login Flow

```text
Open App

      │

Enter Phone Number

      │

Enter Password

      │

Validate Credentials

      │

Correct?

 ┌────────────┐
 │ No         │
 │ Error      │
 └────────────┘

      │ Yes

Generate Access Token

Generate Refresh Token

      │

Login Successful

      │

Navigate to Dashboard
```

---

# OTP Verification Flow

```text
User requests OTP

      │

Backend generates 6-digit code

      │

Store OTP securely with expiration

      │

Send SMS

      │

User enters code

      │

Backend validates

      │

OTP expired?

 ┌─────────────┐
 │ Yes         │
 │ Resend OTP  │
 └─────────────┘

      │ No

OTP correct?

 ┌─────────────┐
 │ No          │
 │ Invalid OTP │
 └─────────────┘

      │ Yes

Phone Verified
```

---

# Forgot Password Flow

```text
Forgot Password

       │

Enter Phone Number

       │

Receive OTP

       │

Verify OTP

       │

Enter New Password

       │

Confirm Password

       │

Update Password

       │

Success
```

---

# Token Refresh Flow

Access tokens should be short-lived (e.g., 15–60 minutes), while refresh tokens last longer (e.g., 30 days).

```text
Access Token Expires

        │

Frontend detects 401 Unauthorized

        │

Send Refresh Token

        │

Refresh Token Valid?

   ┌──────────────┐
   │ No           │
   │ Force Login  │
   └──────────────┘

        │ Yes

Issue New Access Token

        │

Continue Session
```

---

# Logout Flow

```text
User taps Logout

       │

Delete Access Token

Delete Refresh Token

       │

Invalidate Refresh Token on Server

       │

Redirect to Login
```

---

# Role-Based Access Control (RBAC)

```text
                  Login

                    │

             User Authenticated

                    │

        Read User Role from JWT

                    │

 ┌──────────┬──────────┬──────────┬──────────┐
 │          │          │          │
 ▼          ▼          ▼          ▼

Customer   Vendor     Rider      Admin

 │          │          │          │

Customer   Vendor     Rider      Admin
Dashboard  Dashboard  Dashboard  Dashboard
```

---

# Authentication State Machine

```text
UNAUTHENTICATED
        │
        ▼
REGISTERING
        │
        ▼
OTP_PENDING
        │
        ▼
PHONE_VERIFIED
        │
        ▼
AUTHENTICATED
        │
        ├────────────► TOKEN_REFRESH
        │
        ▼
LOGGED_OUT
```

---

# JWT Payload

When authentication succeeds, the backend issues a JWT containing essential identity and authorization information.

```json
{
  "sub": "user-uuid",
  "phone": "+237670000000",
  "role": "CUSTOMER",
  "isVerified": true,
  "iat": 1720000000,
  "exp": 1720003600
}
```

---

# Security Requirements

### Passwords

* Minimum 8 characters.
* Require uppercase, lowercase, number, and special character.
* Store only hashed passwords (e.g., Argon2 or bcrypt).

### OTP

* Six-digit numeric code.
* Valid for 5 minutes.
* Single use only.
* Maximum of 5 verification attempts.
* Allow resend after a short cooldown (e.g., 60 seconds).

### Session Management

* Access Token: 15–60 minutes.
* Refresh Token: Up to 30 days.
* Rotate refresh tokens after each use.
* Allow users to log out from individual devices or all devices.

### Rate Limiting

* Limit login attempts per IP and phone number.
* Limit OTP requests to prevent abuse.
* Temporarily lock accounts after repeated failed login attempts.

---

# Authentication Decision Matrix

| Feature          | Customer | Vendor | Rider |         Admin         |
| ---------------- | :------: | :----: | :---: | :-------------------: |
| Register         |     ✅    |    ✅   |   ✅   | ❌ (created by system) |
| Login            |     ✅    |    ✅   |   ✅   |           ✅           |
| OTP Verification |     ✅    |    ✅   |   ✅   |        Optional       |
| Password Login   |     ✅    |    ✅   |   ✅   |           ✅           |
| Forgot Password  |     ✅    |    ✅   |   ✅   |           ✅           |
| Refresh Token    |     ✅    |    ✅   |   ✅   |           ✅           |
| Logout           |     ✅    |    ✅   |   ✅   |           ✅           |

---

# Recommended Vendor & Rider Approval Flow

One important addition for a marketplace like GasNow is to **separate authentication from business verification**:

```text
Register Account
        │
        ▼
Phone Verified
        │
        ▼
Account Created
        │
        ▼
Upload Required Documents
(Business License, National ID, Driver's License, etc.)
        │
        ▼
Admin Review
        │
   ┌────┴────┐
   ▼         ▼
Approved   Rejected
   │         │
   ▼         ▼
Full Access  Resubmit Documents
```

This means vendors and riders can create accounts and log in immediately, but **they cannot accept orders until an administrator approves their verification**. This approach improves onboarding while maintaining trust, safety, and regulatory compliance.
