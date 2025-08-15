import React, { useState } from 'react';
import ShippingManager from './ShippingManager';

export default function ShippingCalculator() {
  const [mode, setMode] = useState<'calculator' | 'warehouse'>('calculator');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shipping Management
          </h2>
          <p className="text-xl text-gray-600">
            Calculate shipping costs or ship orders from warehouse
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('calculator')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'calculator'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Shipping Calculator
            </button>
            <button
              onClick={() => setMode('warehouse')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                mode === 'warehouse'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Ship from Warehouse
            </button>
          </div>
        </div>

        <ShippingManager mode={mode} />
      </div>
    </section>
  );
}