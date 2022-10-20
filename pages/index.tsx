import type { NextPage } from 'next';
import { Grid, Item } from '../components/grid';
import { Page } from '../components/page';
import { Post } from '../components/post';
import { Section } from '../components/section';
import { Storyline } from '../components/storyline';
import { getAllPosts, getAllStorylines, getAllTags } from '../core/data-layer';
import { PostMeta, StorylineMeta, Tag } from '../core/types';
import { Headline } from '../components/headline';
import { Pointer } from '../components/pointer';
import { TagItem, TagList } from '../components/tag';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Home: NextPage<{
  posts: PostMeta[];
  storylines: StorylineMeta[];
  tags: Tag[];
}> = ({ posts, storylines, tags }) => {
  return (
    <Page
      type="Home"
      title="Welcome to Octahedron.World"
      canonicalPath="/"
      layout="major"
      keywords={['SciFi', 'Science Fiction', 'Science', 'Fantasy']}
    >
      <Section>
        <Headline>Latest Posts</Headline>
        <Grid>
          {posts.map((post) => (
            <Item key={post.slug}>
              <Post meta={post} />
            </Item>
          ))}
        </Grid>
        <Pointer to="/calendar">All Posts</Pointer>
      </Section>
      <Section>
        <Headline>Storylines</Headline>
        <Grid>
          {storylines.map((storyline) => (
            <Item key={storyline.slug}>
              <Storyline meta={storyline} />
            </Item>
          ))}
        </Grid>
        <Pointer to="/storylines">All Storylines</Pointer>
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
  //latest three visible posts
  const posts = getAllPosts()
    .filter(
      (post) =>
        new Date(post.date || Date.now()) <= new Date() && !post.placeholder
    )
    .slice(0, 4);

  // filter out posts for performance reasons
  const storylines = getAllStorylines()
    .map(({ posts, ...s }) => s)
    .slice(0, 4);

  // filter out posts for performance reasons
  const tags = getAllTags()
    .map(({ posts, ...tag }) => tag)
    .filter((tag) => tag.count > 1);

  return { props: { storylines, posts, tags } };
}
