export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishDate: string;
  readTime: number;
  imageUrl: string;
  featured: boolean;
  mythStatus: 'busted' | 'confirmed' | 'plausible';
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface AdPlacement {
  id: string;
  position: 'header' | 'sidebar' | 'inline' | 'footer';
  size: string;
  content?: string;
}