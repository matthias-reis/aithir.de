import { createGlobalStyle } from "styled-components";
import { baseline, bright2, dark1, weightNormal } from "./config";

export const GlobalStyle = createGlobalStyle`
body {
  color: ${bright2};
  background: ${dark1};
  font-family: "Open Sans Condensed", sans-serif;
  font-size: ${baseline};
  font-weight: ${weightNormal};
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6, p, li, ul {
  margin: 0;
  padding: 0;
}
`;
