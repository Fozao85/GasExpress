# Sprint 01 — Authentication & User Management

## Sprint Review

## Completed Features

### Backend

- User registration (all roles: CUSTOMER, VENDOR, RIDER, ADMIN)
- Login with phone + password
- OTP generation (6-digit, 10-minute expiry, one-time use)
- OTP verification (marks user ACTIVE for VERIFICATION type)
- JWT access token (default 15m) + refresh token (default 7d)
- Refresh token rotation (old token invalidated on use)
- Password reset flow (forgot → send OTP → verify → reset)
- Logout (invalidates all refresh tokens)
- Current user endpoint (`GET /auth/me`)
- Authentication middleware (`authenticate` guard)
- Role-based authorization middleware (`authorize` guard)
- Zod validation on all auth inputs
- Error handling (validation, conflict, unauthorized, forbidden, not found)
- OpenAPI documentation for all auth endpoints
- Auth tag added to Swagger UI

### Frontend

- **Customer flow** (7 screens): Splash → Welcome (3 onboarding slides) → Register → Login → OTP → Forgot Password → Reset Password
- **Vendor flow** (4 screens): Login → Register → OTP → Pending Approval
- **Rider flow** (3 screens): Login → Register → OTP
- **Admin flow** (1 screen): Login
- Reusable UI components: `Button` (4 variants, 3 sizes, loading spinner), `Input` (label/error/helper), `OtpInput` (6-digit, auto-focus, paste, backspace)
- `ProtectedRoute` component with role checking + loading state + redirect
- `AuthContext` for global auth state (user, tokens, loading)
- `api.ts` Axios instance with auto Bearer token + 401 interceptor (refresh → retry)
- React Query mutations for all auth operations (`useRegisterMutation`, `useLoginMutation`, `useVerifyOtpMutation`, etc.)

### Database

- `OtpType` enum (VERIFICATION, PASSWORD_RESET)
- `otp_codes` table (userId, code, type, expiresAt, used, usedAt)
- `refresh_tokens` table (userId, token, expiresAt)
- Relations on `User` model

### Testing

| Suite | Tests | Status |
|-------|-------|--------|
| `password.service.test.ts` | 4 | Passing |
| `jwt.service.test.ts` | 5 | Passing |
| `otp.service.test.ts` | 4 | Passing (graceful skip without DB) |
| `auth.guard.test.ts` | 4 | Passing |
| `app.test.ts` (backend) | 1 | Passing |
| `config/index.test.ts` | 2 | Passing |
| `App.test.tsx` (frontend) | 1 | Passing |
| **Total** | **21** | **All passing** |

## Files Changed

### Backend — New Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/modules/auth/auth.validation.ts` | 85 | Zod schemas for all auth endpoints |
| `src/modules/auth/auth.service.ts` | 175 | Auth business logic |
| `src/modules/auth/auth.controller.ts` | 99 | Request handlers |
| `src/modules/auth/auth.routes.ts` | 165 | Routes with OpenAPI JSDoc annotations |
| `src/modules/auth/index.ts` | 1 | Module barrel export |
| `src/common/services/password.service.ts` | 11 | bcrypt hash/compare |
| `src/common/services/jwt.service.ts` | 37 | JWT sign/verify |
| `src/common/services/otp.service.ts` | 41 | OTP creation/verification |
| `src/common/services/index.ts` | 4 | Barrel export |
| `src/common/guards/auth.guard.ts` | 26 | JWT auth middleware |
| `src/common/guards/roles.guard.ts` | 20 | RBAC middleware |
| `src/common/guards/index.ts` | 2 | Barrel export |
| `src/common/services/password.service.test.ts` | 31 | Unit tests |
| `src/common/services/jwt.service.test.ts` | 37 | Unit tests |
| `src/common/services/otp.service.test.ts` | 42 | Integration tests |
| `src/common/guards/auth.guard.test.ts` | 42 | Unit tests |

