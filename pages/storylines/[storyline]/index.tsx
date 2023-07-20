import type { NextPage } from 'next';
import Link from 'next/link';
import {
  getAllStorylines,
  getItemFromPost,
  getItemFromStoryline,
} from '../../../core/data-layer';
import { StorylineMeta } from '../../../core/types';
import styled from '@emotion/styled';
import {
  colorMain,
  colorText,
  colorTextLight,
  colorTextStrong,
  colorTextWeak,
  fontBold,
  fontSizeLarge,
  fontSizeMedium,
  fontSizeStandard,
  mediaMobile,
} from '../../../core/style';
import { PageSuperTitle, PageTitle } from '../../../components/page-title';
import { Article } from '../../../components/article';
import { Headline } from '../../../components/headline';
import { Grid } from '../../../components/grid';
import { getCookie } from 'cookies-next';
import { LayoutMinor } from '../../../components/layout-minor';

const StorylinePage: NextPage<{
  storyline: StorylineMeta;
  related: StorylineMeta[];
}> = ({ storyline, related }) => {
  const posts = (storyline.posts || []).map(getItemFromPost);
  return (
    <LayoutMinor
      title={storyline.name}
      description={storyline.description}
      path={`/storylines/${storyline.slug}`}
      image={`https://octahedron.world/strips/${storyline.slug}.jpg`}
      color={storyline.color}
    >
      <Confined>
        <Link href={`/storylines`} passHref legacyBehavior>
          <A color={storyline.color}>
            <PageSuperTitle>{storyline.type || 'Topic'}</PageSuperTitle>
          </A>
        </Link>
        <PageTitle>{storyline.name}</PageTitle>
      </Confined>
      <Image
        src={`/patterns/${storyline.slug}.jpg`}
        alt={`${storyline.name}`}
      />
      <Confined>
        <Description>{storyline.description}</Description>

        <Headline>Posts in this Topic</Headline>
        <Grid>
          {posts.map((post) => (
            <Article key={post.path} meta={post} />
          ))}
        </Grid>
        {related.length > 0 && (
          <RelatedBox>
            <Headline>Related Storyline{related.length > 1 && 's'}</Headline>
            <Grid>
              {related.map((s) => (
                <Article key={s.slug} meta={getItemFromStoryline(s)} />
              ))}
            </Grid>
          </RelatedBox>
        )}
      </Confined>
    </LayoutMinor>
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

const Confined = styled.div`
  margin: 3rem 5rem;
`;

const Image = styled.img`
  max-width: 100%;
  aspect-ratio: 3 / 2;
`;

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

const Description = styled.div`
  font-size: ${fontSizeMedium};
  margin-top: 1rem;
  margin-bottom: 5rem;
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
