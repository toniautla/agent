import { useState, useEffect } from 'react';
import { taobaoAPI, TaobaoProduct } from '../lib/taobao-api';
import { User } from '@supabase/supabase-js';

interface UseProductsArgs {
  user: User | null;
  authLoading: boolean;
  hydrated: boolean;
  isAuthReady: boolean;
  canFetchData: boolean;
}

export function useProducts({
  user,
  authLoading,
  hydrated,
  isAuthReady,
  canFetchData,
}: UseProductsArgs) {
  const [products, setProducts] = useState<TaobaoProduct[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const fetchProducts = async (query = 'fashion', page = 1) => {
    if (!isAuthReady || !canFetchData) {
      console.log('[useProducts] Auth not ready or user cannot fetch data');
      return;
    }

    try {
      console.log('[useProducts] Starting fetch...', { query, page });
      setFetching(true);
      setError(null);

      const pageNum = Number(page) || 1;
      const response = await taobaoAPI.searchProducts(query, pageNum);

      if (response.error_code !== '0') {
        throw new Error(`API error: ${response.reason}`);
      }

      setProducts(response.items.item || []);
      console.log(
        '[useProducts] Products fetched:',
        response.items.item?.length || 0
      );
    } catch (err: any) {
      console.error('[useProducts] Error fetching products:', err);
      setError(err.message || 'Failed to load products.');
      setProducts([]);
    } finally {
      setFetching(false);
      setInitialized(true);
    }
  };

  const searchProducts = async (query: string, page = 1) => {
    if (!isAuthReady || !canFetchData) {
      throw new Error('Please sign in to search products');
    }

    try {
      setFetching(true);
      setError(null);

      const pageNum = Number(page) || 1;
      const response = await taobaoAPI.searchProducts(query, pageNum);

      if (response.error_code !== '0') {
        throw new Error(`Search failed: ${response.reason}`);
      }

      const results = response.items.item || [];
      setProducts(results);
      return results;
    } catch (err: any) {
      console.error('[useProducts] Search error:', err);
      setError(err.message || 'Search failed');
      throw err;
    } finally {
      setFetching(false);
    }
  };

  const getProductDetails = async (itemId: string) => {
    if (!isAuthReady || !canFetchData) {
      throw new Error('Please sign in to view product details');
    }

    try {
      setFetching(true);
      setError(null);

      const response = await taobaoAPI.getItemById(itemId);

      if (response.error_code !== '0') {
        throw new Error(`Failed to get product details: ${response.reason}`);
      }

      return response.item;
    } catch (err: any) {
      console.error('[useProducts] Get product details error:', err);
      setError(err.message || 'Failed to get product details');
      throw err;
    } finally {
      setFetching(false);
    }
  };

  const clearError = () => setError(null);

  useEffect(() => {
    if (isAuthReady && canFetchData && !initialized) {
      console.log('[useProducts] Auth ready, initializing products fetch...');
      fetchProducts();
    } else if (isAuthReady && !canFetchData && !initialized) {
      console.log('[useProducts] Auth ready but cannot fetch data');
      setProducts([]);
      setInitialized(true);
      setFetching(false);
    }
  }, [isAuthReady, canFetchData, initialized]);

  const loading = fetching || (!isAuthReady && authLoading);

  return {
    products,
    loading,
    error,
    fetchProducts,
    searchProducts,
    getProductDetails,
    clearError,
    initialized,
  };
}
