import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import {
  colorBackground,
  globalStyles,
  col4,
  col6,
  gutter,
} from '../styleguide';
import { Global } from '@emotion/core';

type PageType = {
  children: ReactNode;
  headerSection?: ReactNode;
  fullWidth?: boolean;
  transparent?: boolean;
  wide?: boolean;
};

const Body = styled.div<{ transparent?: boolean }>`
  background: ${({ transparent }) =>
    transparent ? 'transparent' : colorBackground};
  min-height: 100vh;
  padding: 0;
`;

const Container = styled.div<{ type: string }>`
  padding: 80px ${gutter}px;
  max-width: ${({ type }) => {
    if (type === 'fullWidth') return '100%';
    else if (type === 'wide') return `${col6}px`;
    else return `${col4}px`;
  }};
  margin: 0 auto;
`;

export const Page = ({
  children,
  headerSection,
  fullWidth,
  transparent,
  wide,
}: PageType) => {
  let type = 'standard';
  fullWidth && (type = 'fullWidth');
  wide && (type = 'wide');
  return (
    <Body transparent={transparent}>
      <Global styles={globalStyles} />
      {headerSection}
      <Container type={type}>{children}</Container>
    </Body>
  );
};
