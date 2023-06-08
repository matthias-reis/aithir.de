import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../../components/page';
import {
  getAllStorylines,
  getItemFromPost,
  getItemFromStoryline,
} from '../../../core/data-layer';
import { StorylineMeta } from '../../../core/types';
import { icons } from '../../../components/icons';
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

const StorylinePage: NextPage<{
  storyline: StorylineMeta;
  related: StorylineMeta[];
}> = ({ storyline, related }) => {
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
          <PageSuperTitle>{storyline.type || 'Storyline'}</PageSuperTitle>
        </A>
      </Link>
      <PageTitle>{storyline.name}</PageTitle>
      <Image
        src={`/patterns/${storyline.slug}.jpg`}
        alt={`${storyline.name}`}
      />
      <DescriptionBox>
        <Description>{storyline.description}</Description>
      </DescriptionBox>

      <StorylineBox>
        {(storyline.posts || []).map((post) => (
          <Link
            key={post.slug}
            href={`/storylines/${post.slug}`}
            passHref
            legacyBehavior
          >
            <PostBox>
              <Title>{post.name}</Title>
              <SubTitle>Episode {post.episode}</SubTitle>
              <Text>{post.md.split('\n\n')[0]}</Text>
              <Pointer>Read More</Pointer>
            </PostBox>
          </Link>
        ))}
      </StorylineBox>
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

const PostBox = styled.div``;
const Title = styled.h3`
  font-size: ${fontSizeLarge};
  font-weight: ${fontBold};
  color: ${colorTextStrong};
  line-height: 1.1;
  margin-top: 3rem;
  margin-bottom: 0;
`;
const SubTitle = styled.p`
  font-size: ${fontSizeStandard};
  color: ${colorTextWeak};
  line-height: 1.25;
  margin-top: 0;
  margin-bottom: 0.25rem;
`;
const Text = styled.p``;
const Pointer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Image = styled.img`
  max-width: 100%;
  aspect-ratio: 3 / 2;
  border: 0.5vw solid #fff;
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
