import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface University {
  name: string;
  country: string;
  ranking: number;
  programs: string[];
}

export default function SearchUniversity() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<University[]>([]);

  // Mock universities data (in a real app, this would come from an API)
  const universities: University[] = [
    {
      name: 'Stanford University',
      country: 'United States',
      ranking: 2,
      programs: ['Computer Science', 'Business', 'Engineering']
    },
    {
      name: 'University of Oxford',
      country: 'United Kingdom',
      ranking: 1,
      programs: ['Medicine', 'Law', 'Physics']
    },
    {
      name: 'University of Toronto',
      country: 'Canada',
      ranking: 18,
      programs: ['Psychology', 'Economics', 'Mathematics']
    }
  ];

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = universities.filter(uni =>
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setResults(filtered);
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search universities, countries, or programs..."
            className="w-full pl-10 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {results.length > 0 && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
            {results.map((uni, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 border-b last:border-b-0"
              >
                <h3 className="font-semibold text-gray-900">{uni.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className="text-gray-600">{uni.country}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-indigo-600">Rank: #{uni.ranking}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {uni.programs.map((program, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                    >
                      {program}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}