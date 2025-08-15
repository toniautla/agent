import React from 'react';
import { Package, Layers, DollarSign, Clock, Shield, Truck } from 'lucide-react';

export default function PackageConsolidationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Layers className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Package Consolidation
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-purple-100">
              Save money and reduce shipping times by combining multiple orders into single shipments. Our smart consolidation service optimizes your packages for maximum savings.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Consolidate Your Packages?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Package consolidation offers significant advantages for international shipping from Chinese marketplaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Significant Cost Savings</h3>
              <p className="text-gray-600">
                Save up to 60% on shipping costs by combining multiple orders into single shipments instead of shipping individually.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Faster Delivery</h3>
              <p className="text-gray-600">
                Reduce overall delivery time by shipping all items together instead of waiting for multiple separate deliveries.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Better Protection</h3>
              <p className="text-gray-600">
                Professional repackaging ensures better protection for fragile items and reduces the risk of damage during transit.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Space Optimization</h3>
              <p className="text-gray-600">
                Expert packaging techniques maximize space utilization and minimize dimensional weight charges.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Simplified Tracking</h3>
              <p className="text-gray-600">
                Track all your items with a single tracking number instead of managing multiple shipments.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Packaging</h3>
              <p className="text-gray-600">
                Choose from various packaging options including gift wrapping, bubble wrap, and custom boxes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Consolidation Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined consolidation process ensures your packages are combined efficiently and shipped safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Items Arrive</h3>
              <p className="text-gray-600">
                Your orders from different sellers arrive at our Chinese warehouse facility.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Check</h3>
              <p className="text-gray-600">
                We inspect all items for quality, completeness, and any potential shipping issues.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Repackaging</h3>
              <p className="text-gray-600">
                Items are professionally repackaged using optimal materials and space-saving techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ship Out</h3>
              <p className="text-gray-600">
                Your consolidated package is shipped using your preferred carrier and service level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Potential Savings Example
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how much you could save by consolidating your orders instead of shipping separately.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-red-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-6 text-center">Shipping Separately</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Order 1 (0.5kg) - Shoes</span>
                  <span className="font-semibold text-red-600">$24.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Order 2 (0.3kg) - T-shirt</span>
                  <span className="font-semibold text-red-600">$24.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Order 3 (0.8kg) - Electronics</span>
                  <span className="font-semibold text-red-600">$29.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Order 4 (0.2kg) - Accessories</span>
                  <span className="font-semibold text-red-600">$24.99</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-red-800">Total Shipping Cost:</span>
                  <span className="text-red-600">$104.96</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-6 text-center">Consolidated Shipping</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Combined Weight: 1.8kg</span>
                  <span className="text-gray-600">All items</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Base Shipping Rate</span>
                  <span className="font-semibold">$24.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Additional Weight (0.8kg)</span>
                  <span className="font-semibold">$4.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Consolidation Service</span>
                  <span className="font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Professional Packaging</span>
                  <span className="font-semibold">$3.00</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-green-800">Total Shipping Cost:</span>
                  <span className="text-green-600">$36.99</span>
                </div>
                <div className="text-center mt-4">
                  <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                    Save $67.97 (65%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Consolidation Services Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-4 mt-1">
                  <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Repackaging</h3>
                  <p className="text-gray-600">Expert packaging using high-quality materials to ensure safe delivery.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Quality Inspection</h3>
                  <p className="text-gray-600">Thorough inspection of all items before consolidation and shipping.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Free Storage (30 days)</h3>
                  <p className="text-gray-600">Store your items at our warehouse for up to 30 days at no extra cost.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                  <Layers className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Photo Documentation</h3>
                  <p className="text-gray-600">Receive photos of your items before and after consolidation.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-2 mr-4 mt-1">
                  <Truck className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Flexible Shipping Options</h3>
                  <p className="text-gray-600">Choose from multiple carriers and service levels for your consolidated package.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 rounded-full p-2 mr-4 mt-1">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Processing</h3>
                  <p className="text-gray-600">Quick consolidation and shipping within 1-2 business days of request.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Saving with Package Consolidation
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-purple-100">
            Reduce your shipping costs by up to 65% and get your items faster with our professional consolidation service.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Consolidate My Orders
          </button>
        </div>
      </section>
    </div>
  );
}