export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  readingTime: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    email: string;
  };
}
