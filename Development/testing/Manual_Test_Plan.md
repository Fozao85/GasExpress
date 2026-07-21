# Manual Test Plan — GasNow Platform (Sprints 00–07)

## Prerequisites

1. Start the backend: `docker-compose up` or `cd backend && npm run dev`
2. Start the frontend: `cd frontend && npm run dev`
3. Seeded test accounts: see [Test_Accounts.md](./Test_Accounts.md) — all passwords are `Password123!`

---

## 1. Registration & Authentication (Sprint 01)

### 1.1 Role Selection
- [ ] From the Welcome screen, tap **Create Account**
- [ ] Verify **RoleSelectScreen** (`/role-select`) appears with 3 cards: Customer, Vendor, Rider
- [ ] Verify each card shows its icon, title, and description

### 1.2 Register as Customer
- [ ] On RoleSelectScreen, tap **Customer** card
- [ ] Verify redirect to `/customer/register`
- [ ] Fill all fields (Name, Phone, Email, Password), submit
- [ ] Verify redirect to OTP screen with phone number displayed
- [ ] Enter the 6-digit OTP code (check server logs for dev code)
- [ ] Verify redirect to `/customer/login`
- [ ] Log in with the new credentials
- [ ] Verify redirect to customer dashboard (`/customer/dashboard`)

### 1.3 Register as Vendor
- [ ] Navigate to `/role-select` (or tap **Create Account** from Welcome)
- [ ] Tap **Vendor** card
- [ ] Verify redirect to `/vendor/register`
- [ ] Fill all fields including **Business Name**, submit
- [ ] Verify redirect to OTP screen
- [ ] Enter OTP code
- [ ] Verify redirect to `/vendor/login` (NOT pending approval)
- [ ] Log in as the new vendor
- [ ] Verify redirect to `/vendor/dashboard`

### 1.4 Register as Rider
- [ ] Navigate to `/role-select`
- [ ] Tap **Rider** card
- [ ] Verify redirect to `/rider/register`
- [ ] Fill all fields including **Vehicle Type**, submit
- [ ] Verify redirect to OTP screen
- [ ] Enter OTP code
- [ ] Verify redirect to `/rider/login`
- [ ] Log in as the new rider
- [ ] Verify redirect to `/rider/dashboard`

### 1.5 Logout
- [ ] While logged in, tap **Logout** button in top-right header
- [ ] Verify redirect to splash screen
- [ ] Verify accessing a protected route (e.g. `/customer/dashboard`) redirects to login

---

## 2. Customer Features (Sprints 02 & 03)

### 2.1 Home Dashboard
- [ ] Log in as **Kwame Asante** (customer)
- [ ] Verify nearby vendors appear on the map/list
- [ ] Verify promo banners load (Free Delivery Over GHS 200, etc.)
- [ ] Verify quick action buttons render (Browse, My Orders, etc.)

### 2.2 Browse Vendors
- [ ] Tap/click "Browse All" or navigate to `/vendors`
- [ ] Verify vendor cards show name, rating, distance, pricing
- [ ] Tap sort tabs (Nearest, Rating, etc.)
- [ ] Search by vendor name

### 2.3 Vendor Detail & Ordering
- [ ] Tap a vendor card → navigate to vendor detail
- [ ] Verify vendor info, Open/Closed badge, product list
- [ ] Use +/- controls to add cylinders to cart
- [ ] Verify badge/cart count updates

### 2.4 Cart & Checkout
- [ ] Navigate to `/cart`
- [ ] Verify items, quantities, subtotal, delivery fee, total
- [ ] Verify free delivery when subtotal >= GHS 200
- [ ] Tap "Proceed to Checkout"
- [ ] Select or add a delivery address
- [ ] Select payment method (CASH or MOBILE_MONEY)
- [ ] Tap "Place Order"
- [ ] Verify redirect to confirmation page with order number

### 2.5 Order History
- [ ] Navigate to `/orders`
- [ ] Verify order list appears
- [ ] Tap status filter tabs (All, Pending, Delivered, etc.)
- [ ] Tap an order → verify order detail with items, status history

