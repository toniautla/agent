import React from 'react';
import { Shield, AlertTriangle, Scale, FileText, Globe, Package } from 'lucide-react';

export default function ResponsibilityDisclaimer() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <Scale className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Responsibility & Disclaimer</h1>
          </div>
          <p className="text-xl text-gray-300">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose max-w-none">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-semibold text-red-900 mb-2">Important Legal Notice</h2>
                <p className="text-red-800">
                  By using Shipzobuy's services, you acknowledge and agree to the limitations of liability and 
                  responsibilities outlined in this disclaimer. Please read carefully before using our services.
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-blue-600" />
              Service Limitations
            </h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-yellow-900 mb-3">Agent Service Disclaimer</h3>
              <p className="text-yellow-800 text-sm mb-3">
                Shipzobuy operates as an agent service that facilitates purchases from Chinese marketplaces on behalf of customers. 
                We are not the manufacturer, seller, or distributor of the products purchased through our platform.
              </p>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• We act solely as an intermediary between customers and Chinese sellers</li>
                <li>• We do not manufacture, design, or control the production of any products</li>
                <li>• Product descriptions and specifications are provided by third-party sellers</li>
                <li>• We cannot guarantee the accuracy of seller-provided information</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3">What We Are Responsible For:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">Our Responsibilities</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Purchasing items from sellers as requested</li>
                  <li>• Providing warehouse storage and handling services</li>
                  <li>• Arranging international shipping and logistics</li>
                  <li>• Offering quality inspection services when requested</li>
                  <li>• Processing payments securely through our platform</li>
                  <li>• Providing customer support for our services</li>
                  <li>• Maintaining accurate records of transactions</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-semibold text-red-900 mb-2">Not Our Responsibility</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Product quality, authenticity, or specifications</li>
                  <li>• Seller delays, cancellations, or unavailability</li>
                  <li>• Product defects or manufacturing issues</li>
                  <li>• Customs seizure, duties, or import restrictions</li>
                  <li>• Carrier delays or shipping damage</li>
                  <li>• Changes in exchange rates or pricing</li>
                  <li>• Compliance with local regulations in destination countries</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="h-6 w-6 mr-2 text-purple-600" />
              Product-Related Disclaimers
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Product Authenticity</h3>
                <p className="text-gray-600 text-sm mb-3">
                  We cannot guarantee the authenticity of branded products purchased from third-party sellers. 
                  While our quality inspection service can identify obvious counterfeits, we are not liable for:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Sophisticated counterfeit products that pass visual inspection</li>
                  <li>• Authenticity disputes arising after delivery</li>
                  <li>• Brand verification beyond visual inspection capabilities</li>
                  <li>• Legal consequences of purchasing counterfeit goods</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Product Quality and Specifications</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Product quality and specifications are determined by the original sellers and manufacturers. 
                  We are not responsible for:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Variations in product quality between batches</li>
                  <li>• Differences between product photos and actual items</li>
                  <li>• Size, color, or material variations</li>
                  <li>• Product performance or durability issues</li>
                  <li>• Compatibility with local standards or regulations</li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Safety and Compliance</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Customers are responsible for ensuring products comply with local safety standards and regulations:
                </p>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Electrical safety certifications (CE, FCC, etc.)</li>
                  <li>• Chemical composition and safety standards</li>
                  <li>• Age restrictions and safety warnings</li>
                  <li>• Import restrictions and prohibited items</li>
                  <li>• Professional or medical device certifications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-orange-600" />
              International Shipping Disclaimers
            </h2>
            
            <div className="space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-900 mb-3">Customs and Import Duties</h3>
                <p className="text-orange-800 text-sm mb-3">
                  International shipping involves customs procedures and potential duties that are beyond our control:
                </p>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Customs duties and taxes are the recipient's responsibility</li>
                  <li>• Customs may inspect, delay, or seize packages</li>
                  <li>• Import restrictions vary by country and product type</li>
                  <li>• We cannot guarantee customs clearance</li>
                  <li>• Duty rates and regulations may change without notice</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Shipping and Delivery</h3>
                <p className="text-blue-800 text-sm mb-3">
                  While we work with reliable carriers, shipping involves inherent risks:
                </p>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Delivery times are estimates and not guarantees</li>
                  <li>• Weather, holidays, and force majeure events may cause delays</li>
                  <li>• Carrier handling and potential damage during transit</li>
                  <li>• Address accuracy is the customer's responsibility</li>
                  <li>• Remote areas may have additional restrictions or delays</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Maximum Liability</h3>
              <p className="text-gray-700 text-sm mb-3">
                Our total liability for any claim arising from or related to our services is limited to the amount 
                you paid for our specific services (excluding product costs, shipping fees, and third-party charges).
              </p>
              <div className="bg-yellow-100 border border-yellow-300 rounded p-4 mt-4">
                <p className="text-yellow-800 text-sm font-medium">
                  In no event shall our liability exceed the service fees paid for the specific order in question.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Excluded Damages</h3>
            <p className="mb-4">We are not liable for any indirect, incidental, special, or consequential damages, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Lost profits or business opportunities</li>
              <li>Emotional distress or inconvenience</li>
              <li>Third-party claims or legal actions</li>
              <li>Data loss or system downtime</li>
              <li>Opportunity costs or alternative arrangements</li>
              <li>Punitive or exemplary damages</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Responsibilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Before Ordering</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Research products and sellers thoroughly</li>
                  <li>• Understand import regulations in your country</li>
                  <li>• Verify product compatibility and safety requirements</li>
                  <li>• Check for any restrictions on specific product types</li>
                  <li>• Understand potential customs duties and taxes</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3">After Ordering</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Provide accurate shipping information</li>
                  <li>• Monitor order status and respond to requests</li>
                  <li>• Pay any required customs duties promptly</li>
                  <li>• Inspect items upon delivery</li>
                  <li>• Report issues within specified timeframes</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Force Majeure</h2>
            <p className="mb-4">
              We are not liable for delays, failures, or damages caused by events beyond our reasonable control, including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Natural Events</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Natural disasters</li>
                  <li>• Severe weather conditions</li>
                  <li>• Earthquakes, floods, fires</li>
                  <li>• Pandemics or health emergencies</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Political Events</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Government actions or regulations</li>
                  <li>• Trade wars or sanctions</li>
                  <li>• Political instability</li>
                  <li>• Changes in import/export laws</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Technical Issues</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Internet or system outages</li>
                  <li>• Third-party service failures</li>
                  <li>• Cyber attacks or security breaches</li>
                  <li>• Infrastructure failures</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Payment Processing</h3>
                <p className="text-purple-800 text-sm">
                  Payment processing is handled by Stripe, Inc. We are not responsible for payment processing errors, 
                  security breaches, or issues arising from Stripe's services. All payment disputes should be directed 
                  to Stripe's customer service.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                <h3 className="font-semibold text-indigo-900 mb-3">Shipping Carriers</h3>
                <p className="text-indigo-800 text-sm">
                  International shipping is provided by third-party carriers (DHL, FedEx, UPS, etc.). We are not 
                  responsible for carrier delays, damage, loss, or misdelivery. Claims for shipping issues must be 
                  filed directly with the carrier.
                </p>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
                <h3 className="font-semibold text-pink-900 mb-3">Chinese Marketplace Sellers</h3>
                <p className="text-pink-800 text-sm">
                  We work with independent sellers on Chinese marketplaces. We are not responsible for seller actions, 
                  product quality, delivery delays, or any issues arising from the seller-customer relationship. 
                  Sellers operate independently and are not our employees or agents.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-3">Trademark and Copyright Disclaimer</h3>
              <p className="text-red-800 text-sm mb-3">
                We do not verify intellectual property rights of products sold through our platform. Customers are 
                responsible for ensuring they do not infringe on any trademarks, copyrights, or patents.
              </p>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• We do not guarantee products are free from IP infringement</li>
                <li>• Customers assume all risks related to IP violations</li>
                <li>• We may suspend services if notified of IP infringement</li>
                <li>• Legal costs for IP disputes are customer responsibility</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data and Privacy</h2>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Data Security</h3>
              <p className="text-blue-800 text-sm mb-3">
                While we implement industry-standard security measures, we cannot guarantee absolute security:
              </p>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• No system is 100% secure from all threats</li>
                <li>• Customers should use strong passwords and secure practices</li>
                <li>• We are not liable for data breaches beyond our control</li>
                <li>• Regular security updates and monitoring are maintained</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Resolution Process</h3>
                <ol className="text-gray-700 text-sm space-y-2">
                  <li>1. <strong>Direct Resolution:</strong> Contact our customer service team first</li>
                  <li>2. <strong>Escalation:</strong> Unresolved issues may be escalated to management</li>
                  <li>3. <strong>Mediation:</strong> Third-party mediation may be required for complex disputes</li>
                  <li>4. <strong>Arbitration:</strong> Final disputes subject to binding arbitration</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">Jurisdiction and Governing Law</h3>
                <p className="text-yellow-800 text-sm">
                  These terms and any disputes arising from our services are governed by the laws of [Jurisdiction]. 
                  Any legal proceedings must be conducted in the courts of [Jurisdiction], and you consent to the 
                  jurisdiction of such courts.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 text-sm mb-4">
                We strive to maintain continuous service availability but cannot guarantee uninterrupted access:
              </p>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Scheduled maintenance may temporarily interrupt service</li>
                <li>• Technical issues may cause temporary unavailability</li>
                <li>• We reserve the right to modify or discontinue services</li>
                <li>• Service levels may vary during peak periods</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Contact Information
            </h2>
            <p className="mb-4">
              For questions about this disclaimer or to report issues with our services:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Legal Department</h3>
                <p className="text-sm">Email: legal@shipzobuy.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
                <p className="text-sm">Response time: 5-7 business days</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Customer Service</h3>
                <p className="text-sm">Email: support@shipzobuy.com</p>
                <p className="text-sm">Live Chat: Available 24/7</p>
                <p className="text-sm">Response time: Within 24 hours</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-100 border border-blue-300 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> By using our services, you acknowledge that you have read, understood, 
                and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, 
                please do not use our services.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}