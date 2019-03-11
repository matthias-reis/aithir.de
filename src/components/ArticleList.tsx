import React from 'react';
import styled from '@emotion/styled';

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  justify-content: center;
  list-style: none;
  margin: 0 5vw;
`;

export const ArticleList = ({ children }) => <List>{children}</List>;
