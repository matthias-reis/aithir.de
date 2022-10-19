import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { pageView } from '../core/tracking';
import {
  colorBackground,
  colorMain,
  mediaLarge,
  sizeCanvas,
} from '../core/style';
import { MajorLayout, MinorLayout } from './layout';
import { OctahedronNav } from './octahedron-nav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

type Layout = 'major' | 'minor';

const defaultDescription =
  'Science Fiction, Science Fact and Fantasy in short bits. 1.000 characters, a 30 second read per day';
const defaultImage = 'https://octahedron.world/strips/general.jpg';
const defaultKeywords = [
  'Microfiction',
  'Fiction',
  'Writing',
  'Creative Writing',
];

export const Page: FC<{
  type: string;
  title: string;
  description?: string;
  image?: string;
  keywords?: string[];
  children: ReactNode;
  layout?: Layout;
  color?: string;
  bg?: string;
}> = ({
  children,
  title,
  description,
  image,
  keywords,
  type,
  layout = 'minor',
  color = colorMain,
  bg = 'general',
}) => {
  const router = useRouter();
  pageView(type, title, router.query.c as string | undefined);
  const Layout = layout === 'major' ? MajorLayout : MinorLayout;
  return (
    <Viewport bg={`/patterns/${bg}.jpg`}>
      <Head>
        <title>{title} - OctahedronWorld</title>
        <meta charSet="utf-8" />
        <meta name="description" content={description || defaultDescription} />
        <meta
          name="keywords"
          content={Array.from(
            new Set([...(keywords || []), ...defaultKeywords])
          ).join(', ')}
        />
        <meta name="author" content="Matthias Reis" />
        <meta name="copyright" content="Matthias Reis, OctahedronWorld" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image || defaultImage} />
      </Head>
      <Canvas>
        <OctahedronNav color={color} />
        <Layout color={color}>{children}</Layout>
      </Canvas>
      <Legal color={color}>
        <Link href="/more/about">About</Link>
        <Link href="/more/privacy">Privacy Policy</Link>
        <Link href="/more/imprint">Imprint</Link>
      </Legal>
    </Viewport>
  );
};

const Legal = styled.nav<{ color: string }>`
  display: flex;
  justify-content: center;
  gap: 1rem;

  & > * {
    background: ${colorBackground};
    padding: 0 1rem;
    border-radius: 1rem;
  }

  & a {
    color: ${({ color }) => color || colorMain};
    text-decoration: none;
  }
`;

const Viewport = styled.div<{ bg: string }>`
  background-image: url(${({ bg }) => bg});
  background-attachment: fixed;
  background-size: cover;
  padding: 1rem 1rem;
  min-height: 100vh;

  @media ${mediaLarge} {
    padding: 1rem 0.5rem;
  }
`;

const Canvas = styled.div`
  max-width: ${sizeCanvas};
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  background: ${colorBackground};
  border-radius: 0.25rem;
  box-shadow: 0 0 4rem #fff4;
`;
