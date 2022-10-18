const { withAxiom } = require('next-axiom');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  redirects: async () => [
    {
      source: '/more',
      destination: '/more/about',
      permanent: true,
    },
  ],
};

module.exports = withAxiom(nextConfig);
