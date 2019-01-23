import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Head } from '../components/Head';

type PageType = {
  data: {
    mdx: {
      frontmatter: { title: string; description?: string; keywords?: string[] };
      code: { body: string };
    };
  };
};

export default ({ data: { mdx } }: PageType) => {
  return (
    <div>
      <Head
        title={mdx.frontmatter.title}
        description={mdx.frontmatter.description}
        keywords={mdx.frontmatter.keywords}
      />
      <h1>{mdx.frontmatter.title}</h1>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        keywords
      }
      code {
        body
      }
    }
  }
`;
