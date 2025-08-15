import React, { useState } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripe';
import { createPaymentIntent, confirmPayment } from '../lib/stripe';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
  loading?: boolean;
  orderId?: string;
}

const CheckoutForm: React.FC<PaymentFormProps> = ({ 
  amount, 
  currency = 'eur',
  onSuccess, 
  onError, 
  loading,
  orderId 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe not loaded. Please refresh the page and try again.');
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card element not found. Please refresh the page and try again.');
      setProcessing(false);
      return;
    }

    try {
      // Create payment intent using our helper function
      const metadata = orderId && user ? {
        order_id: orderId,
        user_id: user.id
      } : undefined;
      
      const { client_secret } = await createPaymentIntent(amount, currency, metadata);

      if (!client_secret) {
        throw new Error('Failed to create payment intent');
      }

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (error) {
        console.error('Payment error:', error);
        onError(error.message || 'Payment failed. Please try again.');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on our backend if we have order info
        if (orderId && user) {
          try {
            await confirmPayment(paymentIntent.id, orderId, user.id);
          } catch (confirmError) {
            console.warn('Payment confirmation warning:', confirmError);
            // Don't fail the payment for confirmation errors
          }
        }
        
        onSuccess(paymentIntent);
      } else {
        onError('Payment was not completed. Please try again.');
      }
    } catch (err: any) {
      console.error('Payment processing error:', err);
      onError(err.message || 'Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '18px',
        color: '#424770',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
        iconColor: '#3B82F6',
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#fa755a',
      },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <CreditCard className="inline h-5 w-5 mr-2" />
          Card Information
        </label>
        <div className="border border-gray-300 rounded-2xl p-6 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all shadow-sm">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between text-lg">
          <span className="text-gray-600">Amount to pay:</span>
          <span className="font-bold text-gray-900 text-2xl">€{amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 flex items-center justify-center shadow-lg"
      >
        {processing ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-6 w-6 mr-3" />
            Pay €{amount.toFixed(2)}
          </>
        )}
      </button>

      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          <span>Secure SSL encryption</span>
        </div>
        <span>•</span>
        <span>Powered by Stripe</span>
      </div>
    </form>
  );
};

export default function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}