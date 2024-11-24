import axios from 'axios';
import { University } from './types';
import { RecommendationResult } from '../AiService';

// Simulated university data for demo
const mockUniversities: University[] = [
  {
    id: '1',
    name: 'Stanford University',
    country: 'United States',
    ranking: 2,
    programs: ['Computer Science', 'Business Administration', 'Engineering'],
    tuitionRange: '$55,000 - $65,000',
    acceptance: '4.8%',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop',
    established: 1885,
    studentCount: 16937,
    internationalStudents: '24%'
  },
  {
    id: '2',
    name: 'University of Toronto',
    country: 'Canada',
    ranking: 18,
    programs: ['Psychology', 'Economics', 'Mathematics', 'Computer Science'],
    tuitionRange: 'CAD 45,900 - 65,280',
    acceptance: '43%',
    image: 'https://images.unsplash.com/photo-1544662044-4201be74e12d?w=400&h=300&fit=crop',
    established: 1827,
    studentCount: 93349,
    internationalStudents: '21%'
  },
  {
    id: '3',
    name: 'University of Oxford',
    country: 'United Kingdom',
    ranking: 1,
    programs: ['Medicine', 'Law', 'Physics', 'Computer Science'],
    tuitionRange: '£26,770 - £39,010',
    acceptance: '17.5%',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=300&fit=crop',
    established: 1096,
    studentCount: 24299,
    internationalStudents: '41%'
  },
  {
    id: '4',
    name: 'MIT',
    country: 'United States',
    ranking: 3,
    programs: ['Engineering', 'Computer Science', 'Physics', 'Mathematics'],
    tuitionRange: '$53,790 - $57,590',
    acceptance: '7.3%',
    image: 'https://images.unsplash.com/photo-1564198879220-63f2734f7cec?w=400&h=300&fit=crop',
    established: 1861,
    studentCount: 11376,
    internationalStudents: '29%'
  },
  {
    id: '5',
    name: 'University of British Columbia',
    country: 'Canada',
    ranking: 34,
    programs: ['Environmental Science', 'Engineering', 'Business', 'Medicine'],
    tuitionRange: 'CAD 42,584 - 54,847',
    acceptance: '52.4%',
    image: 'https://images.unsplash.com/photo-1544662044-4201be74e12d?w=400&h=300&fit=crop',
    established: 1908,
    studentCount: 66512,
    internationalStudents: '28%'
  },
  {
    id: '6',
    name: 'Imperial College London',
    country: 'United Kingdom',
    ranking: 6,
    programs: ['Engineering', 'Medicine', 'Computer Science', 'Physics'],
    tuitionRange: '£32,000 - £45,000',
    acceptance: '14.3%',
    image: 'https://images.unsplash.com/photo-1534260164206-2a3a4a72891d?w=400&h=300&fit=crop',
    established: 1907,
    studentCount: 19400,
    internationalStudents: '60%'
  }
];

interface SearchParams {
  query: string;
  filters: string[];
  page: number;
  pageSize: number;
  aiRecommendations: RecommendationResult | null;
}

export async function searchUniversities({
  query,
  filters,
  page,
  pageSize,
  aiRecommendations
}: SearchParams): Promise<University[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let results = [...mockUniversities];

  // Apply search query
  if (query) {
    results = results.filter(uni =>
      uni.name.toLowerCase().includes(query.toLowerCase()) ||
      uni.country.toLowerCase().includes(query.toLowerCase()) ||
      uni.programs.some(program => 
        program.toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  // Apply filters
  if (filters.length > 0) {
    results = results.filter(uni =>
      filters.some(filter => {
        if (filter === 'Top 10') return uni.ranking <= 10;
        if (filter === 'Top 50') return uni.ranking <= 50;
        if (filter === 'Under $30k/year') {
          const minTuition = parseInt(uni.tuitionRange.replace(/[^0-9]/g, ''));
          return minTuition < 30000;
        }
        return (
          uni.country === filter ||
          uni.programs.includes(filter)
        );
      })
    );
  }

  // Apply AI recommendations if available
  if (aiRecommendations) {
    results = results.sort((a, b) => {
      const aRec = aiRecommendations.universities.find(r => r.name === a.name);
      const bRec = aiRecommendations.universities.find(r => r.name === b.name);
      return (bRec?.match ?? 0) - (aRec?.match ?? 0);
    });
  }

  // Paginate results
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return results.slice(start, end);
}