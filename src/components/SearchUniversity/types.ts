export interface ApiUniversity {
  web_pages: string[];
  name: string;
  alpha_two_code: string;
  'state-province': string | null;
  domains: string[];
  country: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  stateProvince: string | null;
  webPages: string[];
  domains: string[];
  alphaTwoCode: string;
}

export interface SearchFilters {
  query: string;
  selectedFilters: string[];
}