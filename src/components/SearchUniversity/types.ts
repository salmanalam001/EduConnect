export interface University {
  id: string;
  name: string;
  country: string;
  ranking: number;
  programs: string[];
  tuitionRange: string;
  acceptance: string;
  image: string;
  description?: string;
  website?: string;
  established?: number;
  studentCount?: number;
  internationalStudents?: string;
}