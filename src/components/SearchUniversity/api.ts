import { ApiUniversity, University } from './types';

let universitiesCache: University[] | null = null;

function normalizeText(text: string): string {
  return text.toLowerCase().trim();
}

function searchInText(searchText: string, targetText: string): boolean {
  const normalizedSearch = normalizeText(searchText);
  const normalizedTarget = normalizeText(targetText);
  return normalizedTarget.includes(normalizedSearch);
}

export async function searchUniversities(
  query: string,
  filters: string[],
  page: number = 1,
  limit: number = 10
): Promise<University[]> {
  try {
    if (!universitiesCache) {
      const response = await fetch('/world_universities_and_domains.json');
      if (!response.ok) {
        throw new Error('Failed to fetch universities data');
      }
      const data: ApiUniversity[] = await response.json();
      
      universitiesCache = data.map((uni) => ({
        id: `${uni.name}-${uni.alpha_two_code}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: uni.name,
        country: uni.country,
        stateProvince: uni['state-province'],
        webPages: uni.web_pages,
        domains: uni.domains,
        alphaTwoCode: uni.alpha_two_code
      }));
    }

    let results = [...universitiesCache];

    // Apply search query
    if (query.trim()) {
      results = results.filter(uni => 
        searchInText(query, uni.name) ||
        searchInText(query, uni.country) ||
        (uni.stateProvince && searchInText(query, uni.stateProvince)) ||
        uni.domains.some(domain => searchInText(query, domain))
      );
    }

    // Apply country filters
    if (filters.length > 0) {
      results = results.filter(uni => filters.includes(uni.country));
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);
    
    return paginatedResults;
  } catch (error) {
    console.error('Search error:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
}