import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { colorText, fontMedium, fontSizeHeadline } from '../core/style';

export const Headline: FC<{ children: ReactNode }> = ({ children }) => (
  <H2>{children}</H2>
);

const H2 = styled.h2`
  border-bottom: 1px solid ${colorText};
  font-size: ${fontSizeHeadline};
  font-weight: ${fontMedium};
`;
