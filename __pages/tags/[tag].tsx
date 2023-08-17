import type { NextPage } from 'next';
import { Grid, Item } from '../../components/grid';
import { Title } from '../../components/page-title';
import { Section } from '../../components/section';
import { getAllTags } from '../../core/data-layer';
import { Tag } from '../../core/types';
import { Article } from '../../components/article';
import { LayoutMajor } from '../../components/layout-major';

const TagPage: NextPage<{ tag: Tag }> = ({ tag }) => {
  return (
    <LayoutMajor title={`Keyword ${tag.name}`} path={`/tags/${tag.slug}`}>
      <Title superTitle="Tag, Topic, Keyword">{tag.name}</Title>
      <Section>
        <Grid>
          {(tag.items || []).map((item) => (
            <Item key={item.path}>
              <Article meta={item} />
            </Item>
          ))}
        </Grid>
      </Section>
    </LayoutMajor>
  );
};

export default TagPage;

export function getServerSideProps({ params }: { params: { tag: string } }) {
  const tags = getAllTags();
  const tag = tags.find((tag) => tag.slug === params.tag);
  if (!tag) {
    return { notFound: true };
  }
  return { props: { tag } };
}
