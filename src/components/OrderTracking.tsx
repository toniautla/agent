import React, { useState, useEffect } from 'react';
import { Search, Package, X, Truck } from 'lucide-react';
import SkeletonLoader from './SkeletonLoader';

interface OrderTrackingProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrackingNumber?: string;
}

export default function OrderTracking({ isOpen, onClose, initialTrackingNumber = '' }: OrderTrackingProps) {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber);
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadTrackingWidget();
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialTrackingNumber) {
      setTrackingNumber(initialTrackingNumber);
    }
  }, [initialTrackingNumber]);

  const loadTrackingWidget = () => {
    setLoading(true);
    
    // Remove existing script if any
    const existingScript = document.getElementById('track123-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear existing widget
    const widgetContainer = document.getElementById('track123-tracking-widget');
    if (widgetContainer) {
      widgetContainer.innerHTML = '';
    }

    // Set up Track123 configuration
    (window as any).track123WidgetConfig = {
      api_base: "https://www.track123.com",
      provider_type: 3,
      language: "en_US",
      theme_color: "#3B82F6",
      width_type: "auto",
      width_value: ""
    };

    // Load Track123 widget script
    const script = document.createElement('script');
    script.id = 'track123-script';
    script.type = 'text/javascript';
    script.src = 'https://www.track123.com/track123-widget.min.js';
    script.onload = () => {
      setWidgetLoaded(true);
      setLoading(false);
    };
    script.onerror = () => {
      setLoading(false);
      console.error('Failed to load tracking widget');
    };
    
    document.head.appendChild(script);
  };

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Please enter a tracking number'
        }
      }));
      return;
    }

    // Update the widget with the tracking number
    const widgetContainer = document.getElementById('track123-tracking-widget');
    if (widgetContainer && (window as any).track123Widget) {
      (window as any).track123Widget.track(trackingNumber);
    } else {
      // Fallback: reload widget with tracking number
      loadTrackingWidget();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-4 mr-6">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Track Your Package</h2>
                <p className="text-gray-600 mt-1">Enter your tracking number to get real-time updates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Tracking Input */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tracking Number
            </label>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Truck className="absolute left-4 top-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., 1234567890)"
                  className="w-full pl-14 pr-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all shadow-sm"
                />
              </div>
              <button
                onClick={handleTrack}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg text-lg"
              >
                <Search className="h-6 w-6 mr-3" />
                Track
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Supports tracking numbers from DHL, FedEx, UPS, EMS, and other major carriers
            </p>
          </div>

          {/* Track123 Widget Container */}
          <div className="bg-gray-50 rounded-3xl p-8 min-h-[500px] border border-gray-200 shadow-inner">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
                  <p className="text-gray-600 text-lg">Loading tracking widget...</p>
                </div>
              </div>
            ) : (
              <div id="track123-tracking-widget" className="w-full min-h-[400px]">
                {!widgetLoaded && !loading && (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-lg">Enter a tracking number to get started</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 text-lg">Need Help?</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Tracking numbers are provided when your order ships</li>
              <li>• Updates may take 24-48 hours to appear</li>
              <li>• Contact support if you can't find your tracking number</li>
              <li>• Some carriers may have delayed updates during peak seasons</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}