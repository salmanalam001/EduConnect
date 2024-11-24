import React from 'react';
import { useInView } from 'react-intersection-observer';
import UniversityCard from './UniversityCard';
import { University } from './types';

interface ResultsListProps {
  results: University[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  query: string;
}

export default function ResultsList({ 
  results, 
  isLoading, 
  hasMore,
  loadMore,
  query 
}: ResultsListProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView && hasMore && !isLoading) {
        loadMore();
      }
    },
  });

  if (isLoading && results.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isLoading && results.length === 0 && query) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No universities found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {results.map((university, index) => (
        <UniversityCard 
          key={university.id} 
          university={university} 
        />
      ))}
      
      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          {isLoading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
          )}
        </div>
      )}
    </div>
  );
}