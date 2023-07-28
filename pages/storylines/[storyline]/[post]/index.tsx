import type { NextPage } from 'next';
import { DateLabel } from '../../../../components/date-label';
import { PageSuperTitle, PageTitle } from '../../../../components/page-title';
import { getAllStorylines } from '../../../../core/data-layer';
import { parseMarkdown } from '../../../../core/markdown';
import { PostMeta, StorylineMeta } from '../../../../core/types';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
  colorBackgroundWeak,
  colorMain,
  colorText,
  fontNormal,
  fontSizeSmall,
  fontSizeStandard,
  fontStack,
  fontStackCopy,
  mediaMedium,
  mediaSmall,
} from '../../../../core/style';
import { ChevronRight } from '../../../../components/chevron-right';
import { ChevronLeft } from '../../../../components/chevron-left';
import { Headline } from '../../../../components/headline';
import { Grid } from '../../../../components/grid';
import { Storyline } from '../../../../components/storyline';
import { LayoutMinor } from '../../../../components/layout-minor';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const PostPage: NextPage<{
  post: PostMeta;
  previous: PostMeta | null;
  next: PostMeta | null;
  related: StorylineMeta[];
}> = ({ post, previous, next, related }) => {
  const content = parseMarkdown(post.md);
  const chars = post.md.length;
  const words = post.md.split(/\s/).length;

  return (
    <LayoutMinor
      title={`${post.name} (${post.storyline.name})`}
      description={post.md.slice(0, 170)}
      path={`/storylines/${post.slug}`}
      image={`https://octahedron.world/strips/${post.storyline.slug}.jpg`}
      color={post.storyline.color}
    >
      <Confined>
        <Line>
          <Link
            href={`/storylines/${post.storyline.slug}`}
            passHref
            legacyBehavior
          >
            <A color={post.storyline.color}>
              <PageSuperTitle>{post.storyline.name}</PageSuperTitle>
            </A>
          </Link>
          <ChevronRight width="16px" />
          {post.episode && <div>Part {post.episode}</div>}
        </Line>
        <PageTitle>{post.name}</PageTitle>
      </Confined>
      <Image
        src={`/patterns/${post.storyline.slug}.jpg`}
        alt={`${post.name} (${post.storyline.name})`}
      />
      <Confined>
        <Content color={post.storyline.color}>{content}</Content>
      </Confined>
      {post.sources && (
        <Sources>
          <h3>Sources and Good Reads</h3>
          <ul>
            {post.sources.map((source) => (
              <li key={source.url}>
                <A href={source.url} color={post.storyline.color}>
                  {source.title}
                </A>
              </li>
            ))}
          </ul>
        </Sources>
      )}
      <Meta>
        <div>
          <DateLabel
            date={new Date(post.date || '')}
            color={post.storyline.color}
          />
        </div>
        <div>
          <strong>{chars}</strong> chars
        </div>
        <div>
          <strong>{words}</strong> words
        </div>
      </Meta>
      <Navigation color={post.storyline.color}>
        {previous ? (
          <Link href={'/storylines/' + previous.slug} passHref legacyBehavior>
            <A>
              <ChevronLeft width={16} style={{ flex: '0 0 auto' }} />
              {previous.name}
            </A>
          </Link>
        ) : (
          <div />
        )}
        {next && (
          <Link href={'/storylines/' + next.slug} passHref legacyBehavior>
            <A>
              {next.name}
              <ChevronRight width={16} style={{ flex: '0 0 auto' }} />
            </A>
          </Link>
        )}
      </Navigation>

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
    </LayoutMinor>
  );
};

export default PostPage;

export function getServerSideProps({
  params,
}: {
  params: { storyline: string; post: string };
}) {
  const slug = `${params.storyline}/${params.post}`;
  const storylines = getAllStorylines();
  const storyline = storylines.find((s) => s.slug === params.storyline);
  if (!storyline) {
    return { notFound: true };
  }

  const postIndex =
    storyline.posts?.findIndex((p) => {
      return p.slug === slug;
    }) ?? -1;
  if (postIndex === -1) {
    return { notFound: true };
  }
  const post = storyline.posts?.[postIndex];
  if (!post) {
    return { notFound: true };
  }
  let previous = storyline.posts?.[postIndex - 1] ?? null;
  let next = storyline.posts?.[postIndex + 1] ?? null;
  if (next?.placeholder || new Date(next?.date || Date.now()) > new Date()) {
    next = null;
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

  return { props: { post, previous, next, related } };
}

const Confined = styled.div`
  margin: 3rem 5rem;

  @media ${mediaSmall} {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizeStandard};
  margin-bottom: 1rem;
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

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
`;

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  font-family: ${fontStackCopy};
  margin-right: 8rem;
  line-height: 1.6;

  & blockquote {
    font-family: ${fontStack};
    font-size: ${fontSizeSmall};
    margin: 0;
    padding: 1rem 2rem;
    background: ${colorBackgroundWeak};
  }

  & a {
    color: ${({ color = colorMain }) => color};
  }

  @media ${mediaMedium} {
    margin-right: 5rem;
  }
  @media ${mediaSmall} {
    margin-right: 0;
  }
`;

const Meta = styled.div`
  text-align: right;
  margin: 5rem 1rem 0 1rem;
`;

const Navigation = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 3rem 1rem 0 1rem;
  & a {
    color: ${({ color = colorMain }) => color};
    text-decoration: none;
  }
`;

const Sources = styled.div`
  margin-top: 3rem;
  & h3 {
    font-size: ${fontSizeSmall};
    font-weight: ${fontNormal};
  }
  & li {
    font-size: ${fontSizeSmall};
    list-style: none;
  }
`;

const RelatedBox = styled.div`
  margin-top: 8rem;
`;
