import Link from 'next/link';
import { FCC, ItemMeta } from '../core/types';
import { Factors } from './factors';

const PostItem: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <article className="font-condensed">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={`/preview/${meta.image || meta.slug}.jpg`}
      alt={`${meta.title} - title image`}
      width="600"
      height="200"
    />
    <div className="mt-5">
      {meta.superTitle && (
        <p className="font-light font-sans uppercase text-decent-600 tracking-wider">
          {meta.type === 'post'
            ? `in category ${meta.category}`
            : meta.superTitle}
        </p>
      )}
      <h3 className="text-3xl font-bold">{meta.title}</h3>
      {meta.description && (
        <p className="mt-4 font-sans text-decent-700">{meta.description}</p>
      )}
      <p className="hidden">{meta.factors?.overall}</p>
    </div>
  </article>
);

const MagazineItem: FCC<{ meta: ItemMeta }> = ({ meta }) => {
  return (
    <article className="grid grid-cols-[1fr_1fr] items-center font-condensed">
      <div className="flex items-center flex-col font-light text-decent-600 ">
        <div className="uppercase tracking-wider">Edition</div>
        <div className="text-7xl">{meta.edition || 1}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/preview/${meta.slug}.jpg`}
        alt={`${meta.title} - magazine`}
        className="w-full mb-4 place-self-end"
        width="640"
        height="960"
      />
      <div className="col-span-2 pt-4">
        <p className="font-light text-decent-600 uppercase tracking-wider text-lg font-sans">
          Magazine Edition {meta.edition}
        </p>
        <h3 className="text-3xl font-bold text-decent-800">{meta.title}</h3>
      </div>
    </article>
  );
};

export const Item: FCC<{ meta: ItemMeta; large?: boolean }> = ({ meta }) => {
  if (!meta || typeof meta === 'string') return null;
  return (
    <Link
      href={`/${meta.slug}`}
      className="w-full py-6 px-5 hover:bg-decent-200 block"
    >
      {meta.type === 'magazine' ? (
        <MagazineItem meta={meta} />
      ) : (
        <PostItem meta={meta} />
      )}
      <Factors meta={meta} />
    </Link>
  );
};
