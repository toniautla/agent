import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, db } from '../lib/supabase';
import { realtimeSync } from '../lib/realtime';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const initializeAuth = async () => {
    try {
      setLoading(true);
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setError(sessionError.message);
        return;
      }

      if (session?.user) {
        await handleUserSession(session.user);
      }
    } catch (err: any) {
      console.error('Auth initialization error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const handleUserSession = async (user: User) => {
    try {
      setUser(user);
      setError(null);

      // Get or create profile
      let { data: profileData, error: profileError } = await db.getProfile(user.id);
      
      if (profileError && profileError.message?.includes('No rows returned')) {
        // Create new profile
        const { data: newProfile, error: createError } = await db.createProfile({
          id: user.id,
          email: user.email || '',
          first_name: user.user_metadata?.first_name || '',
          last_name: user.user_metadata?.last_name || '',
          phone: user.user_metadata?.phone || '',
        });

        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          profileData = newProfile;
          
          // Create wallet for new user with €10 bonus
          const { data: wallet } = await db.createWallet(user.id);
          if (wallet) {
            await db.addWalletTransaction({
              wallet_id: wallet.id,
              user_id: user.id,
              type: 'bonus',
              amount: 10.00,
              description: 'Welcome bonus - Thank you for joining Shipzobuy!',
              status: 'completed'
            });

            // Add WELCOME10 coupon to user
            try {
              const { data: welcomeCoupon } = await db.validateCoupon('WELCOME10');
              if (welcomeCoupon) {
                await db.addUserCoupon(user.id, welcomeCoupon.id);
              }
            } catch (couponError) {
              console.log('Welcome coupon not available:', couponError);
            }
          }
        }
      }

      setProfile(profileData);

      // Set up real-time subscriptions
      if (profileData) {
        realtimeSync.subscribeToWallet(user.id, () => {
          window.dispatchEvent(new CustomEvent('walletUpdated'));
        });
      }

    } catch (err: any) {
      console.error('Error handling user session:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      switch (event) {
        case 'SIGNED_IN':
        case 'TOKEN_REFRESHED':
          if (session?.user) {
            await handleUserSession(session.user);
          }
          break;
        case 'SIGNED_OUT':
          setUser(null);
          setProfile(null);
          setError(null);
          realtimeSync.unsubscribeAll();
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
      realtimeSync.unsubscribeAll();
    };
  }, []);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) {
        setError(error.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err: any) {
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
        return { data: null, error };
      }

      return { data, error: null };
    } catch (err: any) {
      setError(err.message);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
      }

      setUser(null);
      setProfile(null);
      realtimeSync.unsubscribeAll();
      return { error };
    } catch (err: any) {
      setError(err.message);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: any) => {
    if (!user) return { error: new Error('No user logged in') };
    
    try {
      const { data, error } = await db.updateProfile(user.id, profileData);
      
      if (error) {
        setError(error.message);
        return { data: null, error };
      }

      setProfile(data);
      return { data, error: null };
    } catch (err: any) {
      setError(err.message);
      return { data: null, error: err };
    }
  };

  return {
    user,
    profile,
    loading,
    error,
    initialized,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    updateProfile,
    clearError: () => setError(null),
  };
}