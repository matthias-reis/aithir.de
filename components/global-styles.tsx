import { FC } from 'react';
import { Global, css } from '@emotion/react';
import {
  colorBackground,
  colorMain,
  colorText,
  fontNormal,
  fontStack,
} from '../core/style';

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      html {
        font-family: ${fontStack};
        letter-spacing: 0.8px;
        line-height: 1.75;
        font-weight: ${fontNormal};
        font-size: 1rem;
        background: ${colorBackground};
        color: ${colorText};
      }
      body {
        margin: 0;
        padding: 0;
      }
      a {
        color: ${colorMain};

        &:hover {
          color: ${colorText};
        }
      }
    `}
  />
);
