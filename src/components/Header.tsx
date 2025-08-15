import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingCart as CartIcon,
  User,
  Menu,
  X,
  LogOut,
  AlertCircle,
  Mail,
  Gift,
  HelpCircle,
  Wallet,
  MessageSquare,
  Package,
  Heart,
  Bell,
} from 'lucide-react';

import { useShoppingCart } from './ShoppingCart';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from './WalletSystem';
import { useWishlist } from './WishlistSystem';
import AuthModal from './AuthModal';
import ShoppingCartPanel from './ShoppingCart';
import CheckoutModal from './CheckoutModal';
import WalletSystem from './WalletSystem';
import WishlistSystem from './WishlistSystem';
import PriceAlerts from './PriceAlerts';
import SupportDesk from './SupportDesk';
import OrderTracking from './OrderTracking';
import SkeletonLoader from './SkeletonLoader';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export default function Header({ onNavigate, currentSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isPriceAlertsOpen, setIsPriceAlertsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);

  const {
    user,
    profile,
    signOut,
    loading,
    error,
  } = useAuth();

  const { getCartCount } = useShoppingCart();
  const { getBalance } = useWallet();
  const { getWishlistCount } = useWishlist();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'orders', label: 'Orders' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  useEffect(() => {
    const updateCounts = async () => {
      setCartCount(getCartCount());
      setWishlistCount(getWishlistCount());
      if (user) {
        const balance = await getBalance();
        setWalletBalance(balance);
      }
    };

    updateCounts();

    const handleCartUpdate = () => updateCounts();
    const handleWishlistUpdate = () => updateCounts();
    const handleWalletUpdate = () => updateCounts();

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('wishlistUpdated', handleWishlistUpdate);
    window.addEventListener('walletUpdated', handleWalletUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
      window.removeEventListener('walletUpdated', handleWalletUpdate);
    };
  }, [user, getCartCount, getWishlistCount, getBalance]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setIsUserMenuOpen(false);
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleUserMenuClick = (action: string) => {
    setIsUserMenuOpen(false);
    if (action === 'signout') {
      handleSignOut();
    } else {
      onNavigate(action);
    }
  };

  const handleCartCheckout = (items: any[]) => {
    setCartItems(items);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
      window.dispatchEvent(new CustomEvent('cartUpdated', { detail: [] }));
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        {/* Welcome Bonus Banner */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm font-medium">
              🎉 New users get €10 welcome bonus! Sign up now and start shopping with free credit!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <CartIcon className="h-8 w-8" />
                <span>Shipzobuy</span>
              </button>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentSection === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsTrackingOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                title="Track Order"
              >
                <Package className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsPriceAlertsOpen(true)}
                className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                title="Price Alerts"
              >
                <Bell className="h-5 w-5" />
              </button>

              {user && (
                <>
                  <button
                    onClick={() => setIsSupportOpen(true)}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    title="Support"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setIsWalletOpen(true)}
                    className="flex items-center p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                    title="Wallet"
                  >
                    <Wallet className="h-5 w-5" />
                    <span className="ml-1 text-sm font-medium">€{walletBalance.toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => setIsWishlistOpen(true)}
                    className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-md transition-colors relative"
                    title="Wishlist"
                  >
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors relative"
              >
                <CartIcon className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {loading ? (
                <div className="w-20 h-8">
                  <SkeletonLoader />
                </div>
              ) : (
                <>
                  {user ? (
                    <div className="relative" ref={userMenuRef}>
                      <button
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center space-x-2 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <User className="h-5 w-5" />
                        <span className="text-sm font-medium">
                          {profile?.first_name || user.email?.split('@')[0] || 'User'}
                        </span>
                      </button>

                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <button
                              onClick={() => handleUserMenuClick('dashboard')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <User className="h-4 w-4 inline mr-2" />
                              Dashboard
                            </button>
                            <button
                              onClick={() => handleUserMenuClick('orders')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <CartIcon className="h-4 w-4 inline mr-2" />
                              Orders
                            </button>
                            <button
                              onClick={() => setIsWalletOpen(true)}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <Wallet className="h-4 w-4 inline mr-2" />
                              Wallet (€{walletBalance.toFixed(2)})
                            </button>
                            <hr className="my-1" />
                            <button
                              onClick={() => handleUserMenuClick('signout')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <LogOut className="h-4 w-4 inline mr-2" />
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                    >
                      Sign In
                    </button>
                  )}
                </>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-3 py-2 rounded-md text-left text-sm font-medium transition-colors ${
                      currentSection === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {!loading && (
                  <>
                    {user ? (
                      <>
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            onNavigate('dashboard');
                            setIsMenuOpen(false);
                          }}
                          className="px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                          <User className="h-4 w-4 inline mr-2" />
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setIsCartOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                          <CartIcon className="h-4 w-4 inline mr-2" />
                          Cart ({cartCount})
                        </button>
                        <button
                          onClick={() => {
                            setIsWalletOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                          <Wallet className="h-4 w-4 inline mr-2" />
                          Wallet (€{walletBalance.toFixed(2)})
                        </button>
                        <button
                          onClick={() => {
                            handleSignOut();
                            setIsMenuOpen(false);
                          }}
                          className="px-3 py-2 rounded-md text-left text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4 inline mr-2" />
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <hr className="my-2" />
                        <button
                          onClick={() => {
                            setIsAuthModalOpen(true);
                            setIsMenuOpen(false);
                          }}
                          className="px-3 py-2 rounded-md text-left text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          Sign In
                        </button>
                      </>
                    )}
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <ShoppingCartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCartCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onSuccess={handleCheckoutSuccess}
      />

      <WalletSystem
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
      />

      <WishlistSystem
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />

      <PriceAlerts
        isOpen={isPriceAlertsOpen}
        onClose={() => setIsPriceAlertsOpen(false)}
      />

      <SupportDesk
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      <OrderTracking
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
      />
    </>
  );
}