import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import styled from "styled-components";

import { Frame } from "./frame";
import {
  bright3,
  fontSize1,
  space1,
  space3,
  space4,
  space5,
  weightNormal,
  zLabels,
} from "./config";

const PostPage: React.FC<PostProps> = ({ data }) => {
  const image = getImage(data.postsYaml.file);
  const { title, place, year, month } = data.postsYaml;

  return (
    <Frame>
      <Title>
        <FirstTitle>{title}</FirstTitle>
        <SecondTitle>{place}</SecondTitle>
        <ThirdTitle>
          {month && MONTHS[month - 1] + " "}
          {year}
        </ThirdTitle>
      </Title>
      <ImageBox>
        <GatsbyImage image={image} alt={title} objectFit="contain" />
      </ImageBox>
    </Frame>
  );
};

export const query = graphql`
  query SinglePageQuery($id: String!) {
    postsYaml(id: { eq: $id }) {
      month
      place
      title
      year
      file {
        childImageSharp {
          gatsbyImageData(width: 1920, placeholder: BLURRED)
        }
      }
    }
  }
`;

const ImageBox = styled.div`
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding: ${space1};
  padding-bottom: ${space4};
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Title = styled.div`
  position: absolute;
  bottom: ${space1};
  right: ${space3};
  display: flex;
  align-items: center;
  gap: ${space1};
  font-size: ${fontSize1};
  z-index: ${zLabels};

  & h2,
  & h3,
  & p {
    font-size: inherit;
  }
`;

const FirstTitle = styled.h2`
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
const SecondTitle = styled.h3`
  font-weight: ${weightNormal};
`;
const ThirdTitle = styled.p`
  color: ${bright3};
`;

type PostProps = {
  data: {
    postsYaml: {
      title: string;
      place: string;
      year: number;
      month: number;
      file: IGatsbyImageData;
    };
  };
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default PostPage;
