import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../components/page';
import { Section } from '../../components/section';
import { getAllStorylines } from '../../core/data-layer';
import { StorylineMeta } from '../../core/types';

// lists all available storylines
const Storylines: NextPage<{ storylines: StorylineMeta[] }> = ({
  storylines,
}) => {
  return (
    <Page>
      <Section>
        <h1>Storylines</h1>
      </Section>
      <Section>
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
      </Section>
    </Page>
  );
};

export default Storylines;

export function getServerSideProps() {
  // filter out posts for performance reasons
  const storylines = getAllStorylines().map(({ posts, ...s }) => s);

  return { props: { storylines } };
}
