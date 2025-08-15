import React from 'react';
import { Truck, Package, Globe, Clock, Shield, AlertTriangle } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center mb-4">
            <Truck className="h-8 w-8 mr-3" />
            <h1 className="text-4xl font-bold">Shipping Policy</h1>
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
            <h2 className="text-xl font-semibold text-blue-900 mb-2">International Shipping Agent Service</h2>
            <p className="text-blue-800">
              Shipzobuy operates as a professional shipping agent, purchasing items from Chinese marketplaces on your behalf 
              and shipping them internationally. This policy outlines our shipping procedures, timelines, and responsibilities.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Package className="h-6 w-6 mr-2 text-blue-600" />
              Service Overview
            </h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Our Process</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>You place an order through our platform</li>
                <li>We purchase the items from Chinese sellers on your behalf</li>
                <li>Items are delivered to our warehouse in China</li>
                <li>We inspect, consolidate (if requested), and repackage your items</li>
                <li>We ship your package internationally to your address</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">What We Handle</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Purchasing from Chinese sellers</li>
                  <li>• Warehouse storage (30 days free)</li>
                  <li>• Quality inspection services</li>
                  <li>• Package consolidation</li>
                  <li>• International shipping</li>
                  <li>• Customs documentation</li>
                </ul>
              </div>
              
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Service Fees</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• $1.50 per item service fee</li>
                  <li>• $2.00 shipping surcharge</li>
                  <li>• Quality inspection: $3.99-$12.99</li>
                  <li>• Package consolidation: $5.00</li>
                  <li>• Shipping costs vary by method</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-green-600" />
              Shipping Options & Destinations
            </h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Available Shipping Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Economy Shipping</h4>
                  <p className="text-sm text-gray-600 mb-2">15-25 business days • From $12.99</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Basic tracking</li>
                    <li>• No insurance included</li>
                    <li>• Best for low-value items</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Shipping</h4>
                  <p className="text-sm text-gray-600 mb-2">7-14 business days • From $24.99</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Full tracking</li>
                    <li>• Basic insurance ($100)</li>
                    <li>• Recommended option</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Express Shipping</h4>
                  <p className="text-sm text-gray-600 mb-2">3-5 business days • From $45.99</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Real-time tracking</li>
                    <li>• Full insurance ($500)</li>
                    <li>• Priority handling</li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Express</h4>
                  <p className="text-sm text-gray-600 mb-2">1-3 business days • From $89.99</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Real-time tracking</li>
                    <li>• Full insurance ($1000)</li>
                    <li>• Signature required</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">Worldwide Shipping Coverage</h3>
              <p className="text-green-800 mb-3">We ship to over 200 countries and territories worldwide, including:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-green-700">
                <div>• United States</div>
                <div>• Canada</div>
                <div>• United Kingdom</div>
                <div>• Australia</div>
                <div>• Germany</div>
                <div>• France</div>
                <div>• Japan</div>
                <div>• South Korea</div>
                <div>• Singapore</div>
                <div>• Brazil</div>
                <div>• Mexico</div>
                <div>• And many more...</div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="h-6 w-6 mr-2 text-orange-600" />
              Processing & Delivery Times
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Processing Timeline</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Order Placement to Purchase</h4>
                        <p className="text-gray-600 text-sm">1-3 business days</p>
                        <p className="text-gray-600 text-sm">We purchase items from sellers and arrange delivery to our warehouse.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Seller to Warehouse</h4>
                        <p className="text-gray-600 text-sm">2-7 business days</p>
                        <p className="text-gray-600 text-sm">Items are shipped from sellers to our warehouse in China.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Warehouse Processing</h4>
                        <p className="text-gray-600 text-sm">1-3 business days</p>
                        <p className="text-gray-600 text-sm">Quality inspection, consolidation, and packaging for international shipping.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">4</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">International Shipping</h4>
                        <p className="text-gray-600 text-sm">1-25 business days (depending on method)</p>
                        <p className="text-gray-600 text-sm">Package is shipped internationally to your delivery address.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Factors Affecting Delivery Times</h3>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Chinese national holidays (Golden Week, Spring Festival)</li>
                      <li>• Seller processing delays</li>
                      <li>• Customs clearance procedures</li>
                      <li>• Weather conditions and natural disasters</li>
                      <li>• Peak shipping seasons (Black Friday, Christmas)</li>
                      <li>• Remote or rural delivery locations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Costs & Calculation</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">How We Calculate Shipping Costs</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Weight-Based Pricing</h4>
                      <p className="text-gray-600 text-sm mb-2">Shipping costs are calculated based on the greater of:</p>
                      <ul className="text-gray-600 text-sm space-y-1 ml-4">
                        <li>• Actual weight of your package</li>
                        <li>• Volumetric weight (Length × Width × Height ÷ 5000)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Additional Fees</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Remote area surcharge: $5-15 (if applicable)</li>
                        <li>• Fuel surcharge: 3-8% of shipping cost</li>
                        <li>• Insurance: 1-3% of declared value (optional)</li>
                        <li>• Customs clearance: $5-25 (if required)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-3">Money-Saving Tips</h3>
                <ul className="text-blue-800 text-sm space-y-2">
                  <li>• <strong>Consolidate orders:</strong> Combine multiple orders to save up to 60% on shipping</li>
                  <li>• <strong>Choose slower shipping:</strong> Economy shipping can save 50-70% compared to express</li>
                  <li>• <strong>Remove unnecessary packaging:</strong> We can repackage items to reduce weight and size</li>
                  <li>• <strong>Avoid peak seasons:</strong> Shipping costs may be higher during holidays</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customs & Import Duties</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
                    <p className="text-red-800 text-sm">
                      Customs duties, taxes, and fees are the responsibility of the recipient and are not included 
                      in our shipping costs. These charges vary by country and product type.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Customs Documentation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What We Provide</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Commercial invoice</li>
                      <li>• Packing list</li>
                      <li>• Certificate of origin</li>
                      <li>• Product descriptions</li>
                      <li>• Accurate declared values</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Your Responsibilities</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Pay any customs duties</li>
                      <li>• Provide accurate recipient info</li>
                      <li>• Respond to customs inquiries</li>
                      <li>• Collect package from customs</li>
                      <li>• Understand import regulations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Typical Duty Rates by Country</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <strong>United States:</strong><br />
                    0-37.5% + State tax
                  </div>
                  <div>
                    <strong>Canada:</strong><br />
                    0-20% + GST/HST
                  </div>
                  <div>
                    <strong>United Kingdom:</strong><br />
                    0-12% + 20% VAT
                  </div>
                  <div>
                    <strong>Australia:</strong><br />
                    0-10% + 10% GST
                  </div>
                  <div>
                    <strong>Germany:</strong><br />
                    0-17% + 19% VAT
                  </div>
                  <div>
                    <strong>France:</strong><br />
                    0-17% + 20% VAT
                  </div>
                  <div>
                    <strong>Japan:</strong><br />
                    0-30% + 10% consumption tax
                  </div>
                  <div>
                    <strong>Brazil:</strong><br />
                    0-35% + various taxes
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  *Rates are approximate and subject to change. Actual rates depend on product classification and country-specific regulations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-purple-600" />
              Insurance & Liability
            </h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Covered</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Loss during international transit</li>
                    <li>• Damage during shipping</li>
                    <li>• Theft by carrier</li>
                    <li>• Natural disasters affecting shipment</li>
                  </ul>
                </div>
                
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Not Covered</h3>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Customs seizure or destruction</li>
                    <li>• Prohibited items</li>
                    <li>• Incorrect addresses</li>
                    <li>• Recipient refusal</li>
                    <li>• Normal wear and tear</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-3">Insurance Options</h3>
                <div className="space-y-3">
                  <div>
                    <strong className="text-purple-900">Basic Coverage (Included):</strong>
                    <p className="text-purple-800 text-sm">Up to $100 coverage included with Standard shipping and above</p>
                  </div>
                  <div>
                    <strong className="text-purple-900">Extended Coverage (Optional):</strong>
                    <p className="text-purple-800 text-sm">Additional insurance available for high-value items (1-3% of declared value)</p>
                  </div>
                  <div>
                    <strong className="text-purple-900">Premium Coverage:</strong>
                    <p className="text-purple-800 text-sm">Full replacement value coverage for items over $500</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited & Restricted Items</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-900 mb-3">Prohibited Items (Cannot Ship)</h3>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Weapons and ammunition</li>
                  <li>• Illegal drugs and substances</li>
                  <li>• Counterfeit goods</li>
                  <li>• Hazardous materials</li>
                  <li>• Live animals or plants</li>
                  <li>• Currency and precious metals</li>
                  <li>• Adult content</li>
                  <li>• Tobacco products</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">Restricted Items (Special Handling)</h3>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Electronics with batteries</li>
                  <li>• Liquids and cosmetics</li>
                  <li>• Food and supplements</li>
                  <li>• Branded luxury goods</li>
                  <li>• Medical devices</li>
                  <li>• Magnets and magnetic items</li>
                  <li>• Perfumes and fragrances</li>
                  <li>• Compressed gases</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 text-sm">
                If you're unsure whether an item can be shipped, please contact our customer service team before placing your order. 
                We'll help determine the best shipping method and any special requirements.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery & Tracking</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Tracking Your Shipment</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What You'll Receive</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Email notification when your package ships</li>
                        <li>• Tracking number for your carrier</li>
                        <li>• Estimated delivery date</li>
                        <li>• Real-time tracking updates</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tracking Methods</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        <li>• Track directly on our website</li>
                        <li>• Use carrier's official tracking system</li>
                        <li>• Download carrier mobile apps</li>
                        <li>• Contact customer service for updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Delivery Procedures</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Standard Delivery</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Delivered to your address</li>
                      <li>• Signature may be required</li>
                      <li>• Left in safe location if no one home</li>
                      <li>• Delivery attempt notifications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Express Delivery</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Signature required</li>
                      <li>• Multiple delivery attempts</li>
                      <li>• SMS/email notifications</li>
                      <li>• Pickup from depot if needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Issues & Resolution</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Common Shipping Issues</h3>
                <div className="space-y-4">
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Delayed Shipments</h4>
                    <p className="text-gray-600 text-sm mb-2">If your package is delayed beyond the estimated delivery time:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Check tracking for updates</li>
                      <li>• Contact us after 5 business days past estimate</li>
                      <li>• We'll investigate with the carrier</li>
                      <li>• Compensation may be available for significant delays</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Lost or Damaged Packages</h4>
                    <p className="text-gray-600 text-sm mb-2">If your package is lost or arrives damaged:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Report the issue within 7 days of delivery date</li>
                      <li>• Provide photos of damage (if applicable)</li>
                      <li>• We'll file a claim with the carrier</li>
                      <li>• Refund or replacement will be processed</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white border rounded-lg p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Customs Issues</h4>
                    <p className="text-gray-600 text-sm mb-2">If your package is held by customs:</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• You'll receive notification from customs</li>
                      <li>• Provide any requested documentation</li>
                      <li>• Pay any required duties or taxes</li>
                      <li>• Contact us if you need assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="mb-4">
              For shipping-related questions or issues, please contact our customer service team:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Customer Support</h3>
                <p className="text-sm">Email: shipping@shipzobuy.com</p>
                <p className="text-sm">Phone: +1 (555) 123-4567</p>
                <p className="text-sm">Hours: 24/7 support available</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Warehouse Address</h3>
                <p className="text-sm">Shipzobuy Warehouse</p>
                <p className="text-sm">Building 5, Logistics Park</p>
                <p className="text-sm">Guangzhou, Guangdong 510000</p>
                <p className="text-sm">China</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}