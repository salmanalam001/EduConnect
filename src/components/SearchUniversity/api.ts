import axios from 'axios';
import Fuse from 'fuse.js';
import { University } from './types';

const API_URL = 'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json';

let universities: University[] = [];
let fuseSearch: Fuse<University>;

const fuseOptions = {
  keys: ['name', 'country', 'domains'],
  threshold: 0.3,
  distance: 100
};

async function fetchUniversities() {
  if (universities.length > 0) return universities;

  try {
    const response = await axios.get(API_URL);
    universities = response.data.map((uni: any) => ({
      id: uni.domains[0] || Math.random().toString(),
      name: uni.name,
      country: uni.country,
      domains: uni.domains || [],
      webPages: uni['web_pages'] || [],
      alphaTwoCode: uni['alpha_two_code'],
      stateProvince: uni['state-province'],
      ranking: Math.floor(Math.random() * 500) + 1,
      image: `https://source.unsplash.com/400x300/?university,${uni.country.replace(/\s+/g, '')}`
    }));

    fuseSearch = new Fuse(universities, fuseOptions);
    return universities;
  } catch (error) {
    console.error('Error fetching universities:', error);
    return [];
  }
}

export async function searchUniversities(query: string, filters: string[], page: number = 1, pageSize: number = 10): Promise<University[]> {
  try {
    await fetchUniversities();
    
    let results = universities;

    // Apply search query using Fuse.js
    if (query.trim()) {
      const searchResults = fuseSearch.search(query);
      results = searchResults.map(result => result.item);
    }

    // Apply filters
    if (filters.length > 0) {
      results = results.filter(uni => {
        return filters.some(filter => {
          if (filter === 'Top 100') return uni.ranking <= 100;
          if (filter === 'Top 500') return uni.ranking <= 500;
          return uni.country === filter;
        });
      });
    }

    // Apply pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return results.slice(start, end);
  } catch (error) {
    console.error('Error searching universities:', error);
    return [];
  }
}

export async function getTopCountries(): Promise<string[]> {
  try {
    await fetchUniversities();
    const countryCounts = universities.reduce((acc: { [key: string]: number }, uni) => {
      acc[uni.country] = (acc[uni.country] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([country]) => country);
  } catch (error) {
    console.error('Error getting top countries:', error);
    return [];
  }
}