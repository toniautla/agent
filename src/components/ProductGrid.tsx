import React, { useState } from 'react';
import { Star, ShoppingCart, Eye, Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { useShoppingCart } from './ShoppingCart';
import ProductDetailModal from './ProductDetailModal';
import ErrorAlert from './ErrorAlert';
import LoadingSpinner from './LoadingSpinner';

export default function ProductGrid() {
  const { user, loading: authLoading, hydrated, isAuthReady, canFetchData } = useAuth();
  const {
    products,
    loading: productsLoading,
    error,
    fetchProducts,
    getProductDetails,
    clearError,
    initialized
  } = useProducts({ user, authLoading, hydrated, isAuthReady, canFetchData });

  const { addToCart } = useShoppingCart();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleViewDetails = async (product: any) => {
    try {
      const details = await getProductDetails(product.num_iid);
      setSelectedProduct(details);
      setIsDetailModalOpen(true);
    } catch (error) {
      console.error('Failed to get product details:', error);
      // Show basic product info if API fails
      setSelectedProduct(product);
      setIsDetailModalOpen(true);
    }
  };

  const handleRetry = () => {
    clearError();
    fetchProducts();
  };

  // Show loading while auth is initializing or products are loading
  if (!isAuthReady || (productsLoading && !initialized)) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner message="Loading featured products..." />
        </div>
      </section>
    );
  }

  // Show sign-in message if user is not authenticated
  if (isAuthReady && !canFetchData) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sign in to browse products</h3>
            <p className="text-gray-600 mb-4">
              Create an account or sign in to discover amazing products from Chinese marketplaces.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Discover popular items from TaoBao and Weidian
          </p>
        </div>

        {error && (
          <ErrorAlert
            error={error}
            onDismiss={clearError}
            onRetry={handleRetry}
            className="mb-8"
          />
        )}

        {!error && products.length === 0 && initialized && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products available</h3>
            <p className="text-gray-600 mb-4">
              We're working on adding more products. Please check back later.
            </p>
            <button
              onClick={handleRetry}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Products
            </button>
          </div>
        )}

        {products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.num_iid}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.pic_url || 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      TaoBao
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-3">
                      <button 
                        onClick={() => handleViewDetails(product)}
                        className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{product.nick}</p>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.total_sold} sold)
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      {product.original_price && parseFloat(product.original_price) > parseFloat(product.price) && (
                        <span className="text-lg text-gray-500 line-through">
                          ${parseFloat(product.original_price).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4 inline mr-1" />
                      Add
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    + $1.50 service fee + shipping
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ProductDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          product={selectedProduct}
          onAddToCart={handleAddToCart}
        />
      </div>
    </section>
  );
}