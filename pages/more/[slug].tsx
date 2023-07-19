import { fm } from '../../core/io';
import { existsSync } from 'fs';
import type { NextPage } from 'next';
import { resolve } from 'path';
import { parseMarkdown } from '../../core/markdown';
import { LayoutMajor } from '../../components/layout-major';
import { Title } from '../../components/page-title';

type Params = { slug: string; title: string; supertitle: string; md: string };

const LegalPage: NextPage<{ data: Params }> = ({ data }) => {
  const content = parseMarkdown(data.md);
  return (
    <LayoutMajor title="All Tags" path="">
      <Title superTitle={data.supertitle}>{data.title}</Title>
      {content}
    </LayoutMajor>
  );
};

export default LegalPage;

export async function getServerSideProps({
  params,
}: {
  params: { slug: string };
}) {
  // find a page with that slug
  const filename = resolve(process.cwd(), '_legal', `${params.slug}.md`);
  if (!existsSync(filename)) return { notFound: true };

  const page = await fm<{
    title: string;
    supertitle?: string;
    description?: string;
  }>(filename);

  return {
    props: { data: { slug: params.slug, md: page.body, ...page.attributes } },
  };
}
