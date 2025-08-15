import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

interface ErrorAlertProps {
  error: string;
  onDismiss?: () => void;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorAlert({ error, onDismiss, onRetry, className = '' }: ErrorAlertProps) {
  return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800">{error}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex space-x-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Retry"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-red-600 hover:text-red-800 transition-colors"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}