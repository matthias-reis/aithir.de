export type StorylineMeta = {
  slug: string;
  name: string;
  description: string;
  count: number;
  tags?: string[];
  posts?: PostMeta[];
};

export type PostMeta = {
  slug: string;
  name: string;
  storyline: string;
  week: string;
  day: string;
  tags?: string[];
};
