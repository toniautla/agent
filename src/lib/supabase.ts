import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    flowType: 'pkce',
  },
});

// Enhanced database helpers with proper error handling
export const db = {
  // Products
  getProducts: async (limit = 20, offset = 0) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    return { data, error };
  },

  searchProducts: async (query: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Orders with proper relations
  getUserOrders: async (userId: string) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        ),
        addresses (*),
        shipping_options (*),
        payments (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  createOrder: async (orderData: any) => {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select(`
        *,
        order_items (
          *,
          products (*)
        ),
        addresses (*),
        shipping_options (*)
      `)
      .single();
    return { data, error };
  },

  addOrderItem: async (orderItem: any) => {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItem)
      .select('*, products(*)')
      .single();
    return { data, error };
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();
    return { data, error };
  },

  // Profiles
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  createProfile: async (profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, profileData: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...profileData, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  // Addresses
  getUserAddresses: async (userId: string) => {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId)
      .order('is_default', { ascending: false });
    return { data, error };
  },

  addAddress: async (addressData: any) => {
    const { data, error } = await supabase
      .from('addresses')
      .insert(addressData)
      .select()
      .single();
    return { data, error };
  },

  updateAddress: async (addressId: string, addressData: any) => {
    const { data, error } = await supabase
      .from('addresses')
      .update(addressData)
      .eq('id', addressId)
      .select()
      .single();
    return { data, error };
  },

  deleteAddress: async (addressId: string) => {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId);
    return { error };
  },

  // Shipping options
  getShippingOptions: async () => {
    const { data, error } = await supabase
      .from('shipping_options')
      .select('*')
      .eq('is_active', true)
      .order('base_price', { ascending: true });
    return { data, error };
  },

  // Wallet operations
  getUserWallet: async (userId: string) => {
    const { data, error } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  createWallet: async (userId: string) => {
    const { data, error } = await supabase
      .from('wallets')
      .insert({ user_id: userId, balance: 10.00 })
      .select()
      .single();
    return { data, error };
  },

  updateWalletBalance: async (walletId: string, newBalance: number) => {
    const { data, error } = await supabase
      .from('wallets')
      .update({ balance: newBalance, updated_at: new Date().toISOString() })
      .eq('id', walletId)
      .select()
      .single();
    return { data, error };
  },

  // Wallet transactions
  addWalletTransaction: async (transactionData: any) => {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .insert(transactionData)
      .select()
      .single();
    return { data, error };
  },

  getUserWalletTransactions: async (userId: string) => {
    const { data, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Support tickets
  createSupportTicket: async (ticketData: any) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .insert(ticketData)
      .select()
      .single();
    return { data, error };
  },

  getUserSupportTickets: async (userId: string) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select(`
        *,
        support_messages (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  addSupportMessage: async (messageData: any) => {
    const { data, error } = await supabase
      .from('support_messages')
      .insert(messageData)
      .select()
      .single();
    return { data, error };
  },

  updateSupportTicketStatus: async (ticketId: string, status: string) => {
    const { data, error } = await supabase
      .from('support_tickets')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', ticketId)
      .select()
      .single();
    return { data, error };
  },

  // Payments
  createPayment: async (paymentData: any) => {
    const { data, error } = await supabase
      .from('payments')
      .insert(paymentData)
      .select()
      .single();
    return { data, error };
  },

  getUserPayments: async (userId: string) => {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        orders (
          order_number,
          total,
          created_at
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  // Coupons
  getActiveCoupons: async () => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('is_active', true)
      .gt('expires_at', new Date().toISOString());
    return { data, error };
  },

  validateCoupon: async (code: string) => {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code)
      .eq('is_active', true)
      .gt('expires_at', new Date().toISOString())
      .single();
    return { data, error };
  },

  createCoupon: async (couponData: any) => {
    const { data, error } = await supabase
      .from('coupons')
      .insert(couponData)
      .select()
      .single();
    return { data, error };
  },

  getUserCoupons: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_coupons')
      .select(`
        *,
        coupons (*)
      `)
      .eq('user_id', userId)
      .is('used_at', null);
    return { data, error };
  },

  addUserCoupon: async (userId: string, couponId: string) => {
    const { data, error } = await supabase
      .from('user_coupons')
      .insert({
        user_id: userId,
        coupon_id: couponId
      })
      .select()
      .single();
    return { data, error };
  },

  useCoupon: async (userId: string, couponId: string, orderId: string) => {
    const { data, error } = await supabase
      .from('user_coupons')
      .update({
        used_at: new Date().toISOString(),
        order_id: orderId
      })
      .eq('user_id', userId)
      .eq('coupon_id', couponId)
      .select()
      .single();
    return { data, error };
  },

  // Admin functions
  getAllOrders: async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (*)
        ),
        addresses (*),
        shipping_options (*),
        profiles (email, first_name, last_name),
        payments (*)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getAllSupportTickets: async () => {
    const { data, error } = await supabase
      .from('support_tickets')
      .select(`
        *,
        support_messages (*),
        profiles (email, first_name, last_name)
      `)
      .order('created_at', { ascending: false });
    return { data, error };
  },

  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },
};