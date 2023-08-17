import { NextPage } from 'next';
import { ItemMeta, StorylineMeta } from '../../../core/types';
import { getStorylineDetailed } from '../../../core/data-layer';
import { LayoutLF } from '../../../components/layout-lf';

const GuillorysPage: NextPage<{
  storyline: StorylineMeta;
  related: ItemMeta[];
}> = (props) => {
  return <LayoutLF {...props} />;
};

export default GuillorysPage;

export function getServerSideProps() {
  return {
    props: getStorylineDetailed('the-guillorys'),
  };
}
