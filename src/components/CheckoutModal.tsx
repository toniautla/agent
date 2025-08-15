import React, { useState, useEffect } from 'react';
import { X, CreditCard, Package, Truck, MapPin, Shield, Wallet, Tag, CheckCircle, ArrowRight, Percent } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useShipping } from '../hooks/useShipping';
import { db } from '../lib/supabase';
import { useWallet } from './WalletSystem';
import PaymentForm from './PaymentForm';
import AddressManager from './AddressManager';
import LoadingScreen from './LoadingScreen';
import SuccessAnimation from './SuccessAnimation';
import SkeletonLoader from './SkeletonLoader';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
    image_url?: string;
    weight?: number;
    variants?: Array<{
      name: string;
      value: string;
      price_adjustment?: number;
    }>;
    addons?: {
      qualityInspection: boolean;
      packageConsolidation: boolean;
    };
  }>;
  onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, items, onSuccess }: CheckoutModalProps) {
  const { user } = useAuth();
  const { shippingOptions, loading: shippingLoading } = useShipping();
  const { getBalance, useBalance } = useWallet();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedShipping, setSelectedShipping] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet'>('card');
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [couponCode, setCouponCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [validatingCoupon, setValidatingCoupon] = useState(false);

  const steps = [
    { id: 1, title: 'Review Order', icon: Package, color: 'bg-blue-500' },
    { id: 2, title: 'Shipping Address', icon: MapPin, color: 'bg-green-500' },
    { id: 3, title: 'Shipping Method', icon: Truck, color: 'bg-orange-500' },
    { id: 4, title: 'Payment', icon: CreditCard, color: 'bg-purple-500' }
  ];

  useEffect(() => {
    if (user && isOpen) {
      loadWalletBalance();
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (shippingOptions.length > 0 && !selectedShipping) {
      setSelectedShipping(shippingOptions[1]?.id || shippingOptions[0]?.id);
    }
  }, [shippingOptions]);

  const loadWalletBalance = async () => {
    const balance = await getBalance();
    setWalletBalance(balance);
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;

    setValidatingCoupon(true);
    try {
      const { data: coupon, error } = await db.validateCoupon(couponCode.trim());
      
      if (error || !coupon) {
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: {
            type: 'error',
            message: 'Invalid or expired coupon code'
          }
        }));
        return;
      }

      // Check minimum order amount
      if (coupon.min_order_amount && subtotal < coupon.min_order_amount) {
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: {
            type: 'error',
            message: `Minimum order amount of €${coupon.min_order_amount} required for this coupon`
          }
        }));
        return;
      }

      setAppliedCoupon(coupon);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: `Coupon applied! You saved €${calculateDiscount(coupon).toFixed(2)}`
        }
      }));
    } catch (error) {
      console.error('Error validating coupon:', error);
    } finally {
      setValidatingCoupon(false);
    }
  };

  const calculateDiscount = (coupon: any) => {
    if (!coupon) return 0;
    
    const baseAmount = subtotal + serviceFee + qualityInspectionFee + consolidationFee + shippingCost;
    
    if (coupon.type === 'percentage') {
      return (baseAmount * coupon.value) / 100;
    } else {
      return Math.min(coupon.value, baseAmount);
    }
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => {
    const basePrice = item.price * item.quantity;
    const variantPrice = item.variants?.reduce((vSum, variant) => 
      vSum + (variant.price_adjustment || 0), 0) || 0;
    return sum + basePrice + variantPrice;
  }, 0);

  const serviceFee = items.length * 1.5;
  const qualityInspectionFee = items.reduce((sum, item) => 
    sum + (item.addons?.qualityInspection ? 6.99 * item.quantity : 0), 0
  );
  const consolidationFee = items.some(item => item.addons?.packageConsolidation) ? 5.00 : 0;
  
  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0.5) * item.quantity, 0);
  const shippingCost = selectedShippingOption ? 
    selectedShippingOption.base_price + (Math.max(0, totalWeight - 1) * selectedShippingOption.price_per_kg) : 0;
  
  let orderTotal = subtotal + serviceFee + qualityInspectionFee + consolidationFee + shippingCost;
  
  // Apply coupon discount
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon) : 0;
  orderTotal -= discount;

  const canPayWithWallet = walletBalance >= orderTotal;

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const processOrder = async (paymentIntentId?: string) => {
    if (!user || !selectedAddress || !selectedShipping) return;

    try {
      setProcessing(true);

      // Create order
      const orderData = {
        user_id: user.id,
        subtotal,
        service_fee: serviceFee,
        shipping_cost: shippingCost,
        discount: discount,
        total: orderTotal,
        shipping_address_id: selectedAddress.id,
        shipping_option_id: selectedShipping,
        notes: orderNotes,
        status: 'pending'
      };

      const { data: order, error: orderError } = await db.createOrder(orderData);
      
      if (orderError) {
        throw new Error(orderError.message);
      }

      // Add order items
      for (const item of items) {
        await db.addOrderItem({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity
        });
      }

      // Process payment
      if (paymentMethod === 'wallet') {
        const success = await useBalance(orderTotal, `Order payment - ${order.order_number}`);
        if (!success) {
          throw new Error('Insufficient wallet balance');
        }
      } else if (paymentIntentId) {
        // Create payment record
        await db.createPayment({
          id: paymentIntentId,
          order_id: order.id,
          user_id: user.id,
          amount: Math.round(orderTotal * 100),
          currency: 'eur',
          status: 'succeeded'
        });
      }

      // Use coupon if applied
      if (appliedCoupon && user) {
        await db.useCoupon(user.id, appliedCoupon.id, order.id);
      }

      setShowSuccess(true);
      
    } catch (error: any) {
      console.error('Order processing error:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: error.message || 'Failed to process order'
        }
      }));
    } finally {
      setProcessing(false);
    }
  };

  const handleWalletPayment = async () => {
    await processOrder();
  };

  const handleCardPaymentSuccess = async (paymentIntent: any) => {
    await processOrder(paymentIntent.id);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    onSuccess();
    onClose();
    
    // Clear cart
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {processing && <LoadingScreen message="Processing your order..." type="order" />}
      
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={handleSuccessComplete}
        type="order"
        message="Order Placed Successfully!"
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-100">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Secure Checkout</h2>
              <p className="text-gray-600 mt-1">Complete your order in {steps.length} easy steps</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id 
                      ? `${step.color} border-transparent text-white shadow-lg transform scale-110` 
                      : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className={`ml-4 text-sm font-medium transition-colors ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 mx-8 rounded-full transition-colors ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Step 1: Review Order */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold text-gray-900">Review Your Order</h3>
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-6 p-8 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300 bg-white">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded-xl border shadow-sm"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">Quantity: {item.quantity}</p>
                            
                            {/* Variants */}
                            {item.variants && item.variants.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-3">
                                {item.variants.map((variant, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                    {variant.name}: {variant.value}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Add-ons */}
                            <div className="flex flex-wrap gap-2">
                              {item.addons?.qualityInspection && (
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                  Quality Inspection
                                </span>
                              )}
                              {item.addons?.packageConsolidation && (
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                                  Package Consolidation
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                            {item.addons?.qualityInspection && (
                              <p className="text-xs text-green-600 mt-1">+€{(6.99 * item.quantity).toFixed(2)} inspection</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Coupon Section */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Tag className="h-5 w-5 mr-2 text-green-600" />
                        Apply Coupon Code
                      </h4>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Enter coupon code"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                        <button
                          onClick={validateCoupon}
                          disabled={!couponCode.trim() || validatingCoupon}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                        >
                          {validatingCoupon ? 'Validating...' : 'Apply'}
                        </button>
                      </div>
                      {appliedCoupon && (
                        <div className="mt-4 p-4 bg-green-100 rounded-xl border border-green-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-green-800">{appliedCoupon.code}</p>
                              <p className="text-sm text-green-700">{appliedCoupon.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-800">
                                {appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}% OFF` : `€${appliedCoupon.value} OFF`}
                              </p>
                              <button
                                onClick={() => {
                                  setAppliedCoupon(null);
                                  setCouponCode('');
                                }}
                                className="text-xs text-green-600 hover:text-green-800"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Any special instructions for your order..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-8">Shipping Address</h3>
                    <AddressManager
                      onAddressSelect={setSelectedAddress}
                      selectedAddressId={selectedAddress?.id}
                      showSelection={true}
                    />
                  </div>
                )}

                {/* Step 3: Shipping Method */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-8">Choose Shipping Method</h3>
                    {shippingLoading ? (
                      <SkeletonLoader type="list" count={4} />
                    ) : (
                      <div className="space-y-4">
                        {shippingOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              selectedShipping === option.id
                                ? 'border-blue-500 bg-blue-50 shadow-lg'
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                            }`}
                            onClick={() => setSelectedShipping(option.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={`w-6 h-6 rounded-full border-2 mr-6 ${
                                  selectedShipping === option.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                }`}>
                                  {selectedShipping === option.id && (
                                    <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                                  )}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-lg">{option.name}</h4>
                                  <p className="text-sm text-gray-600">{option.provider}</p>
                                  <p className="text-sm text-gray-500 mt-1">
                                    {option.estimated_days_min}-{option.estimated_days_max} business days
                                  </p>
                                  {option.features && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      {option.features.map((feature, index) => (
                                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                          {feature}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">
                                  €{(option.base_price + (Math.max(0, totalWeight - 1) * option.price_per_kg)).toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Weight: {totalWeight.toFixed(1)}kg</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Payment */}
                {currentStep === 4 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-semibold text-gray-900">Payment Method</h3>
                    
                    {/* Payment Method Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div
                        onClick={() => setPaymentMethod('card')}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <CreditCard className="h-8 w-8 text-blue-600 mr-4" />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">Credit/Debit Card</h4>
                            <p className="text-sm text-gray-600">Secure payment with Stripe</p>
                          </div>
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('wallet')}
                        className={`border-2 rounded-2xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          paymentMethod === 'wallet' ? 'border-purple-500 bg-purple-50 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                        } ${!canPayWithWallet ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center">
                          <Wallet className="h-8 w-8 text-purple-600 mr-4" />
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">Wallet Balance</h4>
                            <p className="text-sm text-gray-600">
                              Available: €{walletBalance.toFixed(2)}
                              {!canPayWithWallet && <span className="text-red-600 ml-1">(Insufficient)</span>}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Form */}
                    {paymentMethod === 'wallet' ? (
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-10 border border-purple-200">
                        <div className="text-center">
                          <div className="bg-purple-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                            <Wallet className="h-10 w-10 text-purple-600" />
                          </div>
                          <h4 className="text-2xl font-semibold text-gray-900 mb-3">Pay with Wallet</h4>
                          <p className="text-gray-600 mb-6 text-lg">
                            Your order total is €{orderTotal.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600 mb-8">
                            Remaining balance after payment: €{(walletBalance - orderTotal).toFixed(2)}
                          </p>
                          <button
                            onClick={handleWalletPayment}
                            disabled={!canPayWithWallet}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
                          >
                            Pay €{orderTotal.toFixed(2)} with Wallet
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <PaymentForm
                          amount={orderTotal}
                          currency="eur"
                          onSuccess={handleCardPaymentSuccess}
                          onError={(error) => window.dispatchEvent(new CustomEvent('showNotification', {
                            detail: { type: 'error', message: error }
                          }))}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-3xl p-8 sticky top-6 border border-gray-200 shadow-sm">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-8">Order Summary</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({items.length} items)</span>
                      <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-semibold">€{serviceFee.toFixed(2)}</span>
                    </div>
                    
                    {qualityInspectionFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality Inspection</span>
                        <span className="font-semibold">€{qualityInspectionFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    {consolidationFee > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Consolidation</span>
                        <span className="font-semibold">€{consolidationFee.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {selectedShippingOption ? `€${shippingCost.toFixed(2)}` : 'TBD'}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="flex items-center">
                          <Percent className="h-4 w-4 mr-1" />
                          Coupon Discount
                        </span>
                        <span className="font-semibold">-€{discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-300 pt-4 mt-6">
                      <div className="flex justify-between text-2xl font-bold">
                        <span>Total</span>
                        <span className="text-blue-600">€{orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Wallet Balance Info */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-purple-700">Wallet Balance</span>
                      <span className="font-bold text-purple-900 text-lg">€{walletBalance.toFixed(2)}</span>
                    </div>
                    {canPayWithWallet && (
                      <div className="flex items-center mt-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <p className="text-xs text-green-700">Sufficient balance for this order</p>
                      </div>
                    )}
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-3 text-green-600" />
                        <span>256-bit SSL encryption</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-3 text-blue-600" />
                        <span>Quality guaranteed</span>
                      </div>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 mr-3 text-orange-600" />
                        <span>Worldwide shipping</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg"
              >
                Previous
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 2 && !selectedAddress) ||
                    (currentStep === 3 && !selectedShipping)
                  }
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 font-semibold text-lg flex items-center shadow-lg"
                >
                  Continue
                  <ArrowRight className="h-6 w-6 ml-3" />
                </button>
              ) : (
                <div className="text-sm text-gray-500">
                  Complete payment above to finish your order
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}