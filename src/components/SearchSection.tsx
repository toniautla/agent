import React, { useState } from 'react';
import { Search, Upload, Link, Camera, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/supabase';

export default function SearchSection() {
  const { user, isAuthReady, canFetchData } = useAuth();
  const { searchProducts, searchByImage } = useProducts({ 
    user, 
    authLoading: !isAuthReady, 
    hydrated: isAuthReady, 
    isAuthReady, 
    canFetchData 
  });

  const [searchType, setSearchType] = useState<'text' | 'image' | 'link'>('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImagePreview(null);
  };

  const handleSearch = async () => {
    if (!canFetchData) {
      alert('Please sign in and verify your email to search products');
      return;
    }

    if (!searchQuery && !uploadedImage) return;

    setIsSearching(true);

    try {
      let results = [];

      if (searchType === 'image' && uploadedImage) {
        results = await searchByImage(uploadedImage);
      } else if (searchQuery) {
        results = await searchProducts(searchQuery, 1); // ✅ FIXED HERE
      }

      if (user && searchQuery) {
        try {
          await db.logSearch({
            user_id: user.id,
            search_type: searchType,
            search_query: searchQuery,
            results_count: results.length,
          });
        } catch (logError) {
          console.warn('Failed to log search:', logError);
        }
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Products
          </h2>
          <p className="text-xl text-gray-600">
            Search by text, image, or paste direct links from TaoBao and Weidian
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setSearchType('text')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  searchType === 'text'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Search className="h-5 w-5 inline mr-2" />
                Text Search
              </button>
              <button
                onClick={() => setSearchType('image')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  searchType === 'image'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Camera className="h-5 w-5 inline mr-2" />
                Image Search
              </button>
              <button
                onClick={() => setSearchType('link')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  searchType === 'link'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Link className="h-5 w-5 inline mr-2" />
                Link Import
              </button>
            </div>
          </div>

          {searchType === 'text' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for products, brands, or categories..."
                  className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
              </div>
            </div>
          )}

          {searchType === 'image' && (
            <div className="space-y-4">
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    Upload an image to search for similar products
                  </p>
                  <label className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Uploaded"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {searchType === 'link' && (
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Paste TaoBao or Weidian link here..."
                  className="w-full px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <Link className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 text-center">
                Supported: TaoBao, Weidian, TMall, and other Chinese marketplace links
              </p>
            </div>
          )}

          <button
            onClick={handleSearch}
            disabled={isSearching || (!searchQuery && !uploadedImage) || !canFetchData}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 px-8 rounded-lg font-semibold text-lg transition-colors mt-6 flex items-center justify-center"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Searching...
              </>
            ) : !canFetchData ? (
              'Sign in to Search'
            ) : (
              'Search Products'
            )}
          </button>

          {!canFetchData && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Please sign in and verify your email to search products
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
