# Database Checklist — Platform Integrations

## Tables / Migrations
- [x] payment_transactions table (id, order_id, user_id, provider, amount, currency, status, reference, metadata, created_at, updated_at)
- [x] payment_webhook_log table (id, provider, event, payload, signature, status, idempotency_key, processed_at)
- [x] notifications table (id, user_id, type, title, body, data, read_at, created_at) — in-app notification center
- [ ] push_tokens table (id, user_id, token, platform, device_name, app_version, last_used_at)
- [x] notification_templates table (id, event_type, channel, subject, body, variables, created_at)
- [ ] file_uploads table (id, user_id, url, type, size, original_name, mime_type, uploaded_at)
- [ ] integration_logs table (id, service, endpoint, status, response_time_ms, error_message, created_at)
- [x] job_queue — BullMQ using Redis (notifications queue active)
- [x] Indexes on notifications (user_id, isRead, created_at)
