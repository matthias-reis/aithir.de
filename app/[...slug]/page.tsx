import { FC } from 'react';
import { notFound } from 'next/navigation';
import {
  getItem,
  getItemsByCategory,
  getItemsBySlugs,
} from '../../core/data-layer';
import { parseMarkdown } from '../../core/markdown';
import { DynamicPageProps, FCC, ItemMeta } from '../../core/types';
import { Item } from '../../comp/item';
import { ReactElement } from 'rehype-react/lib';
import { magazineLayout } from './magazine';
import { postLayout } from './post';
import { defaultLayout } from './default';

export type Layout = {
  Main: FC<{
    item: ItemMeta;
    sections: ReactElement[];
    categoryItems?: ItemMeta[];
    relatedItems?: ItemMeta[];
  }>;
  components: Record<string, FCC>;
};

const layouts: Record<string, Layout> = {
  magazine: magazineLayout,
  post: postLayout,
  default: defaultLayout,
};

const Page: FC<DynamicPageProps> = ({ params }) => {
  const slug = params?.slug.join('/');
  const item = getItem(slug);
  if (!item) notFound();

  const { Main, components } = layouts[item.type || 'none'] || layouts.default;

  const relatedItems = getItemsBySlugs(item?.related ?? []);
  const categoryItems = getItemsByCategory(item?.category);
  const sections: ReactElement[] = item.sections.map((section) => {
    if (typeof section !== 'string') {
      const sectionSlug = section.payload as string;
      const sectionMeta = getItem(sectionSlug);
      if (sectionMeta) {
        return (
          <div
            key={sectionSlug}
            className="border-t border-b border-decent-300 my-4"
          >
            <Item meta={sectionMeta} />
          </div>
        );
      } else {
        return (
          <p className="text-complement" key={sectionSlug}>
            {sectionSlug}
          </p>
        );
      }
    } else {
      return parseMarkdown(section, components);
    }
  });
  console.log(categoryItems);
  return (
    <Main
      item={item}
      sections={sections}
      categoryItems={categoryItems}
      relatedItems={relatedItems}
    />
  );
};

export default Page;
