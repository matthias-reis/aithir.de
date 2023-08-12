import { FC } from 'react';
import { notFound } from 'next/navigation';
import { getItem } from '../../core/data-layer';
import { parseMarkdown } from '../../core/markdown';
import { DynamicPageProps, FCC } from '../../core/types';

const components: Record<string, FCC> = {
  h2: ({ children }) => (
    <h2 className="font-bold text-3xl text-decent-900 mt-7 mb-4">{children}</h2>
  ),
  h1: ({ children }) => (
    <h1 className="font-script font-bold text-7xl text-decent-500">
      {children}
    </h1>
  ),
  p: ({ children }) => (
    <p className="text-lg text-decent-700 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="text-lg mb-4 list-outside list-disc text-decent-700">
      {children}
    </ul>
  ),
  li: ({ children }) => <li className="mb-3 ml-4">{children}</li>,
};

const Page: FC<DynamicPageProps> = ({ params }) => {
  const slug = params?.slug.join('/');
  const item = getItem(slug);
  if (!item) notFound();

  console.log('page', item);
  return (
    <div>
      {item.sections.map((s, i) => {
        const md = parseMarkdown(s, components);
        return <div key={i}>{md}</div>;
      })}
    </div>
  );
};

export default Page;
