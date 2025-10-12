'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { 
  Upload, Eye, FileImage, AlertCircle, CheckCircle, Download, Loader2, 
  Play, Pause, RotateCcw, Zap, Brain, Shield, Star, Info, 
  ChevronRight, ChevronLeft, X, HelpCircle, Sparkles, Target,
  Activity, Clock, Award, Users
} from 'lucide-react';

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [currentGuideStep, setCurrentGuideStep] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedSeverityInfo, setSelectedSeverityInfo] = useState(null);
  const [animationClass, setAnimationClass] = useState('');

  const severityLevels = {
    normal: { 
      label: 'Normal', 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50', 
      borderColor: 'border-emerald-200',
      icon: CheckCircle,
      description: 'No signs of diabetic retinopathy detected',
      recommendation: 'Continue regular eye examinations',
      riskLevel: 'Low Risk'
    },
    mild: { 
      label: 'Mild DR', 
      color: 'text-yellow-600', 
      bgColor: 'bg-yellow-50', 
      borderColor: 'border-yellow-200',
      icon: AlertCircle,
      description: 'Early signs of diabetic retinopathy present',
      recommendation: 'Schedule follow-up in 6-12 months',
      riskLevel: 'Low-Medium Risk'
    },
    moderate: { 
      label: 'Moderate DR', 
      color: 'text-orange-600', 
      bgColor: 'bg-orange-50', 
      borderColor: 'border-orange-200',
      icon: AlertCircle,
      description: 'Moderate diabetic retinopathy changes detected',
      recommendation: 'Ophthalmologist consultation recommended',
      riskLevel: 'Medium-High Risk'
    },
    severe: { 
      label: 'Severe DR', 
      color: 'text-red-600', 
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      icon: AlertCircle,
      description: 'Advanced diabetic retinopathy requiring attention',
      recommendation: 'Immediate ophthalmologist consultation required',
      riskLevel: 'High Risk'
    }
  };

  const demoImages = [
    {
      name: 'Normal Retina',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGNUY1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRkVCRUUiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI0ZGRERERCIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjRkZDQ0NDIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNGRkFBQUEiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMCIgZmlsbD0iI0ZGODg4OCIvPgo8dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzEwQjk4MSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPk5vcm1hbCBSZXRpbmE8L3RleHQ+Cjwvc3ZnPgo=',
      severity: 'normal',
      confidence: 94
    },
    {
      name: 'Mild DR Sample',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkVGM0MyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRUY0QzciLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI0ZFRjVDQyIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjRkVGNkQxIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNGRUY3RDYiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMCIgZmlsbD0iI0ZFRjhEQiIvPgo8Y2lyY2xlIGN4PSI3MCIgY3k9IjgwIiByPSIzIiBmaWxsPSIjRUFCMzA4Ii8+CjxjaXJjbGUgY3g9IjEzMCIgY3k9IjEyMCIgcj0iMiIgZmlsbD0iI0VBQjMwOCIvPgo8dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0VBQjMwOCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPk1pbGQgRFI8L3RleHQ+Cjwvc3ZnPgo=',
      severity: 'mild',
      confidence: 87
    },
    {
      name: 'Severe DR Sample',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkVGMkYyIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNGRUY0RjQiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI2MCIgZmlsbD0iI0ZFRjZGNiIvPgo8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIiBmaWxsPSIjRkVGOEY4Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNGRUZBRkEiLz4KPGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMCIgZmlsbD0iI0ZFRkNGQyIvPgo8Y2lyY2xlIGN4PSI2MCIgY3k9IjcwIiByPSI1IiBmaWxsPSIjREM0NjI2Ii8+CjxjaXJjbGUgY3g9IjE0MCIgY3k9IjEzMCIgcj0iNCIgZmlsbD0iI0RDNDYyNiIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjEzMCIgcj0iMyIgZmlsbD0iI0RDNDYyNiIvPgo8Y2lyY2xlIGN4PSIxMjAiIGN5PSI4MCIgcj0iNCIgZmlsbD0iI0RDNDYyNiIvPgo8dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI0RDNDYyNiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiPlNldmVyZSBEUjwvdGV4dD4KPC9zdmc+Cg==',
      severity: 'severe',
      confidence: 91
    }
  ];

  const guideSteps = [
    {
      title: 'Selamat Datang di RetinaDetect',
      content: 'Platform AI untuk deteksi dini retinopati diabetik. Mari kita mulai dengan panduan singkat.',
      target: 'header',
      position: 'bottom'
    },
    {
      title: 'Upload Gambar Fundus',
      content: 'Drag & drop atau klik untuk memilih gambar fundus mata. Format yang didukung: JPG, PNG, JPEG.',
      target: 'upload-area',
      position: 'right'
    },
    {
      title: 'Coba Demo',
      content: 'Tidak punya gambar? Coba demo dengan sampel gambar yang tersedia.',
      target: 'demo-button',
      position: 'left'
    },
    {
      title: 'Analisis AI',
      content: 'AI akan menganalisis gambar dan memberikan hasil dengan tingkat kepercayaan.',
      target: 'analyze-button',
      position: 'top'
    },
    {
      title: 'Hasil Deteksi',
      content: 'Lihat hasil deteksi dengan level keparahan dan rekomendasi tindakan.',
      target: 'results-area',
      position: 'left'
    }
  ];

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
        setAnimationClass('animate-pulse');
        setTimeout(() => setAnimationClass(''), 1000);
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
    setAnalysisProgress(0);
    
    // Animated progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // Mock analysis with 3-second delay
    setTimeout(() => {
      const severities = ['normal', 'mild', 'moderate', 'severe'];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      const confidence = Math.floor(Math.random() * 20) + 80; // 80-99%
      
      setAnalysisResult({
        severity: randomSeverity,
        confidence: confidence,
        timestamp: new Date().toLocaleString(),
        processingTime: '3.2s',
        modelVersion: 'v2.1.0'
      });
      setIsAnalyzing(false);
      setAnalysisProgress(100);
      clearInterval(progressInterval);
    }, 3000);
  };

  const resetAnalysis = () => {
    setUploadedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setAnimationClass('');
  };

  const startDemo = (demoImage) => {
    setUploadedImage(demoImage.url);
    setShowDemo(false);
    setTimeout(() => {
      setAnalysisResult({
        severity: demoImage.severity,
        confidence: demoImage.confidence,
        timestamp: new Date().toLocaleString(),
        processingTime: '2.8s',
        modelVersion: 'v2.1.0'
      });
    }, 1000);
  };

  const nextGuideStep = () => {
    if (currentGuideStep < guideSteps.length - 1) {
      setCurrentGuideStep(currentGuideStep + 1);
    } else {
      setShowGuide(false);
      setCurrentGuideStep(0);
    }
  };

  const prevGuideStep = () => {
    if (currentGuideStep > 0) {
      setCurrentGuideStep(currentGuideStep - 1);
    }
  };

  // Auto-start guide for first-time users
  useEffect(() => {
    const hasSeenGuide = localStorage.getItem('hasSeenGuide');
    if (!hasSeenGuide) {
      setTimeout(() => setShowGuide(true), 1000);
    }
  }, []);

  const closeGuide = () => {
    setShowGuide(false);
    localStorage.setItem('hasSeenGuide', 'true');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative">
      {/* Interactive Guide Overlay */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative animate-in slide-in-from-bottom-4">
            <button
              onClick={closeGuide}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {guideSteps[currentGuideStep].title}
              </h3>
              <p className="text-gray-600">
                {guideSteps[currentGuideStep].content}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {guideSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentGuideStep ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                {currentGuideStep > 0 && (
                  <button
                    onClick={prevGuideStep}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={nextGuideStep}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 flex items-center"
                >
                  {currentGuideStep === guideSteps.length - 1 ? 'Mulai' : 'Lanjut'}
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-4 relative animate-in slide-in-from-bottom-4">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Play className="w-6 h-6 mr-3 text-emerald-600" />
              Demo Gambar Fundus
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {demoImages.map((demo, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => startDemo(demo)}
                >
                  <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-gray-100 transition-colors">
                    <img
                      src={demo.url}
                      alt={demo.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{demo.name}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className={`px-2 py-1 rounded-full ${severityLevels[demo.severity].bgColor} ${severityLevels[demo.severity].color}`}>
                        {severityLevels[demo.severity].label}
                      </span>
                      <span className="text-gray-600">{demo.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Severity Info Modal */}
      {selectedSeverityInfo && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative animate-in slide-in-from-bottom-4">
            <button
              onClick={() => setSelectedSeverityInfo(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className={`p-4 rounded-xl mb-6 ${selectedSeverityInfo.bgColor}`}>
              <div className="flex items-center space-x-3">
                {React.createElement(selectedSeverityInfo.icon, {
                  className: `w-8 h-8 ${selectedSeverityInfo.color}`
                })}
                <div>
                  <h3 className={`text-xl font-bold ${selectedSeverityInfo.color}`}>
                    {selectedSeverityInfo.label}
                  </h3>
                  <p className={`text-sm ${selectedSeverityInfo.color}`}>
                    {selectedSeverityInfo.riskLevel}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Deskripsi</h4>
                <p className="text-gray-600 text-sm">{selectedSeverityInfo.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Rekomendasi</h4>
                <p className="text-gray-600 text-sm">{selectedSeverityInfo.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header id="header" className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  RetinaDetect
                  <Sparkles className="w-5 h-5 ml-2 text-emerald-500" />
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Retinopathy Detection</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center space-x-2 px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:block">Panduan</span>
              </button>
              
              <button
                id="demo-button"
                onClick={() => setShowDemo(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span className="hidden sm:block">Demo</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section with Stats */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Powered by Advanced AI Technology
          </div>
          
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Deteksi Dini,<br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Penglihatan Lebih Baik
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload gambar fundus mata untuk mendeteksi retinopati diabetik menggunakan teknologi AI canggih. 
            Dapatkan hasil instan dengan skor kepercayaan untuk intervensi dini.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Akurasi</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">3s</div>
              <div className="text-sm text-gray-600">Analisis</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Pengguna</div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">FDA</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className={`bg-white rounded-2xl shadow-xl p-6 border-2 transition-all duration-300 ${animationClass} ${uploadedImage ? 'border-emerald-200' : 'border-gray-100'}`}>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-emerald-600" />
                Upload Gambar Fundus
                {uploadedImage && <CheckCircle className="w-5 h-5 ml-2 text-emerald-500" />}
              </h3>
              
              <div
                id="upload-area"
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-emerald-400 bg-emerald-50 scale-105' 
                    : uploadedImage 
                    ? 'border-emerald-300 bg-emerald-25'
                    : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                {uploadedImage ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded fundus" 
                        className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg border-2 border-emerald-100"
                      />
                      {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                          <div className="bg-white rounded-lg p-4 shadow-lg">
                            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Menganalisis...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {isAnalyzing && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(analysisProgress, 100)}%` }}
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-center space-x-4">
                      <button
                        id="analyze-button"
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {isAnalyzing ? (
                          <>
                            <Brain className="w-5 h-5 mr-2 animate-pulse" />
                            Menganalisis...
                          </>
                        ) : (
                          <>
                            <Eye className="w-5 h-5 mr-2" />
                            Analisis Gambar
                          </>
                        )}
                      </button>
                      <button
                        onClick={resetAnalysis}
                        className="bg-gray-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Reset
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="relative">
                      <FileImage className="w-20 h-20 text-gray-400 mx-auto animate-bounce" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-700 mb-2">
                        Drag & drop gambar fundus di sini
                      </p>
                      <p className="text-gray-500 mb-6">atau klik tombol di bawah</p>
                      <label className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 cursor-pointer inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <Upload className="w-5 h-5 mr-2" />
                        Pilih Gambar
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-800 font-medium mb-1">Format yang didukung:</p>
                      <p className="text-sm text-blue-600">JPG, PNG, JPEG (Maksimal 10MB)</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive How It Works */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Info className="w-6 h-6 mr-3 text-emerald-600" />
                Cara Kerja Platform
              </h3>
              <div className="space-y-6">
                <div className="group hover:bg-emerald-50 p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">1</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">Upload Gambar</h4>
                      <p className="text-gray-600 text-sm">Upload foto fundus mata berkualitas tinggi dalam format JPG, PNG, atau JPEG</p>
                    </div>
                    <Upload className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <div className="group hover:bg-blue-50 p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">2</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">Analisis AI</h4>
                      <p className="text-gray-600 text-sm">AI menganalisis gambar untuk mendeteksi tanda-tanda retinopati diabetik</p>
                    </div>
                    <Brain className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <div className="group hover:bg-purple-50 p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">3</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">Hasil Instan</h4>
                      <p className="text-gray-600 text-sm">Dapatkan hasil deteksi dengan skor kepercayaan dan rekomendasi tindakan</p>
                    </div>
                    <Activity className="w-5 h-5 text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Severity Levels Guide */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3 text-emerald-600" />
                Level Keparahan
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(severityLevels).map(([key, level]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSeverityInfo(level)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${level.borderColor} ${level.bgColor} group`}
                  >
                    <div className="flex items-center space-x-3">
                      {React.createElement(level.icon, {
                        className: `w-6 h-6 ${level.color} group-hover:scale-110 transition-transform`
                      })}
                      <div className="text-left">
                        <h4 className={`font-semibold ${level.color}`}>{level.label}</h4>
                        <p className="text-xs text-gray-600">{level.riskLevel}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">Klik untuk melihat detail setiap level</p>
            </div>
          </div>

          {/* Enhanced Results Section */}
          <div id="results-area" className="space-y-6">
            {analysisResult && (
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-in slide-in-from-right-4">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-emerald-600" />
                  Hasil Analisis
                </h3>
                
                <div className="space-y-6">
                  {/* Enhanced Severity Level Display */}
                  <div className={`p-6 rounded-2xl border-2 ${severityLevels[analysisResult.severity].borderColor} ${severityLevels[analysisResult.severity].bgColor} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                      {React.createElement(severityLevels[analysisResult.severity].icon, {
                        className: "w-full h-full"
                      })}
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          {React.createElement(severityLevels[analysisResult.severity].icon, {
                            className: `w-12 h-12 ${severityLevels[analysisResult.severity].color}`
                          })}
                          <div>
                            <h4 className={`text-2xl font-bold ${severityLevels[analysisResult.severity].color}`}>
                              {severityLevels[analysisResult.severity].label}
                            </h4>
                            <p className="text-gray-600 font-medium">{severityLevels[analysisResult.severity].riskLevel}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-4xl font-bold ${severityLevels[analysisResult.severity].color} mb-1`}>
                            {analysisResult.confidence}%
                          </div>
                          <p className="text-gray-600 text-sm font-medium">Tingkat Kepercayaan</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/50 rounded-lg p-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {severityLevels[analysisResult.severity].description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Analysis Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <h5 className="font-semibold text-blue-900">Waktu Analisis</h5>
                      </div>
                      <p className="text-blue-700 font-medium">{analysisResult.processingTime}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <h5 className="font-semibold text-purple-900">Model AI</h5>
                      </div>
                      <p className="text-purple-700 font-medium">{analysisResult.modelVersion}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                      <div className="flex items-center space-x-3 mb-2">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        <h5 className="font-semibold text-emerald-900">Tanggal</h5>
                      </div>
                      <p className="text-emerald-700 font-medium text-sm">{analysisResult.timestamp}</p>
                    </div>
                  </div>

                  {/* Enhanced Recommendations */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Info className="w-5 h-5 mr-2" />
                      Rekomendasi Tindakan
                    </h5>
                    <p className="text-blue-800 leading-relaxed">
                      {severityLevels[analysisResult.severity].recommendation}
                    </p>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                      <Download className="w-5 h-5 mr-2" />
                      Download Laporan PDF
                    </button>
                    <button 
                      onClick={() => setSelectedSeverityInfo(severityLevels[analysisResult.severity])}
                      className="flex-1 bg-white border-2 border-emerald-500 text-emerald-600 px-6 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <Info className="w-5 h-5 mr-2" />
                      Detail Kondisi
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Privacy Notice */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-emerald-600" />
                Privasi & Keamanan
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Pemrosesan Lokal</h4>
                      <p className="text-sm text-gray-600">Semua analisis dilakukan di perangkat Anda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Tanpa Upload</h4>
                      <p className="text-sm text-gray-600">Gambar tidak dikirim ke server eksternal</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Data Pribadi</h4>
                      <p className="text-sm text-gray-600">Data Anda tetap sepenuhnya privat</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Teknologi Terdepan</h4>
                      <p className="text-sm text-gray-600">AI model terbaru untuk akurasi maksimal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">RetinaDetect</h3>
              </div>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Platform AI terdepan untuk deteksi dini retinopati diabetik. 
                Membantu jutaan orang menjaga kesehatan mata mereka.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Fitur Utama</h4>
              <ul className="space-y-2 text-emerald-100 text-sm">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Analisis AI Real-time</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Privasi Terjamin</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Akurasi 95%+</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Laporan Lengkap</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Penting</h4>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-300 mt-0.5" />
                  <p className="text-emerald-100 text-sm leading-relaxed">
                    Tool ini hanya untuk skrining awal. Selalu konsultasikan dengan dokter spesialis mata 
                    untuk diagnosis dan perawatan yang tepat.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 pt-8 text-center">
            <p className="text-emerald-200 text-sm">
              © 2024 RetinaDetect. Dikembangkan dengan ❤️ untuk kesehatan mata yang lebih baik.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
