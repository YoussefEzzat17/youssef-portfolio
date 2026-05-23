export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'Angular' | 'React' | 'Other';
  image: string;
  tags: string[];
  github: string;
  demo: string;
  features?: string[];
  detailedDescription?: string;
}
