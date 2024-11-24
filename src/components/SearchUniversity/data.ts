import { University } from './types';

export const universities: University[] = [
  {
    name: 'Stanford University',
    country: 'United States',
    ranking: 2,
    programs: ['Computer Science', 'Business Administration', 'Engineering'],
    tuitionRange: '$55,000 - $65,000',
    acceptance: '4.8%',
    image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=400&h=300&fit=crop'
  },
  {
    name: 'MIT',
    country: 'United States',
    ranking: 1,
    programs: ['Computer Science', 'Engineering', 'Business'],
    tuitionRange: '$53,000 - $62,000',
    acceptance: '7.3%',
    image: 'https://images.unsplash.com/photo-1564394256913-3b06c176695c?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Oxford',
    country: 'United Kingdom',
    ranking: 1,
    programs: ['Medicine', 'Computer Science', 'Engineering'],
    tuitionRange: '£26,770 - £39,010',
    acceptance: '17.5%',
    image: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Cambridge',
    country: 'United Kingdom',
    ranking: 3,
    programs: ['Medicine', 'Engineering', 'Business'],
    tuitionRange: '£27,000 - £40,000',
    acceptance: '21%',
    image: 'https://images.unsplash.com/photo-1569534403589-5a8e69fc40f1?w=400&h=300&fit=crop'
  },
  {
    name: 'University of Toronto',
    country: 'Canada',
    ranking: 18,
    programs: ['Medicine', 'Business', 'Computer Science'],
    tuitionRange: 'CAD 45,900 - 65,280',
    acceptance: '43%',
    image: 'https://images.unsplash.com/photo-1569534403589-5a8e69fc40f1?w=400&h=300&fit=crop'
  }
];