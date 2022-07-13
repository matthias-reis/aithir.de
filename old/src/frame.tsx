import * as React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Logo } from "./logo";
import { GlobalStyle } from "./global-style";

export const Frame: React.FC = ({ children }) => {
  return (
    <Container>
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />
      <Logo />
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
`;
