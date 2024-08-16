import { Metadata } from 'next';
import { Item } from '../comp/item';
import { ItemHorizontal } from '../comp/item-horizontal';
import { LayoutFrame } from '../comp/layout-frame';
import { OctahedronText } from '../comp/octahedron-text';
import { Boxed, Grid, GridItem, Section } from '../comp/sections';
import { Tag, TagList } from '../comp/tag';
import {
  getTags,
  getItem,
  getVisibleItems,
  getPosts,
  getStories,
} from '../core/data-layer';
import type { ItemMeta, TagMeta } from '../core/types';

export default function Page() {
  const posts = getPosts().slice(0, 60);
  const stories = getStories();
  const tags = getTags().filter((tag: TagMeta) => (tag.count ?? 0) > 1);
  return (
    <LayoutFrame>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <OctahedronText className="text-4xl md:text-5xl lg:text-6xl" />
          <p className="text-decent-600 text-xl font-lighter">
            Ephemeral Thoughts about Life, the Universe and Everything.
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <div className="grid grid-cols-3">
        <Section
          className="col-span-2"
          headline="Posts"
          subHeadline="Latest micro fiction, pics and thoughts"
        >
          <div className="grid grid-cols-2">
            {posts.map((item: ItemMeta) => (
              <div className="" key={item.slug}>
                <Item meta={item} date />
              </div>
            ))}
          </div>
        </Section>
        <Section
          headline="Stories"
          subHeadline="Fiction and Essays"
          className="grid-cols-4"
        >
          {stories.map((item: ItemMeta) => (
            <div className="" key={item.slug}>
              <Item meta={item} />
            </div>
          ))}
        </Section>
      </div>
      <Section
        headline="Keywords"
        subHeadline="Skim through the most featured topics of these pages"
      >
        <TagList className="mt-5">
          {tags.map((tag) => (
            <Tag key={tag.slug} tag={tag} />
          ))}
        </TagList>
      </Section>
    </LayoutFrame>
  );
}

export const metadata: Metadata = {
  title: 'Welcome to OCTAHEDRON.WORLD',
};
