/*
  # Wallet System Migration

  1. New Tables
    - `wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `balance` (decimal, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `wallet_transactions`
      - `id` (uuid, primary key)
      - `wallet_id` (uuid, foreign key to wallets)
      - `user_id` (uuid, foreign key to profiles)
      - `type` (enum: topup, payment, refund, bonus)
      - `amount` (decimal)
      - `description` (text)
      - `reference_id` (text, optional)
      - `status` (enum: pending, completed, failed)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to manage their own wallet data
*/

-- Create wallet table
CREATE TABLE IF NOT EXISTS wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  balance decimal(10,2) DEFAULT 0.00 NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id uuid NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('topup', 'payment', 'refund', 'bonus')),
  amount decimal(10,2) NOT NULL,
  description text NOT NULL,
  reference_id text,
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for wallets
CREATE POLICY "Users can manage own wallet"
  ON wallets
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

-- Create policies for wallet transactions
CREATE POLICY "Users can view own transactions"
  ON wallet_transactions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own transactions"
  ON wallet_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_wallets_user_id ON wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_type ON wallet_transactions(type);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_wallets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_wallets_updated_at
  BEFORE UPDATE ON wallets
  FOR EACH ROW
  EXECUTE FUNCTION update_wallets_updated_at();