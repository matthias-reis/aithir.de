import { PostMeta, StorylineMeta } from './types';
import metaData from './data-layer.json';

function isVisible(post: PostMeta) {
  return post.hidden || new Date(post.date || 0) <= new Date();
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
        posts: (posts || []).filter(isVisible),
        count: (posts || []).filter(isVisible).length ?? 0,
      }))
      // sort by weight and number of posts
      .sort(
        (a, b) =>
          (b.weight || 0) * 10 + b.count - (a.weight || 0) * 10 - a.count
      )
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
  const tags = {} as Record<string, PostMeta[]>;
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      tags[tag] = [...(tags[tag] ?? []), post];
    }
  }
  return Object.entries(tags)
    .map(([name, posts]) => ({
      name,
      slug: slugify(name),
      count: posts.length,
      posts,
    }))
    .sort((a, b) => b.count - a.count);
}
