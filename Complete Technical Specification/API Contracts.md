### **What are API Contracts? (Brief Explanation)**

API contracts define the agreement between the frontend (mobile app, web app) and the backend. They specify **which endpoints exist, what data must be sent, what responses are returned, authentication requirements, status codes, and validation rules**. They ensure frontend and backend teams (or AI coding agents) can work independently while communicating through a well-defined interface.

---

# GasNow API Contracts (v1)

**Base URL**

```text
https://api.gasnow.com/v1
```

**Authentication**

```text
Bearer JWT Token
Authorization: Bearer <access_token>
```

---

# 1. Authentication

## Register Customer

### POST `/auth/register`

**Request**

```json
{
  "fullName": "John Doe",
  "phone": "+237670000000",
  "password": "StrongPassword123"
}
```

**Response**

```json
{
  "message": "Registration successful",
  "userId": "uuid",
  "otpRequired": true
}
```

---

## Verify OTP

### POST `/auth/verify-otp`

```json
{
  "phone": "+237670000000",
  "otp": "482913"
}
```

**Response**

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 3600
}
```

---

## Login

### POST `/auth/login`

```json
{
  "phone": "+237670000000",
  "password": "password"
}
```

---

# 2. Customer APIs

## Get Nearby Vendors

### GET `/vendors?lat=4.15&lng=9.24&radius=10`

**Response**

```json
[
  {
    "id": "vendor-id",
    "businessName": "Buea Gas Center",
    "distance": 1.4,
    "rating": 4.8,
    "isOpen": true
  }
]
```

---

## Vendor Details

### GET `/vendors/{vendorId}`

Returns

* Business info
* Inventory
* Prices
* Ratings
* Operating hours

---

## Create Order

### POST `/orders`

```json
{
  "vendorId": "vendor-id",
  "deliveryAddressId": "address-id",
  "paymentMethod": "CASH",
  "items": [
    {
      "cylinderTypeId": "12kg",
      "quantity": 1
    }
  ]
}
```

**Response**

```json
{
  "orderId": "uuid",
  "status": "PENDING"
}
```

---

## Order History

### GET `/orders`

Returns all customer orders.

---

## Order Details

### GET `/orders/{orderId}`

Returns

* Items
* Payment
* Rider
* Timeline
* Receipt

---

## Cancel Order

### PATCH `/orders/{orderId}/cancel`

---

# 3. Vendor APIs

## Get Vendor Inventory

### GET `/vendor/inventory`

---

## Update Inventory

### PATCH `/vendor/inventory/{inventoryId}`

```json
{
  "stockQuantity": 12,
  "price": 9500
}
```

---

## Vendor Orders

### GET `/vendor/orders`

---

## Accept Order

### PATCH `/vendor/orders/{orderId}/accept`

---

## Reject Order

### PATCH `/vendor/orders/{orderId}/reject`

---

## Mark Ready

### PATCH `/vendor/orders/{orderId}/ready`

---

# 4. Rider APIs

## Go Online

### PATCH `/rider/status`

```json
{
  "status": "ONLINE"
}
```

---

## Available Deliveries

### GET `/rider/jobs`

---

## Accept Delivery

### PATCH `/rider/jobs/{deliveryId}/accept`

---

## Update Rider Location

### POST `/rider/location`

```json
{
  "latitude": 4.152,
  "longitude": 9.242
}
```

---

## Delivery Completed

### PATCH `/rider/jobs/{deliveryId}/complete`

---

# 5. Tracking APIs

## Track Order

### GET `/tracking/{orderId}`

Response

```json
{
  "status": "ON_THE_WAY",
  "eta": "12 mins",
  "rider": {
    "name": "Michael",
    "phone": "+23767xxxxxxx"
  },
  "location": {
    "lat": 4.15,
    "lng": 9.23
  }
}
```

---

# 6. Address APIs

## Save Address

### POST `/addresses`

---

## Get Addresses

### GET `/addresses`

---

## Update Address

### PATCH `/addresses/{id}`

---

## Delete Address

### DELETE `/addresses/{id}`

---

# 7. Payment APIs

## Initialize Payment

### POST `/payments/initiate`

---

## Verify Payment

### GET `/payments/{paymentId}`

---

## Payment History

### GET `/payments`

---

# 8. Review APIs

## Submit Review

### POST `/reviews`

```json
{
  "orderId": "uuid",
  "vendorRating": 5,
  "riderRating": 5,
  "comment": "Excellent service."
}
```

---

## Get Vendor Reviews

### GET `/vendors/{vendorId}/reviews`

---

# 9. Notification APIs

## Get Notifications

### GET `/notifications`

---

## Mark Notification Read

### PATCH `/notifications/{id}`

---

# 10. Admin APIs

## Verify Vendor

### PATCH `/admin/vendors/{id}/verify`

---

## Verify Rider

### PATCH `/admin/riders/{id}/verify`

---

## Suspend User

### PATCH `/admin/users/{id}/suspend`

---

## Dashboard Analytics

### GET `/admin/dashboard`

Returns

* Total users
* Orders
* Revenue
* Active riders
* Active vendors

---

# Common HTTP Status Codes

| Code | Meaning                                 |
| ---- | --------------------------------------- |
| 200  | Success                                 |
| 201  | Resource Created                        |
| 204  | No Content                              |
| 400  | Invalid Request                         |
| 401  | Unauthorized                            |
| 403  | Forbidden                               |
| 404  | Resource Not Found                      |
| 409  | Conflict (e.g., duplicate registration) |
| 422  | Validation Error                        |
| 500  | Internal Server Error                   |

---

# API Versioning

To support future enhancements without breaking existing clients:

* Current version: `/v1`
* Future versions: `/v2`, `/v3`

For example:

```text
GET /v1/orders
GET /v2/orders
```

This approach allows new features and improvements to be introduced while maintaining compatibility for users on older app versions.
