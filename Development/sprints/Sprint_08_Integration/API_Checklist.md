# API Checklist — Integration

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
- [ ] POST /api/notifications/send — 200, 400
- [ ] POST /api/payments/verify — 200, 400, 422
- [ ] Webhook POST /api/webhooks/payment — 200 (signature verified, idempotent)
- [ ] POST /api/upload — 201, 400 (multipart, validated, compressed)
- [ ] POST /api/upload/presign — 200 (presigned URL for direct S3 upload)
- [ ] DELETE /api/upload/:id — 200, 404
- [ ] GET /api/maps/geocode?q= — 200 (forward geocode)
- [ ] GET /api/maps/reverse-geocode?lat=&lng= — 200
- [ ] GET /api/integrations/status — 200 (list of external services + health)
