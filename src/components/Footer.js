'use client';

import { Eye, AlertCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded flex items-center justify-center relative">
              <div className="w-3 h-3 border border-white rounded-full relative">
                <div className="absolute inset-0.5 bg-white rounded-full opacity-80"></div>
                <div className="absolute inset-1 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <span className="font-semibold text-gray-900">RetinaScan</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">AI Retinal Analysis</span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span><span className="font-medium text-blue-600">19</span> Conditions</span>
            <span><span className="font-medium text-blue-600">95%</span> Accuracy</span>
            <span><span className="font-medium text-purple-600">3s</span> Analysis</span>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>© 2025</span>
            <span className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span>For screening only</span>
            </span>
            <span className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Privacy first</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
