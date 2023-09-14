const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@piwikpro/next-piwik-pro'],
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: '/more',
      destination: '/more/about',
      permanent: true,
    },
  ],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      // This is the asset module.
      type: 'asset/source',
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
