Excellent. This is exactly the next step.

The **User Flows** document sits between the PRD and the wireframes. It answers **"How does a user accomplish a task?"** before deciding **"What does the screen look like?"**

A good rule is:

> **PRD → User Flows → Wireframes → High-Fidelity UI → Development**

---

# GasNow User Flows

## What are User Flows?

User flows are step-by-step journeys that show how users interact with the application to achieve a goal. They define the sequence of screens, decisions, and actions for each type of user, ensuring a consistent and intuitive experience before any UI is designed or code is written.

---

# User Roles

The platform has four primary user roles:

* Customer
* Vendor
* Rider
* Administrator

Each role has its own flows.

---

# Customer User Flows

## 1. Customer Registration

**Goal:** Create a new customer account.

```text
Launch App
      │
      ▼
Welcome Screen
      │
      ▼
Choose "Create Account"
      │
      ▼
Enter Name
Phone Number
Password
      │
      ▼
Submit
      │
      ▼
Receive OTP
      │
      ▼
Verify OTP
      │
      ▼
Registration Successful
      │
      ▼
Complete Profile (Optional)
      │
      ▼
Home Screen
```

---

## 2. Customer Login

```text
Open App
     │
     ▼
Login Screen
     │
     ▼
Enter Phone Number
Password
     │
     ▼
Credentials Valid?
     │
 ┌───┴────┐
 │ No     │
 ▼        ▼
Show Error Success
          │
          ▼
Customer Home
```

---

## 3. Forgot Password

```text
Login Screen
      │
      ▼
Forgot Password
      │
      ▼
Enter Phone Number
      │
      ▼
Receive OTP
      │
      ▼
Verify OTP
      │
      ▼
Enter New Password
      │
      ▼
Password Updated
      │
      ▼
Login
```

---

## 4. Browse Nearby Vendors

```text
Home Screen
      │
      ▼
Grant Location Permission
      │
      ▼
Load Nearby Vendors
      │
      ▼
Search / Filter
      │
      ▼
Select Vendor
      │
      ▼
Vendor Details
```

---

## 5. Place Gas Order (Core Flow)

```text
Vendor Details
      │
      ▼
Choose Cylinder Size
      │
      ▼
Enter Quantity
      │
      ▼
Choose Delivery Address
      │
      ▼
Select Payment Method
      │
      ▼
Review Order
      │
      ▼
Place Order
      │
      ▼
Waiting for Vendor Acceptance
```

---

## 6. Vendor Accepts Order

```text
Order Submitted
      │
      ▼
Vendor Receives Order
      │
      ▼
Vendor Accepts
      │
      ▼
Searching for Rider
      │
      ▼
Rider Assigned
      │
      ▼
Customer Tracking Screen Opens
```

---

## 7. Live Delivery Tracking

```text
Tracking Screen
      │
      ▼
Vendor Preparing
      │
      ▼
Rider Assigned
      │
      ▼
Rider Picks Up Gas
      │
      ▼
Live GPS Updates
      │
      ▼
Rider Arrives
      │
      ▼
Delivery Completed
      │
      ▼
Rate Experience
```

---

## 8. View Order History

```text
Profile
     │
     ▼
My Orders
     │
     ▼
Select Previous Order
     │
     ▼
Order Details
     │
     ▼
Reorder
```

---

# Vendor User Flows

## 1. Vendor Registration

```text
Launch App
      │
      ▼
Register
      │
      ▼
Choose Vendor
      │
      ▼
Business Details
      │
      ▼
Upload Verification Documents
      │
      ▼
Submit
      │
      ▼
Pending Approval
      │
      ▼
Admin Review
      │
      ▼
Approved
      │
      ▼
Vendor Dashboard
```

---

## 2. Receive Order

```text
New Order Notification
      │
      ▼
Open Order
      │
      ▼
Review Items
      │
      ▼
Accept / Reject
```

---

## 3. Prepare Order

