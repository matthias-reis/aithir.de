import React from 'react';
import styled from '@emotion/styled';
import TeX from '@matejmazur/react-katex';
import { colorCopy } from './var';

const InlineTex = styled.span`
  color: ${colorCopy};
`;
const BlockTex = styled.span`
  color: ${colorCopy};
`;

export const M = ({ children }) => (
  <BlockTex>
    <TeX settings={{ displayMode: true }}>{children}</TeX>
  </BlockTex>
);
export const MI = ({ children }) => (
  <InlineTex>
    <TeX settings={{ displayMode: false }}>{children}</TeX>
  </InlineTex>
);
