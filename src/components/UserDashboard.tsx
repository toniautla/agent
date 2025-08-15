import React, { useState, useEffect } from 'react';
import { User, Package, CreditCard, Settings, Bell, MapPin, Wallet, Gift, MessageSquare, TrendingUp, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../hooks/useOrders';
import { useWallet } from './WalletSystem';
import AddressManager from './AddressManager';
import WalletSystem from './WalletSystem';
import SkeletonLoader from './SkeletonLoader';
import { db } from '../lib/supabase';

export default function UserDashboard() {
  const { user, profile, updateProfile } = useAuth();
  const { orders, loading: ordersLoading } = useOrders();
  const { getBalance } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWallet, setShowWallet] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [availableCoupons, setAvailableCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const initialProfileForm = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  };

  const [profileForm, setProfileForm] = useState(initialProfileForm);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'orders', label: 'Recent Orders', icon: Package },
    { id: 'wallet', label: 'Wallet & Coupons', icon: Wallet },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      setProfileForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Load wallet balance
      const balance = await getBalance();
      setWalletBalance(balance);

      // Load available coupons
      const { data: coupons } = await db.getActiveCoupons();
      setAvailableCoupons(coupons || []);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await updateProfile(profileForm);
    if (!error) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Profile updated successfully!'
        }
      }));
    } else {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Error updating profile: ' + error.message
        }
      }));
    }
  };

  if (!user) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="profile" />
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="profile" />
        </div>
      </section>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0);
  const pendingOrders = orders.filter(order => ['pending', 'purchased', 'warehouse'].includes(order.status)).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'purchased': return 'bg-blue-100 text-blue-800';
      case 'warehouse': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome back, {profile?.first_name || 'User'}!
            </h2>
            <p className="text-xl text-gray-600">
              Manage your account, orders, and preferences
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Orders</p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Spent</p>
                  <p className="text-3xl font-bold">€{totalSpent.toFixed(2)}</p>
                </div>
                <CreditCard className="h-12 w-12 text-green-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Wallet Balance</p>
                  <p className="text-3xl font-bold">€{walletBalance.toFixed(2)}</p>
                </div>
                <Wallet className="h-12 w-12 text-purple-200" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Active Coupons</p>
                  <p className="text-3xl font-bold">{availableCoupons.length}</p>
                </div>
                <Gift className="h-12 w-12 text-orange-200" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Welcome Message */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      🎉 Welcome to Shipzobuy!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your gateway to Chinese markets. Start shopping from TaoBao, Weidian, and more with our professional agent service.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => window.location.hash = 'search'}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Start Shopping
                      </button>
                      <button
                        onClick={() => setShowWallet(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Funds
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold mb-4">Recent Orders</h4>
                      {ordersLoading ? (
                        <SkeletonLoader type="list" count={3} />
                      ) : orders.slice(0, 3).length > 0 ? (
                        <div className="space-y-3">
                          {orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium">Order {order.order_number}</h4>
                                  <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">€{order.total}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No orders yet</p>
                          <button
                            onClick={() => window.location.hash = 'search'}
                            className="mt-2 text-blue-600 hover:text-blue-700"
                          >
                            Start shopping
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold mb-4">Available Coupons</h4>
                      {availableCoupons.length > 0 ? (
                        <div className="space-y-3">
                          {availableCoupons.slice(0, 3).map((coupon) => (
                            <div key={coupon.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">{coupon.code}</h4>
                                  <p className="text-sm text-gray-600">{coupon.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-green-600">
                                    {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `€${coupon.value} OFF`}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Expires: {new Date(coupon.expires_at).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Gift className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p>No coupons available</p>
                          <p className="text-sm">Check back later for special offers!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Order History</h3>
                    <button 
                      onClick={() => window.location.hash = 'orders'}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Orders
                    </button>
                  </div>
                  <div className="space-y-3">
                    {ordersLoading ? (
                      <SkeletonLoader type="list" count={5} />
                    ) : orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Order {order.order_number}</h4>
                            <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{order.order_items?.length || 0} items</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">€{order.total}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {orders.length === 0 && !ordersLoading && (
                      <div className="text-center py-8 text-gray-500">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No orders yet</p>
                        <button
                          onClick={() => window.location.hash = 'search'}
                          className="mt-2 text-blue-600 hover:text-blue-700"
                        >
                          Start shopping
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'wallet' && (
                <div className="space-y-6">
                  {/* Wallet Overview */}
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Wallet Balance</h3>
                        <p className="text-3xl font-bold">€{walletBalance.toFixed(2)}</p>
                      </div>
                      <Wallet className="h-12 w-12 text-purple-200" />
                    </div>
                    <button
                      onClick={() => setShowWallet(true)}
                      className="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Manage Wallet
                    </button>
                  </div>

                  {/* Available Coupons */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Available Coupons</h4>
                    {availableCoupons.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availableCoupons.map((coupon) => (
                          <div key={coupon.id} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{coupon.code}</h4>
                                <p className="text-sm text-gray-600">{coupon.description}</p>
                                {coupon.min_order_amount && (
                                  <p className="text-xs text-gray-500">Min order: €{coupon.min_order_amount}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-green-600">
                                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `€${coupon.value} OFF`}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Expires: {new Date(coupon.expires_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Gift className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No coupons available</p>
                        <p className="text-sm">Check back later for special offers!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <AddressManager />
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-500">Get notified when your order status changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive order updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">Promotional Offers</p>
                        <p className="text-sm text-gray-500">Receive special deals and coupon codes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={profileForm.first_name}
                            onChange={(e) => setProfileForm({...profileForm, first_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={profileForm.last_name}
                            onChange={(e) => setProfileForm({...profileForm, last_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                          disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-4">
                        <button 
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Save Changes
                        </button>
                        <button 
                          type="button"
                          onClick={() => setProfileForm({
                            first_name: profile?.first_name || '',
                            last_name: profile?.last_name || '',
                            email: profile?.email || '',
                            phone: profile?.phone || '',
                          })}
                          className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Account Security */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold mb-4">Account Security</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <p className="font-medium">Change Password</p>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <WalletSystem
        isOpen={showWallet}
        onClose={() => setShowWallet(false)}
      />
    </>
  );
}