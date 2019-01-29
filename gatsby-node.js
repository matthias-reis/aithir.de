const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);
    const slug = `${createFilePath({
      node,
      getNode,
      basePath: 'content',
    })}`;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              layout
            }
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {
    const layout = node.frontmatter.type || 'article';

    createPage({
      path: node.fields.slug,
      component: resolve(`./src/layout/${layout}.tsx`),
      context: { id: node.id },
    });
  });
};
