import { sync as glob } from 'glob';
import { readFile } from 'fs/promises';
import { basename, dirname } from 'path';
import parseFrontMatter from 'front-matter';
import type { Post, Fm, Category } from './typings';
import { categories } from './meta/categories';

const posts: Record<string, Post> = {};

async function memoizedPosts() {
  if (Object.keys(posts).length === 0) {
    const postPaths = glob(`${__dirname}/../**/*.mdx`);
    await Promise.all(
      postPaths.map(async (path) => {
        const slug = basename(path, '.mdx');
        const categorySlug = dirname(path)
          .split('/')
          .at(-1) as Post['category'];
        const category = categories[categorySlug] as Category;
        const content = await readFile(path, 'utf8');
        const fm = parseFrontMatter(content.toString());
        const chars = fm.body.length;
        const words = fm.body.split(/\s/g).filter(Boolean).length;
        const res = fm.attributes as Fm;
        posts[`${categorySlug}/${slug}`] = {
          path,
          category: category.title,
          slug,
          words,
          chars,
          ...res,
        };
      })
    );
  }
  console.log(posts);
  return posts;
}

export async function getPosts() {
  const posts = await memoizedPosts();
  return posts;
}

export async function getPostBySlug(slug: string) {
  const posts = await memoizedPosts();
  return posts[slug];
}
