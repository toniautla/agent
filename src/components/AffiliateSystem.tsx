import React, { useState, useEffect } from 'react';
import { Users, DollarSign, Share2, Copy, TrendingUp, Gift, Link, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface AffiliateStats {
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  clickCount: number;
  conversionRate: number;
  thisMonthEarnings: number;
}

interface Referral {
  id: string;
  email: string;
  signupDate: string;
  firstOrderDate?: string;
  totalOrders: number;
  totalSpent: number;
  commission: number;
  status: 'pending' | 'active' | 'inactive';
}

export default function AffiliateSystem() {
  const { user } = useAuth();
  const [affiliateCode, setAffiliateCode] = useState('');
  const [stats, setStats] = useState<AffiliateStats>({
    totalReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    clickCount: 0,
    conversionRate: 0,
    thisMonthEarnings: 0
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      loadAffiliateData();
    }
  }, [user]);

  const loadAffiliateData = () => {
    if (!user) return;

    // Generate affiliate code based on user ID
    const code = `SZB${user.id.slice(0, 6).toUpperCase()}`;
    setAffiliateCode(code);
    
    // Load affiliate data from localStorage
    const affiliateData = localStorage.getItem(`affiliate_${user.id}`);
    if (affiliateData) {
      const data = JSON.parse(affiliateData);
      setStats(data.stats || stats);
      setReferrals(data.referrals || []);
    } else {
      // Initialize with some demo data for new affiliates
      const initialStats = {
        totalReferrals: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        clickCount: 0,
        conversionRate: 0,
        thisMonthEarnings: 0
      };
      setStats(initialStats);
      saveAffiliateData(initialStats, []);
    }

    // Track affiliate link clicks
    trackAffiliateActivity();
  };

  const saveAffiliateData = (newStats: AffiliateStats, newReferrals: Referral[]) => {
    if (!user) return;

    const data = {
      stats: newStats,
      referrals: newReferrals,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(`affiliate_${user.id}`, JSON.stringify(data));
    setStats(newStats);
    setReferrals(newReferrals);
  };

  const trackAffiliateActivity = () => {
    // Check if someone used this user's referral code
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');
    
    if (referralCode === affiliateCode) {
      // Track click
      const newStats = {
        ...stats,
        clickCount: stats.clickCount + 1
      };
      saveAffiliateData(newStats, referrals);
    }
  };

  const processReferralSignup = (referredUserEmail: string) => {
    if (!user) return;

    const newReferral: Referral = {
      id: Date.now().toString(),
      email: referredUserEmail,
      signupDate: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      commission: 0,
      status: 'pending'
    };

    const newReferrals = [...referrals, newReferral];
    const newStats = {
      ...stats,
      totalReferrals: stats.totalReferrals + 1
    };

    saveAffiliateData(newStats, newReferrals);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'New referral registered! You\'ll earn commission on their orders.'
      }
    }));
  };

  const processReferralOrder = (referredUserEmail: string, orderAmount: number) => {
    if (!user) return;

    const commission = orderAmount * 0.05; // 5% commission
    
    const updatedReferrals = referrals.map(referral => {
      if (referral.email === referredUserEmail) {
        return {
          ...referral,
          totalOrders: referral.totalOrders + 1,
          totalSpent: referral.totalSpent + orderAmount,
          commission: referral.commission + commission,
          status: 'active' as const,
          firstOrderDate: referral.firstOrderDate || new Date().toISOString()
        };
      }
      return referral;
    });

    const newStats = {
      ...stats,
      totalEarnings: stats.totalEarnings + commission,
      pendingEarnings: stats.pendingEarnings + commission,
      thisMonthEarnings: stats.thisMonthEarnings + commission,
      conversionRate: (updatedReferrals.filter(r => r.status === 'active').length / stats.totalReferrals) * 100
    };

    saveAffiliateData(newStats, updatedReferrals);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: `You earned $${commission.toFixed(2)} commission from a referral order!`
      }
    }));
  };

  const affiliateUrl = `${window.location.origin}?ref=${affiliateCode}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    window.dispatchEvent(new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        message: 'Copied to clipboard!'
      }
    }));
  };

  const shareLinks = [
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateUrl)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      icon: '📘'
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateUrl)}&text=Check out Shipzobuy - Your gateway to Chinese markets! Get $10 welcome bonus!`,
      color: 'bg-sky-500 hover:bg-sky-600',
      icon: '🐦'
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out Shipzobuy - Your gateway to Chinese markets! Get $10 welcome bonus! ${affiliateUrl}`)}`,
      color: 'bg-green-600 hover:bg-green-700',
      icon: '💬'
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(affiliateUrl)}&text=Check out Shipzobuy - Your gateway to Chinese markets!`,
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '✈️'
    }
  ];

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Our Affiliate Program</h3>
        <p className="text-gray-600 mb-4">Sign in to start earning 5% commissions by referring new customers!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Affiliate Program</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Earn 5% commission on every order from customers you refer. Start sharing and earning today!
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'referrals', label: 'My Referrals' },
              { id: 'share', label: 'Share & Earn' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-blue-100">Total Referrals</p>
                      <p className="text-2xl font-bold">{stats.totalReferrals}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <DollarSign className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-green-100">Total Earnings</p>
                      <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <Gift className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-yellow-100">Pending Earnings</p>
                      <p className="text-2xl font-bold">${stats.pendingEarnings.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-purple-100">Conversion Rate</p>
                      <p className="text-2xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">This Month's Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">${stats.thisMonthEarnings.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{stats.clickCount}</p>
                    <p className="text-sm text-gray-600">Link Clicks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{referrals.filter(r => r.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">Active Referrals</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'referrals' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Your Referrals</h3>
              
              {referrals.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No referrals yet</p>
                  <p className="text-sm">Start sharing your link to earn commissions!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Referral
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Signup Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Orders
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total Spent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Your Commission
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {referrals.map((referral) => (
                        <tr key={referral.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {referral.email.replace(/(.{3}).*(@.*)/, '$1***$2')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(referral.signupDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {referral.totalOrders}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${referral.totalSpent.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${referral.commission.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              referral.status === 'active' ? 'bg-green-100 text-green-800' :
                              referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {referral.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'share' && (
            <div className="space-y-8">
              {/* Affiliate Link */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Affiliate Link</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="flex">
                      <input
                        type="text"
                        value={affiliateUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-gray-700"
                      />
                      <button
                        onClick={() => copyToClipboard(affiliateUrl)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors flex items-center"
                      >
                        {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Share this link to earn 5% commission on every order from new customers.
                </p>
              </div>

              {/* Affiliate Code */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Affiliate Code</h3>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <span className="font-mono text-lg font-bold text-blue-600">{affiliateCode}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(affiliateCode)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Customers can enter this code during checkout to link their order to you.
                </p>
              </div>

              {/* Social Sharing */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Share on Social Media</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shareLinks.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${platform.color} text-white px-4 py-3 rounded-lg text-center font-medium transition-colors flex items-center justify-center`}
                    >
                      <span className="mr-2">{platform.icon}</span>
                      {platform.name}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Marketing Materials */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Marketing Materials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Sample Social Media Post</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="mb-2">🛒 Discover amazing products from Chinese markets with Shipzobuy!</p>
                      <p className="mb-2">✅ Professional agent service</p>
                      <p className="mb-2">🌍 Worldwide shipping</p>
                      <p className="mb-2">💰 Get $10 welcome bonus!</p>
                      <p className="text-blue-600">{affiliateUrl}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`🛒 Discover amazing products from Chinese markets with Shipzobuy!\n✅ Professional agent service\n🌍 Worldwide shipping\n💰 Get $10 welcome bonus!\n${affiliateUrl}`)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Copy Post
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Email Template</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm">
                      <p className="mb-2">Hi there!</p>
                      <p className="mb-2">I wanted to share this amazing service I've been using to shop from Chinese marketplaces like TaoBao and Weidian.</p>
                      <p className="mb-2">Shipzobuy handles everything - purchasing, quality inspection, and worldwide shipping. Plus, you get a $10 welcome bonus!</p>
                      <p className="text-blue-600">{affiliateUrl}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`Hi there!\n\nI wanted to share this amazing service I've been using to shop from Chinese marketplaces like TaoBao and Weidian.\n\nShipzobuy handles everything - purchasing, quality inspection, and worldwide shipping. Plus, you get a $10 welcome bonus!\n\n${affiliateUrl}`)}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Copy Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Share Your Link</h4>
            <p className="text-sm text-gray-600">Share your unique affiliate link with friends, family, or on social media platforms.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">They Sign Up & Order</h4>
            <p className="text-sm text-gray-600">When someone clicks your link, signs up, and places their first order, you earn commission.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Earn Commission</h4>
            <p className="text-sm text-gray-600">Receive 5% commission on every order from customers you refer, paid monthly.</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Affiliate Program Terms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Commission Structure</h4>
            <ul className="space-y-1">
              <li>• 5% commission on all referred orders</li>
              <li>• Lifetime commissions on referrals</li>
              <li>• No cap on earnings potential</li>
              <li>• Real-time tracking and reporting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Payment Terms</h4>
            <ul className="space-y-1">
              <li>• Monthly payments via PayPal or bank transfer</li>
              <li>• Minimum payout threshold: $50</li>
              <li>• 30-day cookie tracking window</li>
              <li>• Payments processed by 15th of each month</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export affiliate functions for global use
