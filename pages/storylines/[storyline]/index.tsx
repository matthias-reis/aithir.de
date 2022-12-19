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
import { Headline } from '../../../components/headline';
import { Storyline } from '../../../components/storyline';
import { Grid } from '../../../components/grid';
import { getCookie } from 'cookies-next';

const StorylinePage: NextPage<{
  storyline: StorylineMeta;
  related: StorylineMeta[];
}> = ({ storyline, related }) => {
  console.log(storyline.slug, Object.keys(icons));
  const Icon = icons[storyline.slug];

  return (
    <Page
      type="Storyline"
      title={storyline.name}
      canonicalPath={`/storylines/${storyline.slug}`}
      description={storyline.description}
      storyline={storyline.name}
      bg={storyline.slug}
      color={storyline.color}
    >
      <Link href={`/storylines`} passHref legacyBehavior>
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
      {related.length > 0 && (
        <RelatedBox>
          <Headline>Related Storyline{related.length > 1 && 's'}</Headline>
          <Grid>
            {related.map((s) => (
              <Storyline key={s.slug} meta={s} />
            ))}
          </Grid>
        </RelatedBox>
      )}
    </Page>
  );
};

export default StorylinePage;

export function getServerSideProps({
  params,
  ...options
}: {
  params: { storyline: string };
}) {
  const isPreview = getCookie('oa', options) === 'oa';
  const storylines = getAllStorylines();
  const storyline = storylines.find((s) => s.slug === params.storyline);
  if (!storyline) {
    return { notFound: true };
  }

  if (!isPreview) {
    storyline.posts =
      storyline.posts?.filter(
        (post) =>
          new Date(post.date || Date.now()) <= new Date() && !post.placeholder
      ) ?? [];
  }

  let related: StorylineMeta[] = [];
  if (storyline.related) {
    related = storyline.related
      .map((slug) => {
        const relatedStoryline = storylines.find((s) => s.slug === slug);
        delete relatedStoryline?.posts;
        return relatedStoryline as StorylineMeta;
      })
      .filter(Boolean);
  }
  return { props: { storyline, related } };
}

const A = styled('a', { shouldForwardProp: (prop) => prop !== 'color' })<{
  color?: string;
}>`
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

const RelatedBox = styled.div`
  margin-top: 8rem;
`;
