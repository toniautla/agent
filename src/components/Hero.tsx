import React from 'react';
import { ArrowRight, Shield, Globe, Clock, Star, Users, Package, Gift, Zap, DollarSign } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Welcome Bonus Banner */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full inline-flex items-center space-x-2 mb-4 animate-pulse">
            <Gift className="h-5 w-5" />
            <span className="font-bold">🎉 NEW USER BONUS: Get $10 FREE when you sign up!</span>
            <Gift className="h-5 w-5" />
          </div>
        </div>

        {/* Trust indicators */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-6 text-blue-200 text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>50,000+ Happy Customers</span>
            </div>
            <div className="flex items-center">
              <Package className="h-4 w-4 mr-1" />
              <span>1M+ Orders Delivered</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Your Gateway to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Chinese Markets
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Shop from TaoBao, Weidian, and other Chinese platforms with our professional agent service. 
            We handle purchasing, warehousing, and shipping to your doorstep with complete peace of mind.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => onNavigate('search')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center space-x-2 group transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('shipping')}
              className="border-2 border-blue-300 text-blue-100 hover:bg-blue-700 hover:border-blue-200 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Calculate Shipping
            </button>
          </div>

          {/* New User Incentive */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-12 border border-green-300">
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-green-300 mr-3" />
              <h3 className="text-2xl font-bold text-green-100">New Customer Special Offer!</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-center">
                <div className="bg-green-400 rounded-full p-2 mr-3">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <span className="text-green-100">$10 Welcome Bonus</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-400 rounded-full p-2 mr-3">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-green-100">Instant Account Credit</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-purple-400 rounded-full p-2 mr-3">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <span className="text-green-100">No Minimum Purchase</span>
              </div>
            </div>
          </div>

          {/* Value proposition */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto mb-12">
            <h3 className="text-xl font-semibold mb-4">Why Choose Shipzobuy?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center">
                <div className="bg-green-500 rounded-full p-2 mr-3">
                  <Shield className="h-4 w-4" />
                </div>
                <span>100% Secure & Insured</span>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-500 rounded-full p-2 mr-3">
                  <Globe className="h-4 w-4" />
                </div>
                <span>Ships to 200+ Countries</span>
              </div>
              <div className="flex items-center">
                <div className="bg-orange-500 rounded-full p-2 mr-3">
                  <Clock className="h-4 w-4" />
                </div>
                <span>Fast 3-7 Day Processing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="bg-blue-500 bg-opacity-20 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-110">
              <Shield className="h-10 w-10 text-blue-200" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Trusted</h3>
            <p className="text-blue-200 leading-relaxed">
              Professional service with secure payment processing, buyer protection, and full insurance coverage for your peace of mind.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="bg-blue-500 bg-opacity-20 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-110">
              <Globe className="h-10 w-10 text-blue-200" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Global Shipping</h3>
            <p className="text-blue-200 leading-relaxed">
              Multiple courier options with real-time tracking, competitive rates, and delivery to your door anywhere in the world.
            </p>
          </div>
          
          <div className="text-center group">
            <div className="bg-blue-500 bg-opacity-20 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-110">
              <Clock className="h-10 w-10 text-blue-200" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fast Processing</h3>
            <p className="text-blue-200 leading-relaxed">
              Quick order processing, quality inspection, and consolidation at our Chinese warehouse with photo updates.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}