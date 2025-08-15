import React, { useState, useEffect } from 'react';
import { Heart, Star, ShoppingCart, Trash2, Eye, Filter, Search, TrendingDown, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useShoppingCart } from './ShoppingCart';
import SkeletonLoader from './SkeletonLoader';
import PriceAlerts from './PriceAlerts';

interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  originalPrice?: number;
  image_url: string;
  seller_name?: string;
  rating?: number;
  addedAt: string;
  lastPriceCheck?: string;
  priceHistory?: Array<{ price: number; date: string }>;
}

interface WishlistSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistSystem({ isOpen, onClose }: WishlistSystemProps) {
  const { user } = useAuth();
  const { addToCart } = useShoppingCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price_low' | 'price_high'>('newest');
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    if (user && isOpen) {
      loadWishlist();
    }
  }, [user, isOpen]);

  const loadWishlist = () => {
    if (!user) return;

    try {
      setLoading(true);
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        const items = JSON.parse(savedWishlist);
        setWishlistItems(items);
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWishlist = (items: WishlistItem[]) => {
    if (!user) return;
    
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(items));
    setWishlistItems(items);
  };

  const addToWishlist = (product: any) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Please sign in to add items to wishlist'
        }
      }));
      return;
    }

    const wishlistItem: WishlistItem = {
      id: Date.now().toString(),
      productId: product.id || product.num_iid,
      title: product.title,
      price: parseFloat(product.price) || 0,
      originalPrice: product.original_price ? parseFloat(product.original_price) : undefined,
      image_url: product.pic_url || product.image_url,
      seller_name: product.nick || product.seller_name,
      rating: product.rating || 4,
      addedAt: new Date().toISOString(),
      priceHistory: [{ price: parseFloat(product.price) || 0, date: new Date().toISOString() }]
    };

    const existingItems = wishlistItems.filter(item => item.productId !== wishlistItem.productId);
    const updatedItems = [...existingItems, wishlistItem];
    saveWishlist(updatedItems);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Added to wishlist!'
      }
    }));
  };

  const removeFromWishlist = (itemId: string) => {
    const updatedItems = wishlistItems.filter(item => item.id !== itemId);
    saveWishlist(updatedItems);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        message: 'Removed from wishlist'
      }
    }));
  };

  const handleAddToCart = (item: WishlistItem) => {
    const product = {
      id: item.productId,
      title: item.title,
      price: item.price,
      pic_url: item.image_url,
      nick: item.seller_name
    };
    
    addToCart(product);
  };

  const handleCreatePriceAlert = (item: WishlistItem) => {
    setSelectedProduct({
      id: item.productId,
      title: item.title,
      image_url: item.image_url,
      price: item.price
    });
    setShowPriceAlerts(true);
  };

  const shareWishlist = () => {
    const wishlistData = {
      items: wishlistItems.map(item => ({
        title: item.title,
        price: item.price,
        image_url: item.image_url
      })),
      totalItems: wishlistItems.length,
      totalValue: wishlistItems.reduce((sum, item) => sum + item.price, 0)
    };

    const shareText = `Check out my Shipzobuy wishlist! ${wishlistData.totalItems} items worth €${wishlistData.totalValue.toFixed(2)}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Shipzobuy Wishlist',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Wishlist details copied to clipboard!'
        }
      }));
    }
  };

  const filteredAndSortedItems = wishlistItems
    .filter(item => 
      !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case 'oldest':
          return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-pink-100 rounded-full p-4 mr-6">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">My Wishlist</h2>
                  <p className="text-gray-600 mt-1">{wishlistItems.length} items saved</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={shareWishlist}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search wishlist..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Wishlist Items */}
            {loading ? (
              <SkeletonLoader type="card" count={6} />
            ) : filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Heart className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-xl font-medium">
                  {searchQuery ? 'No items match your search' : 'Your wishlist is empty'}
                </p>
                <p className="text-sm mt-2">
                  {searchQuery ? 'Try adjusting your search terms' : 'Start adding products you love!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300 transform hover:scale-110"
                      >
                        <Heart className="h-5 w-5 text-pink-600 fill-current" />
                      </button>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.title}</h3>
                      {item.seller_name && (
                        <p className="text-sm text-gray-600 mb-3">{item.seller_name}</p>
                      )}

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (item.rating || 4) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({item.rating || 4}.0)</span>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xl font-bold text-blue-600">€{item.price.toFixed(2)}</p>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <p className="text-sm text-gray-500 line-through">€{item.originalPrice.toFixed(2)}</p>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleCreatePriceAlert(item)}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-700 p-2 rounded-xl transition-colors"
                          title="Create Price Alert"
                        >
                          <TrendingDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Stats */}
            {wishlistItems.length > 0 && (
              <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
                <h4 className="font-semibold text-gray-900 mb-4">Wishlist Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-600">{wishlistItems.length}</p>
                    <p className="text-sm text-gray-600">Total Items</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      €{wishlistItems.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Total Value</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      €{(wishlistItems.reduce((sum, item) => sum + item.price, 0) / wishlistItems.length).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">Average Price</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PriceAlerts
        isOpen={showPriceAlerts}
        onClose={() => setShowPriceAlerts(false)}
        productId={selectedProduct?.id}
        productTitle={selectedProduct?.title}
        productImage={selectedProduct?.image_url}
        currentPrice={selectedProduct?.price}
      />
    </>
  );
}

// Export wishlist functions for global use
export const useWishlist = () => {
  const { user } = useAuth();

  const addToWishlist = (product: any) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Please sign in to add items to wishlist'
        }
      }));
      return;
    }

    const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
    const currentWishlist: WishlistItem[] = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    const existingItemIndex = currentWishlist.findIndex(item => item.productId === (product.id || product.num_iid));
    
    if (existingItemIndex >= 0) {
      // Remove from wishlist
      currentWishlist.splice(existingItemIndex, 1);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'info',
          message: 'Removed from wishlist'
        }
      }));
    } else {
      // Add to wishlist
      const wishlistItem: WishlistItem = {
        id: Date.now().toString(),
        productId: product.id || product.num_iid,
        title: product.title,
        price: parseFloat(product.price) || 0,
        originalPrice: product.original_price ? parseFloat(product.original_price) : undefined,
        image_url: product.pic_url || product.image_url,
        seller_name: product.nick || product.seller_name,
        rating: product.rating || 4,
        addedAt: new Date().toISOString(),
        priceHistory: [{ price: parseFloat(product.price) || 0, date: new Date().toISOString() }]
      };
      
      currentWishlist.push(wishlistItem);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Added to wishlist!'
        }
      }));
    }

    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(currentWishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
  };

  const isInWishlist = (productId: string): boolean => {
    if (!user) return false;
    
    const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
    const currentWishlist: WishlistItem[] = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    return currentWishlist.some(item => item.productId === productId);
  };

  const getWishlistCount = (): number => {
    if (!user) return 0;
    
    const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
    const currentWishlist: WishlistItem[] = savedWishlist ? JSON.parse(savedWishlist) : [];
    
    return currentWishlist.length;
  };

  return { addToWishlist, isInWishlist, getWishlistCount };
};