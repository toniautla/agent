import React, { useState } from 'react';
import { Package, Truck, Clock, CheckCircle, AlertCircle, Eye, Search, Filter, MessageSquare, RotateCcw, Download, DollarSign } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';
import SupportDesk from './SupportDesk';
import OrderTracking from './OrderTracking';
import SkeletonLoader from './SkeletonLoader';

export default function OrderManagement() {
  const { user, loading: authLoading } = useAuth();
  const { orders, loading, error, initialized } = useOrders();
  
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSupport, setShowSupport] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [selectedOrderForAction, setSelectedOrderForAction] = useState<any>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'purchased':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'warehouse':
        return <Package className="h-5 w-5 text-purple-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Purchase';
      case 'purchased':
        return 'Purchased - En Route to Warehouse';
      case 'warehouse':
        return 'At Warehouse - Ready to Ship';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'purchased':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warehouse':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = !searchQuery || 
      order.order_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.order_items?.some((item: any) => 
        item.products?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesStatus && matchesSearch;
  });

  const handleTrackOrder = (order: any) => {
    if (order.tracking_number) {
      setSelectedOrderForAction(order);
      setShowTracking(true);
    } else {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'info',
          message: 'Tracking number not available yet. We\'ll notify you when your order ships.'
        }
      }));
    }
  };

  const handleContactSupport = (order: any) => {
    setSelectedOrderForAction(order);
    setShowSupport(true);
  };

  const downloadInvoice = (order: any) => {
    const invoiceData = {
      orderNumber: order.order_number,
      date: new Date(order.created_at).toLocaleDateString(),
      total: order.total,
      items: order.order_items || []
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `invoice-${order.order_number}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Invoice downloaded successfully!'
      }
    }));
  };

  if (authLoading || (loading && !initialized)) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SkeletonLoader type="list" count={5} />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Management
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to view your orders
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Orders</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Management
            </h2>
            <p className="text-xl text-gray-600">
              Track your orders from purchase to delivery
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-yellow-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => ['pending', 'purchased', 'warehouse'].includes(o.status)).length}
              </p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
              <p className="text-sm text-gray-600">Delivered</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                €{orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Total Spent</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search orders or products..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="purchased">Purchased</option>
                    <option value="warehouse">At Warehouse</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchQuery || statusFilter !== 'all' ? 'No matching orders' : 'No orders yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Start shopping to see your orders here!'
                }
              </p>
              {(!searchQuery && statusFilter === 'all') && (
                <button
                  onClick={() => window.location.hash = 'search'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Start Shopping
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order {order.order_number}
                        </h3>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-2">{getStatusText(order.status)}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {order.order_items?.slice(0, 3).map((item: any, index: number) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={item.products?.image_url || 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=100'}
                              alt={item.products?.title}
                              className="w-12 h-12 rounded-lg object-cover border"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 text-sm truncate">{item.products?.title}</h4>
                              <p className="text-xs text-gray-500">Qty: {item.quantity} • €{item.unit_price}</p>
                            </div>
                          </div>
                        ))}
                        {order.order_items?.length > 3 && (
                          <div className="flex items-center justify-center text-sm text-gray-500">
                            +{order.order_items.length - 3} more items
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {order.tracking_number && (
                            <div>
                              <p className="text-sm text-gray-500">Tracking Number</p>
                              <p className="font-mono text-sm font-medium">{order.tracking_number}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500">Items</p>
                            <p className="font-medium">{order.order_items?.length || 0}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-2xl font-bold text-blue-600">€{order.total}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </button>
                      
                      {order.tracking_number && (
                        <button
                          onClick={() => handleTrackOrder(order)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Truck className="h-4 w-4 mr-2" />
                          Track Package
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleContactSupport(order)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Support
                      </button>
                      
                      <button
                        onClick={() => downloadInvoice(order)}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <SupportDesk
            isOpen={showSupport}
            onClose={() => setShowSupport(false)}
            orderId={selectedOrderForAction?.id}
          />

          <OrderTracking
            isOpen={showTracking}
            onClose={() => setShowTracking(false)}
            initialTrackingNumber={selectedOrderForAction?.tracking_number}
          />
        </div>
      </section>
    </>
  );
}