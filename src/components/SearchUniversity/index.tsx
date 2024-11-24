import React from 'react';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import ResultsList from './ResultsList';
import { useUniversitySearch } from './useUniversitySearch';

export default function SearchUniversity() {
  const {
    query,
    setQuery,
    selectedFilters,
    toggleFilter,
    results,
    isLoading,
    hasMore,
    loadMore
  } = useUniversitySearch();

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="space-y-4">
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
        />
        
        <FilterBar 
          selectedFilters={selectedFilters}
          toggleFilter={toggleFilter}
        />

        <ResultsList 
          results={results}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
          query={query}
        />
      </div>
    </div>
  );
}