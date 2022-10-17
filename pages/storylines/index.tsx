import type { NextPage } from 'next';
import Link from 'next/link';
import { Grid, Item } from '../../components/grid';
import { Page } from '../../components/page';
import { PageSuperTitle, PageTitle } from '../../components/page-title';
import { Section } from '../../components/section';
import { Storyline } from '../../components/storyline';
import { getAllStorylines } from '../../core/data-layer';
import { StorylineMeta } from '../../core/types';

// lists all available storylines
const Storylines: NextPage<{ storylines: StorylineMeta[] }> = ({
  storylines,
}) => {
  return (
    <Page type="Storylines" title="Storylines">
      <PageSuperTitle>All Current Posting Series</PageSuperTitle>
      <PageTitle>Storylines</PageTitle>
      <Grid>
        {storylines.map((storyline) => (
          <Item key={storyline.slug}>
            <Storyline meta={storyline} />
          </Item>
        ))}
      </Grid>
    </Page>
  );
};

export default Storylines;

export function getServerSideProps() {
  // filter out posts for performance reasons
  const storylines = getAllStorylines().map(({ posts, ...s }) => s);

  return { props: { storylines } };
}
