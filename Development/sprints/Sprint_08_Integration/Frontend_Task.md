# Frontend — Platform Integrations

## Payments
- [x] Mobile Money payment UI (phone number input, confirmation)
- [x] MTN MoMo payment flow
- [x] Orange Money payment flow
- [x] CASH payment option preserved (on-delivery payment)
- [x] Payment success / failure screens
- [x] Payment method selection on checkout (redirects to payment screen)

## Maps
- [ ] Vendor location display on vendor detail screen
- [ ] Customer address picker with map (geocoding search)
- [ ] Rider navigation view (route from rider to vendor to customer)
- [ ] Distance display on product/vendor cards
- [ ] ETA display on tracking screen
- [ ] Route visualization on tracking screen

## Notifications
- [ ] In-app notification center (list, mark read, empty state)
- [ ] Push notification handling (foreground + background)
- [ ] Push notification permission flow
- [ ] Notification tap navigates to correct screen
- [ ] Real-time notification badge / indicator

## Real-Time Updates
- [x] WebSocket / SSE connection management (Socket.IO client + useSocket hook)
- [ ] Live order status updates on tracking screen
- [x] Vendor dashboard live order updates (order:new / order:status events)
- [x] Rider dispatch live updates (order:status events)
- [x] Customer order status subscription (user room via user ID)

## File Uploads
- [ ] Vendor logo upload (business registration / settings)
- [ ] Rider profile photo upload (registration / profile)
- [ ] Delivery proof photo capture / upload
- [ ] Upload progress indicators
- [ ] Image preview before upload

## Platform
- [ ] Deep linking support for notifications
- [ ] Network status detection (offline banner)
- [ ] Retry failed requests on reconnect
