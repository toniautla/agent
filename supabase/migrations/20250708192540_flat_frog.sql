/*
  # Chinese Agent Marketplace Database Schema

  1. New Tables
    - `profiles` - User profile information
    - `products` - Product catalog from TaoBao/Weidian
    - `orders` - Customer orders
    - `order_items` - Items within orders
    - `addresses` - User shipping addresses
    - `shipping_options` - Available shipping methods
    - `warehouses` - Warehouse locations
    - `product_searches` - Search history and analytics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access

  3. Features
    - Real-time order updates
    - Product search and filtering
    - Order management workflow
    - Shipping calculations
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  street_address text NOT NULL,
  city text NOT NULL,
  state text,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'United States',
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Warehouses table
CREATE TABLE IF NOT EXISTS warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  country text NOT NULL DEFAULT 'China',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  currency text DEFAULT 'USD',
  image_url text,
  seller_name text,
  platform text CHECK (platform IN ('taobao', 'weidian', 'tmall')) NOT NULL,
  external_id text,
  external_url text,
  rating numeric(2,1) DEFAULT 0,
  review_count integer DEFAULT 0,
  category text,
  tags text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Shipping options table
CREATE TABLE IF NOT EXISTS shipping_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  provider text NOT NULL,
  estimated_days_min integer NOT NULL,
  estimated_days_max integer NOT NULL,
  base_price numeric(10,2) NOT NULL,
  price_per_kg numeric(10,2) DEFAULT 0,
  features text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  order_number text UNIQUE NOT NULL,
  status text CHECK (status IN ('pending', 'purchased', 'warehouse', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
  subtotal numeric(10,2) NOT NULL DEFAULT 0,
  service_fee numeric(10,2) NOT NULL DEFAULT 0,
  shipping_cost numeric(10,2) DEFAULT 0,
  total numeric(10,2) NOT NULL DEFAULT 0,
  shipping_address_id uuid REFERENCES addresses(id),
  shipping_option_id uuid REFERENCES shipping_options(id),
  tracking_number text,
  warehouse_id uuid REFERENCES warehouses(id),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Product searches table (for analytics)
CREATE TABLE IF NOT EXISTS product_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  search_type text CHECK (search_type IN ('text', 'image', 'link')) NOT NULL,
  search_query text,
  results_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_searches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for addresses
CREATE POLICY "Users can manage own addresses"
  ON addresses
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can read active products"
  ON products
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- RLS Policies for shipping options (public read)
CREATE POLICY "Anyone can read active shipping options"
  ON shipping_options
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- RLS Policies for warehouses (public read)
CREATE POLICY "Anyone can read active warehouses"
  ON warehouses
  FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

-- RLS Policies for orders
CREATE POLICY "Users can manage own orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for order items
CREATE POLICY "Users can manage own order items"
  ON order_items
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- RLS Policies for product searches
CREATE POLICY "Users can manage own searches"
  ON product_searches
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid() OR user_id IS NULL);

-- Insert sample data
INSERT INTO warehouses (name, location, country) VALUES
  ('Beijing Warehouse', 'Beijing', 'China'),
  ('Guangzhou Warehouse', 'Guangzhou', 'China'),
  ('Shanghai Warehouse', 'Shanghai', 'China');

INSERT INTO shipping_options (name, provider, estimated_days_min, estimated_days_max, base_price, price_per_kg, features) VALUES
  ('Economy Shipping', 'China Post', 15, 25, 12.99, 3.50, ARRAY['Basic tracking', 'No insurance', 'Slowest option']),
  ('Standard Shipping', 'E-EMS', 7, 14, 24.99, 5.00, ARRAY['Full tracking', 'Basic insurance', 'Reliable delivery']),
  ('Express Shipping', 'DHL Express', 3, 5, 45.99, 8.50, ARRAY['Real-time tracking', 'Full insurance', 'Fastest delivery']),
  ('FedEx International', 'FedEx', 4, 7, 39.99, 7.50, ARRAY['Premium tracking', 'Insurance included', 'Signature required']);

INSERT INTO products (title, description, price, original_price, image_url, seller_name, platform, rating, review_count, category, tags) VALUES
  ('Premium Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 45.99, 58.99, 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=400', 'TechStore Official', 'taobao', 4.5, 1234, 'Electronics', ARRAY['headphones', 'wireless', 'audio']),
  ('Designer Backpack', 'Stylish and functional backpack for daily use', 32.50, 42.00, 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400', 'Fashion Hub', 'weidian', 4.8, 856, 'Fashion', ARRAY['backpack', 'fashion', 'accessories']),
  ('Smart Watch Pro', 'Advanced smartwatch with health monitoring', 89.99, 120.00, 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400', 'WatchWorld', 'taobao', 4.3, 2341, 'Electronics', ARRAY['smartwatch', 'health', 'fitness']),
  ('Vintage Sunglasses', 'Classic vintage-style sunglasses', 18.75, 25.00, 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400', 'Style Avenue', 'weidian', 4.6, 567, 'Fashion', ARRAY['sunglasses', 'vintage', 'accessories']),
  ('Gaming Mechanical Keyboard', 'RGB mechanical keyboard for gaming', 67.50, 85.00, 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400', 'GameTech Pro', 'taobao', 4.7, 1789, 'Electronics', ARRAY['keyboard', 'gaming', 'mechanical']),
  ('Minimalist Sneakers', 'Clean and simple sneaker design', 55.25, 70.00, 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400', 'FootwearPlus', 'weidian', 4.4, 923, 'Fashion', ARRAY['sneakers', 'minimalist', 'shoes']);

-- Functions for order number generation
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('order_number_seq')::text, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();