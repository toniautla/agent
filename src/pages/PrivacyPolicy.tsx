import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-gray-300">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Your Privacy Matters</h2>
            <p className="text-blue-800">
              At Shipzobuy, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-blue-600" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name, email address, and phone number</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Account preferences and settings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Order Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Products you search for and purchase</li>
              <li>Order history and transaction details</li>
              <li>Shipping preferences and delivery information</li>
              <li>Communication with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Technical Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address and browser information</li>
              <li>Device type and operating system</li>
              <li>Website usage patterns and preferences</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <UserCheck className="h-6 w-6 mr-2 text-green-600" />
              How We Use Your Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Service Delivery</h3>
                <ul className="text-sm space-y-1">
                  <li>• Process and fulfill your orders</li>
                  <li>• Communicate order status updates</li>
                  <li>• Provide customer support</li>
                  <li>• Handle returns and refunds</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Account Management</h3>
                <ul className="text-sm space-y-1">
                  <li>• Create and maintain your account</li>
                  <li>• Verify your identity</li>
                  <li>• Personalize your experience</li>
                  <li>• Send important notifications</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Business Operations</h3>
                <ul className="text-sm space-y-1">
                  <li>• Improve our services</li>
                  <li>• Analyze usage patterns</li>
                  <li>• Prevent fraud and abuse</li>
                  <li>• Comply with legal requirements</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Marketing (Optional)</h3>
                <ul className="text-sm space-y-1">
                  <li>• Send promotional offers</li>
                  <li>• Share product recommendations</li>
                  <li>• Notify about new features</li>
                  <li>• Conduct surveys and research</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-purple-600" />
              Information Sharing and Disclosure
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-2">We Never Sell Your Data</h3>
              <p className="text-yellow-800">
                We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">We May Share Information With:</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Service Providers:</strong> Shipping companies, payment processors (Stripe), and warehouse partners 
                who help us deliver our services
              </li>
              <li>
                <strong>Chinese Sellers:</strong> Product information and shipping details necessary to complete your purchases
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law, court order, or to protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of our business
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Technical Safeguards</h3>
                <ul className="text-sm space-y-2">
                  <li>• SSL encryption for all data transmission</li>
                  <li>• Secure cloud storage with encryption at rest</li>
                  <li>• Regular security audits and updates</li>
                  <li>• Access controls and authentication</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Operational Safeguards</h3>
                <ul className="text-sm space-y-2">
                  <li>• Employee training on data protection</li>
                  <li>• Limited access on a need-to-know basis</li>
                  <li>• Regular backup and disaster recovery</li>
                  <li>• Incident response procedures</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Access and Correction</h3>
                <p className="text-sm text-gray-600">
                  You can view and update your personal information in your account dashboard at any time.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Data Deletion</h3>
                <p className="text-sm text-gray-600">
                  You can request deletion of your account and personal data by contacting our support team.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Marketing Communications</h3>
                <p className="text-sm text-gray-600">
                  You can opt out of marketing emails by clicking the unsubscribe link or updating your preferences.
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Data Portability</h3>
                <p className="text-sm text-gray-600">
                  You can request a copy of your data in a machine-readable format.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="mb-4">
              As we operate internationally and work with Chinese suppliers, your information may be transferred to and 
              processed in countries other than your own. We ensure appropriate safeguards are in place to protect your 
              data during these transfers.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Data Transfer Safeguards</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Standard contractual clauses with partners</li>
                <li>• Adequacy decisions where applicable</li>
                <li>• Regular compliance monitoring</li>
                <li>• Data minimization practices</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve your experience, analyze usage, and provide personalized content.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p className="text-sm text-gray-600">Required for basic site functionality and security.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p className="text-sm text-gray-600">Help us understand how you use our website.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Marketing Cookies</h3>
                <p className="text-sm text-gray-600">Used to show relevant ads and measure effectiveness.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="mb-4">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you believe we have collected information from a child under 13, 
              please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="mb-4">
              We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of any material changes by email or through our website.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our data practices, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">General Inquiries</h3>
                <p className="text-sm">Email: privacy@shipzobuy.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Data Protection Officer</h3>
                <p className="text-sm">Email: dpo@shipzobuy.com</p>
                <p className="text-sm">Response time: 48 hours</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}