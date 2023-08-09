import Link from 'next/link';
import { FCC, ItemMeta } from '../core/types';

const PostItem: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <article>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`/preview/${meta.image || meta.slug}.jpg`}
      alt={`${meta.title} - title image`}
    />
    <div className="mt-5">
      {meta.superTitle && (
        <p className="font-light uppercase text-neutral-600 tracking-wider">
          {meta.type === 'post'
            ? `in category ${meta.category}`
            : meta.superTitle}
        </p>
      )}
      <h3 className="text-3xl font-bold">{meta.title}</h3>
      {meta.description && (
        <p className="mt-4 text-sm text-neutral-700">{meta.description}</p>
      )}
      <p className="hidden">{meta.factors?.overall}</p>
    </div>
  </article>
);
const MagazineItem: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <article className="grid grid-cols-[1fr_1fr] items-center">
    <div className="flex items-center flex-col">
      <div className="font-light uppercase text-neutral-600 tracking-wider">
        Edition
      </div>
      <div className="font-light text-neutral-600 text-7xl">1</div>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`/preview/${meta.slug}.jpg`}
      alt={`${meta.title} - magazine`}
      className="w-full mb-4 place-self-end"
    />
    <div className="col-span-2 text-sm text-neutral-700 pt-4">
      <p className="font-light uppercase text-neutral-600 tracking-wider">
        Magazine Edition {meta.edition}
      </p>
      <h3 className="text-3xl font-bold text-neutral-900">{meta.title}</h3>
    </div>
  </article>
);

export const Item: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <Link
    href={`/${meta.slug}`}
    className="block w-full py-6 px-5 hover:bg-neutral-200"
  >
    {meta.type === 'magazine' ? (
      <MagazineItem meta={meta} />
    ) : (
      <PostItem meta={meta} />
    )}
  </Link>
);
