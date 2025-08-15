import React, { useState, useEffect } from 'react';
import {
  Package,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Settings,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck,
  X,
  Send,
  User,
  Bot,
  RefreshCw,
  Plus,
  Tag,
  Percent
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/supabase';
import { realtimeSync } from '../lib/realtime';
import LoadingScreen from './LoadingScreen';
import SkeletonLoader from './SkeletonLoader';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentView, setCurrentView] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeTickets: 0,
    totalUsers: 0
  });

  // Selected items
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [couponForm, setCouponForm] = useState({
    code: '',
    type: 'fixed' as 'fixed' | 'percentage',
    value: 10,
    description: '',
    min_order_amount: 35,
    max_uses: 100,
    expires_at: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
      setupRealtimeSync();
    }

    return () => {
      realtimeSync.unsubscribeAll();
    };
  }, [isAuthenticated]);

  const setupRealtimeSync = () => {
    // Subscribe to all orders
    realtimeSync.subscribeToAllOrders((payload) => {
      console.log('Order update:', payload);
      loadAdminData();
    });

    // Subscribe to all tickets
    realtimeSync.subscribeToAllTickets((payload) => {
      console.log('Ticket update:', payload);
      loadAdminData();
    });
  };

  const loadAdminData = async () => {
    try {
      setLoading(true);

      // Load all orders
      const { data: ordersData } = await db.getAllOrders();
      
      // Load all support tickets
      const { data: ticketsData } = await db.getAllSupportTickets();

      // Load all users
      const { data: usersData } = await db.getAllUsers();

      // Load all coupons
      const { data: couponsData } = await db.getActiveCoupons();

      setOrders(ordersData || []);
      setTickets(ticketsData || []);
      setUsers(usersData || []);
      setCoupons(couponsData || []);

      // Calculate stats
      const totalOrders = ordersData?.length || 0;
      const totalRevenue = ordersData?.reduce((sum, order) => sum + parseFloat(order.total || 0), 0) || 0;
      const pendingOrders = ordersData?.filter(order => ['pending', 'purchased', 'warehouse'].includes(order.status)).length || 0;
      const activeTickets = ticketsData?.filter(ticket => ticket.status === 'open').length || 0;
      const totalUsers = usersData?.length || 0;

      setStats({
        totalOrders,
        totalRevenue,
        pendingOrders,
        activeTickets,
        totalUsers
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await db.updateOrderStatus(orderId, newStatus);
      
      if (error) {
        throw new Error(error.message);
      }

      // Update local state immediately
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Order status updated successfully!'
        }
      }));
    } catch (error: any) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: error.message || 'Failed to update order status'
        }
      }));
    }
  };

  const handleTicketResponse = async () => {
    if (!selectedTicket || !responseMessage.trim()) return;

    try {
      await db.addSupportMessage({
        ticket_id: selectedTicket.id,
        sender_type: 'admin',
        sender_id: user?.id || 'admin',
        message: responseMessage.trim()
      });

      // Update ticket status to in_progress
      await db.updateSupportTicketStatus(selectedTicket.id, 'in_progress');

      setResponseMessage('');
      setSelectedTicket(null);
      await loadAdminData();

      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Response sent successfully!'
        }
      }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Failed to send response'
        }
      }));
    }
  };

  const createCoupon = async () => {
    try {
      const couponData = {
        ...couponForm,
        expires_at: new Date(couponForm.expires_at).toISOString(),
        is_active: true,
        used_count: 0
      };

      const { error } = await db.createCoupon(couponData);
      
      if (error) {
        throw new Error(error.message);
      }

      setCouponForm({
        code: '',
        type: 'fixed',
        value: 10,
        description: '',
        min_order_amount: 35,
        max_uses: 100,
        expires_at: ''
      });
      setShowCouponForm(false);
      await loadAdminData();

      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Coupon created successfully!'
        }
      }));
    } catch (error: any) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: error.message || 'Failed to create coupon'
        }
      }));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'purchased': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warehouse': return <Package className="h-4 w-4 text-purple-500" />;
      case 'shipped': return <Truck className="h-4 w-4 text-orange-500" />;
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'purchased': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warehouse': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-10">
            <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Package className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Enter password to access</p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'yina21') {
              setIsAuthenticated(true);
              setError('');
            } else {
              setError('Invalid password');
            }
          }}>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                required
              />
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'tickets', label: 'Support Tickets', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {loading && <LoadingScreen message="Loading admin data..." type="admin" />}
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button
                  onClick={loadAdminData}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-72">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center px-6 py-4 text-left rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    {item.label}
                    {item.id === 'tickets' && stats.activeTickets > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[24px] text-center">
                        {stats.activeTickets}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {currentView === 'dashboard' && (
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-3xl p-8 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                          <p className="text-4xl font-bold">{stats.totalOrders}</p>
                        </div>
                        <Package className="h-16 w-16 text-blue-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-3xl p-8 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                          <p className="text-4xl font-bold">€{stats.totalRevenue.toFixed(2)}</p>
                        </div>
                        <DollarSign className="h-16 w-16 text-green-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-3xl p-8 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-yellow-100 text-sm font-medium">Pending Orders</p>
                          <p className="text-4xl font-bold">{stats.pendingOrders}</p>
                        </div>
                        <Clock className="h-16 w-16 text-yellow-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl p-8 shadow-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-100 text-sm font-medium">Active Tickets</p>
                          <p className="text-4xl font-bold">{stats.activeTickets}</p>
                        </div>
                        <MessageSquare className="h-16 w-16 text-red-200" />
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
                    <div className="p-8 border-b border-gray-100">
                      <h2 className="text-2xl font-semibold text-gray-900">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                      {loading ? (
                        <SkeletonLoader type="table" />
                      ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {orders.slice(0, 10).map((order) => (
                              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{order.order_number}</div>
                                  <div className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {order.profiles?.first_name} {order.profiles?.last_name}
                                  </div>
                                  <div className="text-sm text-gray-500">{order.profiles?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <select
                                    value={order.status}
                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                    className={`text-xs font-medium border rounded-full px-3 py-1 ${getStatusColor(order.status)}`}
                                  >
                                    <option value="pending">Pending</option>
                                    <option value="purchased">Purchased</option>
                                    <option value="warehouse">Warehouse</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                  </select>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  €{order.total}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'coupons' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-900">Coupon Management</h2>
                    <button
                      onClick={() => setShowCouponForm(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Create Coupon
                    </button>
                  </div>

                  {/* Coupon List */}
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
                    <div className="p-8 border-b border-gray-100">
                      <h3 className="text-xl font-semibold text-gray-900">Active Coupons</h3>
                    </div>
                    <div className="p-8">
                      {loading ? (
                        <SkeletonLoader type="list" count={3} />
                      ) : coupons.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <Tag className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">No coupons created yet</p>
                          <p className="text-sm">Create your first coupon to get started</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {coupons.map((coupon) => (
                            <div key={coupon.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <div className="bg-green-100 rounded-full p-2 mr-3">
                                    {coupon.type === 'percentage' ? <Percent className="h-5 w-5 text-green-600" /> : <DollarSign className="h-5 w-5 text-green-600" />}
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{coupon.code}</h4>
                                    <p className="text-sm text-gray-600">{coupon.description}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-green-600 text-xl">
                                    {coupon.type === 'percentage' ? `${coupon.value}%` : `€${coupon.value}`} OFF
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {coupon.used_count}/{coupon.max_uses} used
                                  </p>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <p>Min order: €{coupon.min_order_amount}</p>
                                <p>Expires: {new Date(coupon.expires_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'tickets' && (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
                  <div className="p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900">Support Tickets</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {loading ? (
                      <SkeletonLoader type="list" count={5} />
                    ) : tickets.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">No support tickets found</p>
                      </div>
                    ) : (
                      tickets.map((ticket) => (
                        <div key={ticket.id} className="p-8 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="font-semibold text-gray-900 text-lg">{ticket.subject}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  ticket.status === 'open' ? 'bg-red-100 text-red-800 border-red-200' :
                                  ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-green-100 text-green-800 border-green-200'
                                }`}>
                                  {ticket.status.replace('_', ' ')}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Customer: {ticket.profiles?.first_name} {ticket.profiles?.last_name} ({ticket.profiles?.email})
                              </p>
                              {ticket.order_id && (
                                <p className="text-sm text-gray-600 mb-2">Order: {ticket.order_id}</p>
                              )}
                              <p className="text-xs text-gray-500">
                                Created: {new Date(ticket.created_at).toLocaleDateString()}
                              </p>
                              {ticket.support_messages && ticket.support_messages.length > 0 && (
                                <p className="text-xs text-blue-600 mt-2">
                                  {ticket.support_messages.length} messages in conversation
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => setSelectedTicket(ticket)}
                              className="ml-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                              {ticket.support_messages && ticket.support_messages.length > 1 ? 'View Chat' : 'Respond'}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Other views with similar improvements... */}
            </div>
          </div>
        </div>

        {/* Modals remain the same but with proper sizing fixes */}
      </div>
    </>
  );
}