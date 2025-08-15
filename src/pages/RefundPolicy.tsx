import React from 'react';
import { RefreshCw, Shield, Clock, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <RefreshCw className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Refund Policy</h1>
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
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Our Commitment to Customer Satisfaction</h2>
            <p className="text-blue-800">
              At Shipzobuy, we strive to provide excellent service as your Chinese marketplace agent. This policy outlines 
              our refund procedures and your rights as a customer when issues arise with your orders.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" />
              Refund Eligibility
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Eligible for Full Refund
                </h3>
                <ul className="text-green-800 text-sm space-y-2">
                  <li>• Items not as described by the seller</li>
                  <li>• Defective or damaged products upon arrival</li>
                  <li>• Wrong items sent by the seller</li>
                  <li>• Items that fail quality inspection</li>
                  <li>• Seller cancellation or unavailability</li>
                  <li>• Our service errors or mistakes</li>
                  <li>• Items lost during domestic shipping in China</li>
                  <li>• Significant delays beyond our control (30+ days)</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Not Eligible for Refund
                </h3>
                <ul className="text-red-800 text-sm space-y-2">
                  <li>• Change of mind after purchase</li>
                  <li>• Size, color, or style preferences</li>
                  <li>• Items damaged during international shipping</li>
                  <li>• Customs seizure or destruction</li>
                  <li>• Incorrect shipping address provided</li>
                  <li>• Recipient refusal to accept delivery</li>
                  <li>• Items used or modified after delivery</li>
                  <li>• Service fees and shipping costs (unless our error)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-yellow-900 mb-3">Partial Refund Situations</h3>
              <p className="text-yellow-800 text-sm mb-2">In some cases, we may offer partial refunds:</p>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Items with minor defects that don't affect functionality</li>
                <li>• Slight variations from product descriptions</li>
                <li>• Items that arrive later than expected but within reasonable timeframe</li>
                <li>• Packaging damage that doesn't affect the product</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-orange-600" />
              Refund Process & Timeline
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">How to Request a Refund</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Contact Customer Service</h4>
                        <p className="text-gray-600 text-sm">Email us at refunds@shipzobuy.com or use our contact form within 7 days of delivery (or expected delivery date for lost items).</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Provide Documentation</h4>
                        <p className="text-gray-600 text-sm">Include your order number, photos of the issue (if applicable), and a detailed description of the problem.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Review Process</h4>
                        <p className="text-gray-600 text-sm">Our team will review your case within 2-3 business days and may request additional information.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Resolution</h4>
                        <p className="text-gray-600 text-sm">Once approved, refunds are processed within 5-10 business days to your original payment method.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Required Information for Refund Requests</h3>
                <div className="bg-white border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Order number</li>
                        <li>• Email address used for order</li>
                        <li>• Date of order placement</li>
                        <li>• Item(s) affected</li>
                        <li>• Reason for refund request</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Supporting Evidence</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Clear photos of the issue</li>
                        <li>• Screenshots of product listings</li>
                        <li>• Delivery confirmation (if applicable)</li>
                        <li>• Communication with seller (if any)</li>
                        <li>• Any other relevant documentation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-6 w-6 mr-2 text-purple-600" />
              Types of Refunds
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Product Refund</h3>
                  <p className="text-gray-600 text-sm mb-3">Full refund of the product cost when items are defective, wrong, or not as described.</p>
                  <div className="text-sm">
                    <p className="text-green-600 font-medium">✓ Product cost</p>
                    <p className="text-red-600">✗ Service fees</p>
                    <p className="text-red-600">✗ Shipping costs</p>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Service Refund</h3>
                  <p className="text-gray-600 text-sm mb-3">Refund of service fees when we make errors in processing or handling your order.</p>
                  <div className="text-sm">
                    <p className="text-green-600 font-medium">✓ Service fees</p>
                    <p className="text-gray-600">± Product cost (case by case)</p>
                    <p className="text-red-600">✗ Shipping costs</p>
                  </div>
                </div>
                
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Full Order Refund</h3>
                  <p className="text-gray-600 text-sm mb-3">Complete refund including all costs when we are unable to fulfill your order.</p>
                  <div className="text-sm">
                    <p className="text-green-600 font-medium">✓ Product cost</p>
                    <p className="text-green-600 font-medium">✓ Service fees</p>
                    <p className="text-green-600 font-medium">✓ Shipping costs</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Refund Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Original Payment Method</h4>
                    <p className="text-purple-800 text-sm mb-2">Refunds are typically processed to your original payment method:</p>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Credit/Debit cards: 5-10 business days</li>
                      <li>• PayPal: 3-5 business days</li>
                      <li>• Bank transfers: 7-14 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-2">Alternative Methods</h4>
                    <p className="text-purple-800 text-sm mb-2">In some cases, we may offer:</p>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Store credit for future orders</li>
                      <li>• Replacement items</li>
                      <li>• Partial refund + store credit</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Pre-Purchase Issues</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Order Cancellation</h4>
                      <p className="text-gray-600 text-sm mb-2">You can cancel your order for a full refund if:</p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Order has not been purchased from the seller (within 2 hours of placement)</li>
                        <li>• Seller is out of stock or unavailable</li>
                        <li>• Significant price changes occur</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Seller Issues</h4>
                      <p className="text-gray-600 text-sm mb-2">If the seller cannot fulfill your order:</p>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Full refund of product cost and service fees</li>
                        <li>• Option to find alternative products</li>
                        <li>• Store credit for future purchases</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Post-Purchase Issues</h3>
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Inspection Failures</h4>
                    <p className="text-gray-600 text-sm mb-2">If items fail our quality inspection:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Full refund of product cost</li>
                      <li>• Option to accept item with discount</li>
                      <li>• Request replacement from seller</li>
                      <li>• Quality inspection fee refunded</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Shipping Damage</h4>
                    <p className="text-gray-600 text-sm mb-2">For items damaged during international shipping:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Insurance claim filed with carrier</li>
                      <li>• Refund based on insurance coverage</li>
                      <li>• Additional compensation if we're at fault</li>
                      <li>• Replacement item if available</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Customs Issues</h4>
                    <p className="text-gray-600 text-sm mb-2">If items are seized or destroyed by customs:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• No refund for prohibited items</li>
                      <li>• Partial refund for restricted items (case by case)</li>
                      <li>• Full refund if our documentation error</li>
                      <li>• Assistance with customs procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Our Commitment</h3>
                <p className="text-blue-800 text-sm">
                  We are committed to resolving all refund requests fairly and promptly. Our customer service team 
                  will work with you to find a satisfactory solution for any issues with your order.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Escalation Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer Service</h4>
                      <p className="text-gray-600 text-sm">First contact our customer service team for resolution.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Supervisor Review</h4>
                      <p className="text-gray-600 text-sm">If unsatisfied, request escalation to a supervisor.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Management Review</h4>
                      <p className="text-gray-600 text-sm">Final review by management for complex cases.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">External Mediation</h4>
                      <p className="text-gray-600 text-sm">Third-party mediation for unresolved disputes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-2">Time Limits</h3>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Refund requests must be made within 7 days of delivery</li>
                  <li>• For lost packages, within 7 days of expected delivery date</li>
                  <li>• Quality inspection issues must be reported within 3 days</li>
                  <li>• Order cancellations accepted within 2 hours of placement</li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-2">Non-Refundable Fees</h3>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Service fees (unless our error)</li>
                  <li>• International shipping costs</li>
                  <li>• Payment processing fees</li>
                  <li>• Customs duties and taxes</li>
                  <li>• Return shipping costs (customer responsibility)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2">Refund Processing</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Refunds processed within 5-10 business days after approval</li>
                  <li>• Email confirmation sent when refund is processed</li>
                  <li>• Bank processing times may vary by institution</li>
                  <li>• Contact us if refund doesn't appear within expected timeframe</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="mb-4">
              For refund requests or questions about this policy, please contact us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Refund Department</h3>
                <p className="text-sm">Email: refunds@shipzobuy.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
                <p className="text-sm">Hours: Monday-Friday, 9 AM - 6 PM EST</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Customer Service</h3>
                <p className="text-sm">Email: support@shipzobuy.com</p>
                <p className="text-sm">Live Chat: Available 24/7</p>
                <p className="text-sm">Response Time: Within 24 hours</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}