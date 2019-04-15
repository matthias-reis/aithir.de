import React from 'react';
import styled from '@emotion/styled';

export const ArticleList = styled.ul<{ inline?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  list-style: none;
  margin: ${props => (props.inline ? '0' : '0 5vw')};
`;
