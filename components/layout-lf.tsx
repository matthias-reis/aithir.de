import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import { usePageView } from '../core/tracking';
import {
  colorBackground,
  colorBackgroundWeak,
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

export const Page: FC<{
  type: string;
  title: string;
  description?: string;
  image?: string;
  storyline?: string;
  canonicalPath: string;
  children: ReactNode;
  layout?: Layout;
  color?: string;
  bg?: string;
}> = ({
  children,
  title,
  description,
  image,
  type,
  canonicalPath,
  layout = 'minor',
  color = colorMain,
  bg = 'general',
  storyline = null,
}) => {
  const track = usePageView();

  useEffect(() => {
    track(title);
  }, [storyline, title, track]);

  const Layout = layout === 'major' ? MajorLayout : MinorLayout;
  const canonicalUrl = `https://octahedron.world${canonicalPath}`;
  const titleText = `${title} - OctahedronWorld`;
  return (
    <Viewport bg={`/patterns/${bg}.jpg`}>
      <Head>
        <title>{titleText}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta charSet="utf-8" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="author" content="Matthias Reis" />
        <meta name="copyright" content="Matthias Reis, OctahedronWorld" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image || defaultImage} />
        <meta name="twitter:image" content={image || defaultImage} />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={description || defaultDescription}
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="twitter:card" content="summary" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Canvas>
        <OctahedronNav color={color} />
        <Layout color={color}>{children}</Layout>
      </Canvas>
      <Legal color={color}>
        <Link href="/more/about">About</Link>
        <a rel="me" href="https://mstdn.social/@aithir">
          Mastodon
        </a>
        <Link href="/more/privacy">Privacy Policy</Link>
        <Link href="/more/imprint">Imprint</Link>
      </Legal>
    </Viewport>
  );
};

const Legal = styled('nav', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>`
  display: flex;
  flex-wrap: wrap;
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
  background: ${colorBackgroundWeak};
  padding: 0;
  min-height: 100vh;
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