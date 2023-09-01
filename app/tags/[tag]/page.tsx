import { getTagByTagSlug } from '../../../core/data-layer';
import { Item } from '../../../comp/item';
import { Boxed, Grid, GridItem } from '../../../comp/sections';
import type { DynamicPageProps, ItemMeta, TagMeta } from '../../../core/types';

export default function Page({ params }: DynamicPageProps) {
  const tagSlug = params.tag || '';
  const { name, count, items } = getTagByTagSlug(tagSlug);
  return (
    <>
      <div className="aspect-[3/1] relative flex items-center justify-center mb-7">
        <div className="text-center py-8 z-10 bg-darkened w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl">{name}</h1>
          <p className="text-decent-600 text-xl font-light">
            {count === 1 ? 'One Item Tagged' : `${count} Items Tagged`}
          </p>
        </div>
        <img
          src="/detail/home.jpg"
          alt="Octahedron World"
          className="w-full absolute z-0"
        />
      </div>

      <Boxed>
        <Grid>
          {items.map((item: ItemMeta) => (
            <GridItem key={item.slug}>
              <Item meta={item} />
            </GridItem>
          ))}
          {Array(3 - (items.length % 3))
            .fill('')
            .map((_, i) => (
              <GridItem key={i} />
            ))}
        </Grid>
      </Boxed>
    </>
  );
}
