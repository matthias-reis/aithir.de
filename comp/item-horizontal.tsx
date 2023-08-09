import Link from 'next/link';
import { FCC, ItemMeta } from '../core/types';

const PostItem: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <article className="hover:bg-neutral-300">
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
  <article className="grid grid-cols-[3fr_2fr] lg:grid-cols-[2fr_1fr_5fr] items-stretch border-y border-neutral-300">
    <div className="border-r border-neutral-300 p-4 lg:row-span-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/preview/${meta.slug}.jpg`}
        alt={`${meta.title} - magazine`}
        className="max-w-[13rem] w-full"
      />
    </div>
    <div className="flex items-center justify-center flex-col lg:border-r border-neutral-300 h-full">
      <div className="font-light uppercase text-neutral-600 tracking-wider">
        Edition
      </div>
      <div className="font-light text-neutral-600 text-7xl">1</div>
    </div>
    <div className="col-span-2 lg:col-span-1 text-sm text-neutral-700 p-4 border-t lg:border-t-0 border-neutral-300 text-center lg:text-left flex flex-col justify-center">
      <p className="hidden lg:block font-light uppercase text-neutral-600 tracking-wider">
        Magazine Edition {meta.edition}
      </p>
      <h3 className="text-3xl font-bold text-neutral-900">{meta.title}</h3>
    </div>
    {meta.description && (
      <div className="col-span-2 px-4 pb-4 text-neutral-700 text-lg lg:border-t border-neutral-300 flex flex-col justify-center">
        {typeof meta.description === 'string' ? (
          meta.description
        ) : (
          <ul className="flex flex-col gap-3 text-center lg:text-left">
            {meta.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        )}
      </div>
    )}
  </article>
);

export const ItemHorizontal: FCC<{ meta: ItemMeta }> = ({ meta }) => (
  <Link href={`/${meta.slug}`} className="block hover:bg-neutral-200">
    {meta.type === 'magazine' ? (
      <MagazineItem meta={meta} />
    ) : (
      <PostItem meta={meta} />
    )}
  </Link>
);
