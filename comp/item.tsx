import Link from 'next/link';
import { FCC, ItemMeta } from '../core/types';
import { Factors } from './factors';

const PostItem: FCC<{ meta: ItemMeta; date: boolean }> = ({ meta, date }) => (
  <article className="font-condensed">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`/preview/${meta.image || meta.slug}.jpg`}
      alt={`${meta.title} - title image`}
      width="600"
      height="200"
    />
    <div className="mt-4">
      {meta.superTitle && (
        <p className="font-light uppercase text-decent-600 tracking-wider">
          {meta.type !== 'storyline'
            ? `in category ${meta.category}`
            : meta.superTitle}
        </p>
      )}
      <h3 className="text-3xl font-bold">{meta.title}</h3>
      {meta.description && (
        <p className="mt-3 font-sans text-decent-700">{meta.description}</p>
      )}
      {date && meta.date && (
        <p className="font-sans text-sm text-decent-500 mt-3 text-right">
          [{formatDate(new Date(meta.date))}]
        </p>
      )}
      <p className="hidden">{meta.factors?.overall}</p>
    </div>
  </article>
);

export const Item: FCC<{ meta: ItemMeta; date?: boolean }> = ({
  meta,
  date = false,
}) => {
  if (!meta || typeof meta === 'string') return null;
  return (
    <Link
      href={`/${meta.slug}`}
      className="w-full py-6 px-5 hover:bg-decent-200 block"
    >
      <PostItem meta={meta} date={date} />
      <Factors meta={meta} />
    </Link>
  );
};

function formatDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function pad(s: string, n: number) {}
