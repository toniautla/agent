import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      articles: [
        {
          title: 'How to create an account',
          content: 'To create an account, click the "Sign In" button in the top right corner, then select "Sign up". Fill in your email, password, and personal information. You\'ll receive a verification email to activate your account.'
        },
        {
          title: 'How to search for products',
          content: 'You can search for products in three ways: 1) Text search - type keywords in English or Chinese, 2) Image search - upload a photo to find similar items, 3) Link import - paste direct links from TaoBao, Weidian, or TMall.'
        },
        {
          title: 'Understanding service fees',
          content: 'We charge a $1.50 service fee per item plus shipping costs. This covers purchasing the item on your behalf, handling, quality inspection, and warehouse storage for up to 30 days.'
        }
      ]
    },
    {
      id: 'ordering',
      title: 'Placing Orders',
      icon: '🛒',
      articles: [
        {
          title: 'How to place an order',
          content: 'Add items to your cart, review your selection, proceed to checkout, add your shipping address, choose a shipping method, and complete payment. We\'ll purchase the items and notify you when they arrive at our warehouse.'
        },
        {
          title: 'Payment methods accepted',
          content: 'We accept all major credit cards (Visa, MasterCard, American Express) and debit cards through our secure Stripe payment processor. All transactions are encrypted and secure.'
        },
        {
          title: 'Order modifications and cancellations',
          content: 'Orders can be modified or cancelled within 2 hours of placement. After this time, we may have already purchased the items. Contact support immediately if you need to make changes.'
        }
      ]
    },
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      icon: '📦',
      articles: [
        {
          title: 'Shipping options and costs',
          content: 'We offer multiple shipping options: Economy (15-25 days, $12.99+), Standard (7-14 days, $24.99+), Express (3-5 days, $45.99+), and Premium Express (1-3 days, $89.99+). Costs vary by weight and destination.'
        },
        {
          title: 'Package consolidation',
          content: 'Save up to 60% on shipping by consolidating multiple orders into one shipment. Items are professionally repackaged at our warehouse. Consolidation service costs $5.00 plus packaging materials.'
        },
        {
          title: 'Tracking your shipment',
          content: 'Once shipped, you\'ll receive a tracking number via email. Track your package through our website or directly with the carrier. Updates are provided at each checkpoint until delivery.'
        },
        {
          title: 'Customs and duties',
          content: 'Customs duties and taxes may apply depending on your country\'s regulations and the value of your shipment. These fees are the responsibility of the recipient and are not included in our shipping costs.'
        }
      ]
    },
    {
      id: 'quality',
      title: 'Quality & Inspection',
      icon: '🔍',
      articles: [
        {
          title: 'Quality inspection service',
          content: 'Our quality inspection service ($3.99-$12.99) includes checking for defects, verifying authenticity, confirming specifications, and providing detailed photo reports. Recommended for expensive or branded items.'
        },
        {
          title: 'What if I receive a defective item?',
          content: 'If you receive a defective item, contact us within 7 days with photos. We\'ll work with the seller for a replacement or refund. Items damaged during shipping are covered by our insurance.'
        },
        {
          title: 'Authenticity guarantee',
          content: 'While we inspect items for obvious signs of counterfeiting, we cannot guarantee authenticity of branded items from third-party sellers. Consider our premium inspection service for high-value branded goods.'
        }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: '👤',
      articles: [
        {
          title: 'Managing your addresses',
          content: 'Add, edit, or delete shipping addresses in your dashboard. You can set a default address and add multiple addresses for different locations. Ensure addresses are complete and accurate to avoid delivery issues.'
        },
        {
          title: 'Order history and tracking',
          content: 'View all your orders in the dashboard with real-time status updates. Download invoices, track shipments, and view detailed order information including photos from our warehouse.'
        },
        {
          title: 'Account security',
          content: 'Keep your account secure by using a strong password and enabling email notifications. Never share your login credentials. Contact support immediately if you suspect unauthorized access.'
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: '🔧',
      articles: [
        {
          title: 'Common website issues',
          content: 'If you experience loading issues, try clearing your browser cache, disabling ad blockers, or using a different browser. For persistent issues, contact our technical support team.'
        },
        {
          title: 'Payment problems',
          content: 'Payment failures can occur due to insufficient funds, card restrictions, or bank security measures. Ensure your card supports international transactions and contact your bank if needed.'
        },
        {
          title: 'Missing or delayed orders',
          content: 'If your order seems delayed, check the status in your dashboard. Chinese holidays, seller delays, or customs processing can affect timelines. Contact support if an order is significantly overdue.'
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-blue-100 mb-8">
            Find answers to common questions and get the help you need
          </p>
          
          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm border">
                <button
                  onClick={() => setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                    <span className="ml-3 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                      {category.articles.length}
                    </span>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {expandedCategory === category.id && (
                  <div className="border-t">
                    {category.articles.map((article, index) => (
                      <div key={index} className="px-6 py-4 border-b last:border-b-0">
                        <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{article.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still need help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">Chat with our support team in real-time</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Start Chat
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">Get detailed help via email</p>
              <a
                href="mailto:support@shipzobuy.com"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
              >
                Send Email
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">Speak directly with our team</p>
              <a
                href="tel:+1-555-123-4567"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors inline-block"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}