import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Grid, Item } from '../../components/grid';
import { Headline } from '../../components/headline';
import { Page } from '../../components/page';
import { PageSuperTitle, PageTitle } from '../../components/page-title';
import { Post } from '../../components/post';
import { Section } from '../../components/section';
import { Storyline } from '../../components/storyline';
import { getAllTags } from '../../core/data-layer';
import { PostMeta, Tag } from '../../core/types';

// lists all available storylines
const TagPage: NextPage<{ tag: Tag }> = ({ tag }) => {
  return (
    <Page
      type="Tag"
      title={`Tag: ${tag.name}`}
      description={`Listing of all storylines and posts that contain the keyword "${tag.name}"`}
      canonicalPath={`/tags/${tag.slug}`}
      keywords={[tag.name]}
    >
      <PageSuperTitle>Tag, Topic, Keyword</PageSuperTitle>
      <PageTitle>{tag.name}</PageTitle>
      {(tag.storylines?.length ?? 0) > 0 && (
        <Section>
          <Headline>Storylines tagged with &quot;{tag.name}&quot;</Headline>
          <Grid>
            {(tag.storylines || []).map((storyline) => (
              <Item key={storyline.slug}>
                <Storyline meta={storyline} />
              </Item>
            ))}
          </Grid>
        </Section>
      )}
      {(tag.posts?.length ?? 0) > 0 && (
        <Section>
          <Headline>Posts tagged with &quot;{tag.name}&quot;</Headline>
          <Grid>
            {(tag.posts || []).map((post) => (
              <Item key={post.slug}>
                <Post meta={post} />
              </Item>
            ))}
          </Grid>
        </Section>
      )}
    </Page>
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
