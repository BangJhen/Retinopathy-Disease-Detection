'use client';

import React, { useState, useCallback } from 'react';
import { Upload, Eye, FileImage, AlertCircle, CheckCircle, Download, Loader2 } from 'lucide-react';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const severityLevels = {
    normal: { label: 'Normal', color: 'text-emerald-600', bgColor: 'bg-emerald-50', icon: CheckCircle },
    mild: { label: 'Mild DR', color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: AlertCircle },
    moderate: { label: 'Moderate DR', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle },
    severe: { label: 'Severe DR', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    
    // Mock analysis with 3-second delay
    setTimeout(() => {
      const severities = ['normal', 'mild', 'moderate', 'severe'];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      setAnalysisResult({
        severity: randomSeverity,
        confidence: confidence,
        timestamp: new Date().toLocaleString()
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">RetinaDetect</h1>
                <p className="text-sm text-gray-600">AI-Powered Retinopathy Detection</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Early Detection, Better Vision
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload a fundus image to detect diabetic retinopathy using our advanced AI technology. 
            Get instant results with confidence scores for early intervention.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-emerald-600" />
                Upload Fundus Image
              </h3>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                  isDragOver 
                    ? 'border-emerald-400 bg-emerald-50' 
                    : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded fundus" 
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 flex items-center"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Eye className="w-5 h-5 mr-2" />
                            Analyze Image
                          </>
                        )}
                      </button>
                      <button
                        onClick={resetAnalysis}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileImage className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drag and drop your fundus image here
                      </p>
                      <p className="text-gray-500 mb-4">or</p>
                      <label className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 cursor-pointer inline-block">
                        Choose File
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Supported formats: JPG, PNG, JPEG (Max 10MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold text-sm">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Upload Image</h4>
                    <p className="text-gray-600 text-sm">Upload a high-quality fundus photograph</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold text-sm">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900">AI Analysis</h4>
                    <p className="text-gray-600 text-sm">Our AI analyzes the image for signs of diabetic retinopathy</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-semibold text-sm">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900">Get Results</h4>
                    <p className="text-gray-600 text-sm">Receive instant results with confidence scores</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysisResult && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Analysis Results</h3>
                
                <div className="space-y-6">
                  {/* Severity Level */}
                  <div className={`p-4 rounded-xl ${severityLevels[analysisResult.severity].bgColor}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {React.createElement(severityLevels[analysisResult.severity].icon, {
                          className: `w-8 h-8 ${severityLevels[analysisResult.severity].color}`
                        })}
                        <div>
                          <h4 className={`text-xl font-semibold ${severityLevels[analysisResult.severity].color}`}>
                            {severityLevels[analysisResult.severity].label}
                          </h4>
                          <p className="text-gray-600">Detected condition</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${severityLevels[analysisResult.severity].color}`}>
                          {analysisResult.confidence}%
                        </div>
                        <p className="text-gray-600 text-sm">Confidence</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Analysis Date</h5>
                      <p className="text-gray-600 text-sm">{analysisResult.timestamp}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-1">Processing Time</h5>
                      <p className="text-gray-600 text-sm">3.2 seconds</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Recommendations</h5>
                    <p className="text-blue-800 text-sm">
                      {analysisResult.severity === 'normal' 
                        ? 'Continue regular eye examinations and maintain good diabetes control.'
                        : 'Please consult with an ophthalmologist for further evaluation and treatment planning.'
                      }
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center">
                      <Download className="w-5 h-5 mr-2" />
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Notice */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Privacy & Security</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <p className="text-sm">All processing is done locally on your device</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <p className="text-sm">No images are uploaded to external servers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <p className="text-sm">Your data remains completely private</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-emerald-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              © 2024 RetinaDetect. This tool is for screening purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
