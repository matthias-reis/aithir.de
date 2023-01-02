import glob from 'glob-promise';
import { dirname, join } from 'path';
import { PostMeta, StorylineMeta } from './types';
import { yaml, fm } from './io';
import { fstat, writeFileSync } from 'fs';

function createDate(year: number, week: number, day: number) {
  const date = new Date(year, 0, 1);
  date.setDate(date.getDate() + (week - 1) * 7 + day);
  date.setHours(3, 0, 0, 1);

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
    const finished = file.includes('_archive');
    console.log(
      `[PRE] ${storylineSlug}: <${postFiles.length}>${
        finished ? ' (FINISHED)' : ''
      }`
    );
    const posts = await Promise.all(
      postFiles.map(async (postFile, i) => {
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
          episode: i + 1,
          tags: post.attributes.tags ?? [],
          storylineTags: storylineMetaData.tags ?? [],
        };
      })
    );
    metaData[storylineSlug] = {
      slug: storylineSlug,
      finished,
      ...storylineMetaData,
      posts,
      count: posts.filter(
        (post) =>
          new Date(post.date || Date.now()) <= new Date() || post.placeholder
      ).length,
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