```text
Order Accepted
      │
      ▼
Prepare Cylinder
      │
      ▼
Mark Ready
      │
      ▼
Notify Rider
```

---

## 4. Manage Inventory

```text
Vendor Dashboard
      │
      ▼
Inventory
      │
      ▼
Select Cylinder
      │
      ▼
Update Stock
Price
Availability
      │
      ▼
Save
```

---

# Rider User Flows

## 1. Rider Registration

```text
Register
      │
      ▼
Choose Rider
      │
      ▼
Personal Information
      │
      ▼
Upload ID
Driver's License
Vehicle Details
      │
      ▼
Submit
      │
      ▼
Pending Approval
      │
      ▼
Approved
```

---

## 2. Go Online

```text
Dashboard
      │
      ▼
Toggle Online
      │
      ▼
Waiting for Jobs
```

---

## 3. Accept Delivery

```text
Delivery Request
      │
      ▼
Accept
      │
      ▼
Navigate to Vendor
      │
      ▼
Collect Gas
      │
      ▼
Navigate to Customer
      │
      ▼
Deliver
      │
      ▼
Confirm Delivery
```

---

# Administrator User Flows

## 1. Verify Vendor

```text
Admin Dashboard
      │
      ▼
Pending Vendors
      │
      ▼
Open Application
      │
      ▼
Review Documents
      │
      ▼
Approve / Reject
```

---

## 2. Verify Rider

```text
Dashboard
      │
      ▼
Pending Riders
      │
      ▼
Review
      │
      ▼
Approve
```

---

## 3. Resolve Dispute

```text
Support Queue
      │
      ▼
Open Case
      │
      ▼
Review Order
Payment
Tracking
      │
      ▼
Decision
      │
      ▼
Close Case
```

---

# Cross-Cutting User Flows

## Notifications

```text
Event Occurs
      │
      ▼
Backend Generates Notification
      │
      ▼
Push Notification Sent
      │
      ▼
User Opens Notification
      │
      ▼
Relevant Screen Opens
```

---

## Payment Flow

```text
Checkout
      │
      ▼
Choose Payment Method
      │
      ▼
Payment Successful?
      │
 ┌────┴─────┐
 │ No       │
 ▼          ▼
Retry      Order Confirmed
```

---

## Logout Flow

```text
Profile
     │
     ▼
Settings
     │
     ▼
Logout
     │
     ▼
Session Cleared
     │
     ▼
Welcome Screen
```

---

# User Flow Map

```text
                     Welcome

                         │

        ┌────────────────┼─────────────────┐

        ▼                ▼                 ▼

   Customer         Vendor            Rider

        │                │                 │

Authentication   Authentication   Authentication

        │                │                 │

Dashboard      Vendor Dashboard  Rider Dashboard

        │                │                 │

Browse Vendors  Inventory       Delivery Jobs

        │                │                 │

Place Order     Manage Orders   Accept Delivery

        │                │                 │

Track Order     Prepare Order   Deliver Gas

        │                │                 │

Complete Order  Revenue         Earnings
```

---

# Key UX Decisions Captured by These Flows

These flows establish several important design decisions that will guide the wireframes and final UI:

* **Role-specific experiences:** Customers, vendors, riders, and administrators each have dedicated onboarding and dashboards.
* **Order lifecycle:** The core journey—from placing an order to delivery and review—is clearly defined and consistent across all participants.
* **Verification before activation:** Vendors and riders can register immediately but must complete document verification and receive admin approval before handling orders.
* **Location-first experience:** Customers grant location access early so nearby vendors and delivery estimates can be shown immediately.
* **Real-time updates:** Tracking, notifications, and order status changes are integral parts of the user journey rather than optional add-ons.

With these user flows complete, you're ready for the next deliverable: **Wireframes (screen-by-screen layouts)**, which will transform these journeys into visual page structures suitable for Figma. This is where you'll define navigation, content hierarchy, and screen composition before moving to high-fidelity designs.
