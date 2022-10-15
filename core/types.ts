export type StorylineMeta = {
  slug: string;
  name: string;
  description: string;
  count: number;
  color?: string;
  weight?: number;
  tags?: string[];
  posts?: PostMeta[];
};

export type PostMeta = {
  slug: string;
  name: string;
  storyline: { name: string; slug: string; color?: string };
  year: number;
  week: number;
  day: number;
  md: string;
  episode?: number;
  date?: string;
  tags?: string[];
  placeholder?: boolean;
};

export type Tag = {
  name: string;
  slug: string;
  count?: number;
  posts?: PostMeta[];
  storylines?: StorylineMeta[];
};
