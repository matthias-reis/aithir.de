import { fm } from '../../core/io';
import { existsSync } from 'fs';
import type { NextPage } from 'next';
import { resolve } from 'path';
import { Page } from '../../components/page';
import { parseMarkdown } from '../../core/markdown';
import { PageSuperTitle, PageTitle } from '../../components/page-title';

type Params = { slug: string; title: string; supertitle: string; md: string };

const LegalPage: NextPage<{ data: Params }> = ({ data }) => {
  const content = parseMarkdown(data.md);
  console.log(data);
  return (
    <Page type="Legal" title={`${data.title})`} layout="minor">
      {data.supertitle && <PageSuperTitle>{data.supertitle}</PageSuperTitle>}
      <PageTitle>{data.title}</PageTitle>
      {content}
    </Page>
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
  console.log({ filename });
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
