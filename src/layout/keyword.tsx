import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';

import { Head, Page, Navigation, Article, ArticleList } from '../components';

import { Blockquote, H2, H3 } from '../styleguide';

import { ArticleNode } from '../typings';

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
      edges: ArticleNode[];
    };
  };
}

export default ({ pageContext, data }: Keyword) => {
  return (
    <Page fullWidth>
      <Navigation />
      <Headline>{pageContext.keyword.toUpperCase()}</Headline>
      <ArticleList>
        {data.allMdx.edges.map(({ node }: ArticleNode) => (
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
          ...ArticleEntity
        }
      }
    }
  }
`;
