import glob from 'glob-promise';
import { dirname } from 'path';
import { PostMeta, StorylineMeta } from './types';
import { yaml, fm } from './io';

let metaData = {} as Record<string, StorylineMeta>;

function isVisible(post: PostMeta) {
  const currentYear = new Date().getFullYear();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}

function createDate(year: number, week: number, day: number) {
  const date = new Date(year, 0, 1);
  date.setDate(date.getDate() + (week - 1) * 7 + day + 1);
  return date;
}

async function getMetaData(): Promise<Record<string, StorylineMeta>> {
  if (Object.keys(metaData).length > 0) {
    return metaData;
  }
  metaData = {};
  // we glob and read all ymls
  const storylineFiles = await glob('**/*.yml', {
    cwd: `${process.cwd}/..`,
    absolute: true,
  });
  for (const file of storylineFiles) {
    const storylineSlug = file.split('/').at(-2) ?? '';
    const storylineMetaData = (await yaml(file)) as Omit<StorylineMeta, 'slug'>;
    const cwd = dirname(file);
    const postFiles = await glob('**/*.md', { cwd, absolute: true });
    const posts = await Promise.all(
      postFiles.map(async (postFile) => {
        const postSlug = postFile.split('/').at(-1)?.replace('.md', '') ?? '';
        const post = await fm<PostMeta>(postFile);
        return {
          ...post.attributes,
          serializedDate: createDate(
            post.attributes.year,
            post.attributes.week,
            post.attributes.day
          ).toISOString(),
          md: post.body,
          slug: `${storylineSlug}/${postSlug}`,
          tags: [
            ...(post.attributes.tags ?? []),
            ...(storylineMetaData.tags ?? []),
          ],
        };
      })
    );
    metaData[storylineSlug] = {
      ...storylineMetaData,
      slug: storylineSlug,
      posts,
    };
  }

  // and then the md files next to them
  return metaData;
}

export async function getAllStorylines(): Promise<StorylineMeta[]> {
  const metaData = await getMetaData();
  return (
    Object.values(metaData)
      // remove posts and replace them with a count to optimize data
      .map(({ posts, ...rest }) => ({
        ...rest,
        posts,
        count: (posts || []).map(isVisible).length ?? 0,
      }))
      // sort by weight and number of posts
      .sort(
        (a, b) =>
          (b.weight || 0) * 10 + b.count - (a.weight || 0) * 10 - a.count
      )
      // remove storylines that are not yet published
      .filter((s) => s.count > 0)
  );
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const metaData = await getMetaData();
  return (
    Object.values(metaData)
      // remove posts and replace them with a count to optimize data
      .map(({ posts }) => posts || [])
      .flat()
      .filter(Boolean)
      .sort((a, b) =>
        (b.date || new Date()) > (a.date || new Date()) ? 1 : -1
      )
      .map(({ serializedDate, ...post }) => ({
        ...post,
        date: new Date(serializedDate || ''),
      }))
  );
}

export async function getAllTags() {
  const posts = await getAllPosts();
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
