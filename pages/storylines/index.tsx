import type { NextPage } from 'next';
import Link from 'next/link';
import { Page } from '../../components/page';
import { Section } from '../../components/section';
import { getAllStorylines } from '../../core/data-layer';

// lists all available storylines
const Storylines: NextPage = () => {
  return (
    <Page>
      <Section>
        <h1>Storylines</h1>
      </Section>
      <Section>
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
      </Section>
    </Page>
  );
};

export default Storylines;

export async function getServerSideProps() {
  const storylines = await getAllStorylines();
  console.log(JSON.stringify(storylines, null, 2));
  return { props: {} };
}
