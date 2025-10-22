'use client';

import { Heart, Shield, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          
          {/* Left: Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 border border-white rounded-full relative">
                <div className="absolute inset-0.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">RetinaScan</span>
              <span className="text-gray-600 text-sm">by AI Medical</span>
            </div>
          </div>

          {/* Center: Quick Stats */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-gray-700">19 Conditions</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-gray-700">90% Accuracy</span>
            </div>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-gray-700">Privacy First</span>
            </div>
          </div>

          {/* Right: Copyright & Links */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>© 2025 RetinaScan</span>
            <span className="hidden md:block">•</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              For Screening Only
            </span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
