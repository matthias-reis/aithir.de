import type { NextPage } from 'next';
import { Page } from '../../components/page';
import { getAllPosts } from '../../core/data-layer';
import { PostMeta } from '../../core/types';
import { PageTitle, PageSuperTitle } from '../../components/page-title';
import { Post } from '../../components/post';

type Weeks = Record<string, PostMeta[][]>;

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Week: NextPage<{
  posts: PostMeta[];
  week: string;
}> = ({ week, posts }) => {
  return (
    <Page
      type="Week"
      title="Calendar Week (Internal)"
      canonicalPath={`/calendar/${week}`}
    >
      <PageSuperTitle>Calendar Week</PageSuperTitle>
      <PageTitle>{week}</PageTitle>
      {posts.map((post) => {
        let words = post.md.split(' ');
        words = words.slice(0, words.length / 2);
        return (
          <div key={post.slug}>
            <hr />
            <h4>
              <a
                href={`https://octahedron.world/storylines/${post.storyline.slug}?c=su`}
              >
                {post.storyline.name}
              </a>
              , episode {post.episode}
            </h4>
            <h2>{post.name}</h2>
            <p>{words.join(' ')} ...</p>
            <p>
              <a href={`https://octahedron.world/storylines/${post.slug}?c=su`}>
                View full post ...
              </a>
            </p>
          </div>
        );
      })}
    </Page>
  );
};

export default Week;

export function getServerSideProps({ params }: { params: { week: string } }) {
  const [y, w] = params.week.split('-');
  const posts: PostMeta[] = getAllPosts()
    .filter((p) => p.year.toString() === y && p.week.toString() === w)
    .sort((a, b) => a.day - b.day);

  return { props: { posts, week: params.week } };
}

const pad = (s: number) => `00${s}`.slice(-2);
