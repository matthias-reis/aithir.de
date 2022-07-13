import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import type { Node } from "./pages";

export const List: React.FC<{ images: Node[] }> = ({ images }) => {
  return (
    <Flex>
      {images.map((img: Node) => {
        const image = getImage(img.file.childImageSharp.gatsbyImageData);
        return (
          <ImageBox key={img.id}>
            <Link to={`/${img.file.name}`}>
              <GatsbyImage image={image} alt={img.title} objectFit="cover" />
            </Link>
          </ImageBox>
        );
      })}
    </Flex>
  );
};

const Flex = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 1fr;
  list-style: none;
  padding: 0;
`;

const ImageBox = styled.li`
  border: 1px solid lime;
  position: relative;
  height: 0;
  padding-bottom: 100%;
`;
