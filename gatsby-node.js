const { resolve } = require("path");

module.exports = {
  createPages: async ({ actions, graphql }) => {
    const { createPage } = actions;

    const { errors, data } = await graphql(ALL_PAGE_QUERY);

    if (errors) {
      errors.forEach(e => console.error(e.toString()));
      process.exit(1);
    }

    const edges = data.allPostsYaml.edges;

    edges.forEach((edge, i) => {
      const { id, file } = edge.node;

      const path = `/${file.name}`;
      previous = edge.node;

      const component = resolve(__dirname, "src", "post.tsx");

      createPage({
        path: path,
        component,
        context: {
          id,
          previous: edges[i - 1] ? edges[i - 1].node.file.name : null,
          next: edges[i + 1] ? edges[i + 1].node.file.name : null,
        },
      });
    });
  },
};

const pad = num => `0${num}`.slice(-2);
const slugify = s =>
  s
    .toString()
    .toLowerCase()
    .replace(/&/g, " und ")
    .replace(/è/g, "e")
    .replace(/'/g, "")
    .replace(/é/g, "e")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ø/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .replace(/ /g, "-");

const ALL_PAGE_QUERY = `
query AllPageQuery {
  allPostsYaml(sort: {fields: file___name, order: ASC}) {
    edges {
      node {
        id
        file {
          name
        }
      }
    }
  }
}`;
