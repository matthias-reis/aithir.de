import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../components/page';
import { Section } from '../../components/section';
import { getAllTags } from '../../core/data-layer';
import { PostMeta, Tag } from '../../core/types';

// lists all available storylines
const TagPage: NextPage<{ tag: Tag }> = ({ tag }) => {
  return (
    <Page type="Tag" title={`Tag: ${tag.name}`}>
      <Section>
        <h1>Tag {tag.name}</h1>
      </Section>
      <Section>
        <h2>Storylines with {tag.name}</h2>
        <ul>
          {(tag.posts || []).map((post) => (
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
        <h2>Posts with {tag.name}</h2>
        <ul>
          {(tag.posts || []).map((post) => (
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

export default TagPage;

export function getServerSideProps({ params }: { params: { tag: string } }) {
  const tags = getAllTags();
  const tag = tags.find((tag) => tag.slug === params.tag);
  if (!tag) {
    return { notFound: true };
  }
  return { props: { tag } };
}
