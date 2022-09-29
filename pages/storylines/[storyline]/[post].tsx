import type { NextPage } from 'next';
import { DateLabel } from '../../../components/date-label';
import { Page } from '../../../components/page';
import { PageSuperTitle, PageTitle } from '../../../components/page-title';
import { getAllPosts } from '../../../core/data-layer';
import { parseMarkdown } from '../../../core/markdown';
import { PostMeta } from '../../../core/types';
import { icons } from '../../../components/icons';
import styled from '@emotion/styled';
import Link from 'next/link';
import { colorMain, colorText } from '../../../core/style';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage<{ post: PostMeta }> = ({ post }) => {
  const content = parseMarkdown(post.md);
  const chars = post.md.length;
  const words = post.md.split(/\s/).length;
  const Icon = icons[post.storyline.slug];
  return (
    <Page
      type="Post"
      title={`${post.name} (${post.storyline.name})`}
      bg={post.storyline.slug}
      color={post.storyline.color}
      layout="minor"
    >
      <Link href={`/storylines/${post.storyline.slug}`} passHref>
        <A color={post.storyline.color}>
          <Icon width={32} height={32} />
          <PageSuperTitle>{post.storyline.name}</PageSuperTitle>
        </A>
      </Link>
      <PageTitle>{post.name}</PageTitle>
      <Content>{content}</Content>
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
  const posts = getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
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

const Content = styled.div`
  margin-right: 8rem;
  line-height: 1.75;
`;

const Meta = styled.div`
  text-align: right;
  margin-top: 5rem;
`;
