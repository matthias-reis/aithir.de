import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import {
  colorText,
  fontBold,
  fontNormal,
  fontSizeOctahedron,
  fontSizeOctahedronSmall,
  mediaSmall,
} from '../core/style';

export const OctahedronText: FC<{
  variant: 'major' | 'minor';
  color: string;
  children: ReactNode;
}> = ({ variant, color, children }) => {
  const Positioning = variant === 'major' ? MajorPositioning : MinorPositioning;
  const Headline = variant === 'major' ? MajorPositioning : MinorPositioning;
  const H1 = variant === 'major' ? MajorPositioning : MinorPositioning;
  const Content = variant === 'major' ? MajorPositioning : MinorPositioning;
  return (
    <>
      <Positioning>
        <Headline>
          <Link href="/" passHref>
            <a>
              <Octahedron>
                Octahedron<Sub color={color}>World</Sub>
              </Octahedron>
            </a>
          </Link>
        </Headline>
        <Content>{children}</Content>
      </Positioning>
    </>
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

const MinorPositioning = styled.div`
  display: flex;
  gap: 1rem;
`;

const Headline = styled.div<{ variant: 'major' | 'minor' }>`
  ${({ variant }) =>
    variant === 'minor' &&
    `
    border-right: 1px solid ${colorText};
    
  `}

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

const Content = styled.div``;
