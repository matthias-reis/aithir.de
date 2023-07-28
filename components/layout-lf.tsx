import styled from '@emotion/styled';
import { FC } from 'react';
import type { ItemMeta, StorylineMeta } from '../core/types';
import { LayoutMinor } from './layout-minor';
import { PageSuperTitle, PageTitle } from './page-title';
import { Headline } from './headline';
import { Grid } from './grid';
import { Article } from './article';
import { parseMarkdown } from '../core/markdown';
import {
  colorBackgroundLight,
  colorBackgroundWeak,
  colorMain,
  colorTextWeak,
  fontSizeReading,
  fontSizeSmall,
  fontStack,
  fontStackCopy,
  mediaMedium,
  mediaSmall,
} from '../core/style';
import {
  getFormattedDate,
  getMonthName,
  getYearSpan,
} from '../core/date-helpers';
import Link from 'next/link';

export const LayoutLF: FC<{
  storyline: StorylineMeta;
  related: ItemMeta[];
}> = ({ storyline, related }) => {
  const sections = storyline.md
    ?.split('---')
    .map((s) => s.trim())
    .map(parseMarkdown);
  return (
    <LayoutMinor
      {...storyline}
      title={storyline.name}
      path={`/storylines/${storyline.slug}`}
    >
      <Confined>
        <PageSuperTitle>{storyline.type || 'Storyline'}</PageSuperTitle>
        <PageTitle>{storyline.name}</PageTitle>
      </Confined>
      <Image
        src={`/patterns/${storyline.image || storyline.slug}.jpg`}
        alt={storyline.name}
      />
      {storyline.languageRelated && (
        <Link
          href={`/storylines/${storyline.languageRelated}`}
          passHref
          legacyBehavior
        >
          <LanguageLink color={storyline.color}>
            {storyline.language === 'de'
              ? 'This storyline has an English version 🇬🇧 '
              : 'Diese Geschichte hat eine deutsche Version 🇩🇪'}
          </LanguageLink>
        </Link>
      )}
      <Description>{storyline.description}</Description>
      <Confined>
        <Content color={storyline.color}>
          {sections?.map((section, i) => (
            <Section
              key={i}
              finished={storyline.finished}
              id={i === sections.length - 1 ? 'end' : `section-${i}`}
            >
              {section}
            </Section>
          ))}
        </Content>
        {!storyline.finished && (
          <Annotation>
            {storyline.language === 'de'
              ? `Dies Geschichte ist gerade in der Entstehung. Das letzte Kapitel, das farblich hervorgehoben wurde, wurde am
            ${getFormattedDate(
              new Date(storyline.end || Date.now())
            )} erstellt. Demnächst kommen weitere Teile.`
              : `This is a storyline in the making. The last added chapter, that is
            hinglighted, was created on
            ${getFormattedDate(new Date(storyline.end || Date.now()))}. More
            content will come soon.`}
          </Annotation>
        )}
        {related.length > 0 && (
          <RelatedBox>
            <Headline>Related Storyline{related.length > 1 && 's'}</Headline>
            <Grid>
              {related.map((s) => (
                <Article key={s.path} meta={s} />
              ))}
            </Grid>
          </RelatedBox>
        )}
        <Hr />
        <Disclaimer>
          Released between{' '}
          {getMonthName(new Date(storyline.start || Date.now()))} and{' '}
          {getMonthName(new Date(storyline.end || Date.now()))}
          <br />©{' '}
          {getYearSpan(
            new Date(storyline.start || Date.now()),
            new Date(storyline.end || Date.now())
          )}{' '}
          Octahedron World, Matthias Reis
        </Disclaimer>
      </Confined>
    </LayoutMinor>
  );
};

const Confined = styled.div`
  margin: 3rem 5rem;

  @media ${mediaSmall} {
    margin-left: 2rem;
    margin-right: 2rem;
  }
`;

const RelatedBox = styled.div`
  margin-top: 8rem;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 3 / 2;
`;

const Content = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  font-family: ${fontStackCopy};
  line-height: 1.6;

  & blockquote {
    font-family: ${fontStack};
    font-size: ${fontSizeSmall};
    margin: 0;
    padding: 1rem 2rem;
    background: ${colorBackgroundWeak};
  }

  & a {
    color: ${({ color = colorMain }) => color};
  }

  @media ${mediaSmall} {
    margin-right: 0;
  }
`;

const Section = styled('section', {
  shouldForwardProp: (prop) => prop !== 'finished',
})<{ finished?: boolean }>`
  max-width: 34rem;
  margin: 1rem auto;
  padding: 2rem 1rem;
  border-bottom: 1px solid ${colorBackgroundLight};
  &:last-of-type {
    border-bottom: none;
    ${({ finished }) => (finished ? '' : `background: ${colorBackgroundWeak}`)}
  }
`;

const Annotation = styled.div`
  max-width: 34rem;
  background: ${colorBackgroundLight};
  border-radius: 1rem;
  padding: 3rem;
  margin: 5rem auto;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 2px solid #fff3;
  width: 30%;
  margin: 3rem auto;
`;

const Disclaimer = styled.p`
  color: #fff8;
  text-align: center;
  font-size: 0.9rem;
  padding-bottom: 5rem;
`;

const LanguageLink = styled('a', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>`
  text-align: right;
  display: block;
  color: ${({ color = colorMain }) => color};
  text-decoration: none;
  margin: 1rem;
`;

const Description = styled.p`
  text-align: right;
  font-size: ${fontSizeReading};
  color: ${colorTextWeak};
  margin-left: auto;
  padding: 1rem;
  max-width: 30rem;
`;
