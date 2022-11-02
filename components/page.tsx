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
import CookieConsent from 'react-cookie-consent';

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
  keywords,
  type,
  canonicalPath,
  layout = 'minor',
  color = colorMain,
  bg = 'general',
}) => {
  const router = useRouter();
  pageView(type, title, router.query.c as string | undefined);
  const Layout = layout === 'major' ? MajorLayout : MinorLayout;
  const canonicalUrl = `https://octahedron.world${canonicalPath}`;
  const titleText = `${title} - OctahedronWorld`;
  return (
    <Viewport bg={`/patterns/${bg}.jpg`}>
      <CookieConsent>
        This website uses cookies to analyse the usage and traffic flow in an
        anonymous way . We won&apos;t collect any user data, nor do we
        personalize the experience with it.
      </CookieConsent>
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
