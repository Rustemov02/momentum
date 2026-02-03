import React from "react";
import { FileText, CheckSquare, Inbox } from "lucide-react";

interface AppLoaderProps {
  isOpen: boolean;
}

export const AppLoader: React.FC<AppLoaderProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s", animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "5s", animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* Logo with animated icons */}
        <div className="relative">
          {/* Main pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full bg-linear-to-br from-cyan-500/20 to-blue-600/20 animate-ping"
              style={{ animationDuration: "2s" }}
            />
          </div>

          {/* Secondary pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-full bg-linear-to-br from-cyan-500/30 to-blue-600/30 animate-pulse"
              style={{ animationDuration: "1.5s" }}
            />
          </div>

          {/* Logo container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Center logo */}
            <div className="absolute flex items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 200 200"
                className="animate-pulse"
                style={{ animationDuration: "2s" }}
              >
                <defs>
                  <linearGradient
                    id="logoGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#2563eb", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <circle
                  cx="100"
                  cy="60"
                  r="35"
                  fill="url(#logoGradient)"
                  opacity="0.9"
                />
                <rect
                  x="70"
                  y="110"
                  width="60"
                  height="70"
                  rx="8"
                  fill="url(#logoGradient)"
                  opacity="0.9"
                />
                <line
                  x1="85"
                  y1="130"
                  x2="115"
                  y2="130"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  x1="85"
                  y1="150"
                  x2="115"
                  y2="150"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <line
                  x1="85"
                  y1="170"
                  x2="105"
                  y2="170"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Orbiting icons */}
            <div
              className="absolute w-full h-full animate-spin"
              style={{ animationDuration: "8s" }}
            >
              <FileText className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-cyan-400" />
            </div>
            <div
              className="absolute w-full h-full animate-spin"
              style={{ animationDuration: "8s", animationDelay: "-2.67s" }}
            >
              <CheckSquare className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-blue-400" />
            </div>
            <div
              className="absolute w-full h-full animate-spin"
              style={{ animationDuration: "8s", animationDelay: "-5.34s" }}
            >
              <Inbox className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* App name */}
        <div className="flex flex-col items-center gap-3">
          <h1
            className="text-4xl md:text-5xl bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse"
            style={{ animationDuration: "2s" }}
          >
            Momentum
          </h1>

          {/* Loading dots */}
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <div
              className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>

          <p className="text-gray-500 text-sm animate-pulse mt-2">
            Loading...
          </p>
        </div>

        {/* Floating note cards animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating card 1 */}
          <div
            className="absolute top-1/4 left-10 w-16 h-20 bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-lg backdrop-blur-sm animate-float opacity-40"
            style={{ animationDuration: "6s", animationDelay: "0s" }}
          >
            <div className="p-2 space-y-1">
              <div className="h-1 bg-cyan-500/50 rounded w-3/4" />
              <div className="h-1 bg-gray-700/50 rounded w-full" />
              <div className="h-1 bg-gray-700/50 rounded w-2/3" />
            </div>
          </div>

          {/* Floating card 2 */}
          <div
            className="absolute bottom-1/3 right-16 w-16 h-20 bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-lg backdrop-blur-sm animate-float opacity-40"
            style={{ animationDuration: "7s", animationDelay: "1s" }}
          >
            <div className="p-2 space-y-1">
              <div className="h-1 bg-blue-500/50 rounded w-3/4" />
              <div className="h-1 bg-gray-700/50 rounded w-full" />
              <div className="h-1 bg-gray-700/50 rounded w-2/3" />
            </div>
          </div>

          {/* Floating card 3 */}
          <div
            className="absolute top-1/2 right-1/4 w-16 h-20 bg-linear-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/30 rounded-lg backdrop-blur-sm animate-float opacity-40"
            style={{ animationDuration: "8s", animationDelay: "2s" }}
          >
            <div className="p-2 space-y-1">
              <div className="h-1 bg-purple-500/50 rounded w-3/4" />
              <div className="h-1 bg-gray-700/50 rounded w-full" />
              <div className="h-1 bg-gray-700/50 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(2deg);
          }
          50% {
            transform: translateY(-40px) rotate(-2deg);
          }
          75% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
