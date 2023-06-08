/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
