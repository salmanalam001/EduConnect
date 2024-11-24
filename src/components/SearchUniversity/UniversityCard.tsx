import React from 'react';
import { MapPin, Globe, Building2 } from 'lucide-react';
import { University } from './types';

interface UniversityCardProps {
  university: University;
}

export default function UniversityCard({ university }: UniversityCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{university.name}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                <span>{university.country}</span>
              </div>
              {university.stateProvince && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{university.stateProvince}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center ml-4 flex-shrink-0">
            <Building2 className="h-5 w-5 text-indigo-600 mr-1" />
            <span className="font-medium text-indigo-600">{university.alphaTwoCode}</span>
          </div>
        </div>

        {university.domains.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Academic Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {university.domains.map((domain, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg font-medium"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        )}

        {university.webPages.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {university.webPages.map((webpage, idx) => (
              <a
                key={idx}
                href={webpage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
              >
                <Globe className="h-4 w-4 mr-2" />
                {idx === 0 ? 'Official Website' : `Alternative Site ${idx + 1}`}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}