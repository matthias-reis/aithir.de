// here's the place for global style libraries
import 'katex/dist/katex.min.css';

import { css } from '@emotion/core';
import {
  colorCopy,
  lineHeight,
  colorHighlight,
  colorHighlightBright,
} from './var';

// here goes the single global styles
export const globalStyles = css`
  body {
    color: ${colorCopy};
  }
  .katex {
    line-height: 0;
  }
  a {
    color: ${colorHighlight};
    text-decoration: none;
    display: inline-block;
    border-bottom: 1px dashed ${colorHighlight};
    &:hover {
      color: ${colorHighlightBright};
      border-bottom: 1px dashed ${colorHighlightBright};
    }
  }
`;

export * from './var';
export { Blockquote } from './Blockquote';
export { Link } from './Link';
export { M, MI } from './Math';
export { H1, H2, H3 } from './Headline';
export * from './Paragraph';
export * from './Aligned';
export * from './icons';
