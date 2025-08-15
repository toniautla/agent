import React from 'react';
import { Search, Zap, Globe, Shield, Clock, Target } from 'lucide-react';

export default function ProductSearchPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Search className="h-16 w-16 mx-auto mb-6 text-blue-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Advanced Product Search
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Find exactly what you're looking for across millions of products from TaoBao, Weidian, and TMall with our intelligent search technology.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Search Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our advanced search engine makes finding products from Chinese marketplaces effortless and precise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Text Search</h3>
              <p className="text-gray-600">
                Search by keywords, product names, or descriptions in multiple languages. Our AI understands context and finds relevant results.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Image Search</h3>
              <p className="text-gray-600">
                Upload any image and find similar or identical products. Perfect for finding specific items when you don't know the exact name.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Link Import</h3>
              <p className="text-gray-600">
                Paste direct links from TaoBao, Weidian, or TMall and we'll import the product details automatically for easy ordering.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Results</h3>
              <p className="text-gray-600">
                Get instant search results with live pricing, availability, and seller information updated in real-time.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Sellers</h3>
              <p className="text-gray-600">
                All search results include seller verification status, ratings, and reviews to help you make informed decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search History</h3>
              <p className="text-gray-600">
                Keep track of your searches and easily revisit products you've looked at before with our search history feature.
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
              How Product Search Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our intelligent search process ensures you find exactly what you need quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Enter Your Search</h3>
              <p className="text-gray-600">
                Type keywords, upload an image, or paste a product link from any Chinese marketplace.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Processing</h3>
              <p className="text-gray-600">
                Our AI analyzes your search across multiple platforms and filters results by relevance, price, and quality.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Results</h3>
              <p className="text-gray-600">
                Browse curated results with detailed product information, pricing, and one-click ordering through our service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Product?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Start searching millions of products from Chinese marketplaces with our advanced search tools.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Start Searching Now
          </button>
        </div>
      </section>
    </div>
  );
}