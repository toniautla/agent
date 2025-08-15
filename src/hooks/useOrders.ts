import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useOrders() {
  const { user, initialized: authInitialized } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchOrders = async () => {
    if (!user || !authInitialized) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: dbError } = await db.getUserOrders(user.id);

      if (dbError) {
        setError(dbError.message);
        setOrders([]);
      } else {
        setOrders(data || []);
        setError(null);
      }
    } catch (err: any) {
      console.error('Order fetch error:', err);
      setError('Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const createOrder = async (orderData: any) => {
    if (!user) return { error: new Error('User not authenticated') };

    try {
      const { data: order, error: orderError } = await db.createOrder({
        ...orderData,
        user_id: user.id,
      });

      if (orderError) throw orderError;

      // Add order items
      if (orderData.items?.length > 0) {
        for (const item of orderData.items) {
          const { error: itemError } = await db.addOrderItem({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            unit_price: item.price,
            total_price: item.price * item.quantity,
          });

          if (itemError) {
            console.error('Error adding order item:', itemError);
          }
        }
      }

      await fetchOrders();
      return { data: order, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error);
      return { data: null, error };
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { data, error } = await db.updateOrderStatus(orderId, status);
      
      if (error) {
        throw new Error(error.message);
      }

      await fetchOrders();
      return { data, error: null };
    } catch (error: any) {
      console.error('Error updating order status:', error);
      return { data: null, error };
    }
  };

  useEffect(() => {
    if (authInitialized && user && !initialized) {
      fetchOrders();
    } else if (authInitialized && !user) {
      setOrders([]);
      setInitialized(true);
      setLoading(false);
    }
  }, [authInitialized, user, initialized]);

  return {
    orders,
    loading,
    error,
    initialized,
    fetchOrders,
    createOrder,
    updateOrderStatus,
  };
}