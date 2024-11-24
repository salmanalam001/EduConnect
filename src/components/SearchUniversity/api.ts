import axios from 'axios';
import { ApiUniversity, University } from './types';

const API_URL = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';

let cachedUniversities: University[] | null = null;

export async function fetchUniversities(): Promise<University[]> {
  if (cachedUniversities) return cachedUniversities;

  try {
    const response = await axios.get<ApiUniversity[]>(API_URL);
    
    cachedUniversities = response.data.map((uni) => ({
      id: `${uni.name}-${uni.alpha_two_code}`.toLowerCase().replace(/\s+/g, '-'),
      name: uni.name,
      country: uni.country,
      stateProvince: uni['state-province'],
      webPages: uni.web_pages,
      domains: uni.domains,
      alphaTwoCode: uni.alpha_two_code
    }));

    return cachedUniversities;
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw new Error('Failed to fetch universities');
  }
}

export async function searchUniversities(
  query: string,
  filters: string[],
  page: number = 1,
  limit: number = 10
): Promise<University[]> {
  try {
    const allUniversities = await fetchUniversities();
    let filtered = allUniversities;

    // Apply search query
    if (query.trim()) {
      const searchQuery = query.toLowerCase();
      filtered = filtered.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery) ||
        uni.country.toLowerCase().includes(searchQuery) ||
        uni.domains.some(domain => domain.toLowerCase().includes(searchQuery))
      );
    }

    // Apply country filters
    if (filters.length > 0) {
      filtered = filtered.filter(uni =>
        filters.some(filter => uni.country === filter)
      );
    }

    // Apply pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    
    return filtered.slice(start, end);
  } catch (error) {
    console.error('Error searching universities:', error);
    throw new Error('Failed to search universities');
  }
}