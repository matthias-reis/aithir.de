import { Metadata } from 'next';
import { Item } from '../comp/item';
import { ItemHorizontal } from '../comp/item-horizontal';
import { LayoutFrame } from '../comp/layout-frame';
import { OctahedronText } from '../comp/octahedron-text';
import { Boxed, Grid, GridItem, Section } from '../comp/sections';
import { Tag, TagList } from '../comp/tag';
import { getTags, getItem, getVisibleItems } from '../core/data-layer';
import type { ItemMeta, TagMeta } from '../core/types';

export default function Page() {
  const items = getVisibleItems().slice(0, 12);
  const m1 = getItem('editions/1');
  const tags = getTags().filter((tag: TagMeta) => (tag.count ?? 0) > 1);
  return (
    <LayoutFrame>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <OctahedronText className="text-4xl md:text-5xl lg:text-6xl" />
          <p className="text-decent-600 text-xl font-light">
            Monthly Magazine for Life, the Universe and Everything.
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>
      <Boxed>
        <h2 className="hidden">Magazine Editions</h2>
        <ItemHorizontal meta={m1} />
      </Boxed>
      <Section
        headline="Featured Reads"
        subHeadline="Latest posts, short stories and magazine editions"
      >
        <Grid>
          {items.map((item: ItemMeta) => (
            <GridItem key={item.slug}>
              <Item meta={item} />
            </GridItem>
          ))}
        </Grid>
      </Section>
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
