# Backend Setup Guide

## Project Structure

```
src/
├── routes/              # API route definitions
│   └── products.routes.js
├── controllers/         # Request handlers
│   └── products.controller.js
├── services/           # Business logic
│   └── product.service.js
├── validators/         # Request validation
│   └── product.validator.js
├── middlewares/        # Custom middleware
│   ├── auth.middleware.js
│   └── validate.middleware.js
├── config/            # Configuration files
│   └── supabase.js
└── utils/             # Utility functions
    ├── response.js
    └── logger.js

server.js              # Main server file
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

3. **Update `.env.local` with your credentials:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend
PORT=5000
NODE_ENV=development
```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run server:dev
```

### Production Mode
```bash
npm run server
```

The server will start on `http://localhost:5000`

## Available Routes

### Products API
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `PATCH /api/products/:id/stock` - Update stock (admin only)

### Health Check
- `GET /api/health` - Server health status

## Architecture

### Layers

1. **Routes** (`products.routes.js`)
   - Define API endpoints
   - Handle middleware application
   - Basic request/response routing

2. **Controllers** (`products.controller.js`)
   - Handle HTTP requests/responses
   - Parse query parameters
   - Call service layer
   - Return formatted responses

3. **Services** (`product.service.js`)
   - Contain business logic
   - Interact with database
   - Format data
   - Handle errors

4. **Validators** (`product.validator.js`)
   - Validate request data
   - Check field types and constraints
   - Return validation errors

5. **Middlewares**
   - `auth.middleware.js` - Admin authentication
   - `validate.middleware.js` - Request validation

6. **Utils**
   - `response.js` - Standardized response format
   - `logger.js` - Logging utility

## Database (Supabase)

### Products Table Schema
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  image VARCHAR(500) NOT NULL,
  images TEXT[] DEFAULT '{}',
  category VARCHAR(50) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  rating DECIMAL(3, 1),
  reviews INTEGER DEFAULT 0,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_created ON products(created_at DESC);
```

## Testing with cURL

### Get all products
```bash
curl -X GET "http://localhost:5000/api/products?category=Metal&sort=price-low&limit=10"
```

### Get product by ID
```bash
curl -X GET "http://localhost:5000/api/products/550e8400-e29b-41d4-a716-446655440000"
```

### Create product (requires auth)
```bash
curl -X POST "http://localhost:5000/api/products" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Keychain",
    "description": "A test keychain product",
    "price": 29.99,
    "image": "https://example.com/image.jpg",
    "category": "Metal",
    "stock": 50
  }'
```

### Update stock
```bash
curl -X PATCH "http://localhost:5000/api/products/550e8400-e29b-41d4-a716-446655440000/stock" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"stock": 100}'
```

## Error Handling

The API returns standardized error responses:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Validation error
- `401` - Unauthorized
- `404` - Not found
- `500` - Server error

## Next Steps

1. **Set up Supabase database** with the schema provided
2. **Implement JWT authentication** in `auth.middleware.js`
3. **Add more routes** for orders, users, etc.
4. **Set up testing** with Jest/Mocha
5. **Deploy to production** (Heroku, Vercel, AWS, etc.)

## Troubleshooting

### Port already in use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=3001 npm run server
```

### Supabase connection error
- Verify credentials in `.env.local`
- Check Supabase project status
- Ensure RLS policies allow access

### Authentication errors
- Implement proper JWT verification in `auth.middleware.js`
- Add admin user roles to database
- Generate and use valid tokens

## Documentation

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## Support

For issues or questions:
1. Check the API documentation
2. Review error messages in logs
3. Verify database schema
4. Check environment variables
