import type { NextPage } from 'next';
import { Grid, Item } from '../../components/grid';
import { Title } from '../../components/page-title';
import { getAllItems } from '../../core/data-layer';
import { ItemMeta } from '../../core/types';
import { LayoutMajor } from '../../components/layout-major';
import { Article } from '../../components/article';

// lists all available storylines
const Storylines: NextPage<{ storylines: ItemMeta[] }> = ({ storylines }) => {
  return (
    <LayoutMajor title="Storylines" path="/storylines">
      <Title superTitle="All Current Long Form Posts">Storylines</Title>
      <Grid>
        {storylines.map((storyline) => (
          <Item key={storyline.path}>
            <Article meta={storyline} />
          </Item>
        ))}
      </Grid>
    </LayoutMajor>
  );
};

export default Storylines;

export function getServerSideProps() {
  // filter out posts for performance reasons
  const storylines = getAllItems().filter((i) => i.type !== 'post');

  return { props: { storylines } };
}
