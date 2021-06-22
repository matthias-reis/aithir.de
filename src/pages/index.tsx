import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "styled-components";

import { Frame } from "../frame";
import { List } from "../list";
import { bright3, fontSize2, fontSize4, space6, weightNormal } from "../config";

const HomePage = ({ data }: { data: Data }) => {
  const images = data.allPostsYaml.edges.map(({ node }) => node);
  return (
    <Frame>
      <Scroller>
        <Title>Aithir.de</Title>
        <SubTitle>Photography & Media</SubTitle>
        <List images={images} />
      </Scroller>
    </Frame>
  );
};

export default HomePage;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: ${fontSize4};
  text-align: center;
  letter-spacing: 0.2em;
  margin-top: ${space6};
`;

const SubTitle = styled.h2`
  font-weight: ${weightNormal};
  font-size: ${fontSize2};
  color: ${bright3};
  text-align: center;
`;

const Scroller = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

export const query = graphql`
  query MyQuery {
    allPostsYaml(sort: { fields: file___name, order: DESC }) {
      edges {
        node {
          id
          month
          place
          title
          year
          file {
            name
            childImageSharp {
              gatsbyImageData(width: 640, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`;

type Data = {
  allPostsYaml: {
    edges: {
      node: Node;
    }[];
  };
};

export type Node = {
  id: string;
  month: number;
  place: string;
  title: string;
  year: number;
  file: {
    name: string;
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};
