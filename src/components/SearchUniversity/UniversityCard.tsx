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
            <h3 className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
              {university.name}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
              <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-indigo-500" />
                <span>{university.country}</span>
              </div>
              {university.stateProvince && (
                <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                  <Building2 className="h-4 w-4 mr-1 flex-shrink-0 text-indigo-500" />
                  <span>{university.stateProvince}</span>
                </div>
              )}
              <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-md">
                <span className="font-medium text-indigo-600">{university.alphaTwoCode}</span>
              </div>
            </div>
          </div>
        </div>

        {university.domains.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-gray-600 mb-2">
              <Globe className="h-4 w-4 mr-1 text-indigo-500" />
              <span className="text-sm font-medium">Academic Domains</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {university.domains.map((domain, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-md font-medium hover:bg-indigo-100 transition-colors"
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
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Globe className="h-4 w-4 mr-2" />
                {idx === 0 ? 'Visit Website' : `Visit Site ${idx + 1}`}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}