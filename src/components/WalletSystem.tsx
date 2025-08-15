import React, { useState, useEffect } from 'react';
import { Wallet, Plus, CreditCard, History, DollarSign, ArrowDownLeft, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/supabase';
import PaymentForm from './PaymentForm';
import LoadingScreen from './LoadingScreen';
import SuccessAnimation from './SuccessAnimation';
import SkeletonLoader from './SkeletonLoader';

interface WalletSystemProps {
  isOpen: boolean;
  onClose: () => void;
}

interface WalletData {
  id: string;
  balance: number;
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
    created_at: string;
    status: string;
  }>;
}

export default function WalletSystem({ isOpen, onClose }: WalletSystemProps) {
  const { user } = useAuth();
  const [walletData, setWalletData] = useState<WalletData>({ id: '', balance: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [showTopup, setShowTopup] = useState(false);
  const [topupAmount, setTopupAmount] = useState(25);
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user && isOpen) {
      loadWalletData();
    }
  }, [user, isOpen]);

  const loadWalletData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get wallet balance
      let { data: wallet, error: walletError } = await db.getUserWallet(user.id);
      
      if (walletError && walletError.message?.includes('No rows returned')) {
        // Create wallet if it doesn't exist
        const { data: newWallet } = await db.createWallet(user.id);
        wallet = newWallet;
      }

      if (wallet) {
        // Get transactions
        const { data: transactions } = await db.getUserWalletTransactions(user.id);
        
        setWalletData({
          id: wallet.id,
          balance: parseFloat(wallet.balance.toString()) || 0,
          transactions: transactions || []
        });
      }
    } catch (error) {
      console.error('Error loading wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopupSuccess = async (paymentIntent: any) => {
    if (!user || !walletData.id) return;

    try {
      setProcessing(true);

      // Update wallet balance
      const newBalance = walletData.balance + topupAmount;
      await db.updateWalletBalance(walletData.id, newBalance);

      // Add transaction record
      await db.addWalletTransaction({
        wallet_id: walletData.id,
        user_id: user.id,
        type: 'topup',
        amount: topupAmount,
        description: `Wallet top-up via ${paymentIntent.payment_method?.type || 'card'}`,
        status: 'completed'
      });

      // Reload wallet data
      await loadWalletData();
      
      setShowTopup(false);
      setTopupAmount(25);
      setShowSuccess(true);

      // Notify other components
      window.dispatchEvent(new CustomEvent('walletUpdated'));

    } catch (error) {
      console.error('Error processing top-up:', error);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'error',
          message: 'Failed to process top-up. Please try again.'
        }
      }));
    } finally {
      setProcessing(false);
    }
  };

  const handleTopupError = (error: string) => {
    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'error',
        message: `Top-up failed: ${error}`
      }
    }));
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'topup':
      case 'refund':
      case 'bonus':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-red-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'topup':
      case 'refund':
      case 'bonus':
        return 'text-green-600';
      case 'payment':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {(loading || processing) && <LoadingScreen message={processing ? "Processing payment..." : "Loading wallet..."} type="wallet" />}
      
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={() => setShowSuccess(false)}
        type="wallet"
        message="Funds Added Successfully!"
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <Wallet className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Wallet</h2>
                  <p className="text-gray-600">Manage your account balance</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <SkeletonLoader type="profile" />
            ) : (
              <>
                {/* Balance Card */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white mb-6 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-purple-100 text-sm font-medium mb-2">Available Balance</p>
                        <p className="text-4xl font-bold">€{walletData.balance.toFixed(2)}</p>
                      </div>
                      <Wallet className="h-12 w-12 text-purple-200" />
                    </div>
                    
                    <button
                      onClick={() => setShowTopup(true)}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Add Funds
                    </button>
                  </div>
                </div>

                {/* Quick Top-up Options */}
                {!showTopup && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Top-up</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {[25, 50, 100, 200].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => {
                            setTopupAmount(amount);
                            setShowTopup(true);
                          }}
                          className="border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                        >
                          <p className="font-bold text-gray-900 text-lg">€{amount}</p>
                          <p className="text-xs text-gray-500 mt-1">Quick add</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top-up Form */}
                {showTopup && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-6 mb-6 border border-purple-200 shadow-inner">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">Add Funds</h3>
                      <button
                        onClick={() => setShowTopup(false)}
                        className="text-gray-400 hover:text-gray-600 p-1 hover:bg-white rounded-full transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Top-up Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-semibold text-lg">€</span>
                        <input
                          type="number"
                          value={topupAmount}
                          onChange={(e) => setTopupAmount(Number(e.target.value))}
                          min="5"
                          max="1000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold shadow-sm"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Minimum: €5, Maximum: €1,000</p>
                    </div>

                    <PaymentForm
                      amount={topupAmount}
                      onSuccess={handleTopupSuccess}
                      onError={handleTopupError}
                      loading={processing}
                    />
                  </div>
                )}

                {/* Transaction History */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold flex items-center">
                      <History className="h-5 w-5 mr-2 text-gray-600" />
                      Transaction History
                    </h3>
                  </div>

                  {walletData.transactions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="bg-gray-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <History className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium">No transactions yet</p>
                      <p className="text-sm mt-2">Start by adding funds to your wallet</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {walletData.transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300 bg-white">
                          <div className="flex items-center">
                            <div className="mr-3">
                              {getTransactionIcon(transaction.type)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 capitalize">{transaction.type}</p>
                              <p className="text-sm text-gray-600">{transaction.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(transaction.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-lg ${getTransactionColor(transaction.type)}`}>
                              {transaction.type === 'payment' ? '-' : '+'}€{transaction.amount.toFixed(2)}
                            </p>
                            <div className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                              <span className="text-xs text-green-600 capitalize">{transaction.status}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Export wallet hook for global use
export const useWallet = () => {
  const { user } = useAuth();

  const getBalance = async (): Promise<number> => {
    if (!user) return 0;
    
    try {
      const { data: wallet } = await db.getUserWallet(user.id);
      return parseFloat(wallet?.balance.toString() || '0');
    } catch (error) {
      console.error('Error getting wallet balance:', error);
      return 0;
    }
  };

  const useBalance = async (amount: number, description: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data: wallet } = await db.getUserWallet(user.id);
      const currentBalance = parseFloat(wallet?.balance.toString() || '0');
      
      if (currentBalance >= amount) {
        const newBalance = currentBalance - amount;
        await db.updateWalletBalance(wallet.id, newBalance);
        
        await db.addWalletTransaction({
          wallet_id: wallet.id,
          user_id: user.id,
          type: 'payment',
          amount,
          description,
          status: 'completed'
        });

        window.dispatchEvent(new CustomEvent('walletUpdated'));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error using wallet balance:', error);
      return false;
    }
  };

  return { getBalance, useBalance };
};