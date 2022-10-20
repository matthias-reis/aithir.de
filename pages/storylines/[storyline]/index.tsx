import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../../components/page';
import { getAllStorylines } from '../../../core/data-layer';
import { StorylineMeta } from '../../../core/types';
import { icons } from '../../../components/icons';
import styled from '@emotion/styled';
import {
  colorMain,
  colorText,
  colorTextLight,
  fontSizeMedium,
  mediaMobile,
} from '../../../core/style';
import { PageSuperTitle, PageTitle } from '../../../components/page-title';
import { Post } from '../../../components/post';

const Storyline: NextPage<{ storyline: StorylineMeta }> = ({ storyline }) => {
  const Icon = icons[storyline.slug];

  return (
    <Page
      type="Storyline"
      title={storyline.name}
      canonicalPath={`/storylines/${storyline.slug}`}
      description={storyline.description}
      keywords={storyline.tags}
      bg={storyline.slug}
      color={storyline.color}
    >
      <Link href={`/storylines`} passHref>
        <A color={storyline.color}>
          <PageSuperTitle>Storyline</PageSuperTitle>
        </A>
      </Link>
      <PageTitle>{storyline.name}</PageTitle>
      <DescriptionBox>
        <Icon width={120} height={120} />
        <Description>{storyline.description}</Description>
      </DescriptionBox>

      <StorylineBox>
        {(storyline.posts || []).map((post) => (
          <Post key={post.slug} meta={post} color={storyline.color} />
        ))}
      </StorylineBox>
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

  storyline.posts =
    storyline.posts?.filter(
      (post) =>
        new Date(post.date || Date.now()) <= new Date() && !post.placeholder
    ) ?? [];

  return { props: { storyline } };
}

const A = styled.a<{ color?: string }>`
  color: ${({ color = colorMain }) => color};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: ${colorText};
  }
`;

const DescriptionBox = styled.section`
  position: relative;

  & svg {
    color: ${colorTextLight};
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Description = styled.div`
  padding: 1rem 4rem;
  font-size: ${fontSizeMedium};
  @media ${mediaMobile} {
    padding: 1rem 0 1rem 4rem;
  }
`;

const StorylineBox = styled.div`
  padding: 1rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media ${mediaMobile} {
    padding: 1rem 0;
  }
`;
