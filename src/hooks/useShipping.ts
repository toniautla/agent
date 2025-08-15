import { useState, useEffect } from 'react';
import { db } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useShipping() {
  const { user, loading: authLoading, error: authError, isAuthReady } = useAuth();
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchShippingOptions = async () => {
    if (!isAuthReady) {
      console.log('[useShipping] Auth not ready, skipping fetch');
      return;
    }

    try {
      console.log('[useShipping] Starting fetch...', { authLoading, user: !!user });
      setFetching(true);
      setError(null);
      
      const { data, error: dbError } = await db.getShippingOptions();
      
      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }
      
      setShippingOptions(data || []);
      console.log('[useShipping] Shipping options fetched:', (data || []).length);
      
      if ((data || []).length === 0) {
        setError('No shipping options available at the moment. Please contact support.');
      }
    } catch (err: any) {
      console.error('Error fetching shipping options:', err);
      const errorMessage = err.message || 'Failed to load shipping options. Please refresh the page or try again later.';
      setError(errorMessage);
      setShippingOptions([]);
    } finally {
      setFetching(false);
      setInitialized(true);
    }
  };

  const calculateShippingCost = (
    basePrice: number,
    pricePerKg: number,
    weight: number,
    dimensions: { length: number; width: number; height: number }
  ) => {
    try {
      const volumetricWeight =
        (dimensions.length * dimensions.width * dimensions.height) / 5000;
      const chargeableWeight = Math.max(weight, volumetricWeight);
      const weightMultiplier =
        chargeableWeight > 1 ? 1 + (chargeableWeight - 1) * 0.3 : 1;
      const serviceFee = 2.0;

      const totalCost =
        basePrice * weightMultiplier +
        pricePerKg * Math.max(0, chargeableWeight - 1) +
        serviceFee;

      return Math.max(basePrice + serviceFee, totalCost);
    } catch (err) {
      console.error('Error calculating shipping cost:', err);
      return basePrice + 2.0;
    }
  };

  const clearError = () => setError(null);

  // Effect to handle initial data loading
  useEffect(() => {
    if (isAuthReady && !initialized) {
      console.log('[useShipping] Auth ready, fetching shipping options...', { 
        authLoading, 
        hasUser: !!user,
        authError 
      });
      
      // If there's an auth error, don't try to fetch
      if (authError) {
        setError('Authentication required to load shipping options. Please sign in.');
        setFetching(false);
        setInitialized(true);
        return;
      }
      
      fetchShippingOptions();
    }
  }, [isAuthReady, initialized, authError]);

  // Combine auth and shipping errors
  const combinedError = authError || error;
  const loading = fetching || (!isAuthReady && authLoading);

  return {
    shippingOptions,
    loading,
    error: combinedError,
    fetchShippingOptions,
    calculateShippingCost,
    clearError,
    initialized
  };
}