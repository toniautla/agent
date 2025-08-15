import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="text-center">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mx-auto mb-2`} />
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}