import React from 'react';
import { FileText, AlertTriangle, Shield, CreditCard } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <FileText className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-gray-300">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-yellow-900 mb-2">Important Notice</h2>
                <p className="text-yellow-800">
                  By using Shipzobuy's services, you agree to these terms. Please read them carefully before placing any orders.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Service Overview</h2>
            <p className="mb-4">
              Shipzobuy operates as an agent service that helps international customers purchase products from Chinese 
              marketplaces including TaoBao, Weidian, and TMall. We act as an intermediary between you and Chinese sellers.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Our Services Include:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Product search and sourcing assistance</li>
                <li>• Purchasing products on your behalf</li>
                <li>• Warehouse storage and consolidation</li>
                <li>• Quality inspection services</li>
                <li>• International shipping and logistics</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Registration</h2>
            <p className="mb-4">
              To use our services, you must create an account and provide accurate, complete information. You are responsible 
              for maintaining the confidentiality of your account credentials.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">Account Requirements:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old</li>
              <li>Provide valid email address and contact information</li>
              <li>Verify your email address before placing orders</li>
              <li>Maintain accurate shipping address information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-green-600" />
              3. Pricing and Payment
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Service Fees</h3>
                <ul className="text-sm space-y-2">
                  <li>• $1.50 per item service fee</li>
                  <li>• $2.00 shipping surcharge</li>
                  <li>• Quality inspection: $3.99-$12.99</li>
                  <li>• Package consolidation: $5.00</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Payment Terms</h3>
                <ul className="text-sm space-y-2">
                  <li>• Payment required before purchase</li>
                  <li>• All major credit cards accepted</li>
                  <li>• Secure processing via Stripe</li>
                  <li>• No refunds for service fees</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-2">Important Payment Notes</h3>
              <ul className="text-sm text-red-800 space-y-1">
                <li>• Prices shown are estimates and may vary</li>
                <li>• Exchange rates fluctuate daily</li>
                <li>• Additional costs may apply for special requests</li>
                <li>• Customs duties are customer responsibility</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Order Process and Fulfillment</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Order Placement</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Orders can be modified or cancelled within 2 hours of placement</li>
                  <li>We will attempt to purchase items within 24-48 hours</li>
                  <li>Product availability is not guaranteed</li>
                  <li>Prices may change between order placement and purchase</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Warehouse Processing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Free storage for up to 30 days</li>
                  <li>Items will be inspected upon arrival</li>
                  <li>Consolidation available for multiple orders</li>
                  <li>Photos provided before shipping (if requested)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Shipping</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Multiple shipping options available</li>
                  <li>Delivery times are estimates only</li>
                  <li>Tracking information provided when available</li>
                  <li>Insurance available for valuable items</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-600" />
              5. Limitations and Disclaimers
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-3">Product Authenticity</h3>
              <p className="text-yellow-800 text-sm">
                We cannot guarantee the authenticity of branded products purchased from third-party sellers. 
                Our quality inspection service can help identify obvious counterfeits, but we are not liable 
                for authenticity issues.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">Service Limitations:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>We are not responsible for seller delays or cancellations</li>
              <li>Product descriptions and images are provided by sellers</li>
              <li>We cannot guarantee product quality or specifications</li>
              <li>Some products may be restricted for international shipping</li>
              <li>Customs regulations may prevent delivery of certain items</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">Eligible for Refund</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Items not as described</li>
                  <li>• Defective or damaged products</li>
                  <li>• Seller cancellation or unavailability</li>
                  <li>• Our service errors</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3">Not Eligible for Refund</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Change of mind after purchase</li>
                  <li>• Size or color preferences</li>
                  <li>• Service fees and shipping costs</li>
                  <li>• Items damaged by customs</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Refund Process</h3>
              <p className="text-sm text-blue-800">
                Refund requests must be submitted within 7 days of delivery. Approved refunds will be processed 
                within 5-10 business days to the original payment method, minus any non-refundable fees.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Items</h2>
            <p className="mb-4">
              Certain items cannot be purchased or shipped through our service due to legal restrictions, 
              safety concerns, or shipping regulations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Prohibited Categories:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Weapons and ammunition</li>
                  <li>• Illegal drugs and substances</li>
                  <li>• Counterfeit goods</li>
                  <li>• Hazardous materials</li>
                  <li>• Live animals or plants</li>
                  <li>• Adult content</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Restricted Items:</h3>
                <ul className="text-sm space-y-1">
                  <li>• Electronics with batteries</li>
                  <li>• Liquids and cosmetics</li>
                  <li>• Food and supplements</li>
                  <li>• Branded luxury goods</li>
                  <li>• Medical devices</li>
                  <li>• Currency and precious metals</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Liability and Indemnification</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Limitation of Liability</h3>
              <p className="text-sm text-gray-700">
                Our liability is limited to the amount you paid for our services. We are not liable for indirect, 
                incidental, or consequential damages arising from the use of our services.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">Customer Responsibilities:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate shipping information</li>
              <li>Comply with import regulations in your country</li>
              <li>Pay any applicable customs duties and taxes</li>
              <li>Use our services in accordance with these terms</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
            <p className="mb-4">
              We encourage customers to contact our support team first to resolve any issues. If a dispute cannot 
              be resolved through customer service, it will be subject to binding arbitration.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Dispute Process</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Contact customer support within 30 days</li>
                <li>2. Provide detailed information and evidence</li>
                <li>3. Allow 5-10 business days for investigation</li>
                <li>4. Accept resolution or proceed to arbitration</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. Material changes will be communicated 
              via email or website notification. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="mb-4">
              For questions about these terms or our services, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Customer Support</h3>
                <p className="text-sm">Email: support@shipzobuy.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
                <p className="text-sm">Hours: 24/7 support available</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Legal Department</h3>
                <p className="text-sm">Email: legal@shipzobuy.com</p>
                <p className="text-sm">Address: 123 Business St, Suite 100</p>
                <p className="text-sm">New York, NY 10001, USA</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}