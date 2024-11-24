export interface University {
  id: string;
  name: string;
  country: string;
  domains: string[];
  webPages: string[];
  alphaTwoCode: string;
  stateProvince: string | null;
  ranking: number;
  image: string;
}