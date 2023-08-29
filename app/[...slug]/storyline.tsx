import { Item } from '../../comp/item';
import { Boxed, Grid, GridItem, ReadBoxed, Section } from '../../comp/sections';
import { Tag, TagList } from '../../comp/tag';
import { getTagsByTagSlugs } from '../../core/data-layer';
import { getMonthName, getYearSpan } from '../../core/date-helpers';
import type { Layout } from './page';

export const storylineLayout: Layout = {
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
    p: ({ children }) => (
      <p className="text-lg font-serif leading-loose text-decent-700 mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="font-serif text-lg mb-4 list-outside list-disc text-decent-700">
        {children}
      </ul>
    ),
    a: (props) => <a className="underline underline-offset-4" {...props} />,
    strong: ({ children }) => (
      <strong className="font-bold text-decent-900">{children}</strong>
    ),
    li: ({ children }) => <li className="mb-3 ml-4">{children}</li>,
  },
  Main: ({ item, sections, categoryItems, relatedItems }) => (
    <>
      <div className="text-center mb-5">
        <p className="text-decent-600 text-xl uppercase tracking-wider mb-5">
          {item.superTitle}
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">
          {item.title}
        </h1>
        {item.subTitle && (
          <p className="text-decent-600 text-xl mt-4">{item.subTitle}</p>
        )}
      </div>
      {item.description && (
        <p className="text-decent-700 text-lg text-center max-w-xl mx-auto">
          {item.description}
        </p>
      )}
      <img
        src={`/detail/${item.image || item.slug}.jpg`}
        alt={item.title}
        className="object-contain w-full max-w-3xl mx-auto z-0 mt-6 mb-8"
      />
      {sections.map((section, i) => (
        <ReadBoxed key={i}>{section}</ReadBoxed>
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
        <Section headline="Related Posts">
          <Grid>
            {relatedItems.map((item) => (
              <GridItem key={item.slug}>
                <Item meta={item} />
              </GridItem>
            ))}
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
