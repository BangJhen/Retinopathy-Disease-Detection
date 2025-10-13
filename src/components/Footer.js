'use client';

import { Eye, AlertCircle, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">EyeHealthAI</span>
            <span className="text-xs text-gray-500">•</span>
            <span className="text-xs text-gray-500">AI Eye Disease Detection</span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span><span className="font-medium text-emerald-600">19</span> Types</span>
            <span><span className="font-medium text-blue-600">95%</span> Accuracy</span>
            <span><span className="font-medium text-purple-600">3s</span> Analysis</span>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span>© 2024</span>
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
