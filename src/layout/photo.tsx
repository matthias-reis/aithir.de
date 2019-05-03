import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Link, graphql } from 'gatsby';
import { Head, Logo } from '../components';
import { media10, media20, media30, media40 } from '../styleguide';

import Img from 'gatsby-image';

const ImageContainer = styled.div`
  width: auto;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
`;

const Home = styled(Link)`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 1;
`;

const ImageBlock = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    object-fit: contain !important;
  }
`;

const TitleBlock = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
  text-align: right;
  background: linear-gradient(to bottom, #00000000 0%, #000000ff 100%);
  color: #fff;
`;

const Headline = styled.h1`
  text-shadow: 0 0 5px #0008;
  margin: 0 2rem 0 0;
  font-size: 1rem;
  @media ${media10} {
    font-size: 1.25rem;
  }
  @media ${media20} {
    font-size: 1.5rem;
  }
  @media ${media30} {
    font-size: 1.75rem;
  }
  @media ${media40} {
    font-size: 2rem;
  }
`;

const Lead = styled.p`
  font-size: 1rem;
  margin: 0 2rem 2rem 0;
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
        image: { childImageSharp: { fixed: any } };
      };
      code: { body: string };
    };
  };
};

export default ({ data }: PageType) => {
  const { category, date, title, description, image } = data.mdx.frontmatter;
  return (
    <ImageContainer>
      <Head
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.description}
        keywords={data.mdx.frontmatter.keywords}
      />
      <Home to="/">
        <Logo />
      </Home>
      <ImageBlock>
        <Img
          fixed={image.childImageSharp.fixed}
          style={{ flex: '1 1 auto', maxWidth: '100vw', maxHeight: '100vh' }}
        />
      </ImageBlock>
      <TitleBlock>
        <Headline>{title}</Headline>
        <Lead>{description}</Lead>
      </TitleBlock>
    </ImageContainer>
  );
};

export const pageQuery = graphql`
  query PhotoPostQuery($id: String) {
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
            fixed(width: 1600, quality: 60) {
              ...GatsbyImageSharpFixed_withWebp
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
