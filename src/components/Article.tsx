import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from '@emotion/styled';
import { colorCopy, colorCopyWeak } from '../styleguide';

const Item = styled(Link)`
  display: block;
  color: ${colorCopy};
  background: #0003;
  border: 0;
  height: 100%;
  padding-bottom: 15px;
  &:hover {
    border: 0;
    background: #0008;
  }
`;

const Container = styled.li`
  margin-bottom: 0;
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

export interface Node {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    description: string;
    category?: string;
    date?: string;
    keywords?: string[];
    image: { childImageSharp: { fluid: any } };
  };
}

export const Article = ({ node }: { node: Node }) => (
  <Container>
    <Item to={node.fields.slug}>
      <Image fluid={node.frontmatter.image.childImageSharp.fluid} />
      <Date>{node.frontmatter.date}</Date>
      <Title>{node.frontmatter.title}</Title>
      <Description>{node.frontmatter.description}</Description>
    </Item>
  </Container>
);
