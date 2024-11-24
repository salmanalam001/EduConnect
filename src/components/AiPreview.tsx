import React, { useState } from 'react';
import { AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { getUniversityRecommendations, type RecommendationResult } from './AiService';
import RecommendationCard from './RecommendationCard';

interface StepButtonProps {
  label: string;
  description: string;
  onClick: () => void;
}

function StepButton({ label, description, onClick }: StepButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="p-4 border-2 border-indigo-200 rounded-lg text-left hover:border-indigo-600 hover:bg-indigo-50 transition-colors"
    >
      <span className="font-medium">{label}</span>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </button>
  );
}

export default function AiPreview() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [field, setField] = useState('');
  const [destination, setDestination] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendationResult | null>(null);

  const generateRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUniversityRecommendations(field, destination);
      setRecommendations(result);
      setStep(3);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setStep(2); // Go back to destination selection on error
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async (newField?: string, newDestination?: string) => {
    if (newField) {
      setField(newField);
      setStep(2);
    } else if (newDestination) {
      setDestination(newDestination);
      await generateRecommendations();
    } else {
      setStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleRetry = async () => {
    if (field && destination) {
      await generateRecommendations();
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Sparkles className="h-6 w-6 text-indigo-600" />
          <h3 className="text-2xl font-bold text-gray-900">AI Recommendation Preview</h3>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="flex items-center px-3 py-1 text-sm text-red-700 hover:bg-red-100 rounded-md"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {step >= 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">What's your field of interest?</h4>
              <div className="grid grid-cols-2 gap-4">
                <StepButton 
                  label="Computer Science"
                  description="AI, Software Engineering, Data Science"
                  onClick={() => handleNext('Computer Science')}
                />
                <StepButton 
                  label="Business"
                  description="Management, Finance, Marketing"
                  onClick={() => handleNext('Business')}
                />
              </div>
            </div>
          )}

          {step >= 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Preferred study destinations?</h4>
              <div className="grid grid-cols-2 gap-4">
                <StepButton 
                  label="United States"
                  description="Top-ranked universities, diverse culture"
                  onClick={() => handleNext(undefined, 'United States')}
                />
                <StepButton 
                  label="United Kingdom"
                  description="Rich history, excellent education"
                  onClick={() => handleNext(undefined, 'United Kingdom')}
                />
              </div>
            </div>
          )}

          {step >= 3 && recommendations && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-4">Your Personalized Recommendations</h4>
              <div className="space-y-4">
                {recommendations.universities.map((uni, index) => (
                  <RecommendationCard key={index} university={uni} />
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="text-gray-600">Generating recommendations...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}