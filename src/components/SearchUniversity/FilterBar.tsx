import React, { useEffect, useState } from 'react';
import { getTopCountries } from './api';

interface FilterBarProps {
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
}

export default function FilterBar({ selectedFilters, toggleFilter }: FilterBarProps) {
  const [topCountries, setTopCountries] = useState<string[]>([]);

  useEffect(() => {
    const loadTopCountries = async () => {
      try {
        const countries = await getTopCountries();
        setTopCountries(countries);
      } catch (error) {
        console.error('Error loading top countries:', error);
      }
    };
    loadTopCountries();
  }, []);

  const rankingFilters = ['Top 100', 'Top 500'];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Rankings</h3>
        <div className="flex flex-wrap gap-2">
          {rankingFilters.map((filter) => (
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
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Top Countries</h3>
        <div className="flex flex-wrap gap-2">
          {topCountries.map((country) => (
            <button
              key={country}
              onClick={() => toggleFilter(country)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilters.includes(country)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}