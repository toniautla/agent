import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Variant {
  name: string;
  options: Array<{
    value: string;
    price_adjustment?: number;
    image_url?: string;
    stock?: number;
  }>;
}

interface ProductVariantSelectorProps {
  variants: Variant[];
  selectedVariants: { [key: string]: string };
  onVariantChange: (variantName: string, value: string) => void;
}

export default function ProductVariantSelector({ 
  variants, 
  selectedVariants, 
  onVariantChange 
}: ProductVariantSelectorProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!variants || variants.length === 0) return null;

  return (
    <div className="space-y-6">
      <h4 className="font-semibold text-gray-900 text-lg">Select Options</h4>
      
      {variants.map((variant) => (
        <div key={variant.name} className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            {variant.name}
            {selectedVariants[variant.name] && (
              <span className="ml-2 text-blue-600 font-semibold">
                - {selectedVariants[variant.name]}
              </span>
            )}
          </label>
          
          {variant.name.toLowerCase().includes('color') ? (
            // Color swatches
            <div className="flex flex-wrap gap-3">
              {variant.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onVariantChange(variant.name, option.value)}
                  className={`relative w-14 h-14 rounded-xl border-2 overflow-hidden transition-all duration-300 transform hover:scale-110 ${
                    selectedVariants[variant.name] === option.value
                      ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  title={option.value}
                >
                  {option.image_url ? (
                    <img
                      src={option.image_url}
                      alt={option.value}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div 
                      className="w-full h-full"
                      style={{ 
                        backgroundColor: option.value.toLowerCase() === 'white' ? '#f8f9fa' : 
                                        option.value.toLowerCase() === 'black' ? '#1a1a1a' :
                                        option.value.toLowerCase()
                      }}
                    />
                  )}
                  {selectedVariants[variant.name] === option.value && (
                    <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                      <Check className="w-6 h-6 text-blue-600 bg-white rounded-full p-1" />
                    </div>
                  )}
                  {option.price_adjustment && option.price_adjustment !== 0 && (
                    <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1 py-0.5 min-w-[20px] text-center">
                      {option.price_adjustment > 0 ? '+' : ''}€{option.price_adjustment}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : variant.name.toLowerCase().includes('size') ? (
            // Size buttons
            <div className="flex flex-wrap gap-3">
              {variant.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onVariantChange(variant.name, option.value)}
                  disabled={option.stock === 0}
                  className={`px-6 py-3 border-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedVariants[variant.name] === option.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{option.value}</div>
                    {option.price_adjustment && option.price_adjustment !== 0 && (
                      <div className="text-xs mt-1">
                        ({option.price_adjustment > 0 ? '+' : ''}€{option.price_adjustment})
                      </div>
                    )}
                    {option.stock !== undefined && (
                      <div className="text-xs text-gray-500 mt-1">
                        {option.stock === 0 ? 'Out of stock' : `${option.stock} left`}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Dropdown for other variants
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === variant.name ? null : variant.name)}
                className="w-full px-4 py-4 border border-gray-300 rounded-2xl bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg hover:bg-gray-50"
              >
                <span className={selectedVariants[variant.name] ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                  {selectedVariants[variant.name] || `Select ${variant.name}`}
                </span>
                <ChevronDown className={`h-6 w-6 text-gray-400 transition-transform ${
                  openDropdown === variant.name ? 'rotate-180' : ''
                }`} />
              </button>
              
              {openDropdown === variant.name && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
                  {variant.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        onVariantChange(variant.name, option.value);
                        setOpenDropdown(null);
                      }}
                      disabled={option.stock === 0}
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div>
                        <span className="font-medium">{option.value}</span>
                        {option.stock !== undefined && (
                          <span className="text-xs text-gray-500 ml-2">
                            {option.stock === 0 ? '(Out of stock)' : `(${option.stock} available)`}
                          </span>
                        )}
                      </div>
                      {option.price_adjustment && option.price_adjustment !== 0 && (
                        <span className="text-sm text-gray-500">
                          ({option.price_adjustment > 0 ? '+' : ''}€{option.price_adjustment})
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}