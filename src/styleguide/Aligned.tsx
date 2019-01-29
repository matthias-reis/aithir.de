import styled from '@emotion/styled';
import { mediaLarge, mediaMedium } from './var';

export const LeftAligned = styled.div`
  width: 100%;
  float: left;
  margin: 10px 0 20px 0;

  @media ${mediaLarge} {
    width: 620px;
    margin: 10px 20px 20px -320px;
  }
`;

export const LeftColumn = styled.div`
  width: 100%;
  float: left;
  margin: 10px 0 20px 0;

  @media ${mediaMedium} {
    width: 300px;
    margin: 10px 20px 20px 0;
  }
  @media ${mediaLarge} {
    margin: 10px 20px 20px -320px;
  }
`;

export const RightAligned = styled.div`
  width: 100%;
  float: right;
  margin: 10px 0 20px 0;

  @media ${mediaLarge} {
    margin: 10px -320px 20px 20px;
  }
`;
export const RightColumn = styled.div`
  width: 100%;
  float: right;
  margin: 10px 0 20px 0;

  @media ${mediaMedium} {
    width: 300px;
    margin: 10px 0 20px 20px;
  }
  @media ${mediaLarge} {
    margin: 10px -320px 20px 20px;
  }
`;

export const FullWidth = styled.div`
  width: 100%;
  margin: 10px 0 20px 0;
  @media ${mediaLarge} {
    margin: 10px -320px 20px -320px;
  }
`;
