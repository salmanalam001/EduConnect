import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function AiPreview() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => Math.min(prev + 1, 3));
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">AI Recommendation Preview</h3>
        </div>

        <div className="space-y-8">
          {step >= 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">What's your field of interest?</h4>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleNext}
                  className="p-4 border-2 border-indigo-200 rounded-lg text-left hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">Computer Science</span>
                  <p className="text-sm text-gray-600 mt-1">AI, Software Engineering, Data Science</p>
                </button>
                <button 
                  onClick={handleNext}
                  className="p-4 border-2 border-indigo-200 rounded-lg text-left hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">Business</span>
                  <p className="text-sm text-gray-600 mt-1">Management, Finance, Marketing</p>
                </button>
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Preferred study destinations?</h4>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleNext}
                  className="p-4 border-2 border-indigo-200 rounded-lg text-left hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">United States</span>
                  <p className="text-sm text-gray-600 mt-1">Top-ranked universities, diverse culture</p>
                </button>
                <button 
                  onClick={handleNext}
                  className="p-4 border-2 border-indigo-200 rounded-lg text-left hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  <span className="font-medium">United Kingdom</span>
                  <p className="text-sm text-gray-600 mt-1">Rich history, excellent education</p>
                </button>
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Your Personalized Recommendations</h4>
              <div className="space-y-4">
                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">Stanford University</h5>
                      <p className="text-sm text-gray-600">Computer Science, MS</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">98% match</span>
                  </div>
                </div>
                <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">MIT</h5>
                      <p className="text-sm text-gray-600">Computer Science and AI, MS</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">95% match</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}