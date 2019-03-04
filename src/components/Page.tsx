import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorBackground, globalStyles, col4, gutter } from '../styleguide';
import { Global } from '@emotion/core';

type PageType = { children: ReactNode; headerSection?: ReactNode };

const Body = styled.div`
  background: ${colorBackground};
  padding: 0;
`;

const Container = styled.div`
  padding: 80px ${gutter}px;
  max-width: ${col4}px;
  margin: 0 auto;
`;

export const Page = ({ children, headerSection }: PageType) => (
  <Body>
    <Global styles={globalStyles} />
    {headerSection}
    <Container>{children}</Container>
  </Body>
);
