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
    programs: ['Computer Science', 'Business Administration', 'Engineering'],
    tuitionRange: '$55,000 - $65,000',
    acceptance: '4.8%',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop'
  },
  {
    name: 'MIT',
    country: 'United States',
    ranking: 1,
    programs: ['Computer Science', 'Engineering', 'Business'],
    tuitionRange: '$53,000 - $62,000',
    acceptance: '7.3%',
    image: 'https://images.unsplash.com/photo-1564394256913-3b06c176695c?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
    ranking: 1,
    programs: ['Medicine', 'Computer Science', 'Engineering'],
    tuitionRange: '£26,770 - £39,010',
    acceptance: '17.5%',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
    ranking: 3,
    programs: ['Medicine', 'Engineering', 'Business'],
    tuitionRange: '£27,000 - £40,000',
    acceptance: '21%',
    image: 'https://images.unsplash.com/photo-1569534403589-5a8e69fc40f1?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    ranking: 18,
    programs: ['Medicine', 'Business', 'Computer Science'],
    tuitionRange: 'CAD 45,900 - 65,280',
    acceptance: '43%',
    image: 'https://images.unsplash.com/photo-1569534403589-5a8e69fc40f1?w=400&h=300&fit=crop'
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
      
      const updatedFilters = newFilters;
      setTimeout(() => {
        handleSearch(query);
      }, 0);
      return updatedFilters;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-6">
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
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedFilters.includes(filter)
                  ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600'
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
        {!isLoading && (results.length > 0 ? (
          <div className="grid gap-6 mt-6">
            {results.map((uni, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
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
                        {uni.programs.map((program, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-lg font-medium"
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
        ) : query || selectedFilters.length > 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No universities found matching your criteria.</p>
          </div>
        ) : null)}
      </div>
    </div>
  );
}