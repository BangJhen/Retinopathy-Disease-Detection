'use client';

import { Zap, Eye, Target, Users, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
        <Zap className="w-4 h-4 mr-2" />
        19-Class Eye Disease Detection AI
      </div>
      
      <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Comprehensive Detection,<br />
        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Healthy Eyes Forever
        </span>
      </h2>
      
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
        Upload fundus images to detect 19 types of eye diseases using advanced AI technology. 
        From diabetic retinopathy to glaucoma, get accurate diagnosis with high confidence scores.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mx-auto mb-3">
            <Eye className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">19</div>
          <div className="text-sm text-gray-600">Jenis Penyakit</div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
          <div className="text-sm text-gray-600">Akurasi</div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">10K+</div>
          <div className="text-sm text-gray-600">Dataset</div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">3s</div>
          <div className="text-sm text-gray-600">Analisis</div>
        </div>
      </div>
    </div>
  );
}
