import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface ContactUsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactUs({ isOpen, onClose }: ContactUsProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim(),
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save to localStorage as a support ticket
      if (user) {
        const tickets = JSON.parse(localStorage.getItem(`supportTickets_${user.id}`) || '[]');
        const newTicket = {
          id: `contact_${Date.now()}`,
          subject: formData.subject,
          status: 'open',
          priority: formData.priority,
          messages: [
            {
              id: `msg_${Date.now()}`,
              sender: 'user',
              message: formData.message,
              timestamp: new Date().toISOString()
            }
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        tickets.unshift(newTicket);
        localStorage.setItem(`supportTickets_${user.id}`, JSON.stringify(tickets));
      }

      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Message sent successfully! We\'ll respond within 24 hours.'
        }
      }));

      setFormData({
        name: user ? `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`.trim() : '',
        email: user?.email || '',
        subject: '',
        message: '',
        priority: 'medium'
      });

      onClose();
    } catch (error) {
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Failed to send message. Please try again.'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="h-6 w-6 mr-2 text-blue-600" />
              Contact Us
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={6}
                    placeholder="Please describe your question or issue in detail..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-gray-600">support@shipzobuy.com</p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone Support</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500">Monday-Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Live Chat</h4>
                    <p className="text-gray-600">Available 24/7</p>
                    <p className="text-sm text-gray-500">Instant support for urgent issues</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Address</h4>
                    <p className="text-gray-600">123 Business Street, Suite 100</p>
                    <p className="text-gray-600">New York, NY 10001, USA</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 rounded-full p-3 mr-4">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <div className="text-gray-600 text-sm space-y-1">
                      <p>Customer Support: 24/7</p>
                      <p>Order Processing: Mon-Fri 9AM-6PM CST</p>
                      <p>Warehouse: Mon-Sat 8AM-8PM CST</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="mt-8 bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Help</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
                    → How to place an order
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
                    → Shipping rates and times
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
                    → Return and refund policy
                  </button>
                  <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 py-1">
                    → Track your order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}