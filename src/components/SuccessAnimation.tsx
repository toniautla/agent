import React, { useEffect, useState } from 'react';
import { CheckCircle, Gift, Sparkles, DollarSign } from 'lucide-react';

interface SuccessAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  type?: 'signup' | 'order' | 'payment' | 'wallet';
  message?: string;
  bonus?: string;
}

export default function SuccessAnimation({ 
  isVisible, 
  onComplete, 
  type = 'signup',
  message = 'Success!',
  bonus 
}: SuccessAnimationProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; color: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#F97316'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 1000,
        duration: 2000 + Math.random() * 1000
      }));
      setConfettiPieces(pieces);
      
      setShowConfetti(true);
      setTimeout(() => setShowContent(true), 300);
      setTimeout(() => {
        setShowConfetti(false);
        setShowContent(false);
        onComplete();
      }, 4000);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-3 h-3 rounded-full animate-ping"
              style={{
                backgroundColor: piece.color,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${piece.delay}ms`,
                animationDuration: `${piece.duration}ms`
              }}
            />
          ))}
        </div>
      )}

      {/* Success Content */}
      <div className={`bg-white rounded-3xl p-12 max-w-lg w-full mx-4 text-center transform transition-all duration-700 ${
        showContent ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8'
      }`}>
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
            <CheckCircle className="h-14 w-14 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 animate-spin">
            <Sparkles className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">{message}</h2>
        
        {type === 'signup' && bonus && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border border-green-200">
            <div className="flex items-center justify-center mb-3">
              <Gift className="h-8 w-8 text-green-600 mr-3" />
              <DollarSign className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Welcome Bonus!</h3>
            <p className="text-green-700 text-lg">{bonus}</p>
          </div>
        )}

        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          {type === 'signup' && 'Welcome to Shipzobuy! Your account has been created successfully and your bonus has been added to your wallet.'}
          {type === 'order' && 'Your order has been placed successfully and will be processed shortly.'}
          {type === 'payment' && 'Payment completed successfully! Thank you for your purchase.'}
          {type === 'wallet' && 'Funds have been added to your wallet successfully!'}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 h-2 rounded-full animate-pulse w-full bg-[length:200%_100%] animate-[shimmer_2s_infinite]"></div>
        </div>

        <p className="text-sm text-gray-500 animate-pulse">Redirecting...</p>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}