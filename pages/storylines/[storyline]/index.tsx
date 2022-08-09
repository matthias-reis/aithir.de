import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../../components/page';
import { Section } from '../../../components/section';
import { getAllStorylines } from '../../../core/data-layer';
import { StorylineMeta } from '../../../core/types';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Storyline: NextPage<{ storyline: StorylineMeta }> = ({ storyline }) => {
  return (
    <Page>
      <Section>
        <h1>Storyline {storyline.name}</h1>
      </Section>
      <Section>
        <ul>
          {(storyline.posts || []).map((post) => (
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
    </Page>
  );
};

export default Storyline;

export function getServerSideProps({
  params,
}: {
  params: { storyline: string };
}) {
  const storylines = getAllStorylines();
  const storyline = storylines.find((s) => s.slug === params.storyline);
  if (!storyline) {
    return { notFound: true };
  }
  return { props: { storyline } };
}
