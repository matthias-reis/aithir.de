import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../../components/page';
import { Section } from '../../../components/section';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Storyline: NextPage = () => {
  return (
    <Page>
      <Section>
        <h1>Storyline Foo</h1>
      </Section>
      <Section>
        <ul>
          <li>
            <Link href="/storylines/one/foo">1. Foo</Link>
          </li>
          <li>
            <Link href="/storylines/two/bar">2. Bar</Link>
          </li>
          <li>
            <Link href="/storylines/three/baz">3. Baz</Link>
          </li>
        </ul>
      </Section>
    </Page>
  );
};

export default Storyline;
