import { University, ApiUniversity } from './types';

let universitiesCache: University[] | null = null;

export async function searchUniversities(query: string, filters: string[]): Promise<University[]> {
  try {
    if (!universitiesCache) {
      const response = await fetch('/world_universities_and_domains.json');
      if (!response.ok) {
        throw new Error('Failed to fetch universities data');
      }
      const data: ApiUniversity[] = await response.json();
      
      // Normalize and clean the data
      universitiesCache = data
        .filter(uni => uni.name && uni.country) // Filter out invalid entries
        .map((uni) => ({
          id: `${uni.name}-${uni.alpha_two_code}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: uni.name.trim(),
          country: uni.country.trim(),
          stateProvince: uni['state-province'] ? uni['state-province'].trim() : null,
          webPages: uni.web_pages.filter(url => url && url.trim()),
          domains: uni.domains.filter(domain => domain && domain.trim()),
          alphaTwoCode: uni.alpha_two_code.trim()
        }));
    }

    let results = [...universitiesCache];

    // Apply search query
    if (query.trim()) {
      const searchTerms = query.toLowerCase().trim().split(/\s+/);
      results = results.filter(uni => 
        searchTerms.every(term =>
          uni.name.toLowerCase().includes(term) ||
          uni.country.toLowerCase().includes(term) ||
          (uni.stateProvince && uni.stateProvince.toLowerCase().includes(term)) ||
          uni.domains.some(domain => domain.toLowerCase().includes(term)) ||
          uni.alphaTwoCode.toLowerCase().includes(term)
        )
      );
    }

    // Apply country filters
    if (filters.length > 0) {
      results = results.filter(uni => filters.includes(uni.country));
    }

    // Sort results by name
    results.sort((a, b) => a.name.localeCompare(b.name));

    return results;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to load university data. Please try again later.');
  }
}