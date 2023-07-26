import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import { usePageView } from '../core/tracking';
import { colorBackground } from '../core/style';
import Head from 'next/head';

const defaultDescription =
  'Science Fiction, Science Fact and Fantasy in short bits. 1.000 characters, a 30 second read per day';
const defaultImage = 'https://octahedron.world/strips/general.jpg';

export const Page: FC<{
  title: string;
  description?: string;
  image?: string;
  children: ReactNode;
  bgColor?: string;
  path: string;
}> = ({
  children,
  title,
  description,
  image,
  bgColor = colorBackground,
  path,
}) => {
  const track = usePageView();

  useEffect(() => {
    track(title);
  }, [title, track]);

  const titleText = `${title} | OctahedronWorld`;

  const canonicalUrl = `https://octahedron.world${path}`;

  return (
    <Viewport bgColor={bgColor}>
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
      {children}
    </Viewport>
  );
};

const Viewport = styled.div<{ bgColor: string }>`
  background: ${({ bgColor }) => bgColor};
  padding: 0;
  min-height: 100vh;
`;
