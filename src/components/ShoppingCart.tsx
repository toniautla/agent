import React, { useState, useEffect } from 'react';
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, X, Package, Shield, Truck, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
  seller_name?: string;
  weight?: number;
  addons?: {
    qualityInspection: boolean;
    packageConsolidation: boolean;
  };
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (items: CartItem[]) => void;
}

export default function ShoppingCart({ isOpen, onClose, onCheckout }: ShoppingCartProps) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, [user]);

  const loadCart = () => {
    if (!user) return;

    const savedCart = localStorage.getItem(`cart_${user.id}`);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
        setCartItems([]);
      }
    }
  };

  const saveCart = (items: CartItem[]) => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
    }
    setCartItems(items);
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    saveCart(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    saveCart(updatedItems);
    
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        message: 'Item removed from cart'
      }
    }));
  };

  const updateAddons = (id: string, addons: { qualityInspection: boolean; packageConsolidation: boolean }) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, addons } : item
    );
    saveCart(updatedItems);
  };

  const clearCart = () => {
    saveCart([]);
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        message: 'Cart cleared'
      }
    }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const serviceFee = cartItems.length * 1.5;
  const qualityInspectionFee = cartItems.reduce((sum, item) => 
    sum + (item.addons?.qualityInspection ? 6.99 * item.quantity : 0), 0
  );
  const consolidationFee = cartItems.some(item => item.addons?.packageConsolidation) ? 5.00 : 0;
  const estimatedTotal = subtotal + serviceFee + qualityInspectionFee + consolidationFee;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto">
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <ShoppingCartIcon className="h-6 w-6 mr-2 text-blue-600" />
              Shopping Cart ({cartItems.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-6 text-center">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-4">Add some products to get started!</p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 p-6">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 line-clamp-2 mb-1">{item.title}</h4>
                        {item.seller_name && (
                          <p className="text-sm text-gray-600 mb-2">{item.seller_name}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-bold text-blue-600">€{item.price.toFixed(2)}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-700">Quantity:</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-3 pt-3 border-t">
                      <h5 className="text-sm font-medium text-gray-700">Premium Services:</h5>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 text-green-600 mr-2" />
                          <div>
                            <span className="text-sm font-medium">Quality Inspection</span>
                            <p className="text-xs text-gray-500">Professional photos & detailed report</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">+€6.99</span>
                          <input
                            type="checkbox"
                            checked={item.addons?.qualityInspection || false}
                            onChange={(e) => updateAddons(item.id, {
                              ...item.addons,
                              qualityInspection: e.target.checked,
                              packageConsolidation: item.addons?.packageConsolidation || false
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 text-purple-600 mr-2" />
                          <div>
                            <span className="text-sm font-medium">Package Consolidation</span>
                            <p className="text-xs text-gray-500">Combine with other orders to save shipping</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600 mr-2">+€5.00</span>
                          <input
                            type="checkbox"
                            checked={item.addons?.packageConsolidation || false}
                            onChange={(e) => updateAddons(item.id, {
                              ...item.addons,
                              packageConsolidation: e.target.checked,
                              qualityInspection: item.addons?.qualityInspection || false
                            })}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 pt-3 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Item Total:</span>
                        <span className="font-bold text-gray-900">
                          €{(
                            item.price * item.quantity +
                            (item.addons?.qualityInspection ? 6.99 * item.quantity : 0)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-8 bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-medium">€{serviceFee.toFixed(2)}</span>
                  </div>
                  {qualityInspectionFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quality Inspection</span>
                      <span className="font-medium">€{qualityInspectionFee.toFixed(2)}</span>
                    </div>
                  )}
                  {consolidationFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package Consolidation</span>
                      <span className="font-medium">€{consolidationFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total</span>
                      <span className="text-blue-600">€{estimatedTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">+ shipping costs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t bg-gray-50">
              <div className="space-y-3">
                <button
                  onClick={() => onCheckout(cartItems)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Truck className="h-5 w-5 mr-2" />
                  Proceed to Checkout
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-3 w-3 mr-1" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-3 w-3 mr-1" />
                  <span>Worldwide Shipping</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Export cart management functions for use in other components
export const useShoppingCart = () => {
  const { user } = useAuth();

  const addToCart = (product: any, quantity: number = 1) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Please sign in to add items to cart'
        }
      }));
      return;
    }

    const cartItem: CartItem = {
      id: product.num_iid || product.id,
      title: product.title,
      price: parseFloat(product.price) || 0,
      quantity,
      image_url: product.pic_url || product.image_url,
      seller_name: product.nick || product.seller_name,
      weight: product.item_weight || 0.5,
      addons: {
        qualityInspection: false,
        packageConsolidation: false
      }
    };

    const savedCart = localStorage.getItem(`cart_${user.id}`);
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    const existingItemIndex = currentCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex >= 0) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push(cartItem);
    }

    localStorage.setItem(`cart_${user.id}`, JSON.stringify(currentCart));
    
    // Dispatch custom event to update cart count
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: currentCart }));
    
    // Show success message
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: `${product.title} added to cart!`
      }
    }));
  };

  const getCartCount = () => {
    if (!user) return 0;
    
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    const currentCart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    return currentCart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItems = (): CartItem[] => {
    if (!user) return [];
    
    const savedCart = localStorage.getItem(`cart_${user.id}`);
    return savedCart ? JSON.parse(savedCart) : [];
  };

  return { addToCart, getCartCount, getCartItems };
};