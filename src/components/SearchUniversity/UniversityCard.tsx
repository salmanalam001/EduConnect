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
            <Building2 className="h-5 w-5 text-indigo-600 mr-1" />
            <span className="font-medium text-indigo-600">{university.alphaTwoCode}</span>
          </div>
        </div>

        {university.domains.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center text-gray-600">
              <Globe className="h-4 w-4 mr-1" />
              <span className="text-sm">Domains:</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
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
          <div className="mt-4">
            <a
              href={university.webPages[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <Globe className="h-4 w-4 mr-2" />
              Visit Website
            </a>
          </div>
        )}
      </div>
    </div>
  );
}