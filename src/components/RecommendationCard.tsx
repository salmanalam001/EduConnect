import React from 'react';
import type { UniversityRecommendation } from './AiService';

interface RecommendationCardProps {
  university: UniversityRecommendation;
}

export default function RecommendationCard({ university }: RecommendationCardProps) {
  return (
    <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-medium">{university.name}</h5>
          <p className="text-sm text-gray-600">{university.program}</p>
        </div>
        <span className="text-green-600 text-sm font-medium">{university.match}% match</span>
      </div>
    </div>
  );
}