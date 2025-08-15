/*
  # Affiliate System Migration

  1. New Tables
    - `affiliates`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `affiliate_code` (text, unique)
      - `commission_rate` (decimal, default 0.05)
      - `total_earnings` (decimal, default 0)
      - `pending_earnings` (decimal, default 0)
      - `total_referrals` (integer, default 0)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `affiliate_referrals`
      - `id` (uuid, primary key)
      - `affiliate_id` (uuid, foreign key to affiliates)
      - `referred_user_id` (uuid, foreign key to profiles)
      - `referral_code` (text)
      - `first_order_id` (uuid, optional, foreign key to orders)
      - `total_orders` (integer, default 0)
      - `total_commission` (decimal, default 0)
      - `status` (enum: pending, active, inactive)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for affiliate management
*/

-- Create affiliates table
CREATE TABLE IF NOT EXISTS affiliates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  affiliate_code text UNIQUE NOT NULL,
  commission_rate decimal(5,4) DEFAULT 0.0500,
  total_earnings decimal(10,2) DEFAULT 0.00,
  pending_earnings decimal(10,2) DEFAULT 0.00,
  total_referrals integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create affiliate referrals table
CREATE TABLE IF NOT EXISTS affiliate_referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id uuid NOT NULL REFERENCES affiliates(id) ON DELETE CASCADE,
  referred_user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referral_code text NOT NULL,
  first_order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  total_orders integer DEFAULT 0,
  total_commission decimal(10,2) DEFAULT 0.00,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(affiliate_id, referred_user_id)
);

-- Enable RLS
ALTER TABLE affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for affiliates
CREATE POLICY "Users can manage own affiliate account"
  ON affiliates
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for affiliate referrals
CREATE POLICY "Affiliates can view own referrals"
  ON affiliate_referrals
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM affiliates 
      WHERE affiliates.id = affiliate_referrals.affiliate_id 
      AND affiliates.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create referrals"
  ON affiliate_referrals
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_affiliates_user_id ON affiliates(user_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(affiliate_code);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_affiliate_id ON affiliate_referrals(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_affiliate_referrals_referred_user_id ON affiliate_referrals(referred_user_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_affiliates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_affiliates_updated_at
  BEFORE UPDATE ON affiliates
  FOR EACH ROW
  EXECUTE FUNCTION update_affiliates_updated_at();

CREATE TRIGGER trigger_affiliate_referrals_updated_at
  BEFORE UPDATE ON affiliate_referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_affiliates_updated_at();

-- Function to create affiliate account automatically
CREATE OR REPLACE FUNCTION create_affiliate_account()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO affiliates (user_id, affiliate_code)
  VALUES (
    NEW.id,
    'SZB' || UPPER(SUBSTRING(NEW.id::text, 1, 6))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create affiliate account when profile is created
CREATE TRIGGER trigger_create_affiliate_account
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_affiliate_account();