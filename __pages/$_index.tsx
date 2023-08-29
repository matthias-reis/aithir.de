import type { NextPage } from 'next';
import { Grid, Item } from '../components/grid';
import { Article } from '../components/article';
import { Section } from '../components/section';
import { getAllItems, getAllTags } from '../core/data-layer';
import { ItemMeta, Tag } from '../core/types';
import { Headline } from '../components/headline';
import { TagItem, TagList } from '../components/tag';
import { LayoutMajor } from '../components/layout-major';

const HomePage: NextPage<{
  items: ItemMeta[];
  tags: Tag[];
}> = ({ items, tags }) => {
  return (
    <LayoutMajor title="Welcome" path="/">
      <Section>
        <Headline>Latest Publications</Headline>
        <Grid>
          {items.map((item) => {
            return (
              <Item key={item.path}>
                <Article meta={item} />
              </Item>
            );
          })}
        </Grid>
      </Section>
      <Section>
        <Headline>Tags</Headline>
        <TagList>
          {tags.map((tag) => (
            <TagItem tag={tag} key={tag.slug} />
          ))}
        </TagList>
      </Section>
    </LayoutMajor>
  );
};

export default HomePage;

export function getServerSideProps() {
  const items = getAllItems();

  // filter out posts and storylines for performance reasons
  // filter out tags that appear only once
  const tags = getAllTags()
    .map(({ items, ...tag }) => tag)
    .filter((tag) => tag.count > 1);

  return { props: { items, tags } };
}
