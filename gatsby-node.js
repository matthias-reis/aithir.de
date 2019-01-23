const { createFilePath } = require('gatsby-source-filesystem');
const { resolve } = require('path');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent);
    const type = parent.sourceInstanceName;
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
    createNodeField({
      node,
      name: 'type',
      value: type,
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
              type
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: resolve(`./src/layout/${node.fields.type}Layout.tsx`),
      context: { id: node.id },
    });
  });
};
