import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { colorCopy, colorCopyWeak } from '../styleguide';
import { ArticleEntity } from '../typings';

const Item = styled(Link)`
  display: block;
  color: ${colorCopy};
  background: #0007;
  border: 0;
  height: 100%;
  padding-bottom: 15px;
  &:hover {
    border: 0;
    background: #000b;
  }
`;

const Container = styled.li`
  margin-bottom: 0;
`;

const ImageContainer = styled.div`
  height: 0;
  padding-bottom: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
`;

const ImageInnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  & .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`;

const Date = styled.p`
  font-size: 0.8rem;
  color: ${colorCopyWeak};
  line-height: 1.3em;
  margin: 20px 15px 0 15px;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  margin: 15px 15px 0 15px;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${colorCopyWeak};
  line-height: 1.3em;
  margin: 15px 15px 15px 15px;
`;

export const Article = ({ node }: { node: ArticleEntity }) => (
  <Container>
    <Item to={node.fields.slug}>
      <ImageContainer>
        <ImageInnerContainer>
          <Image fluid={node.frontmatter.image.childImageSharp.fluid} />
        </ImageInnerContainer>
      </ImageContainer>
      <Date>{node.frontmatter.date}</Date>
      <Title>{node.frontmatter.title}</Title>
      <Description>{node.frontmatter.description}</Description>
    </Item>
  </Container>
);

export const query = graphql`
  fragment ArticleEntity on Mdx {
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
`;
