import { glob } from 'glob';
import { join } from 'path';
import { FrontMatter, ItemMeta } from './types';
import { fm } from './io';
import { writeFileSync } from 'fs';

function parseContent(s: string) {
  s = s.trim().replace(/==> (.*)/g, '\n---\n@@ $1\n---\n');
  const sections = s
    .split('---')
    .map((section) => section.trim())
    .filter(Boolean);
  return sections;
}

function wordCount(sections: string[]) {
  return sections.reduce((acc, section) => {
    if (!section.startsWith('@@')) {
      acc = section.split(' ').length;
    }
    return acc;
  }, 0);
}

function refineMeta(item: Omit<ItemMeta, 'type' | 'words'>): ItemMeta {
  if (item.slug.startsWith('storyline')) {
    return { ...item, type: 'storyline', words: wordCount(item.sections) };
  }
  if (item.slug.startsWith('post')) {
    const category = item.slug.split('/')[1];
    return {
      ...item,
      type: 'post',
      image: item.image || `posts/${category}`,
      superTitle: 'Post',
      category,
      words: wordCount(item.sections),
    };
  }
  if (item.slug.startsWith('editions')) {
    const parts = item.slug.split('/');
    const edition = parseInt(parts[1]);
    if (parts.length === 2) {
      return {
        ...item,
        type: 'magazine',
        edition,
        words: wordCount(item.sections),
      };
    } else {
      return {
        ...item,
        type: 'addenum',
        edition,
        words: wordCount(item.sections),
      };
    }
  } else {
    return { ...item, type: 'other', words: wordCount(item.sections) };
  }
}

async function getMetaData(): Promise<Record<string, ItemMeta>> {
  const metaData = {} as Record<string, ItemMeta>;

  // we only have md files under /content, so we can simply parse all of them first

  const files = await glob('_content/**/*.md', {
    cwd: process.cwd(),
    absolute: true,
  });

  for (const file of files) {
    const slug = file
      .replace(process.cwd() + '/_content/', '')
      .replace('.md', '')
      .replace('/index', '');

    const frontmatter = await fm<FrontMatter>(file);
    const unrefinedMeta: Omit<ItemMeta, 'type' | 'words'> = {
      ...frontmatter.attributes,
      slug,
      sections: parseContent(frontmatter.body),
    };
    const meta = refineMeta(unrefinedMeta);
    if (meta.title) {
      metaData[slug] = meta;
      console.log(`[PRE] <${meta.type}> ${slug}`);
    }
  }
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
