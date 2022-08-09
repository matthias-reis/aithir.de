import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../components/page';
import { Section } from '../../components/section';
import { getAllStorylines, getAllTags } from '../../core/data-layer';
import { StorylineMeta, Tag } from '../../core/types';

// lists all available storylines
const Tags: NextPage<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <Page>
      <Section>
        <h1>Used Tags</h1>
      </Section>
      <Section>
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

export default Tags;

export async function getServerSideProps() {
  // filter out posts for performance reasons
  const tags = (await getAllTags()).map(({ posts, ...tag }) => tag);

  return { props: { tags } };
}
