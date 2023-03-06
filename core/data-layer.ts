import { PostMeta, StorylineMeta } from './types';
import metaData from './data-layer.json';

function isVisible(post: PostMeta) {
  return post.placeholder || new Date(post.date || 0) <= new Date();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}

function getMetaData(): Record<string, StorylineMeta> {
  return metaData as Record<string, StorylineMeta>;
}

export function getAllStorylines(): StorylineMeta[] {
  const metaData = getMetaData();
  return (
    Object.values(metaData)
      // remove posts and replace them with a count to optimize data
      .map(({ posts, ...rest }) => ({
        ...rest,
        posts: (posts || [])
          .filter(isVisible)
          .map((post, i) => ({ ...post, episode: i + 1 })),
      }))
      // sort by age and number of posts
      .sort((a, b) => {
        const aAgeIndicator = getAgeIndicator(a);
        const bAgeIndicator = getAgeIndicator(b);
        return bAgeIndicator + b.count - aAgeIndicator - a.count;
      })
      // remove storylines that are not yet published
      .filter((s) => s.count !== 0)
  );
}

export function getAllPosts(): PostMeta[] {
  const metaData = getMetaData();
  return Object.values(metaData)
    .map(({ posts }) => posts || [])
    .flat()
    .filter(Boolean)
    .sort((a, b) => (new Date(b.date || '') > new Date(a.date || '') ? 1 : -1));
}

export function getAllTags() {
  const posts = getAllPosts();
  const storylines = getAllStorylines();

  const tags = {} as Record<
    string,
    { storylines: StorylineMeta[]; posts: PostMeta[] }
  >;

  for (const post of posts) {
    if (new Date(post.date || Date.now()) <= new Date() && !post.placeholder) {
      for (const tag of post.tags ?? []) {
        if (!tags[tag]) {
          tags[tag] = { posts: [], storylines: [] };
        }
        tags[tag].posts.push(post);
      }
    }
  }
  for (const storyline of storylines) {
    for (const tag of storyline.tags ?? []) {
      if (!tags[tag]) {
        tags[tag] = { posts: [], storylines: [] };
      }
      tags[tag].storylines.push(storyline);
    }
  }
  return Object.entries(tags)
    .map(([name, entries]) => ({
      name,
      slug: slugify(name),
      count: entries.storylines.length + entries.posts.length,
      ...entries,
    }))
    .sort((a, b) => b.count - a.count);
}

function getAgeIndicator(storyline: StorylineMeta) {
  const ages =
    storyline.posts
      ?.map((p) => {
        const ageInDays =
          (new Date().getTime() - new Date(p.date || '').getTime()) /
          (1000 * 60 * 60 * 24);
        return ageInDays;
      })
      .filter((age) => age > 0)
      .map((age) => 30 - age)
      .sort((a, b) => b - a)
      .filter((ageIndicator) => {
        return ageIndicator > 0;
      }) ?? [];
  const ageIndicator = ages.reduce((sum, next) => sum + next, 0);
  return ageIndicator;
}
