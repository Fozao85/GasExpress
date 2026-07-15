# API Checklist — Customer Discovery

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

## Query Parameters

All list endpoints support:

```
?page=1
&limit=20
&lat=6.5244
&lng=3.3792
&radius=15
&sort=distance|speed|price|rating
&category=12kg
&availability=open
&q=search+term
```

## Endpoints

### GET /api/vendors
- [ ] 200, paginated
- [ ] Query: page, limit, lat, lng, radius, sort, category, availability
- [ ] Response: `{ vendors: [{ id, name, distance, rating, eta, price, availableProducts }] }`

### GET /api/vendors/nearby
- [ ] 200
- [ ] Query: lat, lng, radius (default 15km)
- [ ] Response: `{ vendors: [{ id, name, distance, eta, isOpen }] }`

### GET /api/vendors/:id
- [ ] 200, 404
- [ ] Response: `{ vendor: { id, name, owner, phone, email, address, rating, products, hours, status } }`

### GET /api/vendors/search
- [ ] 200
- [ ] Query: q, lat, lng

### GET /api/vendors/:id/availability
- [ ] 200, 404
- [ ] Response: `{ isOpen, nextAvailable, stockStatus }`

### GET /api/categories
- [ ] 200

### GET /api/categories/:id/products
- [ ] 200
- [ ] Response: `{ products: [{ id, size, price, stock, inStock }] }`
