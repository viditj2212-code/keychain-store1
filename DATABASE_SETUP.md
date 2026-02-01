# Database Schema for Supabase

This file contains all the SQL queries needed to set up your Supabase database.

## Setup Instructions

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to the SQL Editor
3. Create a new query and copy-paste each CREATE TABLE statement below
4. Run each query to create the tables

## Products Table

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

## Orders Table

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  customer_name VARCHAR(255) NOT NULL,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  user_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_email ON orders(customer_email);
```

## Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

## Contact Messages Table

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created ON contact_messages(created_at DESC);
```

## Newsletter Table

```sql
CREATE TABLE newsletter (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP DEFAULT NOW(),
  unsubscribed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_newsletter_active ON newsletter(is_active);
CREATE INDEX idx_newsletter_created ON newsletter(created_at DESC);
```

## Row Level Security (RLS) Policies

Enable these policies for security:

```sql
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Products - Public read, admin write
CREATE POLICY "Products are viewable by everyone" 
  ON products FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products"
  ON products FOR INSERT 
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can update products"
  ON products FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete products"
  ON products FOR DELETE 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Orders - Users can read their own, admins can read all
CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT 
  USING (auth.uid() = user_id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete orders"
  ON orders FOR DELETE 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Contact Messages - Admins only
CREATE POLICY "Admins can read all messages"
  ON contact_messages FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Only admins can update message status"
  ON contact_messages FOR UPDATE 
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Only admins can delete messages"
  ON contact_messages FOR DELETE 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Newsletter - Anyone can subscribe
CREATE POLICY "Anyone can manage their subscription"
  ON newsletter FOR ALL 
  WITH CHECK (true);

CREATE POLICY "Admins can read all subscriptions"
  ON newsletter FOR SELECT 
  USING (auth.jwt() ->> 'role' = 'admin');
```

## Sample Product Data

```sql
INSERT INTO products (name, description, price, sale_price, image, category, stock, is_featured, is_new, rating, reviews, features)
VALUES 
(
  'Premium Metal Keychain',
  'Durable stainless steel keychain with premium finish. Perfect for everyday use.',
  29.99,
  24.99,
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
  'Metal',
  50,
  true,
  true,
  4.8,
  128,
  '["Stainless Steel", "Durable", "Lightweight", "Lifetime Warranty"]'
),
(
  'Leather Keychain',
  'Genuine leather keychain with custom engraving option.',
  34.99,
  NULL,
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
  'Leather',
  30,
  true,
  false,
  4.6,
  94,
  '["Genuine Leather", "Customizable", "Premium Quality"]'
),
(
  'Carbon Fiber Keychain',
  'Lightweight carbon fiber keychain for the modern professional.',
  44.99,
  39.99,
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
  'Carbon Fiber',
  25,
  false,
  true,
  4.9,
  156,
  '["Lightweight", "Carbon Fiber", "Modern Design"]'
);
```

## Testing Database Connection

After creating the tables, test your connection:

```bash
# Test from backend with Node.js
npm run server:dev

# Test endpoints
curl http://localhost:5000/api/products
curl http://localhost:5000/health
```

## Important Notes

1. **Environment Variables**: Make sure to update `.env.local` with your Supabase credentials
2. **RLS Policies**: Enable Row Level Security for production environments
3. **Backups**: Set up regular backups in Supabase dashboard
4. **Indexes**: The provided indexes improve query performance
5. **JWT Secret**: Change the JWT_SECRET in production

## Next Steps

1. Create the tables using the SQL above
2. Set up authentication in Supabase
3. Configure RLS policies for security
4. Add sample product data
5. Test API endpoints with the backend server
