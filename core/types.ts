export type StorylineMeta = {
  slug: string;
  name: string;
  description: string;
  count: number;
  weight?: number;
  tags?: string[];
  posts?: PostMeta[];
};

export type PostMeta = {
  slug: string;
  name: string;
  storyline: { name: string; slug: string };
  year: number;
  week: number;
  day: number;
  md: string;
  date?: string;
  tags?: string[];
  hidden?: boolean;
};

export type Tag = {
  name: string;
  slug: string;
  count?: number;
  posts?: PostMeta[];
  storylines?: StorylineMeta[];
};
