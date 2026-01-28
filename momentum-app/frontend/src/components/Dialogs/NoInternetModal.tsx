import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';

interface NoInternetModalProps {
  isOpen: boolean;
  onRetry: () => void;
}

export const NoInternetModal: React.FC<NoInternetModalProps> = ({ isOpen, onRetry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
      {/* Backdrop - blocks interaction with app */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      {/* Modal content */}
      <div className="relative w-full max-w-md bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 rounded-2xl border border-gray-800/50 shadow-2xl p-8 sm:p-12">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-red-500/5 to-orange-600/5 rounded-2xl pointer-events-none" />
        
        <div className="relative space-y-8">
          {/* Icon and Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/30 animate-pulse">
                <WifiOff className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-white text-2xl sm:text-3xl">
              No Internet Connection
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              You need to connect to the internet to use Momentum. Please check your connection and try again.
            </p>
          </div>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-lg">Retry Connection</span>
          </button>

          {/* Connection status indicators */}
          <div className="space-y-3 pt-4 border-t border-gray-800/50">
            <p className="text-gray-500 text-sm text-center">
              Troubleshooting tips:
            </p>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-cyan-500 mt-0.5">•</span>
                <span>Check your WiFi or mobile data connection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500 mt-0.5">•</span>
                <span>Make sure airplane mode is turned off</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-500 mt-0.5">•</span>
                <span>Try restarting your router or device</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
