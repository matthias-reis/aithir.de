import React from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';

import { Page, Navigation, Article, ArticleList } from '../components';
import { Wide } from '../styleguide';
import image from './home1.jpg';

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
  margin-top: 80px;
`;

const Bg = styled.div`
  background: url(${image});
  background-attachment: fixed;
  background-size: cover;
`;

export default ({ data }: HomepageProps) => {
  return (
    <Bg>
      <Page wide transparent>
        <Navigation />
        <Headline>Welcome</Headline>
        <ArticleList inline>
          {data.allMdx.edges.map(({ node }: ArticleNode) => (
            <Article key={node.fields.slug} node={node} />
          ))}
        </ArticleList>
      </Page>
    </Bg>
  );
};

export const pageQuery = graphql`
  query HomepageQuery {
    allMdx(limit: 3) {
      edges {
        node {
          ...ArticleEntity
        }
      }
    }
  }
`;
