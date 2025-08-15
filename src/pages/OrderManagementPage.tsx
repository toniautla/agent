import React from 'react';
import { Package, Truck, Clock, CheckCircle, AlertTriangle, BarChart3, DollarSign } from 'lucide-react';

export default function OrderManagementPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-16 w-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Order Management
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-green-100">
              Track, manage, and monitor all your orders from Chinese marketplaces in one centralized dashboard with real-time updates.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Order Control
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Manage every aspect of your orders from placement to delivery with our comprehensive order management system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor your orders in real-time from purchase to delivery with detailed status updates and estimated delivery times.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Order Status Updates</h3>
              <p className="text-gray-600">
                Get instant notifications when your order status changes, from purchase confirmation to warehouse arrival and shipping.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Package Consolidation</h3>
              <p className="text-gray-600">
                Combine multiple orders into single shipments to save on shipping costs and reduce delivery times.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Shipping Management</h3>
              <p className="text-gray-600">
                Choose from multiple shipping options, calculate costs, and track packages with detailed logistics information.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Issue Resolution</h3>
              <p className="text-gray-600">
                Quick resolution for order issues, returns, and refunds with dedicated support and automated problem detection.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Order Analytics</h3>
              <p className="text-gray-600">
                Detailed insights into your ordering patterns, spending history, and delivery performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Lifecycle */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Order Lifecycle Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow your orders through every stage of the fulfillment process with complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Pending</h3>
              <p className="text-sm text-gray-600">Order placed, awaiting purchase from seller</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Purchased</h3>
              <p className="text-sm text-gray-600">Item bought from seller, en route to warehouse</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Warehouse</h3>
              <p className="text-sm text-gray-600">Arrived at warehouse, ready for consolidation</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Shipped</h3>
              <p className="text-sm text-gray-600">Package shipped to your address</p>
            </div>

            <div className="text-center">
              <div className="bg-green-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Delivered</h3>
              <p className="text-sm text-gray-600">Successfully delivered to your door</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Order Management?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Complete Transparency</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Real-time order status updates with detailed tracking information</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Photo updates when items arrive at our warehouse</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Detailed shipping information with carrier tracking numbers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Automated notifications via email and SMS</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Order Success Rate</h4>
                <p className="text-4xl font-bold text-green-600 mb-2">99.8%</p>
                <p className="text-gray-600">of orders delivered successfully</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Control of Your Orders Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
            Experience seamless order management with complete visibility and control over your Chinese marketplace purchases.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Start Managing Orders
          </button>
        </div>
      </section>
    </div>
  );
}