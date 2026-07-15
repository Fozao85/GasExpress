# API Checklist — Authentication

## Response Standards

Every API response must follow:

### Success
```json
{
  "success": true,
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "",
  "errors": []
}
```

## Endpoints
- [ ] POST /api/auth/register — 201, 400, 409
- [ ] POST /api/auth/login — 200, 401, 403
- [ ] POST /api/auth/otp/send — 200, 429
- [ ] POST /api/auth/otp/verify — 200, 400, 410
- [ ] POST /api/auth/refresh — 200, 401
- [ ] POST /api/auth/forgot-password — 200, 404
- [ ] POST /api/auth/reset-password — 200, 400, 410
- [ ] GET /api/auth/me — 200, 401
