import { useState, useCallback, useEffect } from 'react';
import { University } from './types';
import { searchUniversities } from './api';

export function useUniversitySearch() {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [results, setResults] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await searchUniversities(query, selectedFilters, page);
      
      if (page === 1) {
        setResults(data);
      } else {
        setResults(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === 10);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setResults([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [query, selectedFilters, page]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    setError(null);
  }, []);

  const handleFilterToggle = useCallback((filter: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      setPage(1);
      setError(null);
      return newFilters;
    });
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && !error) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, hasMore, error]);

  return {
    query,
    selectedFilters,
    results,
    isLoading,
    error,
    hasMore,
    handleSearch,
    handleFilterToggle,
    loadMore
  };
}