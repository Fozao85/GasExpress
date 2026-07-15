Here's the index of the LowFi Wireframes for all three apps — all built as React/Vite/Tailwind apps in 390×844 mobile frames, grayscale.
Customer App — 31 Screens
Auth & Onboarding (7): Splash · Welcome · Register · Login · OTP Verification · Forgot Password · Reset Password
Home & Discovery (5): Home Dashboard (greeting, location bar, search, promo banner, quick actions, nearby vendor cards, recent orders, bottom nav) · Search Results · Vendor Listing (filter chips: All/Nearest/Fastest/Cheapest/Top Rated, vendor cards with image/name/rating/distance/price) · Vendor Details (cover image, info, cylinders with stepper, price summary, Add to Cart) · Promotions
Ordering (5): Shopping Cart · Checkout (delivery address, payment method selection: MoMo/Cash, order summary, promo code) · Address Selection · Payment Method · Order Confirmation
Delivery (3): Order Tracking (live map, rider info, ETA, timeline stepper with 5 statuses) · Delivery Completed · Receipt
Orders (3): Order History (tabs: All/Delivered/Cancelled/Ongoing) · Details · Rate Vendor & Rider
Account (8): Notifications · Profile · Edit Profile · Saved Addresses · Payment Methods · Settings · Help & Support · About
Vendor App — 14 Screens
Auth (4): Splash (GasNow + "Vendor Portal") · Login (phone/password, "Welcome back") · Register Business (name, owner, phone, email, password) · OTP Verification
Verification (2): Business Verification (upload license + ID + business address) · Pending Approval (status card, timeline: Submitted → Under Review → Expected by)
Operations (4): Dashboard (stats: orders/pending/completed/revenue, quick actions, recent orders) · Incoming Orders (cards with Accept/Reject) · Order Details (customer info, delivery address with map, items ordered, Accept/Reject at bottom) · Active Deliveries
Inventory (1): Inventory list (6kg/12.5kg/25kg/50kg with stock + price + status badge: In Stock/Low Stock/Out of Stock, edit button, + Add Item)
Business (3): Revenue Dashboard (Daily/Weekly/Monthly tabs, bar chart, stats, recent transactions) · Notifications (unread dots, types: Order/Inventory/System) · Profile (business logo, stats, business details, verification status) · Settings (Business/Preferences/Support groups, Logout)
Bottom Nav: Dashboard · Orders · Inventory · Profile
Rider App — 18 Screens (+ 4 states)
Auth (6): Splash · Login · Register (first/last name, phone, email, password) · OTP · Identity Verification (upload ID front/back, ID number, 3-step progress: ID → Selfie → Vehicle) · Pending Approval (timeline: Account Created → Submitted → Under Review → Approved)
Dashboard & Jobs (5): Dashboard (online/offline toggle, stats: earnings/deliveries, available jobs list, active delivery card) · Dashboard – Offline (zero state, "Go online to earn") · Available Jobs (filter tabs: All/Nearby/High Pay/Gas/Kerosene, job cards with fee/distance/route) · Jobs Empty state · Delivery Request (popup: route map, distance/time/fee, order details, customer info, Accept/Decline with countdown timer)
Delivery Flow (4): Pickup Navigation (map with ETA pill: min/km, vendor info, "Arrived at Pickup") · Customer Navigation (map, customer details, delivery note, "Arrived at Customer") · Active Delivery Tracking (map, progress stepper: Accepted → Picked Up → In Transit → Delivered, vendor/customer details, "Complete Delivery") · Delivery Completed (success icon, earnings breakdown: fee + bonus − platform fee, rate customer ★★★★★, "Find Next Job")
Earnings & History (2): Earnings (period tabs: Today/Week/Month/All Time, big number, bar chart, wallet balance, recent deliveries) · Delivery History (search, filter: All/Completed/Cancelled/Failed, grouped by date, status tags)
Account (5): Notifications (unread/earlier sections, types: jobs/earnings/ratings/bonuses) · Delivery History Loading state · Delivery History Error state (retry) · Profile (avatar, stats: rating/deliveries/on-time, personal info, vehicle, documents with verification status) · Settings (Notification toggles, Navigation prefs, Account, Support, version)
Bottom Nav: Dashboard · Jobs · Earnings · Profile