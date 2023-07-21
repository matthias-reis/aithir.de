import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { colorText } from '../core/style';
import { OctahedronNav } from './octahedron-nav';
import UnstyledImage, { StaticImageData } from 'next/image';
import { ItemMeta } from '../core/types';
import { getMonthName, getYearSpan } from '../core/date-helpers';
import { Headline } from './headline';
import { Grid } from './grid';
import { Article } from './article';
import { LayoutFrame } from './layout-frame';

/**
 * Long Form Art Directed Layout
 */
export const LayoutLFA: FC<{
  title: string;
  slug: string;
  description: string;
  image?: StaticImageData;
  children: ReactNode;
  logoColor?: string;
  color?: string;
  bgColor?: string;
  bdColor?: string;
  start: Date;
  end: Date;
  related?: ItemMeta[];
}> = ({
  children,
  title,
  slug,
  description,
  image,
  logoColor = '#0008',
  color = colorText,
  bgColor,
  bdColor,
  start,
  end,
  related,
}) => {
  const backdropColor = bdColor || bgColor;
  return (
    <LayoutFrame
      title={title}
      path={`/storylines/${slug}`}
      description={description}
      bgColor={bgColor}
      bdColor={backdropColor}
      color={color}
      image={image?.src}
    >
      <OctahedronNav color={logoColor} />
      {image && (
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${title} - title image`}
        />
      )}
      <Box data-id="box">{children}</Box>
      {!!related && related.length > 0 && (
        <RelatedBox>
          <Headline>Recommended Reads</Headline>
          <Grid>
            {related.map((s) => (
              <Article key={s.path} meta={s} />
            ))}
          </Grid>
        </RelatedBox>
      )}
      <Hr />
      <Disclaimer>
        Released between {getMonthName(start)} and {getMonthName(end)}
        <br />© {getYearSpan(start, end)} Octahedron World, Matthias Reis
      </Disclaimer>
    </LayoutFrame>
  );
};

const Box = styled.div``;

const Image = styled(UnstyledImage)`
  max-width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
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

const RelatedBox = styled.div`
  margin: 5rem 2rem 8rem;
`;
