import type { NextPage } from 'next';
import { DateLabel } from '../../../../components/date-label';
import { Page } from '../../../../components/page';
import { PageSuperTitle, PageTitle } from '../../../../components/page-title';
import { getAllStorylines } from '../../../../core/data-layer';
import { parseMarkdown } from '../../../../core/markdown';
import { PostMeta } from '../../../../core/types';
import { icons } from '../../../../components/icons';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
  colorMain,
  colorText,
  fontSizeStandard,
  mediaMedium,
  mediaSmall,
} from '../../../../core/style';
import { ChevronRight } from '../../../../components/chevron-right';
import { ChevronLeft } from '../../../../components/chevron-left';
import { Headline } from '../../../../components/headline';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage<{
  post: PostMeta;
  previous: PostMeta | null;
  next: PostMeta | null;
}> = ({ post, previous, next }) => {
  const Icon = icons[post.storyline.slug];
  const tags = Array.from(
    new Set([...(post.tags || []), ...(post.storylineTags || [])])
  )
    .map((t) => `#${t}`)
    .join(', ');

  const url = `https://octahedron.world/storylines/${post.slug}`;

  const mastodonText = `#${post.storyline.name}: ${post.name}

${post.md.split('\n\n')[0].replace(/\n/g, ' ')} ...

${tags}

Full Post: ${url}?c=mn`;

  const twitterText = `Octahedron Post Week ${post.week} / ${post.day}
  
#${post.storyline.name}: ${post.name}

${tags}

${url}?c=tw`;
  return (
    <Page
      type="Post"
      title={`${post.name} (${post.storyline.name})`}
      description={post.md.slice(0, 250)}
      canonicalPath={`/storylines/${post.slug}/copy`}
      keywords={[...(post.tags || []), ...(post.storylineTags || [])]}
      bg={post.storyline.slug}
      color={post.storyline.color}
      layout="minor"
    >
      <Line>
        <Link href={`/storylines/${post.storyline.slug}`} passHref>
          <A color={post.storyline.color}>
            <Icon width={32} height={32} />
            <PageSuperTitle>{post.storyline.name}</PageSuperTitle>
          </A>
        </Link>
      </Line>
      <PageTitle>{post.name} (Copyable Format)</PageTitle>
      <Headline>For Mastodon</Headline>
      <Box>{mastodonText}</Box>
      <p>Length: {mastodonText.length}</p>
      <Headline>For Twitter</Headline>
      <Box>{twitterText}</Box>
      <p>Length: {twitterText.length}</p>
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

  const postIndex = storyline.posts?.findIndex((p) => p.slug === slug);
  if (!postIndex) {
    return { notFound: true };
  }
  const post = storyline.posts?.[postIndex];
  if (!post) {
    return { notFound: true };
  }

  const previous = storyline.posts?.[postIndex - 1] ?? null;
  const next = storyline.posts?.[postIndex + 1] ?? null;
  return { props: { post, previous, next } };
}

const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${fontSizeStandard};
`;

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

const Box = styled.textarea`
  font-family: 'Menlo', monospace;
  line-height: 1.4;
  font-size: 1.25rem;
  background: transparent;
  color: ${colorText};
  padding: 1rem;
  width: 100%;
  height: 20rem;
`;

const Content = styled.div`
  margin-right: 8rem;
  line-height: 1.75;
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

const Navigation = styled.div<{ color?: string }>`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  & a {
    color: ${({ color = colorMain }) => color};
    text-decoration: none;
  }
`;
