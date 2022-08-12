import type { NextPage } from 'next';
import { Page } from '../../../components/page';
import { Section } from '../../../components/section';
import { getAllPosts } from '../../../core/data-layer';
import { parseMarkdown } from '../../../core/markdown';
import { PostMeta } from '../../../core/types';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage<{ post: PostMeta }> = ({ post }) => {
  const content = parseMarkdown(post.md);
  const length = post.md.length;
  return (
    <Page>
      <Section>
        <h1>{post.name}</h1>
      </Section>
      <Section>{content}</Section>
      <Section>
        <p>
          <strong>Length:</strong> {length}
        </p>
        <p>
          <strong>Date:</strong> {post.date}
        </p>
      </Section>
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
  const { date, ...rest } = post;
  return { props: { post: rest } };
}
