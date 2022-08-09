import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../components/page';
import { Section } from '../components/section';
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
        <h1>Startseite</h1>
      </Section>
      <Section>
        <h2>Latest Stories</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/storylines/${post.slug}`}>
                <div>
                  <div>{post.name}</div>
                  <div>{post.storyline.name}</div>
                  <div>
                    {post.year}-{post.week}
                  </div>
                  {post.date && <div>{new Date(post.date).toDateString()}</div>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <h2>Storylines</h2>
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
        <h2>Tags</h2>
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
  const posts = getAllPosts().slice(0, 3);

  // filter out posts for performance reasons
  const storylines = getAllStorylines().map(({ posts, ...s }) => s);

  // filter out posts for performance reasons
  const tags = getAllTags().map(({ posts, ...tag }) => tag);

  return { props: { storylines, posts, tags } };
}
