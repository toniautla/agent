import React, { useState, useEffect } from 'react';
import { Bell, TrendingDown, TrendingUp, Target, X, Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import SkeletonLoader from './SkeletonLoader';

interface PriceAlert {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  alertType: 'below' | 'above';
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

interface PriceAlertsProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productTitle?: string;
  productImage?: string;
  currentPrice?: number;
}

export default function PriceAlerts({ 
  isOpen, 
  onClose, 
  productId, 
  productTitle, 
  productImage, 
  currentPrice 
}: PriceAlertsProps) {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState<PriceAlert | null>(null);
  const [formData, setFormData] = useState({
    targetPrice: currentPrice || 0,
    alertType: 'below' as 'below' | 'above'
  });

  useEffect(() => {
    if (user && isOpen) {
      loadAlerts();
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (productId && currentPrice) {
      setFormData({ targetPrice: currentPrice * 0.9, alertType: 'below' });
    }
  }, [productId, currentPrice]);

  const loadAlerts = () => {
    if (!user) return;

    try {
      setLoading(true);
      const savedAlerts = localStorage.getItem(`priceAlerts_${user.id}`);
      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      }
    } catch (error) {
      console.error('Error loading price alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAlerts = (newAlerts: PriceAlert[]) => {
    if (!user) return;
    
    localStorage.setItem(`priceAlerts_${user.id}`, JSON.stringify(newAlerts));
    setAlerts(newAlerts);
  };

  const createAlert = () => {
    if (!user || !productId || !productTitle || !currentPrice) return;

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      productId,
      productTitle,
      productImage: productImage || '',
      currentPrice,
      targetPrice: formData.targetPrice,
      alertType: formData.alertType,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    const updatedAlerts = [...alerts, newAlert];
    saveAlerts(updatedAlerts);
    
    setShowCreateForm(false);
    setFormData({ targetPrice: currentPrice * 0.9, alertType: 'below' });

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Price alert created successfully!'
      }
    }));
  };

  const updateAlert = () => {
    if (!editingAlert) return;

    const updatedAlerts = alerts.map(alert => 
      alert.id === editingAlert.id 
        ? { ...alert, targetPrice: formData.targetPrice, alertType: formData.alertType }
        : alert
    );
    
    saveAlerts(updatedAlerts);
    setEditingAlert(null);
    setFormData({ targetPrice: 0, alertType: 'below' });

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Price alert updated successfully!'
      }
    }));
  };

  const deleteAlert = (alertId: string) => {
    const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
    saveAlerts(updatedAlerts);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        message: 'Price alert deleted'
      }
    }));
  };

  const toggleAlert = (alertId: string) => {
    const updatedAlerts = alerts.map(alert => 
      alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
    );
    saveAlerts(updatedAlerts);
  };

  const simulatePriceCheck = () => {
    // Simulate price changes for demo
    const updatedAlerts = alerts.map(alert => {
      if (!alert.isActive || alert.triggeredAt) return alert;

      const priceChange = (Math.random() - 0.5) * 10; // Random price change
      const newPrice = Math.max(1, alert.currentPrice + priceChange);
      
      const shouldTrigger = 
        (alert.alertType === 'below' && newPrice <= alert.targetPrice) ||
        (alert.alertType === 'above' && newPrice >= alert.targetPrice);

      if (shouldTrigger) {
        window.dispatchEvent(new CustomEvent('showNotification', {
          detail: {
            type: 'success',
            message: `🎯 Price Alert: ${alert.productTitle} is now €${newPrice.toFixed(2)}!`
          }
        }));

        return {
          ...alert,
          currentPrice: newPrice,
          triggeredAt: new Date().toISOString(),
          isActive: false
        };
      }

      return { ...alert, currentPrice: newPrice };
    });

    saveAlerts(updatedAlerts);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-4 mr-6">
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Price Alerts</h2>
                <p className="text-gray-600 mt-1">Get notified when prices drop or rise</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={simulatePriceCheck}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl font-medium transition-colors"
              >
                Check Prices
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Create Alert for Current Product */}
          {productId && !showCreateForm && !editingAlert && (
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 mb-8 border border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={productImage}
                    alt={productTitle}
                    className="w-16 h-16 rounded-xl object-cover border mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{productTitle}</h4>
                    <p className="text-sm text-gray-600">Current price: €{currentPrice?.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center shadow-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Alert
                </button>
              </div>
            </div>
          )}

          {/* Create/Edit Form */}
          {(showCreateForm || editingAlert) && (
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {editingAlert ? 'Edit Price Alert' : 'Create Price Alert'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Target Price (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.targetPrice}
                    onChange={(e) => setFormData({ ...formData, targetPrice: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Alert When Price
                  </label>
                  <select
                    value={formData.alertType}
                    onChange={(e) => setFormData({ ...formData, alertType: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="below">Drops below target</option>
                    <option value="above">Rises above target</option>
                  </select>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={editingAlert ? updateAlert : createAlert}
                  disabled={!formData.targetPrice}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                >
                  {editingAlert ? 'Update Alert' : 'Create Alert'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingAlert(null);
                    setFormData({ targetPrice: currentPrice || 0, alertType: 'below' });
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Alerts List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Your Price Alerts</h3>
              <span className="text-sm text-gray-500">{alerts.length} alerts created</span>
            </div>

            {loading ? (
              <SkeletonLoader type="list" count={3} />
            ) : alerts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Bell className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-xl font-medium">No price alerts yet</p>
                <p className="text-sm mt-2">Create alerts to track price changes on your favorite products</p>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-2xl p-6 transition-all duration-300 ${
                      alert.isActive 
                        ? 'border-orange-200 bg-orange-50' 
                        : alert.triggeredAt 
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={alert.productImage || 'https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg?auto=compress&cs=tinysrgb&w=100'}
                          alt={alert.productTitle}
                          className="w-16 h-16 rounded-xl object-cover border"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{alert.productTitle}</h4>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center">
                              <span className="text-sm text-gray-600">Current: €{alert.currentPrice.toFixed(2)}</span>
                              {alert.alertType === 'below' ? (
                                <TrendingDown className="h-4 w-4 ml-1 text-red-500" />
                              ) : (
                                <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                              )}
                            </div>
                            <div className="flex items-center">
                              <Target className="h-4 w-4 mr-1 text-orange-500" />
                              <span className="text-sm text-gray-600">Target: €{alert.targetPrice.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              alert.isActive 
                                ? 'bg-orange-100 text-orange-800' 
                                : alert.triggeredAt 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}>
                              {alert.isActive ? 'Active' : alert.triggeredAt ? 'Triggered' : 'Inactive'}
                            </span>
                            <span className="text-xs text-gray-500">
                              Created {new Date(alert.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleAlert(alert.id)}
                          className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                            alert.isActive 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {alert.isActive ? 'Pause' : 'Activate'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingAlert(alert);
                            setFormData({ targetPrice: alert.targetPrice, alertType: alert.alertType });
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-colors"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteAlert(alert.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">How Price Alerts Work</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Set target prices for products you're interested in</li>
              <li>• Get instant notifications when prices reach your target</li>
              <li>• Track price trends and make informed purchase decisions</li>
              <li>• Alerts are checked multiple times daily for accuracy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}