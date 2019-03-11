import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorBackground, globalStyles, col4, gutter } from '../styleguide';
import { Global } from '@emotion/core';

type PageType = {
  children: ReactNode;
  headerSection?: ReactNode;
  fullWidth?: boolean;
};

const Body = styled.div`
  background: ${colorBackground};
  min-height: 100vh;
  padding: 0;
`;

const Container = styled.div<{ fullWidth: boolean }>`
  padding: 80px ${gutter}px;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : `${col4}px`)};
  margin: 0 auto;
`;

export const Page = ({ children, headerSection, fullWidth }: PageType) => (
  <Body>
    <Global styles={globalStyles} />
    {headerSection}
    <Container fullWidth={fullWidth}>{children}</Container>
  </Body>
);
