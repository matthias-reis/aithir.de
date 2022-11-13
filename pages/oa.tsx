import type { GetServerSidePropsContext, NextPage } from 'next';
import { Page } from '../components/page';
import { PostMeta, StorylineMeta, Tag } from '../core/types';
import { setCookie } from 'cookies-next';
import styled from '@emotion/styled';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Oa: NextPage<{
  posts: PostMeta[];
  storylines: StorylineMeta[];
  tags: Tag[];
}> = ({ posts, storylines, tags }) => {
  return (
    <Page
      type="Admin"
      title="Get Admin Rights"
      canonicalPath="/"
      layout="major"
    >
      <Text>
        You are admin now. congrats. Well you cannot do much, but atleast you
        can look at the future plannings.
      </Text>
    </Page>
  );
};

export default Oa;

export function getServerSideProps(options: GetServerSidePropsContext) {
  setCookie('oa', 'oa', {
    ...options,
    expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
  return { props: {} };
}

const Text = styled.div`
  padding: 8rem;
`;
