import type { NextPage } from 'next';
import { Page } from '../../../components/page';
import { Section } from '../../../components/section';
import { getAllPosts } from '../../../core/data-layer';
import { PostMeta } from '../../../core/types';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage<{ post: PostMeta }> = ({ post }) => {
  return (
    <Page>
      <Section>
        <h1>{post.name}</h1>
      </Section>
      <Section>
        <p>{post.md}</p>
      </Section>
    </Page>
  );
};

export default Post;

export async function getServerSideProps({
  params,
}: {
  params: { storyline: string; post: string };
}) {
  const slug = `${params.storyline}/${params.post}`;
  const posts = await getAllPosts();
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    return { notFound: true };
  }
  const { date, ...rest } = post;
  return { props: { post: rest } };
}