---

## 3. Vendor Features (Sprint 05)

### 3.1 Vendor Dashboard
- [ ] Log in as **John Safari** (vendor1@safari-gas.com)
- [ ] Verify redirect to `/vendor/dashboard`
- [ ] Verify stats: active orders, today's revenue, total revenue, average rating
- [ ] Toggle **Open/Closed** — verify status updates

### 3.2 Inventory Management
- [ ] Navigate to `/vendor/inventory`
- [ ] Verify cylinder products listed (6kg, 12.5kg, 14.5kg, 50kg)
- [ ] Edit a product's price or stock — verify update
- [ ] Add a new cylinder type — verify it appears
- [ ] Delete a product — verify it is removed

### 3.3 Orders
- [ ] Navigate to `/vendor/orders`
- [ ] Verify incoming orders with status tabs (All, Pending, Preparing, etc.)
- [ ] Tap an order → navigate to order detail
- [ ] **Flow — Accept & Fulfill:**
  - [ ] For a PENDING order, tap **Accept Order**
  - [ ] Verify status changes to VENDOR_ACCEPTED
  - [ ] Tap **Mark as Preparing**
  - [ ] Verify status changes to PREPARING
  - [ ] Tap **Ready for Pickup**
  - [ ] Verify status changes to READY_FOR_PICKUP
- [ ] Verify order status history timeline renders correctly
- [ ] Verify **Cancel Order** works (if not yet VENDOR_ACCEPTED)

### 3.4 Vendor Profile
- [ ] Navigate to `/vendor/profile`
- [ ] Verify business name, phone, address load
- [ ] Edit business name, phone, opening/closing hours
- [ ] Save — verify success message

---

## 4. Rider Features (Sprint 04)

### 4.1 Rider Dashboard
- [ ] Log in as **Emmanuel Tetteh** (rider, +233680000001)
- [ ] Verify redirect to `/rider/dashboard`
- [ ] Verify stats: active deliveries, today's deliveries, today's earnings, rating
- [ ] Toggle **Online/Offline** — verify availability updates
- [ ] Verify quick links: Available Deliveries, Active Deliveries, History

### 4.2 Accept a Delivery
- [ ] Navigate to `/rider/available`
- [ ] Verify list of orders ready for pickup
- [ ] Tap **Accept Delivery** on an order
- [ ] Verify redirect to `/rider/active`
- [ ] Verify order now appears in active list

### 4.3 Complete a Delivery
- [ ] From `/rider/active`, tap an order
- [ ] Verify vendor pickup address and customer delivery address
- [ ] Verify items, payment info
- [ ] **Flow:**
  - [ ] Tap **Mark as Picked Up**
  - [ ] Verify status changes to PICKED_UP
  - [ ] Tap **On My Way**
  - [ ] Verify status changes to ON_THE_WAY
  - [ ] Tap **Mark as Delivered**
  - [ ] Verify status changes to DELIVERED
  - [ ] Verify delivery timeline shows all steps

### 4.4 Delivery History
- [ ] Navigate to `/rider/history`
- [ ] Verify completed deliveries with order numbers, dates, amounts
- [ ] Verify duration shown (e.g. "30 min")

### 4.5 Rider Profile
- [ ] Navigate to `/rider/profile`
- [ ] Verify full name, phone, vehicle type, license, national ID
- [ ] Edit vehicle type, license number, national ID
- [ ] Save — verify success message

---

## 5. End-to-End Flow (Full Happy Path)

This tests the complete lifecycle from order → vendor → rider → delivery.

1. [ ] **Customer** logs in, browses vendors, adds cylinders to cart
2. [ ] **Customer** checks out, places order (CASH or MOBILE_MONEY)
3. [ ] **Vendor** logs in, sees the PENDING order, accepts it
4. [ ] **Vendor** marks order as Preparing → Ready for Pickup
5. [ ] **Rider** logs in, sees the order in Available Deliveries
6. [ ] **Rider** accepts the delivery
7. [ ] **Rider** picks up → marks Picked Up
8. [ ] **Rider** marks On My Way
9. [ ] **Rider** marks Delivered
10. [ ] **Customer** sees the order status as DELIVERED in their order history

