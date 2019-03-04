import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { Head, Page, Navigation } from '../components';
import {
  Blockquote,
  Link,
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

const TitleBlock = styled.div`
  max-height: 50vw;
  overflow: hidden;
  position: relative;
`;

const Headline = styled.h1`
  text-shadow: 0 0 5px #0008;
  margin: 0;
  font-size: 1.75rem;
  @media ${media10} {
    font-size: 2.25rem;
  }
  @media ${media20} {
    font-size: 3rem;
  }
  @media ${media30} {
    font-size: 4rem;
  }
  @media ${media40} {
    font-size: 5rem;
  }
`;

const Lead = styled.p`
  font-size: 1rem;
  max-width: 900px;
  padding: 20px;
  margin: 0 auto;
  @media ${media20} {
    font-size: 1.25rem;
  }
  @media ${media30} {
    font-size: 1.5rem;
  }
`;
const Meta = styled.p`
  text-shadow: 0 0 3px #0003;
  font-size: 1rem;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
const ImageBlock = styled.div`
  margin: 0 auto;
`;

const TextBlock = styled.div`
  position: absolute;
  padding-top: 60px;
  width: 100%;
  bottom: 0;
  z-index: 1;
  text-align: center;
  background: linear-gradient(to bottom, #00000000 0%, #000000ff 100%);
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
  const { category, date, title, description, image } = data.mdx.frontmatter;
  return (
    <Page
      headerSection={
        <Fragment>
          <Navigation />
          <TitleBlock>
            {image && (
              <ImageBlock>
                <Img fluid={image.childImageSharp.fluid} />
              </ImageBlock>
            )}
            <TextBlock>
              <Meta>
                <strong>{category || 'Beitrag'}</strong> — {date}
              </Meta>
              <Headline>{title}</Headline>
              <Lead>{description}</Lead>
            </TextBlock>
          </TitleBlock>
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
            fluid(maxWidth: 1600, quality: 70) {
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
