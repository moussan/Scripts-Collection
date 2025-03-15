export interface Script {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  path: string;
  usageGuide: string;
  dateAdded: string;
  lastModified: string;
  author?: string;
  version?: string;
  dependencies?: string[];
  requirements?: string[];
  platform?: string;
  complexity?: 'Basic' | 'Intermediate' | 'Advanced';
  status?: 'Active' | 'Deprecated' | 'Beta';
  lastTested?: string;
  averageRuntime?: string;
}

export type Category = {
  id: string;
  name: string;
  description: string;
  subcategories: string[];
}

export type ScriptFilter = {
  search: string;
  category: string;
  subcategory?: string;
  tags: string[];
  complexity?: string;
  status?: string;
} 