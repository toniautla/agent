import React, { useState } from 'react';
import { X, Star, ShoppingCart, Package, Truck, Shield, Plus, Minus, Heart, Share2, Bell } from 'lucide-react';
import ProductVariantSelector from './ProductVariantSelector';
import { useWishlist } from './WishlistSystem';
import PriceAlerts from './PriceAlerts';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onAddToCart: (product: any, quantity: number, variants?: any) => void;
}

export default function ProductDetailModal({ isOpen, onClose, product, onAddToCart }: ProductDetailModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
  const [showPriceAlerts, setShowPriceAlerts] = useState(false);
  
  const { addToWishlist, isInWishlist } = useWishlist();

  if (!isOpen || !product) return null;

  const images = product.item_imgs || [{ url: product.pic_url }];
  const price = parseFloat(product.price) || 0;
  const originalPrice = product.original_price ? parseFloat(product.original_price) : null;
  const isWishlisted = isInWishlist(product.num_iid || product.id);

  // Real variants from API response
  const variants = product.skus ? Object.keys(product.skus).map(key => ({
    name: key,
    options: product.skus[key].map((option: any) => ({
      value: option.name || option.value,
      price_adjustment: option.price_diff || 0,
      stock: option.stock || 999,
      image_url: option.image
    }))
  })) : [];

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: value
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = price;
    
    variants.forEach(variant => {
      const selectedOption = variant.options.find(opt => opt.value === selectedVariants[variant.name]);
      if (selectedOption?.price_adjustment) {
        totalPrice += selectedOption.price_adjustment;
      }
    });
    
    return totalPrice * quantity;
  };

  const handleAddToCart = () => {
    const productWithVariants = {
      ...product,
      selectedVariants,
      finalPrice: calculateTotalPrice() / quantity
    };
    
    onAddToCart(productWithVariants, quantity, selectedVariants);
    onClose();
  };

  const handleWishlist = () => {
    addToWishlist(product);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out this product on Shipzobuy: ${product.title}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      window.dispatchEvent(new CustomEvent('showNotification', {
        detail: {
          type: 'success',
          message: 'Product link copied to clipboard!'
        }
      }));
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Product Details</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowPriceAlerts(true)}
                  className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 bg-orange-100 text-orange-600 hover:bg-orange-200`}
                  title="Set Price Alert"
                >
                  <Bell className="h-6 w-6" />
                </button>
                <button
                  onClick={handleWishlist}
                  className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                    isWishlisted ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                  }`}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-all duration-300 transform hover:scale-110"
                  title="Share Product"
                >
                  <Share2 className="h-6 w-6" />
                </button>
                <button
                  onClick={onClose}
                  className="p-3 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div>
                <div className="mb-6 relative group">
                  <img
                    src={images[selectedImage]?.url || product.pic_url}
                    alt={product.title}
                    className="w-full h-96 object-cover rounded-3xl border border-gray-200 shadow-lg"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      TaoBao
                    </span>
                  </div>
                  {originalPrice && originalPrice > price && (
                    <div className="absolute top-6 right-6 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                      -{Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.slice(0, 4).map((img: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === index ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-6">{product.title}</h1>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 ml-3 text-lg">
                      4.0 ({product.total_sold || '0'} sold)
                    </span>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-5xl font-bold text-blue-600">
                        €{calculateTotalPrice().toFixed(2)}
                      </span>
                      {originalPrice && originalPrice > price && (
                        <span className="text-2xl text-gray-500 line-through">
                          €{(originalPrice * quantity).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">+ €1.50 service fee + shipping</p>
                  </div>
                </div>

                {/* Variants */}
                {variants.length > 0 && (
                  <ProductVariantSelector
                    variants={variants}
                    selectedVariants={selectedVariants}
                    onVariantChange={handleVariantChange}
                  />
                )}

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="px-8 py-4 border-2 border-gray-300 rounded-2xl min-w-[100px] text-center font-bold text-2xl">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-4 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-110"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center"
                >
                  <ShoppingCart className="h-7 w-7 mr-4" />
                  Add to Cart - €{calculateTotalPrice().toFixed(2)}
                </button>

                {/* Service Features */}
                <div className="grid grid-cols-1 gap-4 pt-8 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-600 bg-blue-50 p-4 rounded-2xl">
                    <Package className="h-6 w-6 mr-4 text-blue-600" />
                    Professional purchasing service with quality guarantee
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-green-50 p-4 rounded-2xl">
                    <Shield className="h-6 w-6 mr-4 text-green-600" />
                    Optional quality inspection with detailed photo reports
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-orange-50 p-4 rounded-2xl">
                    <Truck className="h-6 w-6 mr-4 text-orange-600" />
                    Fast worldwide shipping with tracking
                  </div>
                </div>

                {/* Seller Info */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4 text-lg">Seller Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Store:</span>
                      <span className="font-medium">{product.seller_info?.shop_name || product.nick}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{product.location || 'China'}</span>
                    </div>
                    {product.seller_info?.item_score && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{product.seller_info.item_score}/5.0</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            {product.desc && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Product Description</h3>
                <div className="prose max-w-none text-gray-600 bg-gray-50 rounded-2xl p-8">
                  <p className="leading-relaxed text-lg">{product.desc_short || product.desc}</p>
                </div>
              </div>
            )}

            {/* Specifications */}
            {product.props && product.props.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.props.slice(0, 8).map((prop: any, index: number) => (
                    <div key={index} className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                      <span className="text-gray-600 font-medium">{prop.name}:</span>
                      <span className="text-gray-900 font-semibold">{prop.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <PriceAlerts
        isOpen={showPriceAlerts}
        onClose={() => setShowPriceAlerts(false)}
        productId={product.num_iid || product.id}
        productTitle={product.title}
        productImage={product.pic_url}
        currentPrice={price}
      />
    </>
  );
}