import styled from '@emotion/styled';
import { media30, media10 } from './var';

export const LeftAligned = styled.div`
  width: 100%;
  float: left;
  margin: 10px 0 20px 0;

  @media ${media30} {
    width: 620px;
    margin: 10px 20px 20px -320px;
  }
`;

export const LeftColumn = styled.div`
  width: 100%;
  float: left;
  margin: 10px 0 20px 0;

  @media ${media10} {
    width: 300px;
    margin: 10px 20px 20px 0;
  }
  @media ${media30} {
    margin: 10px 20px 20px -320px;
  }
`;

export const RightAligned = styled.div`
  width: 100%;
  float: right;
  margin: 10px 0 20px 0;

  @media ${media30} {
    margin: 10px -320px 20px 20px;
  }
`;
export const RightColumn = styled.div`
  width: 100%;
  float: right;
  margin: 10px 0 20px 0;

  @media ${media10} {
    width: 300px;
    margin: 10px 0 20px 20px;
  }
  @media ${media30} {
    margin: 10px -320px 20px 20px;
  }
`;

export const FullWidth = styled.div`
  width: 100%;
  margin: 10px 0 20px 0;
  @media ${media30} {
    margin: 10px -320px 20px -320px;
  }
`;
