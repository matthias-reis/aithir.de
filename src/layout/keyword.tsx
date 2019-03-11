import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import {
  Head,
  Page,
  Navigation,
  Node,
  Article,
  ArticleList,
} from '../components';
import {
  Blockquote,
  H2,
  H3,
  media10,
  media20,
  media30,
  media40,
} from '../styleguide';

import Img from 'gatsby-image';

const components = {
  blockquote: Blockquote,
  a: Link,
  h2: H2,
  h3: H3,
};

const Headline = styled.h1`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.2em;
  margin-top: 80px;
`;

interface Keyword {
  pageContext: {
    keyword: string;
  };
  data: {
    allMdx: {
      edges: { node: Node }[];
    };
  };
}

export default ({ pageContext, data }: Keyword) => {
  return (
    <Page fullWidth>
      <Navigation />
      <Headline>{pageContext.keyword.toUpperCase()}</Headline>
      <ArticleList>
        {data.allMdx.edges.map(({ node }: { node: Node }) => (
          <Article key={node.fields.slug} node={node} />
        ))}
      </ArticleList>
    </Page>
  );
};

export const pageQuery = graphql`
  query KeywordQuery($keyword: String) {
    allMdx(
      filter: { frontmatter: { keywords: { eq: $keyword } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "D. MMMM Y", locale: "de")
            description
            keywords
            image {
              childImageSharp {
                fluid(maxWidth: 600, quality: 70) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
