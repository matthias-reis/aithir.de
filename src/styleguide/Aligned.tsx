import styled from '@emotion/styled';
import { media30, media20, media10, col6, col, gutter } from './var';

export const ColThree = styled.div`
  display: block;
  padding: 10px 0;

  @media ${media30} {
    width: ${col6}px;
    margin-left: -${col + gutter}px;
  }

  @media ${media10} {
    display: flex;

    & > * {
      margin-right: 20px;
      width: 33%;
      flex: 1 1 33%;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const ColTwo = styled.div`
  display: block;

  @media ${media10} {
    display: flex;

    & > * {
      margin-right: 20px;
      width: 50%;
      flex: 1 1 50%;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

export const Left = styled.div`
  width: 100%;
  margin: 0;

  @media ${media20} {
    float: left;
    width: ${2 * col + gutter}px;
    margin: 0 ${gutter}px 0 0;
  }

  @media ${media30} {
    margin: 0 ${gutter}px 0 -${col + gutter}px;
  }
`;

export const Right = styled.div`
  width: 100%;
  margin: 0;

  @media ${media20} {
    float: right;
    width: ${2 * col + gutter}px;
    margin: 0 0 0 ${gutter}px;
  }
  @media ${media30} {
    margin: 0 -${col + gutter}px 0 ${gutter}px;
  }
`;

export const Wide = styled.div`
  width: 100%;
  margin: 0;

  @media ${media30} {
    width: ${col6}px;
    margin: 0 ${col + gutter}px 0 -${col + gutter}px;
  }
`;
