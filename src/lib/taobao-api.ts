const TAOBAO_API_KEY = import.meta.env.VITE_TAOBAO_API_KEY || 'demo_key';
const TAOBAO_API_BASE_URL = 'https://api.taobao-scraping-api.com';

export interface TaobaoProduct {
  num_iid: string;
  title: string;
  desc_short: string;
  price: string;
  original_price?: string;
  nick: string;
  pic_url: string;
  brand: string;
  detail_url: string;
  desc: string;
  item_imgs: Array<{ url: string }>;
  location: string;
  total_sold: string;
  seller_info: {
    nick: string;
    item_score: string;
    shop_name: string;
    delivery_score: string;
    user_num_id: string;
  };
  props: Array<{ name: string; value: string }>;
  skus?: any;
  item_weight?: number;
  post_fee?: number;
  express_fee?: number;
  ems_fee?: number;
  shipping_to?: string;
  has_discount?: string;
  video?: Array<any>;
  prop_imgs?: any;
  props_list?: any;
  seller_id?: string;
  shop_id?: string;
}

export interface TaobaoSearchResponse {
  items: {
    page: string;
    real_total_results: number;
    total_results: number;
    page_size: number;
    pagecount: number;
    item: TaobaoProduct[];
  };
  error_code: string;
  reason: string;
}

export interface TaobaoProductDetailResponse {
  item: TaobaoProduct;
  error_code: string;
  reason: string;
}

class TaobaoAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = TAOBAO_API_KEY;
    this.baseUrl = TAOBAO_API_BASE_URL;
  }

  private async makeRequest(endpoint: string, params: Record<string, any>): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    params['apikey'] = this.apiKey;

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result === false) {
      console.error('[TaobaoAPI] API returned failure:', data);
      throw new Error(`API returned error: ${data?.data?.message || 'Unknown error'}`);
    }

    if (data.result === true && data.data) {
      return data.data;
    }

    console.error('[TaobaoAPI] Unexpected response:', data);
    throw new Error('API returned invalid response format.');
  }

  async searchProducts(query: string, pageNum = 1): Promise<TaobaoSearchResponse> {
    return this.makeRequest('/taobao/searchItem', {
      q: query,
      pageNum,
    });
  }

  async getItemById(itemId: string): Promise<TaobaoProductDetailResponse> {
    return this.makeRequest('/taobao/getItem', {
      id: itemId,
    });
  }
}

export const taobaoAPI = new TaobaoAPI();
