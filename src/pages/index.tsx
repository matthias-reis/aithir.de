import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { Page, Navigation, Article, ArticleList } from '../components';

import { ArticleNode } from '../typings';

interface HomepageProps {
  data: {
    allMdx: {
      edges: ArticleNode[];
    };
  };
}

const Headline = styled.h1`
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.2em;
  margin-top: 120px;
`;

const Content = styled.div`
  @media (min-width: 920px) {
    & li:last-child {
      display: none;
    }
  }
`;

export default ({ data }: HomepageProps) => {
  return (
    <Page wide>
      <Navigation />
      <Headline>Welcome</Headline>
      <Content>
        <ArticleList inline>
          {data.allMdx.edges.map(({ node }: ArticleNode) => (
            <Article key={node.fields.slug} node={node} />
          ))}
        </ArticleList>
      </Content>
    </Page>
  );
};

export const pageQuery = graphql`
  query HomepageQuery {
    allMdx(limit: 4) {
      edges {
        node {
          ...ArticleEntity
        }
      }
    }
  }
`;