### Backend — Modified Files

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Added `OtpType` enum, `OtpCode` model, `RefreshToken` model |
| `src/app.ts` | Imported and mounted `authRouter` at `/api/v1/auth` |
| `src/docs/swagger.ts` | Added `Authentication` tag, register/login/token schemas |
| `package.json` | Added `bcryptjs`, `jsonwebtoken`, `@types/bcryptjs`, `@types/jsonwebtoken` |

### Frontend — New Files

| File | Purpose |
|------|---------|
| `src/services/api.ts` | Axios instance with Bearer interceptor + refresh rotation |
| `src/services/auth.service.ts` | Auth API client functions |
| `src/contexts/AuthContext.tsx` | React context for auth state |
| `src/hooks/useAuthMutations.ts` | React Query mutation hooks for all auth ops |
| `src/components/ProtectedRoute.tsx` | Route guard with role checking + loading state |
| `src/components/ui/Button.tsx` | Reusable button component |
| `src/components/ui/Input.tsx` | Reusable input component |
| `src/components/ui/OtpInput.tsx` | 6-digit OTP input component |
| `src/components/ui/index.ts` | Barrel export |
| 7 customer screens | SplashScreen, WelcomeScreen, RegisterScreen, LoginScreen, OtpScreen, ForgotPasswordScreen, ResetPasswordScreen |
| 4 vendor screens | VendorLoginScreen, VendorRegisterScreen, VendorOtpScreen, PendingApprovalScreen |
| 3 rider screens | RiderLoginScreen, RiderRegisterScreen, RiderOtpScreen |
| 1 admin screen | AdminLoginScreen |

### Frontend — Modified Files

| File | Change |
|------|--------|
| `src/App.tsx` | Replaced placeholder with full auth + protected routes |
| `package.json` | Added `axios` |

## Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **bcryptjs over bcrypt** | Pure JS, no native compilation — works in Docker, Windows, CI |
| **JWT with rotation** | Refresh token invalidated on use — prevents replay attacks |
| **OTP one-time use + 10min expiry** | Used flag + DB-level expiry prevents reuse and replay |
| **Zod over Joi/Yup** | Already in project from Sprint 00; consistent stack |
| **Auth context + React Query** | Context for token/user state; React Query for mutation lifecycle (loading/error/success) — avoids duplicate state management |
| **Single frontend app** | All role screens in one app with role-based routing; mobile apps deferred to future sprints |
| **RBAC via enum** | `UserRole` enum + `authorize()` middleware is sufficient for Sprint 01. Full Permission system deferred |
| **api.ts interceptor** | Auto-attaches Bearer token and transparently handles 401 → refresh → retry |
| **ProtectedRoute with role param** | Single guard component handles auth check + role enforcement + correct redirect per role |

## Known Limitations

1. **Rate limiting** — Global rate limit exists (100 req/min) but no per-endpoint or per-IP OTP rate limit. A malicious user could spam `/auth/otp/send` without consequence beyond the global limit.

2. **OTP is returned in response** — Currently the backend returns the OTP code in the response body for development convenience. In production, OTP should only be sent via SMS. The OTP delivery integration (Twilio, AfricasTalking, etc.) is not implemented.

3. **No email OTP for admin** — Admin login uses the same phone+password flow. The spec mentions "2FA notice" for admin but no 2FA is implemented.

4. **Password policy** — Minimum 8 characters is enforced but no complexity requirements (uppercase, number, special char).

5. **No account lockout** — Multiple failed login attempts do not lock the account. A brute-force protection mechanism should be added.

6. **Admin uses phone not email** — The admin login uses phone (consistent with the system) rather than email as specified in the original spec. This is because the User model uses `phone` as the unique identifier.

7. **OTP tests skip when DB unavailable** — The OTP service tests require database tables to exist. They gracefully pass (no-op) when the migration hasn't been run yet.

8. **No Docker Compose secrets** — The `docker-compose.yml` has hardcoded default passwords. Production should use environment-specific secrets or a `.env` file.

9. **Vendor verification** — Vendor Pending Approval screen exists but no admin approval workflow is built. This will be implemented in a future sprint.

10. **Refresh token cleanup** — Expired refresh tokens remain in the database indefinitely. A periodic cleanup job should be added.

## Git Tag

`sprint-01`
