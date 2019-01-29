import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Head, Page } from '../components';
import { Blockquote, Link, H1, H2, H3, FullWidth } from '../styleguide';
import Img from 'gatsby-image';

const components = {
  blockquote: Blockquote,
  a: Link,
  h2: H2,
  h3: H3,
};

const HeaderSection = styled.div`
  max-width: 1260px;
  margin: 0 auto;
  text-align: center;
`;

type PageType = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        description?: string;
        keywords?: string[];
        image: { childImageSharp: { fluid: any } };
      };
      code: { body: string };
    };
  };
};

export default ({ data }: PageType) => {
  return (
    <Page
      headerSection={
        <HeaderSection>
          <H1>{data.mdx.frontmatter.title}</H1>
          {data.mdx.frontmatter.image && (
            <Img fluid={data.mdx.frontmatter.image.childImageSharp.fluid} />
          )}
        </HeaderSection>
      }>
      <Head
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.description}
        keywords={data.mdx.frontmatter.keywords}
      />
      <MDXRenderer components={components}>{data.mdx.code.body}</MDXRenderer>
    </Page>
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
        image {
          childImageSharp {
            fluid(maxWidth: 1260, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`;
