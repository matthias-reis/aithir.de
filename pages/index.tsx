import type { NextPage } from 'next';
import Link from 'next/link';
import { Grid, Item } from '../components/grid';
import { Page } from '../components/page';
import { Post } from '../components/post';
import { Section } from '../components/section';
import { H1, H2 } from '../components/typo';
import { getAllPosts, getAllStorylines, getAllTags } from '../core/data-layer';
import { PostMeta, StorylineMeta, Tag } from '../core/types';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Home: NextPage<{
  posts: PostMeta[];
  storylines: StorylineMeta[];
  tags: Tag[];
}> = ({ posts, storylines, tags }) => {
  return (
    <Page>
      <Section>
        <H1>Startseite</H1>
      </Section>
      <Section>
        <H2>Latest Posts</H2>
        <Grid>
          {posts.map((post) => (
            <Item key={post.slug}>
              <Post meta={post} />
            </Item>
          ))}
        </Grid>
      </Section>
      <Section>
        <H2>Most Active Storylines</H2>
        <ul>
          {storylines.map((storyline) => (
            <li key={storyline.slug}>
              <Link href={`/storylines/${storyline.slug}`}>
                <div>
                  <div>
                    <strong>{storyline.name}</strong>
                  </div>
                  <div>{storyline.description}</div>
                  <div>{storyline.count} posts</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/storylines">All Storylines</Link>
        </p>
      </Section>
      <Section>
        <H2>Tags</H2>
        <ul>
          {tags.map((tag) => (
            <li key={tag.slug}>
              <Link href={`/tags/${tag.slug}`}>
                <div>
                  <strong>#{tag.name}</strong> ({tag.count})
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </Page>
  );
};

export default Home;

export function getServerSideProps() {
  //latest three visible posts
  const posts = getAllPosts().slice(0, 4);

  // filter out posts for performance reasons
  const storylines = getAllStorylines().map(({ posts, ...s }) => s);

  // filter out posts for performance reasons
  const tags = getAllTags().map(({ posts, ...tag }) => tag);

  return { props: { storylines, posts, tags } };
}
