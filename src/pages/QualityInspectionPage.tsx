import React from 'react';
import { Eye, Shield, CheckCircle, AlertTriangle, Camera, FileText } from 'lucide-react';

export default function QualityInspectionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Eye className="h-16 w-16 mx-auto mb-6 text-emerald-200" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Quality Inspection
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-emerald-100">
              Ensure product quality and authenticity with our comprehensive inspection service. Get detailed reports and photos before your items ship internationally.
            </p>
          </div>
        </div>
      </section>

      {/* Why Quality Inspection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Quality Inspection Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Shopping from Chinese marketplaces can be risky. Our quality inspection service protects your investment and ensures satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticity Verification</h3>
              <p className="text-gray-600">
                Verify that branded items are authentic and not counterfeit products, protecting you from fraud and disappointment.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Check for defects, damage, or quality issues before shipping to avoid returns and ensure you get what you paid for.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detailed Documentation</h3>
              <p className="text-gray-600">
                Receive comprehensive photo reports and detailed descriptions of your items' condition and specifications.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Issue Resolution</h3>
              <p className="text-gray-600">
                Identify problems early and resolve issues with sellers before international shipping, saving time and money.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Confirmation</h3>
              <p className="text-gray-600">
                See exactly what you're getting with high-quality photos from multiple angles before final shipment.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Check</h3>
              <p className="text-gray-600">
                Ensure items meet international shipping regulations and your country's import requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Inspection Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our trained quality inspectors follow a comprehensive checklist to ensure every item meets your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Item Arrival</h3>
              <p className="text-gray-600">
                Your purchased items arrive at our warehouse and are logged into our inspection system.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual Inspection</h3>
              <p className="text-gray-600">
                Detailed visual examination for defects, damage, authenticity, and overall quality assessment.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Documentation</h3>
              <p className="text-gray-600">
                Comprehensive photo documentation and detailed written report of findings and recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-600 text-white rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Report Delivery</h3>
              <p className="text-gray-600">
                You receive the inspection report and decide whether to ship, return, or exchange the item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inspection Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Inspect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive inspection covers all aspects of product quality and authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Physical Quality Checks</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Material Quality</h4>
                    <p className="text-gray-600">Fabric, plastic, metal quality and durability assessment</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Construction & Stitching</h4>
                    <p className="text-gray-600">Seam quality, construction integrity, and workmanship</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Functionality Testing</h4>
                    <p className="text-gray-600">Electronics, moving parts, and functional components</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Size & Measurements</h4>
                    <p className="text-gray-600">Accurate sizing and dimensional verification</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Authenticity & Compliance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Brand Authentication</h4>
                    <p className="text-gray-600">Logo placement, tags, serial numbers, and authenticity markers</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Packaging Verification</h4>
                    <p className="text-gray-600">Original packaging, documentation, and included accessories</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Safety Standards</h4>
                    <p className="text-gray-600">CE marks, safety certifications, and regulatory compliance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Import Compliance</h4>
                    <p className="text-gray-600">Customs regulations and restricted item identification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sample Inspection Report
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what you'll receive with our detailed inspection reports.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Quality Inspection Report</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">PASSED</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Product Information</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Item:</span> Designer Leather Handbag</p>
                    <p><span className="text-gray-600">Order ID:</span> ORD-2024-001234</p>
                    <p><span className="text-gray-600">Inspection Date:</span> January 15, 2024</p>
                    <p><span className="text-gray-600">Inspector:</span> Quality Team #3</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Overall Assessment</h4>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Quality Score:</span> 9.2/10</p>
                    <p><span className="text-gray-600">Authenticity:</span> Verified Genuine</p>
                    <p><span className="text-gray-600">Condition:</span> Excellent</p>
                    <p><span className="text-gray-600">Recommendation:</span> Approve for Shipping</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Inspection Results</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Material Quality</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stitching</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Hardware</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Authenticity</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Inspector Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  "Excellent quality leather handbag with authentic brand markings. All hardware is properly attached and functional. 
                  Stitching is consistent and professional. No defects or damage observed. Item matches product description and photos. 
                  Recommended for immediate shipping."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspection Service Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Affordable quality inspection to protect your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Basic Inspection</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-4">$3.99</div>
              <p className="text-gray-600 mb-6">Per item</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Visual quality check</li>
                <li>Basic photo documentation</li>
                <li>Defect identification</li>
                <li>Simple pass/fail report</li>
              </ul>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
                Choose Basic
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center border-2 border-emerald-500">
              <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Standard Inspection</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-4">$6.99</div>
              <p className="text-gray-600 mb-6">Per item</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Comprehensive quality check</li>
                <li>Detailed photo documentation</li>
                <li>Authenticity verification</li>
                <li>Detailed written report</li>
                <li>Measurement verification</li>
              </ul>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
                Choose Standard
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Premium Inspection</h3>
              <div className="text-4xl font-bold text-emerald-600 mb-4">$12.99</div>
              <p className="text-gray-600 mb-6">Per item</p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>Expert quality assessment</li>
                <li>Professional photo shoot</li>
                <li>Brand authentication</li>
                <li>Functionality testing</li>
                <li>Compliance verification</li>
                <li>Video documentation</li>
              </ul>
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg transition-colors">
                Choose Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Protect Your Purchase with Quality Inspection
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-emerald-100">
            Don't risk disappointment. Get professional quality inspection for peace of mind with every order.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Add Inspection to Order
          </button>
        </div>
      </section>
    </div>
  );
}