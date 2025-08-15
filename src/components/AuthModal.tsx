import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Gift, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from './LoadingScreen';
import SuccessAnimation from './SuccessAnimation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signIn, signUp, loading, error: authError } = useAuth();

  if (!isOpen) return null;

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setLocalError('Email and password are required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setLocalError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return false;
    }

    if (mode === 'signup') {
      if (!formData.firstName || !formData.lastName) {
        setLocalError('First and last name are required');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setLocalError('Passwords do not match');
        return false;
      }

      if (!agreedToTerms) {
        setLocalError('Please agree to the Terms of Service');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLocalError(null);
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        if (!error) {
          setShowSuccess(true);
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
        });
        
        if (!error) {
          setShowSuccess(true);
        }
      }
    } catch (err: any) {
      setLocalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
    setLocalError(null);
    setAgreedToTerms(false);
  };

  const switchMode = (newMode: 'signin' | 'signup') => {
    resetForm();
    setMode(newMode);
  };

  const displayError = localError || authError;

  return (
    <>
      {(loading || isSubmitting) && <LoadingScreen message="Authenticating..." type="auth" />}
      
      <SuccessAnimation
        isVisible={showSuccess}
        onComplete={() => {
          setShowSuccess(false);
          onClose();
        }}
        type={mode}
        message={mode === 'signup' ? 'Welcome to Shipzobuy!' : 'Welcome back!'}
        bonus={mode === 'signup' ? '€10 welcome bonus added to your wallet!' : undefined}
      />

      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
        <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-8 transform transition-all duration-500 scale-100 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {mode === 'signin' ? 'Welcome Back' : 'Join Shipzobuy'}
              </h2>
              <p className="text-gray-600 mt-2">
                {mode === 'signin' ? 'Sign in to your account' : 'Create your account and get €10 bonus'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {mode === 'signup' && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
              <div className="flex items-center justify-center mb-3">
                <Gift className="h-6 w-6 text-green-600 mr-2" />
                <Sparkles className="h-6 w-6 text-emerald-600 mr-2" />
                <span className="font-bold text-gray-800 text-lg">€10 Welcome Bonus!</span>
              </div>
              <p className="text-sm text-gray-700 text-center">
                Get instant credit when you create your account
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </button>
                </label>
              </div>
            )}

            {displayError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{displayError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account & Get €10 Bonus'}
            </button>
          </form>

          <div className="mt-8 text-center">
            {mode === 'signin' ? (
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('signup')}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign up for €10 bonus
                </button>
              </p>
            ) : (
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => switchMode('signin')}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}