import styled from '@emotion/styled';
import { colorHighlight, colorStrong } from './var';

export const Blockquote = styled.blockquote`
  border-left: 4px solid ${colorHighlight};
  margin-left: 0;
  padding-left: 20px;
  font-style: italic;
  font-size: 1.2rem;
  color: ${colorStrong};
`;
