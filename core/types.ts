export type StorylineMeta = {
  slug: string;
  name: string;
  description: string;
  count: number;
  finished?: boolean;
  color?: string;
  weight?: number;
  tags?: string[];
  posts?: PostMeta[];
  related: string[];
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
  storylineTags?: string[];
  placeholder?: boolean;
  sources?: { url: string; title: string }[];
};

export type Tag = {
  name: string;
  slug: string;
  count?: number;
  posts?: PostMeta[];
  storylines?: StorylineMeta[];
};
