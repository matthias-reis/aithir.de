import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colorBackground, globalStyles } from '../styleguide';
import { Global } from '@emotion/core';

type PageType = { children: ReactNode; headerSection?: ReactNode };

const Body = styled.div`
  background: ${colorBackground};
  padding: 20px 0;
`;

const Container = styled.div`
  padding: 80px 20px;
  max-width: 660px;
  margin: 0 auto;
`;

export const Page = ({ children, headerSection }: PageType) => (
  <Body>
    <Global styles={globalStyles} />
    {headerSection}
    <Container>{children}</Container>
  </Body>
);
