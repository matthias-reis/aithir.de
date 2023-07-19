import type { NextPage } from 'next';
import { Title } from '../../components/page-title';
import { TagItem, TagList } from '../../components/tag';
import { getAllTags } from '../../core/data-layer';
import { Tag } from '../../core/types';
import { LayoutMajor } from '../../components/layout-major';
import styled from '@emotion/styled';

// lists all available storylines
const TagsPage: NextPage<{ tags: Tag[] }> = ({ tags }) => {
  return (
    <LayoutMajor title="All Tags" path="">
      <Title superTitle="A Collection of Topics and Keywords">Tags</Title>
      <Box>
        <TagList>
          {tags.map((tag) => (
            <TagItem tag={tag} key={tag.slug} />
          ))}
        </TagList>
      </Box>
    </LayoutMajor>
  );
};

export default TagsPage;

export function getServerSideProps() {
  // filter out posts and storylines for performance reasons
  const tags = getAllTags().map(({ items, ...tag }) => tag);

  return { props: { tags } };
}

const Box = styled.div`
  margin-top: 5rem;
`;
