export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          id: string
          user_id: string
          name: string
          street_address: string
          city: string
          state: string | null
          postal_code: string
          country: string
          is_default: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          street_address: string
          city: string
          state?: string | null
          postal_code: string
          country?: string
          is_default?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          street_address?: string
          city?: string
          state?: string | null
          postal_code?: string
          country?: string
          is_default?: boolean
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity?: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          order_number: string
          status: 'pending' | 'purchased' | 'warehouse' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          service_fee: number
          shipping_cost: number | null
          total: number
          shipping_address_id: string | null
          shipping_option_id: string | null
          tracking_number: string | null
          warehouse_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          order_number?: string
          status?: 'pending' | 'purchased' | 'warehouse' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          service_fee?: number
          shipping_cost?: number | null
          total?: number
          shipping_address_id?: string | null
          shipping_option_id?: string | null
          tracking_number?: string | null
          warehouse_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          order_number?: string
          status?: 'pending' | 'purchased' | 'warehouse' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          service_fee?: number
          shipping_cost?: number | null
          total?: number
          shipping_address_id?: string | null
          shipping_option_id?: string | null
          tracking_number?: string | null
          warehouse_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      product_searches: {
        Row: {
          id: string
          user_id: string | null
          search_type: 'text' | 'image' | 'link'
          search_query: string | null
          results_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          search_type: 'text' | 'image' | 'link'
          search_query?: string | null
          results_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          search_type?: 'text' | 'image' | 'link'
          search_query?: string | null
          results_count?: number
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          description: string | null
          price: number
          original_price: number | null
          currency: string
          image_url: string | null
          seller_name: string | null
          platform: 'taobao' | 'weidian' | 'tmall'
          external_id: string | null
          external_url: string | null
          rating: number
          review_count: number
          category: string | null
          tags: string[] | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          price: number
          original_price?: number | null
          currency?: string
          image_url?: string | null
          seller_name?: string | null
          platform: 'taobao' | 'weidian' | 'tmall'
          external_id?: string | null
          external_url?: string | null
          rating?: number
          review_count?: number
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          price?: number
          original_price?: number | null
          currency?: string
          image_url?: string | null
          seller_name?: string | null
          platform?: 'taobao' | 'weidian' | 'tmall'
          external_id?: string | null
          external_url?: string | null
          rating?: number
          review_count?: number
          category?: string | null
          tags?: string[] | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      shipping_options: {
        Row: {
          id: string
          name: string
          provider: string
          estimated_days_min: number
          estimated_days_max: number
          base_price: number
          price_per_kg: number
          features: string[] | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          provider: string
          estimated_days_min: number
          estimated_days_max: number
          base_price: number
          price_per_kg?: number
          features?: string[] | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          provider?: string
          estimated_days_min?: number
          estimated_days_max?: number
          base_price?: number
          price_per_kg?: number
          features?: string[] | null
          is_active?: boolean
          created_at?: string
        }
      }
      warehouses: {
        Row: {
          id: string
          name: string
          location: string
          country: string
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          location: string
          country?: string
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          location?: string
          country?: string
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}