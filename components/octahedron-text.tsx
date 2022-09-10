import styled from '@emotion/styled';
import { FC } from 'react';
import {
  fontBold,
  fontNormal,
  fontSizeOctahedron,
  fontSizeOctahedronSmall,
  mediaSmall,
} from '../core/style';

export const OctahedronText: FC<{
  variant: 'major' | 'minor';
  color: string;
}> = ({ variant, color }) => {
  const Positioning = variant === 'major' ? MajorPositioning : MinorPositioning;
  return (
    <Positioning>
      <H1 variant={variant}>
        Octahedron<Sub color={color}>World</Sub>
      </H1>
    </Positioning>
  );
};

const MajorPositioning = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 7rem;

  @media ${mediaSmall} {
    top: 1.2rem;
    right: 5rem;
  }
`;
const MinorPositioning = styled.div``;
const H1 = styled.h1<{ variant: 'major' | 'minor' }>`
  font-size: ${fontSizeOctahedron};
  font-weight: ${fontBold};
  margin: 0;

  @media ${mediaSmall} {
    font-size: ${fontSizeOctahedronSmall};
  }
`;
const Sub = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  opacity: 0.5;
  font-weight: ${fontNormal};
`;
