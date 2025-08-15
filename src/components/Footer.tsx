import React from 'react';
import { ShoppingCart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Users, MessageSquare, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Fallback for direct navigation
      window.location.href = `/#${page}`;
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">Shipzobuy</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for shopping from Chinese marketplaces. We make international shopping simple and secure.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavigation('product-search')} className="hover:text-white transition-colors">Product Search</button></li>
              <li><button onClick={() => handleNavigation('order-management')} className="hover:text-white transition-colors">Order Management</button></li>
              <li><button onClick={() => handleNavigation('shipping-calculator')} className="hover:text-white transition-colors">Shipping Calculator</button></li>
              <li><button onClick={() => handleNavigation('package-consolidation')} className="hover:text-white transition-colors">Package Consolidation</button></li>
              <li><button onClick={() => handleNavigation('quality-inspection')} className="hover:text-white transition-colors">Quality Inspection</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavigation('help-center')} className="hover:text-white transition-colors">Help Center</button></li>
              <li><button onClick={() => handleNavigation('faq')} className="hover:text-white transition-colors flex items-center">
                <HelpCircle className="h-4 w-4 mr-1" />
                FAQ
              </button></li>
              <li><button onClick={() => handleNavigation('contact')} className="hover:text-white transition-colors flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                Contact Us
              </button></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><button onClick={() => handleNavigation('affiliate')} className="hover:text-white transition-colors flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Affiliate Program
              </button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => handleNavigation('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleNavigation('terms-of-service')} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => handleNavigation('shipping-policy')} className="hover:text-white transition-colors">Shipping Policy</button></li>
              <li><button onClick={() => handleNavigation('refund-policy')} className="hover:text-white transition-colors">Refund Policy</button></li>
              <li><button onClick={() => handleNavigation('responsibility-disclaimer')} className="hover:text-white transition-colors">Responsibility & Disclaimer</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>support@shipzobuy.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>123 Business St, Suite 100<br />New York, NY 10001</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Business Hours</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <div className="flex justify-between">
                  <span>Customer Support:</span>
                  <span>24/7 Available</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Processing:</span>
                  <span>Mon-Fri 9AM-6PM CST</span>
                </div>
                <div className="flex justify-between">
                  <span>Warehouse Operations:</span>
                  <span>Mon-Sat 8AM-8PM CST</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-800">
            <p>&copy; 2024 Shipzobuy. All rights reserved. | Professional Chinese marketplace agent service.</p>
            <p className="text-sm mt-2">🎉 New customers get €10 welcome bonus! Start shopping today!</p>
          </div>
        </div>
      </div>
    </footer>
  );
}