import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../components/page';
import { PageSuperTitle, PageTitle } from '../../components/page-title';
import { Section } from '../../components/section';
import { TagItem, TagList } from '../../components/tag';
import { getAllStorylines, getAllTags } from '../../core/data-layer';
import { StorylineMeta, Tag } from '../../core/types';

// lists all available storylines
const Tags: NextPage<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <Page
      type="Tags"
      title="All Tags and Keywords"
      canonicalPath="/tags"
      keywords={['SciFi', 'Science Fiction', 'Science', 'Fantasy']}
    >
      <PageSuperTitle>A Collection of Topics and Keywords</PageSuperTitle>
      <PageTitle>Tags</PageTitle>
      <TagList>
        {tags.map((tag) => (
          <TagItem tag={tag} key={tag.slug} />
        ))}
      </TagList>
    </Page>
  );
};

export default Tags;

export function getServerSideProps() {
  // filter out posts for performance reasons
  const tags = getAllTags().map(({ posts, ...tag }) => tag);

  return { props: { tags } };
}
