/*
  # Create Welcome Coupon

  1. New Coupon
    - Creates a €10 off coupon for orders over €35
    - Code: WELCOME10
    - Valid for new users

  2. Security
    - Uses existing RLS policies
*/

INSERT INTO coupons (
  code,
  type,
  value,
  description,
  min_order_amount,
  max_uses,
  used_count,
  expires_at,
  is_active
) VALUES (
  'WELCOME10',
  'fixed',
  10.00,
  '€10 off your first order over €35',
  35.00,
  1000,
  0,
  '2025-12-31 23:59:59+00',
  true
) ON CONFLICT (code) DO NOTHING;