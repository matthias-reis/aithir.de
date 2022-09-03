import { FC } from 'react';
import { Global, css } from '@emotion/react';
import { COLOR_BG, COLOR_TEXT } from './_styles';

export const GlobalStyles: FC = () => (
  <Global
    styles={css`
      html {
        font-family: 'Saira', sans-serif;
        font-weight: 200;
        font-size: 1rem;
        background-image: url(/patterns/default.png);
        background: ${COLOR_BG};
        color: ${COLOR_TEXT};
      }
    `}
  />
);
