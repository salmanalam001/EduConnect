import React from 'react';
import { GraduationCap, Users, Building } from 'lucide-react';

interface DestinationCardProps {
  country: string;
  image: string;
  universities: number;
  intlStudents: string;
  topUniversities: string[];
  description: string;
}

export default function DestinationCard({
  country,
  image,
  universities,
  intlStudents,
  topUniversities,
  description
}: DestinationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={country}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4">
            <h3 className="text-2xl font-bold text-white">{country}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-6">{description}</p>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <Building className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
            <div className="text-sm font-semibold">{universities}</div>
            <div className="text-xs text-gray-500">Universities</div>
          </div>
          <div className="text-center">
            <Users className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
            <div className="text-sm font-semibold">{intlStudents}</div>
            <div className="text-xs text-gray-500">Int'l Students</div>
          </div>
          <div className="text-center">
            <GraduationCap className="h-5 w-5 mx-auto text-indigo-600 mb-1" />
            <div className="text-sm font-semibold">Top 100</div>
            <div className="text-xs text-gray-500">QS Ranking</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Top Universities:</div>
          <div className="flex flex-wrap gap-2">
            {topUniversities.map((uni, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}