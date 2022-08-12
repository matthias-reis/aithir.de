import styled from '@emotion/styled';
import { GRID_GAP } from './_styles';

export const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${GRID_GAP};
  margin: 0;
  padding: 0;
`;

export const Item = styled.li`
  list-style: none;
  display: grid;
  gap: ${GRID_GAP};
  margin: 0;
  padding: 0;
`;
