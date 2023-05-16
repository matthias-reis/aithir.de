import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import { pageView } from '../core/tracking';
import { colorBackground, colorMain, sizeCanvas } from '../core/style';
import { OctahedronNav } from './octahedron-nav';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { usePiwikPro } from '@piwikpro/next-piwik-pro';
import UnstyledImage, { StaticImageData } from 'next/image';

const defaultDescription =
  'Science Fiction, Science Fact and Fantasy in short bits. 1.000 characters, a 30 second read per day';

export const PageArtDirected: FC<{
  type: string;
  storyline: string;
  description: string;
  image: StaticImageData;
  canonicalPath: string;
  children: ReactNode;
  logoColor?: string;
  color?: string;
  bgColor?: string;
}> = ({
  children,
  description,
  image,
  type,
  canonicalPath,
  logoColor = '#0008',
  color = '#0008',
  bgColor = '#000',
  storyline,
}) => {
  const router = useRouter();
  const { PageViews } = usePiwikPro();

  useEffect(() => {
    pageView(type, storyline, storyline, router.query.c as string | undefined);
    PageViews.trackPageView(`${storyline} (${storyline})`);
  }, [PageViews, router.query.c, storyline, type]);

  const canonicalUrl = `https://octahedron.world${canonicalPath}`;
  const titleText = `${storyline} - OctahedronWorld`;
  return (
    <Viewport bgColor={bgColor} data-id="viewport">
      <Head>
        <title>{titleText}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta charSet="utf-8" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="author" content="Matthias Reis" />
        <meta name="copyright" content="Matthias Reis, OctahedronWorld" />
        <meta name="description" content={description || defaultDescription} />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content={storyline} />
        <meta property="og:image" content={image.src} />
        <meta name="twitter:image" content={image.src} />
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
      <Canvas bgColor={bgColor} data-id="canvas">
        <OctahedronNav color={logoColor} />
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={`${storyline} - title image`}
        />
        <Box data-id="box">{children}</Box>
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
  padding-bottom: 10rem;

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

const Viewport = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  min-height: 100vh;
`;

const Canvas = styled.div<{ bgColor: string }>`
  max-width: ${sizeCanvas};
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  background: ${({ bgColor }) => bgColor};
  box-shadow: 0 0 4rem #fff4;
`;

const Box = styled.div``;

const Image = styled(UnstyledImage)`
  max-width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
`;
