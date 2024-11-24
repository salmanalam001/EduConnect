import React from 'react';

interface FilterBarProps {
  selectedFilters: string[];
  toggleFilter: (filter: string) => void;
}

export default function FilterBar({ selectedFilters, toggleFilter }: FilterBarProps) {
  const filters = [
    'Computer Science',
    'Business',
    'Engineering',
    'Medicine',
    'United States',
    'United Kingdom',
    'Canada',
    'Top 10',
    'Top 50',
    'Under $30k/year'
  ];

  return (
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
  );
}