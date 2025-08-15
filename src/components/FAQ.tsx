import React, { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle, Search } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FAQ({ isOpen, onClose }: FAQProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How does Shipzobuy work?',
      answer: 'Shipzobuy is a professional agent service that helps you buy products from Chinese marketplaces like TaoBao and Weidian. We purchase items on your behalf, store them in our warehouse, and ship them to you worldwide.',
      category: 'general'
    },
    {
      id: '2',
      question: 'What are the service fees?',
      answer: 'We charge $1.50 per item service fee plus a $2.00 shipping surcharge. Optional services include quality inspection ($6.99-$12.99) and package consolidation ($5.00).',
      category: 'pricing'
    },
    {
      id: '3',
      question: 'How long does shipping take?',
      answer: 'Shipping times vary by method: Economy (15-25 days), Standard (7-14 days), Express (3-5 days), and Premium Express (1-3 days). Processing at our warehouse takes 1-3 business days.',
      category: 'shipping'
    },
    {
      id: '4',
      question: 'Can I track my order?',
      answer: 'Yes! You can track your order through every stage: from purchase to warehouse arrival, quality inspection, and international shipping. We provide tracking numbers and regular updates.',
      category: 'orders'
    },
    {
      id: '5',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express) through Stripe, as well as wallet balance top-ups. All payments are secure and encrypted.',
      category: 'payment'
    },
    {
      id: '6',
      question: 'Do you offer quality inspection?',
      answer: 'Yes! Our quality inspection service includes visual checks, authenticity verification, and detailed photo reports. Prices range from $6.99-$12.99 depending on the inspection level.',
      category: 'quality'
    },
    {
      id: '7',
      question: 'What is package consolidation?',
      answer: 'Package consolidation combines multiple orders into one shipment to save on shipping costs. You can save up to 60% on shipping fees. The service costs $5.00 plus professional repackaging.',
      category: 'shipping'
    },
    {
      id: '8',
      question: 'Can I return items?',
      answer: 'Returns are accepted within 30 days for items that are defective, not as described, or damaged. Items must be in original condition. Return shipping costs are customer responsibility.',
      category: 'returns'
    },
    {
      id: '9',
      question: 'How do I use my wallet balance?',
      answer: 'You can top up your wallet using credit cards and use the balance to pay for orders. Wallet payments are instant and secure. Minimum top-up is $5, maximum is $1,000.',
      category: 'payment'
    },
    {
      id: '10',
      question: 'What is the affiliate program?',
      answer: 'Our affiliate program lets you earn 5% commission on orders from people you refer. Share your unique link or code, and earn money when they make purchases. Minimum payout is $50.',
      category: 'affiliate'
    },
    {
      id: '11',
      question: 'Are there any prohibited items?',
      answer: 'Yes, we cannot ship weapons, illegal substances, counterfeit goods, hazardous materials, live animals, or adult content. Some items like electronics with batteries may have restrictions.',
      category: 'shipping'
    },
    {
      id: '12',
      question: 'How do I contact customer support?',
      answer: 'You can contact support through our built-in support desk, email (support@shipzobuy.com), or live chat. We provide 24/7 support and respond within 24 hours.',
      category: 'support'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'orders', label: 'Orders' },
    { id: 'payment', label: 'Payment' },
    { id: 'quality', label: 'Quality' },
    { id: 'returns', label: 'Returns' },
    { id: 'affiliate', label: 'Affiliate' },
    { id: 'support', label: 'Support' }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <HelpCircle className="h-6 w-6 mr-2 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search FAQ..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No questions found matching your search.</p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{item.question}</span>
                    {expandedItem === item.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedItem === item.id && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Contact Support */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Still have questions?</h3>
            <p className="text-blue-700 mb-4">Our support team is here to help you 24/7</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                Contact Support
              </button>
              <button className="border border-blue-300 text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-lg transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}