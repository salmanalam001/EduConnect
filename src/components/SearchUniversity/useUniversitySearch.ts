import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUniversityRecommendations } from '../AiService';
import { searchUniversities } from './api';
import { University } from './types';

const PAGE_SIZE = 10;

export function useUniversitySearch() {
  const [query, setQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useQuery({
    queryKey: ['universities', query, selectedFilters, page],
    queryFn: async () => {
      const aiRecommendations = query ? await getUniversityRecommendations(query, '') : null;
      const searchResults = await searchUniversities({
        query,
        filters: selectedFilters,
        page,
        pageSize: PAGE_SIZE,
        aiRecommendations
      });
      return searchResults;
    },
    keepPreviousData: true
  });

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
    if (hasNextPage && !isFetchingNextPage) {
      setPage(prev => prev + 1);
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    query,
    setQuery: handleSearch,
    selectedFilters,
    toggleFilter,
    results: data?.pages.flat() ?? [],
    isLoading: isLoading || isFetchingNextPage,
    hasMore: hasNextPage,
    loadMore
  };
}