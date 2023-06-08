import { text } from 'stream/consumers';

export type StorylineMeta = {
  slug: string;
  name: string;
  description: string;
  count: number;
  type?: string;
  finished?: boolean;
  color?: string;
  weight?: number;
  tags?: string[];
  posts?: PostMeta[];
  related?: string[];
  seed?: number;
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
  seed?: number;
};

export type ItemMeta = {
  path: string;
  title: string;
  superTitle?: string;
  date?: string;
  type: string;
  image: string;
  text: string;
  seed?: number;
  weight?: string;
  factors?: { product: number; factors: number[] };
};

export type Tag = {
  name: string;
  slug: string;
  count?: number;
  posts?: ItemMeta[];
  storylines?: ItemMeta[];
};
