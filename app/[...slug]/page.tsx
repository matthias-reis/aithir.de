import { FC } from 'react';
import { redirect } from 'next/navigation';
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
import { storylineLayout } from './storyline';
import { storylineVladLayout } from './storylineVlad';
import { storylineGoliathLayout } from './storylineGoliath';
import { storylineTattooLayout } from './storylineTattoo';

export type Layout = {
  Main: FC<{
    item: ItemMeta;
    sections: ReactElement[];
    categoryItems?: ItemMeta[];
    relatedItems?: ItemMeta[];
  }>;
  components: Record<string, FCC<{ payload?: string }>>;
};

const layouts: Record<string, Layout> = {
  magazine: magazineLayout,
  post: postLayout,
  'storylines/vlad': storylineVladLayout,
  'storylines/goliath': storylineGoliathLayout,
  'storylines/tattoos': storylineTattooLayout,
  storyline: storylineLayout,
  default: defaultLayout,
};

const Page: FC<DynamicPageProps> = ({ params }) => {
  const slug = (params?.slug ?? []).join('/');
  const item = getItem(slug);
  if (!item) redirect('/');

  let { Main, components } =
    layouts[item.slug] || layouts[item.type || 'none'] || layouts.default;

  components = {
    ...components,
    link: ({ payload }) => {
      if (!payload) return null;
      const itemMeta = getItem(payload);

      if (!itemMeta)
        return (
          <p className="text-complement text-2xl my-4">
            Unknown link target: {payload}
          </p>
        );

      return (
        <div className="border-t border-b border-decent-300 my-4">
          <Item meta={itemMeta} />
        </div>
      );
    },
  };

  const relatedItems = getItemsBySlugs(item?.related ?? []);
  const categoryItems = getItemsByCategory(item?.category);
  const sections: ReactElement[] = item.sections.map((section, i) => {
    if (typeof section !== 'string') {
      if (components[section.type]) {
        const Comp = components[section.type];
        return <Comp key={i} payload={section.payload} />;
      } else {
        return (
          <p key={i} className="text-complement text-2xl my-4">
            Unknown section type: {section.type}
          </p>
        );
      }
    } else {
      return parseMarkdown(section, components);
    }
  });

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
