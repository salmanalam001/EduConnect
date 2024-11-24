import React, { useState } from 'react';
import { MapPin, GraduationCap, Globe, Image as ImageIcon } from 'lucide-react';
import { University } from './types';

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="w-1/4 h-48 bg-gray-100">
          {!imageError ? (
            <img
              src={university.image}
              alt={university.name}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center text-gray-400">
                <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                <span className="text-sm">No image available</span>
              </div>
            </div>
          )}
        </div>
        <div className="w-3/4 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
              <div className="flex items-center mt-1 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{university.country}</span>
                {university.stateProvince && (
                  <span className="ml-1">- {university.stateProvince}</span>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-indigo-600 mr-1" />
              <span className="font-semibold text-indigo-600">#{university.ranking} Global</span>
            </div>
          </div>

          {university.webPages.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <a
                  href={university.webPages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="text-sm">Visit Website</span>
                </a>
                {university.domains[0] && (
                  <>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">{university.domains[0]}</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Country Code: {university.alphaTwoCode}</span>
            {university.stateProvince && (
              <span>Region: {university.stateProvince}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}