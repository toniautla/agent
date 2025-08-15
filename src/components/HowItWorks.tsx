import React from 'react';
import { Search, ShoppingCart, Package, Truck, CheckCircle, Star } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Search & Find',
      description: 'Search by keywords, upload images, or paste TaoBao/Weidian links to find products',
      details: 'Our AI-powered search helps you find exactly what you need across millions of products',
    },
    {
      icon: ShoppingCart,
      title: 'Place Order',
      description: 'Add items to cart and pay securely. We purchase from the seller on your behalf',
      details: 'Secure payment processing with buyer protection and order confirmation',
    },
    {
      icon: Package,
      title: 'Quality Check & Consolidate',
      description: 'Items arrive at our warehouse where they are inspected and can be consolidated',
      details: 'Professional quality inspection with photos and optional consolidation to save shipping costs',
    },
    {
      icon: Truck,
      title: 'Ship Worldwide',
      description: 'Choose from multiple shipping options and track your package to your door',
      details: 'Fast, reliable shipping with real-time tracking and insurance coverage',
    },
  ];

  const features = [
    { icon: CheckCircle, text: 'Quality Inspection with Photos' },
    { icon: Package, text: 'Package Consolidation Available' },
    { icon: Star, text: '99.8% Successful Delivery Rate' },
    { icon: Truck, text: 'Multiple Shipping Options' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our simple 4-step process makes shopping from China effortless and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="bg-blue-600 group-hover:bg-blue-700 text-white rounded-full p-6 w-20 h-20 mx-auto flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-2">{step.description}</p>
              <p className="text-sm text-gray-500">{step.details}</p>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <feature.icon className="h-5 w-5 text-green-600" />
                </div>
                <span className="font-medium text-gray-900">{feature.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">What is an Agent Service?</h3>
          <p className="text-blue-100 max-w-4xl mx-auto text-lg leading-relaxed mb-6">
            An agent service acts as your personal buyer in China. Many Chinese platforms like TaoBao and Weidian 
            don't ship internationally or accept foreign payment methods. We bridge this gap by purchasing items 
            on your behalf, consolidating them in our warehouse, and shipping them to you with full tracking and 
            insurance.
          </p>
          <div className="bg-blue-500 bg-opacity-50 rounded-lg p-4 max-w-2xl mx-auto">
            <h4 className="font-semibold mb-2">Our Service Fees:</h4>
            <div className="text-sm space-y-1">
              <p>• $1.50 per item service fee</p>
              <p>• $2.00 shipping surcharge</p>
              <p>• Optional quality inspection from $3.99</p>
              <p>• Free 30-day warehouse storage</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}