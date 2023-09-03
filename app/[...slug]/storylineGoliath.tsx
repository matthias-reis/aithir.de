import Link from 'next/link';
import { Item } from '../../comp/item';
import { Boxed, Grid, GridItem, ReadBoxed, Section } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTagsByTagSlugs } from '../../core/data-layer';
import { getMonthName, getYearSpan } from '../../core/date-helpers';
import type { Layout } from './page';

export const storylineGoliathLayout: Layout = {
  components: {
    h1: ({ children }) => (
      <h1 className="font-condensed font-bold text-5xl md:text-8xl text-decent-900 uppercase mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold font-condensed text-4xl md:text-5xl text-decent-900 mt-7 mb-4">
        {children}
      </h2>
    ),
  },
  Main: ({ item, sections, categoryItems, relatedItems }) => (
    <>
      <div className="text-center relative">
        <img
          src={`/detail/${item.image || item.slug}.jpg`}
          alt={item.title}
          className="object-contain w-full z-0 mt-6"
        />
        <div className="hidden">
          <h1>{item.title}</h1>
        </div>
      </div>

      <p className="text-decent-600 text-lg max-w-lg mx-auto mb-7">
        {item.description}
      </p>

      {sections.map((section, i) => (
        <ReadBoxed
          key={i}
          Component="section"
          id={i === sections.length - 1 ? 'end' : `part-${i}`}
          className={item.unfinished ? 'last-of-type:bg-decent-300' : ''}
        >
          {section}
        </ReadBoxed>
      ))}
      {item.tags && (
        <ReadBoxed className="mt-7">
          <TagList className="mt-5">
            {getTagsByTagSlugs(item.tags).map((tag) => (
              <Tag key={tag.slug} tag={tag} />
            ))}
          </TagList>
        </ReadBoxed>
      )}
      <hr className="w-1/2 mx-auto my-6 border-decent-300" />
      <Boxed className="text-center text-decent-500">
        Released between {getMonthName(new Date(item.startDate || Date.now()))}{' '}
        and {getMonthName(new Date(item.date || Date.now()))}
        <br />©{' '}
        {getYearSpan(
          new Date(item.startDate || Date.now()),
          new Date(item.date || Date.now())
        )}{' '}
        Octahedron World, Matthias Reis
      </Boxed>
      <hr className="w-1/2 mx-auto my-6 border-decent-300" />
      {categoryItems && categoryItems.length > 1 && (
        <Section
          headline={`Other Posts in Category ${item.category?.toUpperCase()}`}
        >
          <Grid>
            {categoryItems.map((item) => (
              <GridItem key={item.slug}>
                <Item meta={item} />
              </GridItem>
            ))}
            {Array(3 - (categoryItems.length % 3))
              .fill('')
              .map((_, i) => (
                <GridItem key={i} />
              ))}
          </Grid>
        </Section>
      )}
      {relatedItems && relatedItems.length > 0 && (
        <Section headline="Related Pages">
          <Grid>
            {relatedItems.map((item) => {
              return (
                <GridItem key={item.slug}>
                  <Item meta={item} />
                </GridItem>
              );
            })}
            {Array(3 - (relatedItems.length % 3))
              .fill('')
              .map((_, i) => (
                <GridItem key={i} />
              ))}
          </Grid>
        </Section>
      )}
    </>
  ),
};
