/*
  # Add payments and disputes tables

  1. New Tables
    - `payments` - Payment transaction records
    - `disputes` - Stripe dispute records

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Features
    - Payment tracking and history
    - Dispute management
    - Order payment status integration
*/

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id text PRIMARY KEY, -- Stripe payment intent ID
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount integer NOT NULL, -- Amount in cents
  currency text NOT NULL DEFAULT 'usd',
  status text CHECK (status IN ('succeeded', 'failed', 'canceled', 'processing', 'requires_action')) NOT NULL,
  payment_method text,
  failure_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Disputes table
CREATE TABLE IF NOT EXISTS disputes (
  id text PRIMARY KEY, -- Stripe dispute ID
  charge_id text NOT NULL,
  amount integer NOT NULL, -- Amount in cents
  currency text NOT NULL DEFAULT 'usd',
  reason text,
  status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payments
CREATE POLICY "Users can view own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Service role can manage all payments"
  ON payments
  FOR ALL
  TO service_role
  USING (true);

-- RLS Policies for disputes (admin only)
CREATE POLICY "Service role can manage all disputes"
  ON disputes
  FOR ALL
  TO service_role
  USING (true);

-- Triggers for updated_at
CREATE TRIGGER trigger_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_disputes_charge_id ON disputes(charge_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);