# Products API Documentation

## Overview
Complete REST API for managing products in the KeyChain e-commerce store with filtering, sorting, and pagination.

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### 1. GET All Products (PUBLIC)
Fetch all products with optional filters and sorting.

**Request:**
```http
GET /products?category=Metal&sort=price-low&limit=10&offset=0
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| category | string | No | Filter by category: `Minimalist`, `Leather`, `Metal`, `Custom` |
| priceRange | string | No | Filter by price: `0-20`, `20-50`, `50-100`, `100+` |
| sort | string | No | Sort order: `featured`, `price-low`, `price-high`, `newest`, `rating` |
| featured | boolean | No | Show only featured products |
| search | string | No | Search by name or description |
| limit | number | No | Number of products to return (default: 100) |
| offset | number | No | Number of products to skip (default: 0) |

**Response (200):**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Minimalist Steel Keychain",
      "description": "Sleek stainless steel keychain with brushed finish",
      "price": 24.99,
      "salePrice": null,
      "image": "https://example.com/image.jpg",
      "images": ["https://example.com/image1.jpg"],
      "category": "Metal",
      "stock": 50,
      "isFeatured": true,
      "isNew": false,
      "rating": 4.8,
      "reviews": 124,
      "features": ["Premium stainless steel", "Brushed finish"],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### 2. GET Product by ID (PUBLIC)
Fetch a single product by its ID.

**Request:**
```http
GET /products/550e8400-e29b-41d4-a716-446655440000
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Minimalist Steel Keychain",
    "description": "Sleek stainless steel keychain with brushed finish",
    "price": 24.99,
    "salePrice": null,
    "image": "https://example.com/image.jpg",
    "images": ["https://example.com/image1.jpg"],
    "category": "Metal",
    "stock": 50,
    "isFeatured": true,
    "isNew": false,
    "rating": 4.8,
    "reviews": 124,
    "features": ["Premium stainless steel", "Brushed finish"],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 3. CREATE Product (ADMIN ONLY)
Create a new product.

**Request:**
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Carbon Fiber Keychain",
  "description": "Ultra-lightweight carbon fiber keychain with titanium ring",
  "price": 49.99,
  "salePrice": null,
  "image": "https://example.com/carbon.jpg",
  "images": ["https://example.com/carbon1.jpg", "https://example.com/carbon2.jpg"],
  "category": "Metal",
  "stock": 25,
  "isFeatured": false,
  "isNew": true,
  "rating": null,
  "reviews": 0,
  "features": ["Aerospace-grade carbon fiber", "Titanium split ring"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Carbon Fiber Keychain",
    "description": "Ultra-lightweight carbon fiber keychain with titanium ring",
    "price": 49.99,
    "salePrice": null,
    "image": "https://example.com/carbon.jpg",
    "images": ["https://example.com/carbon1.jpg", "https://example.com/carbon2.jpg"],
    "category": "Metal",
    "stock": 25,
    "isFeatured": false,
    "isNew": true,
    "rating": null,
    "reviews": 0,
    "features": ["Aerospace-grade carbon fiber", "Titanium split ring"],
    "createdAt": "2024-01-28T15:45:00.000Z",
    "updatedAt": "2024-01-28T15:45:00.000Z"
  }
}
```

**Response (400 - Validation Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "price",
      "message": "Price must be a positive number"
    }
  ]
}
```

---

### 4. UPDATE Product (ADMIN ONLY)
Update an existing product.

**Request:**
```http
PUT /products/660e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body (partial update allowed):**
```json
{
  "price": 44.99,
  "salePrice": 39.99,
  "stock": 20,
  "isFeatured": true
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Carbon Fiber Keychain",
    "description": "Ultra-lightweight carbon fiber keychain with titanium ring",
    "price": 44.99,
    "salePrice": 39.99,
    "image": "https://example.com/carbon.jpg",
    "images": ["https://example.com/carbon1.jpg"],
    "category": "Metal",
    "stock": 20,
    "isFeatured": true,
    "isNew": true,
    "rating": null,
    "reviews": 0,
    "features": ["Aerospace-grade carbon fiber"],
    "createdAt": "2024-01-28T15:45:00.000Z",
    "updatedAt": "2024-01-28T16:30:00.000Z"
  }
}
```

---

### 5. DELETE Product (ADMIN ONLY)
Delete a product.

**Request:**
```http
DELETE /products/660e8400-e29b-41d4-a716-446655440001
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": null
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Product not found"
}
```

---

### 6. UPDATE Stock (ADMIN ONLY)
Update only the stock for a product.

**Request:**
```http
PATCH /products/660e8400-e29b-41d4-a716-446655440001/stock
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "stock": 100
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Stock updated successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Carbon Fiber Keychain",
    "stock": 100,
    ...
  }
}
```

---

## Error Responses

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized - No token provided"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Field Validation Rules

| Field | Type | Rules |
|-------|------|-------|
| name | string | Required, 3-200 characters |
| description | string | Required, 10-2000 characters |
| price | number | Required, must be > 0.01 |
| salePrice | number | Optional, must be < price |
| image | string | Required, must be valid URL |
| images | array | Optional, all must be valid URLs |
| category | string | Required, one of: Minimalist, Leather, Metal, Custom |
| stock | integer | Required, must be >= 0 |
| isFeatured | boolean | Optional |
| isNew | boolean | Optional |
| rating | number | Optional, 0-5 range |
| reviews | integer | Optional, must be >= 0 |
| features | array | Optional, all must be strings |

---

## Running the Server

**Development:**
```bash
npm run server:dev
```

**Production:**
```bash
npm run server
```

The API will be available at `http://localhost:5000/api`

---

## Health Check

**Request:**
```http
GET /api/health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-28T16:30:00.000Z"
}
```
