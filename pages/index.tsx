import type { NextPage } from 'next';
import { Grid, Item } from '../components/grid';
import { Page } from '../components/page';
import { Article } from '../components/article';
import { Section } from '../components/section';
import {
  getAllPosts,
  getAllStorylines,
  getAllTags,
  getItemFromPost,
  getItemFromStoryline,
} from '../core/data-layer';
import { ItemMeta, Tag } from '../core/types';
import { Headline } from '../components/headline';
import { Pointer } from '../components/pointer';
import { TagItem, TagList } from '../components/tag';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Home: NextPage<{
  items: ItemMeta[];
  tags: Tag[];
}> = ({ items, tags }) => {
  return (
    <Page
      type="Home"
      title="Welcome to Octahedron.World"
      canonicalPath="/"
      layout="major"
    >
      <Section>
        <Headline>Latest Publications</Headline>
        <Grid>
          {items.map((item) => (
            <Item key={item.path}>
              <Article meta={item} />
              {/* {item.factors!.product.toFixed(2)} | seed:{' '}
              {item.factors!.factors[0].toFixed(2)} | age:{' '}
              {item.factors!.factors[1].toFixed(2)} | st:{' '}
              {item.factors!.factors[2].toFixed(2)} */}
            </Item>
          ))}
        </Grid>
        <Pointer to="/calendar">All Posts</Pointer>
      </Section>
      <Section>
        <Headline>Tags</Headline>
        <TagList>
          {tags.map((tag) => (
            <TagItem tag={tag} key={tag.slug} />
          ))}
        </TagList>
      </Section>
    </Page>
  );
};

export default Home;

export function getServerSideProps() {
  // we create a list of items and mix storylines, posts, short stories and art directed stories
  // these are ordered by date and seed
  const posts: ItemMeta[] = getAllPosts()
    .filter(
      (post) =>
        new Date(post.date || Date.now()) <= new Date() && !post.placeholder
    )
    .map(getItemFromPost);

  const storylines: ItemMeta[] = getAllStorylines().map(getItemFromStoryline);

  const items = [...posts, ...storylines]
    .filter((item) => item.factors!.product > 0)
    .sort((a, b) => b.factors!.product - a.factors!.product);

  // filter out posts for performance reasons
  const tags = getAllTags()
    .map(({ posts, ...tag }) => tag)
    .filter((tag) => tag.count > 1);

  return { props: { items, tags } };
}
