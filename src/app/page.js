'use client';

import { useState, useEffect } from 'react';
import React from 'react';

// Import all modular components
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import UploadSection from '../components/UploadSection';
import HowItWorks from '../components/HowItWorks';
import AnalysisResults from '../components/AnalysisResults';
import EyeConditions from '../components/EyeConditions';
import Footer from '../components/Footer';

// Import utilities and data
import { eyeConditions } from '../data/eyeConditions';
import { demoImages } from '../data/demoImages';

export default function Home() {
  // State management
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelStatus, setModelStatus] = useState('loading');
  const [selectedSeverityInfo, setSelectedSeverityInfo] = useState(null);
  const [showDemo, setShowDemo] = useState(false);

  // Model loading effect
  useEffect(() => {
    const initializeModel = async () => {
      try {
        setModelStatus('loading');
        
        // Simulate model loading (replace with actual model loading)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setModelStatus('ready');
      } catch (error) {
        console.error('Model loading failed:', error);
        setModelStatus('error');
      }
    };

    initializeModel();
  }, []);

  // Handle image selection
  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setAnalysisResult(null); // Clear previous results
  };

  // Handle analysis
  const handleAnalyze = async () => {
    if (!selectedImage || modelStatus !== 'ready') return;

    setIsAnalyzing(true);
    
    try {
      // Simulate analysis (replace with actual AI inference)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock result (replace with actual analysis result)
      const conditions = Object.keys(eyeConditions);
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const confidence = Math.floor(Math.random() * 30) + 70; // 70-99%
      
      setAnalysisResult({
        condition: randomCondition,
        confidence: confidence,
        processingTime: '2.3s'
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-area')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle demo
  const handleDemo = () => {
    setShowDemo(true);
  };

  // Handle demo selection
  const handleDemoSelect = async (demoImage) => {
    setShowDemo(false);
    setSelectedImage(null); // Clear selected image
    setIsAnalyzing(true);
    
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult({
        condition: demoImage.condition,
        confidence: demoImage.confidence,
        processingTime: '1.8s'
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-area')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 100);
      
    } catch (error) {
      console.error('Demo analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle condition click
  const handleConditionClick = (condition) => {
    setSelectedSeverityInfo(condition);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <Header 
        modelStatus={modelStatus}
        isAnalyzing={isAnalyzing}
        onDemoClick={handleDemo}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <HeroSection />

        {/* First Row - Upload and How It Works */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <UploadSection 
            selectedImage={selectedImage}
            onImageSelect={handleImageSelect}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            modelStatus={modelStatus}
          />
          <HowItWorks />
        </div>

        {/* Analysis Results Section - Full Width */}
        <AnalysisResults 
          analysisResult={analysisResult}
          eyeConditions={eyeConditions}
          selectedImage={selectedImage}
        />

        {/* Eye Conditions Section - Full Width */}
        <EyeConditions 
          eyeConditions={eyeConditions}
          onConditionClick={handleConditionClick}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals and overlays can be added here */}
      {selectedSeverityInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              {React.createElement(selectedSeverityInfo.icon, {
                className: `w-8 h-8 ${selectedSeverityInfo.color}`
              })}
              <h3 className="text-xl font-bold text-gray-900">
                {selectedSeverityInfo.label}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {selectedSeverityInfo.description}
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Recommendation:</h4>
              <p className="text-sm text-gray-700">
                {selectedSeverityInfo.recommendation}
              </p>
            </div>
            <button
              onClick={() => setSelectedSeverityInfo(null)}
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Demo Berbagai Kondisi Mata</h3>
              <button
                onClick={() => setShowDemo(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Pilih salah satu contoh gambar fundus untuk melihat bagaimana AI mendeteksi berbagai kondisi mata:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {demoImages.map((demo) => {
                const condition = eyeConditions[demo.condition];
                return (
                  <button
                    key={demo.id}
                    onClick={() => handleDemoSelect(demo)}
                    disabled={isAnalyzing}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      {React.createElement(condition.icon, {
                        className: `w-6 h-6 ${condition.color}`
                      })}
                      <h4 className="font-semibold text-gray-900">{demo.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{demo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${condition.bgColor} ${condition.color} font-medium`}>
                        {condition.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {demo.confidence}% confidence
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h5 className="font-semibold text-blue-900 mb-1">Demo Information</h5>
                  <p className="text-sm text-blue-800">
                    Ini adalah simulasi analisis menggunakan data contoh. Hasil yang ditampilkan adalah untuk tujuan demonstrasi dan tidak menggantikan konsultasi medis profesional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
