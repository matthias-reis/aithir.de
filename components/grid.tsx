import styled from '@emotion/styled';
import {
  gridGapHorizontal,
  gridGapVertical,
  mediaLarge,
  mediaMobile,
} from '../core/style';

export const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${gridGapVertical} ${gridGapHorizontal};
  margin: 0;
  padding: 0;

  @media ${mediaLarge} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${mediaMobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Item = styled.li`
  list-style: none;
  display: grid;
  gap: ${gridGapHorizontal};
  margin: 0;
  padding: 0;
`;
