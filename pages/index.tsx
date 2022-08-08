import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../components/page';
import { Section } from '../components/section';

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Home: NextPage = () => {
  return (
    <Page>
      <Section>
        <h1>Startseite</h1>
      </Section>
      <Section>
        <h2>Latest Stories</h2>
        <ul>
          <li>
            <Link href="/storylines/one/foo">Foo</Link>
          </li>
          <li>
            <Link href="/storylines/two/bar">Bar</Link>
          </li>
          <li>
            <Link href="/storylines/three/baz">Baz</Link>
          </li>
        </ul>
      </Section>
      <Section>
        <h2>Storylines</h2>
        <ul>
          <li>
            <Link href="/storylines/one">One</Link>
          </li>
          <li>
            <Link href="/storylines/two">Two</Link>
          </li>
          <li>
            <Link href="/storylines/three">Three</Link>
          </li>
        </ul>
        <p>
          <Link href="/storylines">All Storylines</Link>
        </p>
      </Section>
      <Section>
        <h2>Tags</h2>
        <Link href="/tags/scif">#SciFi</Link>{' '}
        <Link href="/tags/scif">#Fantasy</Link>{' '}
        <Link href="/tags/scif">#AI</Link>
        <Link href="/tags/scif">#Robots</Link>{' '}
        <Link href="/tags/scif">#ForceFields</Link>{' '}
        <Link href="/tags/scif">#Magic</Link>{' '}
      </Section>
    </Page>
  );
};

export default Home;
