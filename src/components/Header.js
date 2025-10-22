'use client';

import { Eye, Play, Zap } from 'lucide-react';

export default function Header({ 
  modelStatus, 
  isAnalyzing, 
  onDemoClick 
}) {
  const getStatusColor = () => {
    switch (modelStatus) {
      case 'ready': return 'text-green-600';
      case 'loading': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = () => {
    switch (modelStatus) {
      case 'ready': return 'AI Ready';
      case 'loading': return 'Loading AI...';
      case 'error': return 'AI Error';
      default: return 'Initializing...';
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center relative">
              <div className="w-4 h-4 border-2 border-white rounded-full relative">
                <div className="absolute inset-1 bg-white rounded-full opacity-80"></div>
                <div className="absolute inset-2 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RetinaScan</h1>
              <p className="text-xs text-gray-500">AI-Powered Retinal Analysis</p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex items-center space-x-4">
            {/* Model Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${modelStatus === 'ready' ? 'bg-green-500' : modelStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </div>

            {/* Demo Button */}
            <button
              onClick={onDemoClick}
              disabled={isAnalyzing}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-5 h-5" />
              <span className="hidden sm:block">Demo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
