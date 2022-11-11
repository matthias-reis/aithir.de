import type { NextPage } from 'next';
import { DateLabel } from '../../../../components/date-label';
import { Page } from '../../../../components/page';
import { PageSuperTitle, PageTitle } from '../../../../components/page-title';
import { getAllStorylines } from '../../../../core/data-layer';
import { parseMarkdown } from '../../../../core/markdown';
import { PostMeta, StorylineMeta } from '../../../../core/types';
import { icons } from '../../../../components/icons';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
  colorBackgroundWeak,
  colorMain,
  colorText,
  fontNormal,
  fontSizeSmall,
  fontSizeStandard,
  mediaMedium,
  mediaSmall,
} from '../../../../core/style';
import { ChevronRight } from '../../../../components/chevron-right';
import { ChevronLeft } from '../../../../components/chevron-left';
import { Headline } from '../../../../components/headline';
import { Grid } from '../../../../components/grid';
import { Storyline } from '../../../../components/storyline';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage<{
  post: PostMeta;
  previous: PostMeta | null;
  next: PostMeta | null;
  related: StorylineMeta[];
}> = ({ post, previous, next, related }) => {
  const content = parseMarkdown(post.md);
  const chars = post.md.length;
  const words = post.md.split(/\s/).length;
  const Icon = icons[post.storyline.slug];
  return (
    <Page
      type="Post"
      title={`${post.name} (${post.storyline.name})`}
      description={post.md.slice(0, 170)}
      canonicalPath={`/storylines/${post.slug}`}
      storyline={post.storyline.name}
      image={`https://octahedron.world/strips/${post.storyline.slug}.jpg`}
      bg={post.storyline.slug}
      color={post.storyline.color}
      layout="minor"
    >
      <Line>
        <Link
          href={`/storylines/${post.storyline.slug}`}
          passHref
          legacyBehavior
        >
          <A color={post.storyline.color}>
            <Icon width={32} height={32} />
            <PageSuperTitle>{post.storyline.name}</PageSuperTitle>
          </A>
        </Link>
        <ChevronRight width="16px" />
        {post.episode && <div>Episode {post.episode}</div>}
      </Line>
      <PageTitle>{post.name}</PageTitle>
      <Content color={post.storyline.color}>{content}</Content>

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
    </Page>
  );
};

export default Post;

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

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizeStandard};
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

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  margin-right: 8rem;
  line-height: 1.75;

  & blockquote {
    font-style: italic;
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
  margin-top: 5rem;
`;

const Navigation = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
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
