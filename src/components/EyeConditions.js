'use client';

import React from 'react';
import { Target } from 'lucide-react';

export default function EyeConditions({ 
  eyeConditions, 
  onConditionClick 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Target className="w-6 h-6 mr-3 text-emerald-600" />
        Detectable Eye Conditions
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {Object.entries(eyeConditions).map(([key, condition]) => (
          <button
            key={key}
            onClick={() => onConditionClick(condition)}
            className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${condition.borderColor} ${condition.bgColor} group`}
          >
            <div className="flex flex-col items-center space-y-2">
              {React.createElement(condition.icon, {
                className: `w-6 h-6 ${condition.color} group-hover:scale-110 transition-transform`
              })}
              <div className="text-center">
                <h4 className={`font-semibold text-xs ${condition.color}`}>
                  {condition.label}
                </h4>
                <p className="text-xs text-gray-600">
                  {condition.riskLevel}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 mb-2">
          Click on any condition to view detailed information
        </p>
        <p className="text-xs text-emerald-600 font-medium">
          All 19 eye disease types are detectable with our AI model
        </p>
      </div>
    </div>
  );
}
