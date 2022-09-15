import glob from 'glob-promise';
import { dirname, join } from 'path';
import { PostMeta, StorylineMeta } from './types';
import { yaml, fm } from './io';
import { fstat, writeFileSync } from 'fs';

function createDate(year: number, week: number, day: number) {
  const date = new Date(year, 0, 1);
  date.setDate(date.getDate() + (week - 1) * 7 + day + 1);
  return date;
}

async function getMetaData(): Promise<Record<string, StorylineMeta>> {
  const metaData = {} as Record<string, StorylineMeta>;
  // we glob and read all ymls
  const storylineFiles = await glob('**/*.yml', {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of storylineFiles) {
    const storylineSlug = file.split('/').at(-2) ?? '';
    const storylineMetaData = (await yaml(file)) as Omit<StorylineMeta, 'slug'>;
    const cwd = dirname(file);
    const postFiles = await glob('**/*.md', { cwd, absolute: true });
    console.log(`[PRE] ${storylineSlug}: <${postFiles.length}>`);
    const posts = await Promise.all(
      postFiles.map(async (postFile) => {
        const postSlug = postFile.split('/').at(-1)?.replace('.md', '') ?? '';
        const post = await fm<PostMeta>(postFile);
        return {
          ...post.attributes,
          date: createDate(
            post.attributes.year,
            post.attributes.week,
            post.attributes.day
          ).toISOString(),
          md: post.body,
          slug: `${storylineSlug}/${postSlug}`,
          storyline: {
            name: storylineMetaData.name,
            color: storylineMetaData.color,
            slug: storylineSlug,
          },
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
      count: posts.length,
    };
  }

  // and then the md files next to them
  return metaData;
}

async function run() {
  console.log('[PRE] start');
  const metadata = await getMetaData();
  const json = JSON.stringify(metadata, null, 2);
  writeFileSync(join(__dirname, 'data-layer.json'), json);
  console.log('[PRE] done');
}

run();
