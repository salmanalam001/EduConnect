import React, { useState, useCallback } from 'react';
import { Search, X, MapPin, GraduationCap, BookOpen } from 'lucide-react';

interface University {
  name: string;
  country: string;
  ranking: number;
  programs: string[];
  tuitionRange: string;
  acceptance: string;
  image: string;
}

const universities: University[] = [
  {
    name: 'Stanford University',
    country: 'United States',
    ranking: 2,
    programs: ['Computer Science', 'Business Administration', 'Engineering', 'Data Science', 'Artificial Intelligence'],
    tuitionRange: '$55,000 - $65,000',
    acceptance: '4.8%',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
    ranking: 1,
    programs: ['Medicine', 'Law', 'Physics', 'Computer Science', 'Economics'],
    tuitionRange: '£26,770 - £39,010',
    acceptance: '17.5%',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    ranking: 18,
    programs: ['Psychology', 'Economics', 'Mathematics', 'Computer Engineering', 'Business'],
    tuitionRange: 'CAD 45,900 - 65,280',
    acceptance: '43%',
    image: 'https://images.unsplash.com/photo-1569534403589-5a8e69fc40f1?w=400&h=300&fit=crop'
  },
  {
    name: 'ETH Zurich',
    country: 'Switzerland',
    ranking: 9,
    programs: ['Engineering', 'Architecture', 'Computer Science', 'Mathematics', 'Physics'],
    tuitionRange: 'CHF 1,298 - 1,578',
    acceptance: '27%',
    image: 'https://images.unsplash.com/photo-1564394256913-3b06c176695c?w=400&h=300&fit=crop'
  }
];

export default function SearchUniversity() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<University[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    'Computer Science',
    'Business',
    'Engineering',
    'Medicine',
    'United States',
    'United Kingdom',
    'Canada'
  ];

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsLoading(true);

    if (searchQuery.trim() === '' && selectedFilters.length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      const filtered = universities.filter(uni => {
        const matchesQuery = searchQuery.trim() === '' || 
          uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.programs.some(program => program.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilters = selectedFilters.length === 0 || 
          selectedFilters.some(filter => 
            uni.country === filter || 
            uni.programs.includes(filter)
          );

        return matchesQuery && matchesFilters;
      });

      setResults(filtered);
      setIsLoading(false);
    }, 300);
  }, [selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      
      handleSearch(query);
      return newFilters;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search universities, countries, or programs..."
            className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
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

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilters.includes(filter)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* Results */}
        {!isLoading && results.length > 0 && (
          <div className="grid gap-4 mt-4">
            {results.map((uni, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex">
                  <div className="w-1/4 h-48">
                    <img
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-3/4 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{uni.name}</h3>
                        <div className="flex items-center mt-1 text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{uni.country}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-indigo-600 mr-1" />
                        <span className="font-semibold text-indigo-600">#{uni.ranking} Global</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center text-gray-600">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span className="text-sm">Popular Programs:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {uni.programs.slice(0, 3).map((program, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <span>Tuition: {uni.tuitionRange}</span>
                      <span>Acceptance Rate: {uni.acceptance}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && results.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No universities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}