---

## 7. Admin Features (Sprint 07)

Setup: Login as admin (phone `233000000000` / password `Password123!`) at `/admin/login`.

### 7.1 Admin Dashboard
- [ ] Navigate to `/admin/dashboard`
- [ ] Verify stat cards show: total customers, vendors, riders, orders
- [ ] Verify revenue cards show: today, this week, this month, total
- [ ] Verify average rating cards for vendors and riders
- [ ] Verify navigation cards link to Users, Vendors, Riders, Orders, Promotions, Settings

### 7.2 User Management
- [ ] Navigate to `/admin/users`
- [ ] Verify user table shows all roles (CUSTOMER, VENDOR, RIDER, ADMIN)
- [ ] Search for a user by name — verify filtering works
- [ ] Change a user's status (activate/suspend) — verify it takes effect
- [ ] Verify admin cannot suspend or delete their own account
- [ ] Delete a test customer account — verify removal

### 7.3 Vendor Approval
- [ ] Register a new vendor account, then navigate to `/admin/vendors`
- [ ] Verify pending vendor appears in the list
- [ ] Tap **Approve** — verify vendor status changes to APPROVED
- [ ] Verify the vendor can now log in and access their dashboard

### 7.4 Rider Approval
- [ ] Register a new rider account, then navigate to `/admin/riders`
- [ ] Verify pending rider appears in the list
- [ ] Tap **Approve** — verify rider status changes to ACTIVE
- [ ] Verify the rider can now log in and see available jobs

### 7.5 Order Monitoring
- [ ] Navigate to `/admin/orders`
- [ ] Verify order list shows all orders across all vendors
- [ ] Filter by status (e.g., PENDING, DELIVERED) — verify filtering works
- [ ] Click an order to see `/admin/orders/:id` detail
- [ ] Verify detail shows: customer, vendor, rider, items, timeline, payment info
- [ ] If order is still PENDING, verify cancel button works

### 7.6 Promotion Management
- [ ] Navigate to `/admin/promotions`
- [ ] Verify existing promotions are listed (Free Delivery, New Customer Discount, etc.)
- [ ] Create a new promotion: fill title, discount type, value, dates — submit
- [ ] Verify new promotion appears in the list
- [ ] Toggle a promotion active/inactive — verify change
- [ ] Delete a test promotion — verify removal

### 7.7 Platform Settings
- [ ] Navigate to `/admin/settings`
- [ ] Verify form loads with current values (delivery fee, free threshold, support contact)
- [ ] Update a field (e.g., change support phone) — save
- [ ] Verify success message appears
- [ ] Refresh page — verify value persisted

## 8. Edge Cases to Verify

- [ ] **Empty states:** No nearby vendors, no orders, no inventory, no available deliveries
- [ ] **Error states:** Backend down, network error, invalid form data
- [ ] **Unauthorized access:** Customer accessing `/vendor/dashboard`, vendor accessing `/rider/available`, etc.
- [ ] **Token expiry:** Leave session idle, make API call → verify redirect to login
- [ ] **Double submission:** Rapidly tap "Place Order" / "Accept Order" — verify no duplicate
- [ ] **Validation errors:** Try placing order with empty address, incomplete profile
- [ ] **Pagination:** Vendor orders list, delivery history — verify next/prev pages

---

## Reporting Feedback

If you find bugs, have suggestions, or want to request features, please report them at:

**GitHub Issues:** https://github.com/anomalyco/opencode/issues

When reporting, include:
1. **Role:** Customer / Vendor / Rider
2. **Screen/Route:** e.g. `/vendor/orders`, `/rider/dashboard`
3. **Steps to reproduce:** numbered steps
4. **Expected vs actual behavior**
5. **Browser/Device:** e.g. Chrome 120 / Android 14
6. **Screenshot or screen recording** (if applicable)
