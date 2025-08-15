import React from 'react';

interface SkeletonLoaderProps {
  type?: 'card' | 'list' | 'profile' | 'table' | 'form' | 'text' | 'button' | 'avatar';
  count?: number;
  className?: string;
  height?: string;
  width?: string;
}

export default function SkeletonLoader({ 
  type = 'card', 
  count = 1, 
  className = '',
  height = 'auto',
  width = 'auto'
}: SkeletonLoaderProps) {
  const baseClasses = "animate-pulse bg-gray-200 rounded-lg";
  
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
              <div className="space-y-3">
                <div className="bg-gray-200 rounded-lg h-4 w-3/4"></div>
                <div className="bg-gray-200 rounded-lg h-4 w-1/2"></div>
                <div className="flex justify-between items-center">
                  <div className="bg-gray-200 rounded-lg h-6 w-20"></div>
                  <div className="bg-gray-200 rounded-lg h-8 w-16"></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="animate-pulse flex items-center space-x-4">
              <div className="bg-gray-200 rounded-xl h-16 w-16 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="bg-gray-200 rounded-lg h-4 w-3/4"></div>
                <div className="bg-gray-200 rounded-lg h-3 w-1/2"></div>
              </div>
              <div className="bg-gray-200 rounded-lg h-8 w-20"></div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="animate-pulse">
              <div className="flex items-center space-x-6 mb-6">
                <div className="bg-gray-200 rounded-full h-20 w-20 flex-shrink-0"></div>
                <div className="space-y-3 flex-1">
                  <div className="bg-gray-200 rounded-lg h-6 w-32"></div>
                  <div className="bg-gray-200 rounded-lg h-4 w-48"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="bg-gray-200 rounded-lg h-4 w-20"></div>
                    <div className="bg-gray-200 rounded-lg h-10 w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="animate-pulse">
              <div className="bg-gray-50 p-4 border-b border-gray-100">
                <div className="bg-gray-200 rounded-lg h-6 w-48"></div>
              </div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-200 rounded-lg h-4 w-24"></div>
                    <div className="bg-gray-200 rounded-lg h-4 w-32"></div>
                    <div className="bg-gray-200 rounded-lg h-4 w-20"></div>
                    <div className="bg-gray-200 rounded-lg h-4 w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="animate-pulse space-y-6">
              <div className="bg-gray-200 rounded-lg h-8 w-48 mb-8"></div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="bg-gray-200 rounded-lg h-4 w-24"></div>
                  <div className="bg-gray-200 rounded-xl h-12 w-full"></div>
                </div>
              ))}
              <div className="bg-gray-200 rounded-xl h-12 w-full mt-8"></div>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className={`${baseClasses} ${height !== 'auto' ? `h-${height}` : 'h-4'} ${width !== 'auto' ? `w-${width}` : 'w-full'}`}></div>
        );

      case 'button':
        return (
          <div className={`${baseClasses} h-10 w-24`}></div>
        );

      case 'avatar':
        return (
          <div className={`${baseClasses} rounded-full h-12 w-12`}></div>
        );

      default:
        return (
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-4 w-full"></div>
          </div>
        );
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}