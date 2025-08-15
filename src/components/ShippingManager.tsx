import React, { useState, useEffect } from 'react';
import { Calculator, Package, Truck, Globe, DollarSign, Weight, Ruler } from 'lucide-react';
import { useShipping } from '../hooks/useShipping';
import { useAuth } from '../hooks/useAuth';
import SkeletonLoader from './SkeletonLoader';

interface ShippingManagerProps {
  mode: 'calculator' | 'warehouse';
}

export default function ShippingManager({ mode }: ShippingManagerProps) {
  const { user } = useAuth();
  const { shippingOptions, loading, calculateShippingCost } = useShipping();
  
  const [packageData, setPackageData] = useState({
    weight: 1.0,
    length: 20,
    width: 15,
    height: 10,
    destination: 'United States',
    value: 100
  });
  
  const [calculatedRates, setCalculatedRates] = useState<any[]>([]);
  const [calculating, setCalculating] = useState(false);

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Japan', 'South Korea', 'Singapore', 'Brazil', 'Mexico'
  ];

  const calculateRates = () => {
    if (!shippingOptions.length) return;

    setCalculating(true);
    
    setTimeout(() => {
      const rates = shippingOptions.map(option => {
        const cost = calculateShippingCost(
          option.base_price,
          option.price_per_kg,
          packageData.weight,
          {
            length: packageData.length,
            width: packageData.width,
            height: packageData.height
          }
        );

        return {
          ...option,
          calculatedCost: cost,
          estimatedDays: `${option.estimated_days_min}-${option.estimated_days_max} days`
        };
      }).sort((a, b) => a.calculatedCost - b.calculatedCost);

      setCalculatedRates(rates);
      setCalculating(false);
    }, 1000);
  };

  useEffect(() => {
    if (shippingOptions.length > 0) {
      calculateRates();
    }
  }, [shippingOptions, packageData]);

  if (loading) {
    return <SkeletonLoader type="form" />;
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center">
          <div className="bg-blue-100 rounded-full p-3 mr-4">
            <Calculator className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'calculator' ? 'Shipping Calculator' : 'Ship from Warehouse'}
            </h2>
            <p className="text-gray-600">
              {mode === 'calculator' 
                ? 'Calculate shipping costs for your packages' 
                : 'Ship orders from our Chinese warehouse'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Package Details Form */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Package Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Weight className="h-4 w-4 inline mr-1" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={packageData.weight}
                  onChange={(e) => setPackageData({ ...packageData, weight: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Value (€)
                </label>
                <input
                  type="number"
                  value={packageData.value}
                  onChange={(e) => setPackageData({ ...packageData, value: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Ruler className="h-4 w-4 inline mr-1" />
                Dimensions (cm)
              </label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Length"
                  value={packageData.length}
                  onChange={(e) => setPackageData({ ...packageData, length: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  placeholder="Width"
                  value={packageData.width}
                  onChange={(e) => setPackageData({ ...packageData, width: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <input
                  type="number"
                  placeholder="Height"
                  value={packageData.height}
                  onChange={(e) => setPackageData({ ...packageData, height: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="h-4 w-4 inline mr-1" />
                Destination Country
              </label>
              <select
                value={packageData.destination}
                onChange={(e) => setPackageData({ ...packageData, destination: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <button
              onClick={calculateRates}
              disabled={calculating}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {calculating ? 'Calculating...' : 'Calculate Shipping Rates'}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Truck className="h-5 w-5 mr-2" />
              Shipping Options
            </h3>

            {calculating ? (
              <SkeletonLoader type="list" count={4} />
            ) : calculatedRates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter package details to see shipping rates</p>
              </div>
            ) : (
              <div className="space-y-4">
                {calculatedRates.map((rate) => (
                  <div key={rate.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300 bg-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{rate.name}</h4>
                        <p className="text-sm text-gray-600">{rate.provider}</p>
                        <p className="text-sm text-gray-500 mt-1">{rate.estimatedDays}</p>
                        {rate.features && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {rate.features.slice(0, 3).map((feature: string, index: number) => (
                              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">
                          €{rate.calculatedCost.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Weight: {packageData.weight}kg
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Calculation Details */}
            {calculatedRates.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Calculation Details</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <div className="flex justify-between">
                    <span>Actual Weight:</span>
                    <span>{packageData.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volumetric Weight:</span>
                    <span>{((packageData.length * packageData.width * packageData.height) / 5000).toFixed(2)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chargeable Weight:</span>
                    <span>{Math.max(packageData.weight, (packageData.length * packageData.width * packageData.height) / 5000).toFixed(2)} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Destination:</span>
                    <span>{packageData.destination}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}