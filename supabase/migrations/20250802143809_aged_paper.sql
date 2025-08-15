/*
  # Coupons System Migration

  1. New Tables
    - `coupons`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `type` (enum: percentage, fixed)
      - `value` (decimal)
      - `description` (text)
      - `min_order_amount` (decimal, optional)
      - `max_uses` (integer, optional)
      - `used_count` (integer, default 0)
      - `expires_at` (timestamp)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
    
    - `user_coupons`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `coupon_id` (uuid, foreign key to coupons)
      - `used_at` (timestamp, optional)
      - `order_id` (uuid, optional, foreign key to orders)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for coupon management
*/

-- Create coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value decimal(10,2) NOT NULL,
  description text NOT NULL,
  min_order_amount decimal(10,2),
  max_uses integer,
  used_count integer DEFAULT 0,
  expires_at timestamptz NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create user coupons table
CREATE TABLE IF NOT EXISTS user_coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  coupon_id uuid NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  used_at timestamptz,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, coupon_id)
);

-- Enable RLS
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coupons ENABLE ROW LEVEL SECURITY;

-- Create policies for coupons
CREATE POLICY "Anyone can read active coupons"
  ON coupons
  FOR SELECT
  TO authenticated
  USING (is_active = true AND expires_at > now());

-- Create policies for user coupons
CREATE POLICY "Users can manage own coupons"
  ON user_coupons
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active, expires_at);
CREATE INDEX IF NOT EXISTS idx_user_coupons_user_id ON user_coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_user_coupons_coupon_id ON user_coupons(coupon_id);

-- Insert welcome bonus coupon template
INSERT INTO coupons (code, type, value, description, min_order_amount, expires_at, is_active)
VALUES (
  'WELCOME10',
  'fixed',
  10.00,
  'Welcome bonus for new users',
  20.00,
  '2025-12-31 23:59:59',
  true
) ON CONFLICT (code) DO NOTHING;