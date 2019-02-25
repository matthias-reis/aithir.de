import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Head, Page, Navigation } from '../components';
import {
  Blockquote,
  Link,
  H1,
  H2,
  H3,
  PLead,
  PMeta,
  colorHighlight,
} from '../styleguide';
import Img from 'gatsby-image';

const components = {
  blockquote: Blockquote,
  a: Link,
  h2: H2,
  h3: H3,
};

const TitleBlock = styled.div`
  margin: 0 auto;
  max-width: 660px;
  padding: 0 20px;
`;

const InnerHeadline = styled.span`
  background: linear-gradient(
    to bottom,
    ${colorHighlight}00 0%,
    ${colorHighlight}00 64.9%,
    ${colorHighlight}ff 65%,
    ${colorHighlight}ff 100%
  );
`;

const ImageBlock = styled.div`
  max-width: 940px;
  margin: 0 auto;
`;

type PageType = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        description?: string;
        category?: string;
        date?: string;
        keywords?: string[];
        image: { childImageSharp: { fluid: any } };
      };
      code: { body: string };
    };
  };
};

export default ({ data }: PageType) => {
  console.log(data);
  const { category, date, title, description, image } = data.mdx.frontmatter;
  return (
    <Page
      headerSection={
        <Fragment>
          <Navigation />
          <TitleBlock>
            <PMeta>
              {category || 'Beitrag'} — {date}
            </PMeta>
            <H1>
              <InnerHeadline>{title}</InnerHeadline>
            </H1>
            <PLead>{description}</PLead>
          </TitleBlock>
          {image && (
            <ImageBlock>
              <Img fluid={image.childImageSharp.fluid} />
            </ImageBlock>
          )}
        </Fragment>
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
        category
        date(formatString: "D. MMMM Y", locale: "de")
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
