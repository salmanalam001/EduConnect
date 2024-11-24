import axios from 'axios';
import Fuse from 'fuse.js';
import { ApiUniversity, University } from './types';

// Cache universities data
let universitiesCache: University[] | null = null;
let fuseInstance: Fuse<University> | null = null;

const FUSE_OPTIONS = {
  keys: ['name', 'country', 'stateProvince', 'domains'],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2
};

async function fetchAndCacheUniversities(): Promise<University[]> {
  try {
    const response = await axios.get<ApiUniversity[]>(
      'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json',
      {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );

    if (!Array.isArray(response.data)) {
      throw new Error('Invalid API response format');
    }

    universitiesCache = response.data.map((uni) => ({
      id: `${uni.name}-${uni.alpha_two_code}`.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: uni.name,
      country: uni.country,
      stateProvince: uni['state-province'],
      webPages: uni.web_pages,
      domains: uni.domains,
      alphaTwoCode: uni.alpha_two_code
    }));

    fuseInstance = new Fuse(universitiesCache, FUSE_OPTIONS);
    return universitiesCache;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw new Error('Failed to fetch universities data. Please try again later.');
  }
}

export async function searchUniversities(
  query: string,
  filters: string[],
  page: number = 1,
  limit: number = 10
): Promise<University[]> {
  try {
    // Fetch and cache universities if not already cached
    if (!universitiesCache) {
      await fetchAndCacheUniversities();
    }

    if (!universitiesCache) {
      throw new Error('Failed to load universities data');
    }

    let results = universitiesCache;

    // Apply search if query exists
    if (query.trim()) {
      if (!fuseInstance) {
        fuseInstance = new Fuse(universitiesCache, FUSE_OPTIONS);
      }
      const searchResults = fuseInstance.search(query);
      results = searchResults.map(result => result.item);
    }

    // Apply country filters
    if (filters.length > 0) {
      results = results.filter(uni => filters.includes(uni.country));
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return results.slice(startIndex, endIndex);
  } catch (error) {
    console.error('Search error:', error);
    throw error instanceof Error ? error : new Error('An unexpected error occurred');
  }
}