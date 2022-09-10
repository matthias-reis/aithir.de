import { FC } from 'react';
import { Global, css } from '@emotion/react';
import { COLOR_BG, COLOR_TEXT } from './_styles';
import {
  colorBackground,
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
        font-weight: ${fontNormal};
        font-size: 1rem;
        background: ${colorBackground};
        color: ${colorText};
      }
      body {
        margin: 0;
        padding: 0;
      }
    `}
  />
);
