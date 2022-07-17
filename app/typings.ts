export type Fm = {
  title: string;
  description?: string;
  date: string;
  tags?: string[];
};

export type Post = Fm & {
  path: string;
  category: string;
  slug: string;
  words: number;
  chars: number;
};

export type Category = {
  title: string;
  description?: string;
};
