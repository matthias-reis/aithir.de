const path = require('path');
const math = require('remark-math');
const katex = require('remark-html-katex');

module.exports = {
  siteMetadata: {
    title: 'Aithir.de',
    description: 'Website find a good tagline',
    author: '@aithir',
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        hastPlugins: [math],
        mdPlugins: [katex],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styleguide/typography`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'aithir.de',
        short_name: 'aithir',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'static/apple-icon.png',
      },
    },
    'gatsby-plugin-typescript',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
