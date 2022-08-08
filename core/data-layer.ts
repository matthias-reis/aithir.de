import glob from 'glob-promise';
import { dirname } from 'path';
import { PostMeta, StorylineMeta } from './types';
import { yaml, fm } from './io';

let metaData = {} as Record<string, StorylineMeta>;

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
        const postSlug = file.split('/').at(-1)?.replace('.md', '') ?? '';

        const post = await fm<PostMeta>(postFile);
        post.attributes;
        return {
          ...post.attributes,
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
  console.log(metaData);
  return Object.values(metaData);
}
