# Database Checklist — Integration

## Tables / Migrations
- [ ] push_tokens table (id, user_id, token, platform, device_name, app_version, last_used_at)
- [ ] file_uploads table (id, user_id, url, type, size, original_name, uploaded_at)
- [ ] payment_webhook_log table (id, event, payload, signature, status, idempotency_key, processed_at)
- [ ] integration_logs table (id, service, endpoint, status, response_time_ms, error_message, created_at)
- [ ] job_queue table (id, type, payload, status, attempts, max_retries, next_retry_at, dead_letter, created_at) — logical model (may use Redis/BullMQ)
- [ ] Indexes on push_tokens (user_id, platform), integration_logs (service, status, created_at), job_queue (status, next_retry_at)
