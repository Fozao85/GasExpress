# API Standards

## Base URL
- Production: `https://api.gasnow.com/api/v1`
- Staging: `https://staging-api.gasnow.com/api/v1`
- Local: `http://localhost:4000/api/v1`

## Response Format

### Success
```json
{
  "success": true,
  "data": {},
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

### Error
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [
    { "field": "email", "message": "Email is required" }
  ]
}
```

## HTTP Status Codes
| Code | Usage |
|------|-------|
| 200 | Success (GET, PUT, PATCH) |
| 201 | Created (POST) |
| 204 | No Content (DELETE) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (missing/invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Not Found |
| 409 | Conflict (duplicate, already assigned) |
| 422 | Unprocessable Entity (business rule) |
| 429 | Too Many Requests (rate limited) |
| 500 | Internal Server Error |

## Authentication
- Bearer token in `Authorization` header
- Token format: `Authorization: Bearer <jwt_token>`
- All endpoints except `POST /auth/*` require authentication

## Pagination
- Query params: `?page=1&limit=20`
- Default limit: 20
- Max limit: 100
- Response includes `meta` object with `page`, `limit`, `total`

## Filtering & Sorting
- Filter by field: `?status=active&category=12kg`
- Sort: `?sort=created_at` or `?sort=-created_at` (descending)
- Search: `?q=search+term`

## Rate Limiting
- General: 100 requests/minute per user
- Auth endpoints: 10 requests/minute per IP
- Payment endpoints: 30 requests/minute per user

## Versioning
- Version prefix in URL: `/api/v1/`, `/api/v2/`
- Breaking changes require new version
- Deprecated versions maintained for 90 days
