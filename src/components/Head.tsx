import React from 'react';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { colorBackground } from '../styleguide';

type HeadType = {
  description?: string;
  lang?: string;
  meta?: string;
  keywords?: string[];
  title: string;
};

export const Head = ({
  description,
  lang = 'de',
  keywords,
  title,
}: HeadType) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const meta = [
          {
            name: 'description',
            content: metaDescription,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:description',
            content: metaDescription,
          },
          {
            property: 'og:type',
            content: 'website',
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
          {
            name: 'twitter:creator',
            content: data.site.siteMetadata.author,
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:description',
            content: metaDescription,
          },
          { name: 'msapplication-TileColor', content: colorBackground },
          { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
          { name: 'theme-color', content: colorBackground },
        ];

        const links = [
          {
            rel: 'apple-touch-icon',
            sizes: '57x57',
            href: '/apple-icon-57x57.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '60x60',
            href: '/apple-icon-60x60.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            href: '/apple-icon-72x72.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '76x76',
            href: '/apple-icon-76x76.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            href: '/apple-icon-114x114.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '120x120',
            href: '/apple-icon-120x120.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            href: '/apple-icon-144x144.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            href: '/apple-icon-152x152.png',
          },
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-icon-180x180.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/android-icon-192x192.png',
          },
          {
            rel: 'shortcut icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            href: '/favicon-96x96.png',
          },
          {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
          },
          { rel: 'manifest', href: '/manifest.json' },
        ];
        keywords &&
          keywords.length > 0 &&
          meta.push({ name: 'keywords', content: keywords.join(',') });

        return (
          <Helmet
            htmlAttributes={{
              lang: lang || 'de',
            }}
            title={title || 'Welcome'}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={meta}
            link={links}
          />
        );
      }}
    />
  );
};

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
