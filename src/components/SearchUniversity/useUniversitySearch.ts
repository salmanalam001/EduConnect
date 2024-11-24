import { useState, useCallback, useEffect } from 'react';
import { University } from './types';
import { searchUniversities } from './api';
import { useDebounce } from './useDebounce';

export function useUniversitySearch() {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [results, setResults] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 300);

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await searchUniversities(debouncedQuery, selectedFilters);
      setResults(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred while searching');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery, selectedFilters]);

  // Initial load and search updates
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchResults();
      } catch (error) {
        setError('Failed to load university data');
        setResults([]);
      }
    };
    loadData();
  }, [debouncedQuery, selectedFilters, fetchResults]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const handleFilterToggle = useCallback((filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  }, []);

  return {
    query,
    selectedFilters,
    results,
    isLoading,
    error,
    handleSearch,
    handleFilterToggle
  };
}