export const useAffiliate = () => {
  const { user } = useAuth();

  const trackReferralSignup = (referredUserEmail: string, referralCode: string) => {
    // Find the affiliate user by code
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('affiliate_')) {
        const affiliateData = JSON.parse(localStorage.getItem(key) || '{}');
        const affiliateUserId = key.replace('affiliate_', '');
        const affiliateCode = `SZB${affiliateUserId.slice(0, 6).toUpperCase()}`;
        
        if (affiliateCode === referralCode) {
          // Process referral signup
          const newReferral = {
            id: Date.now().toString(),
            email: referredUserEmail,
            signupDate: new Date().toISOString(),
            totalOrders: 0,
            totalSpent: 0,
            commission: 0,
            status: 'pending'
          };

          const updatedData = {
            ...affiliateData,
            stats: {
              ...affiliateData.stats,
              totalReferrals: (affiliateData.stats?.totalReferrals || 0) + 1
            },
            referrals: [...(affiliateData.referrals || []), newReferral]
          };

          localStorage.setItem(key, JSON.stringify(updatedData));
          break;
        }
      }
    }
  };

  const trackReferralOrder = (userEmail: string, orderAmount: number) => {
    // Find and update referral data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('affiliate_')) {
        const affiliateData = JSON.parse(localStorage.getItem(key) || '{}');
        const referrals = affiliateData.referrals || [];
        
        const referralIndex = referrals.findIndex((r: any) => r.email === userEmail);
        if (referralIndex >= 0) {
          const commission = orderAmount * 0.05;
          referrals[referralIndex] = {
            ...referrals[referralIndex],
            totalOrders: referrals[referralIndex].totalOrders + 1,
            totalSpent: referrals[referralIndex].totalSpent + orderAmount,
            commission: referrals[referralIndex].commission + commission,
            status: 'active',
            firstOrderDate: referrals[referralIndex].firstOrderDate || new Date().toISOString()
          };

          const updatedData = {
            ...affiliateData,
            stats: {
              ...affiliateData.stats,
              totalEarnings: (affiliateData.stats?.totalEarnings || 0) + commission,
              pendingEarnings: (affiliateData.stats?.pendingEarnings || 0) + commission,
              thisMonthEarnings: (affiliateData.stats?.thisMonthEarnings || 0) + commission
            },
            referrals
          };

          localStorage.setItem(key, JSON.stringify(updatedData));
          break;
        }
      }
    }
  };

  return { trackReferralSignup, trackReferralOrder };
};