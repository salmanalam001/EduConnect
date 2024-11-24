import React from 'react';

interface FilterBarProps {
  filters: string[];
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
}

export default function FilterBar({ filters, selectedFilters, onFilterToggle }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterToggle(filter)}
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
  );
}