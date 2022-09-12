import type { NextPage } from 'next';
import Link from 'next/link';
import { Grid, Item } from '../components/grid';
import { OctahedronNav } from '../components/octahedron-nav';
import { Page } from '../components/page';
import { Post } from '../components/post';
import { Section } from '../components/section';
import { Storyline } from '../components/storyline';
import { OctahedronText } from '../components/octahedron-text';
import { H1, H2 } from '../components/typo';
import { getAllPosts, getAllStorylines, getAllTags } from '../core/data-layer';
import { colorMain } from '../core/style';
import { PostMeta, StorylineMeta, Tag } from '../core/types';
import { Headline } from '../components/headline';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Calendar: NextPage<{
  posts: PostMeta[];
  storylines: StorylineMeta[];
  tags: Tag[];
}> = ({ posts, storylines, tags }) => {
  return (
    <Page type="Home" title="Welcome to Octahedron.World">
      <OctahedronNav color={colorMain} />
      <OctahedronText variant="major" color={colorMain} />

      <Section>
        <Headline>Latest Posts</Headline>
      </Section>
    </Page>
  );
};

export default Calendar;

export function getServerSideProps() {
  //latest three visible posts
  const posts = getAllPosts().slice(0, 4);

  // filter out posts for performance reasons
  const storylines = getAllStorylines().map(({ posts, ...s }) => s);

  // filter out posts for performance reasons
  const tags = getAllTags().map(({ posts, ...tag }) => tag);

  return { props: { storylines, posts, tags } };
}
