import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../../components/page';
import { Section } from '../../../components/section';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Post: NextPage = () => {
  return (
    <Page>
      <Section>
        <h1>Post Foo</h1>
      </Section>
      <Section>
        <p>Lorem Ipsum</p>
      </Section>
    </Page>
  );
};

export default Post;
