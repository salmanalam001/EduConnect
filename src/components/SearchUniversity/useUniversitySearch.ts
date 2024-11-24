import { useState, useCallback, useEffect } from 'react';
import { searchUniversities } from './api';
import { University } from './types';

const PAGE_SIZE = 10;

export function useUniversitySearch() {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await searchUniversities(query, selectedFilters, page, PAGE_SIZE);
      
      if (page === 1) {
        setResults(data);
      } else {
        setResults(prev => [...prev, ...data]);
      }
      
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching results:', error);
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
  }, []);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => {
      const newFilters = prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter];
      return newFilters;
    });
    setPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [isLoading, hasMore]);

  return {
    query,
    setQuery: handleSearch,
    selectedFilters,
    toggleFilter,
    results,
    isLoading,
    hasMore,
    loadMore
  };
}