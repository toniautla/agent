import React from 'react';
import { ShoppingCart, Package, Truck, CheckCircle, Sparkles, Wallet, CreditCard } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  type?: 'default' | 'auth' | 'order' | 'payment' | 'wallet' | 'admin';
}

export default function LoadingScreen({ message = 'Loading...', type = 'default' }: LoadingScreenProps) {
  const getLoadingAnimation = () => {
    switch (type) {
      case 'auth':
        return (
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>
          </div>
        );
      case 'order':
        return (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            <Package className="h-8 w-8 text-blue-600 ml-4 animate-pulse" />
          </div>
        );
      case 'payment':
        return (
          <div className="relative">
            <div className="w-20 h-20 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-green-600 animate-pulse" />
            </div>
          </div>
        );
      case 'wallet':
        return (
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Wallet className="h-8 w-8 text-purple-600 animate-pulse" />
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping"></div>
            <div className="w-4 h-4 bg-green-600 rounded-full animate-ping" style={{ animationDelay: '200ms' }}></div>
            <div className="w-4 h-4 bg-purple-600 rounded-full animate-ping" style={{ animationDelay: '400ms' }}></div>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-blue-600 animate-bounce" />
            <Truck className="h-8 w-8 text-blue-600 animate-bounce" style={{ animationDelay: '200ms' }} />
            <CheckCircle className="h-8 w-8 text-green-600 animate-bounce" style={{ animationDelay: '400ms' }} />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center max-w-sm mx-auto px-6">
        <div className="mb-8 flex justify-center">
          {getLoadingAnimation()}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{message}</h3>
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full animate-pulse bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">Please wait...</p>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}