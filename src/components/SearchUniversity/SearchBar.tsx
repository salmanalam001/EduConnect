import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search universities, countries, or programs..."
        className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}