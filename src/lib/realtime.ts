import { supabase } from './supabase';

export class RealtimeSync {
  private static instance: RealtimeSync;
  private subscriptions: Map<string, any> = new Map();

  static getInstance(): RealtimeSync {
    if (!RealtimeSync.instance) {
      RealtimeSync.instance = new RealtimeSync();
    }
    return RealtimeSync.instance;
  }

  subscribeToOrders(userId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();

    this.subscriptions.set(`orders_${userId}`, subscription);
    return subscription;
  }

  subscribeToSupportTickets(userId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel('support_tickets')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'support_tickets',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();

    this.subscriptions.set(`tickets_${userId}`, subscription);
    return subscription;
  }

  subscribeToWallet(userId: string, callback: (payload: any) => void) {
    const subscription = supabase
      .channel('wallets')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'wallets',
          filter: `user_id=eq.${userId}`
        }, 
        callback
      )
      .subscribe();

    this.subscriptions.set(`wallet_${userId}`, subscription);
    return subscription;
  }

  subscribeToAllOrders(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('all_orders')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'orders'
        }, 
        callback
      )
      .subscribe();

    this.subscriptions.set('all_orders', subscription);
    return subscription;
  }

  subscribeToAllTickets(callback: (payload: any) => void) {
    const subscription = supabase
      .channel('all_tickets')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'support_tickets'
        }, 
        callback
      )
      .subscribe();

    this.subscriptions.set('all_tickets', subscription);
    return subscription;
  }

  unsubscribe(key: string) {
    const subscription = this.subscriptions.get(key);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(key);
    }
  }

  unsubscribeAll() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions.clear();
  }
}

export const realtimeSync = RealtimeSync.getInstance();