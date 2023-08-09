import { NextPage } from 'next';
import { ItemMeta, StorylineMeta } from '../../../core/types';
import { getStorylineDetailed } from '../../../core/data-layer';
import { LayoutLF } from '../../../components/layout-lf';

const KaminaPage: NextPage<{
  storyline: StorylineMeta;
  related: ItemMeta[];
}> = (props) => {
  return <LayoutLF {...props} />;
};

export default KaminaPage;

export function getServerSideProps() {
  return {
    props: getStorylineDetailed('kamina-2'),
  };
}
