import { Item } from '../comp/item';
import { ItemHorizontal } from '../comp/item-horizontal';
import { LayoutFrame } from '../comp/layout-frame';
import { Grid, GridItem, Section } from '../comp/sections';
import { Tag, TagList } from '../comp/tag';
import { SectionHead, Text } from '../comp/typo';
import { getVisibleItems, getTags, getItem } from '../core/data-layer';
import type { ItemMeta, TagMeta } from '../core/types';

export default function Page() {
  const items = getVisibleItems().slice(0, 6);
  const m1 = getItem('editions/1');
  const tags = getTags().filter((tag: TagMeta) => (tag.count ?? 0) > 1);
  return (
    <LayoutFrame colorSpace="neutral" withTextLogo>
      <Section
        headline="Welcome"
        subHeadline="to Octahedron World, a monthly magazine for life, the universe and everything"
      >
        <ItemHorizontal meta={m1} />
      </Section>
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
        subHeadline="Skim through the most featured topics of theis page"
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
