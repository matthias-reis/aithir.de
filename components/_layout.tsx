import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import {
  colorText,
  fontBold,
  fontNormal,
  fontSizeOctahedron,
  fontSizeOctahedronSmall,
  mediaMedium,
  mediaSmall,
} from '../core/style';

type LayoutComp = FC<{ children: ReactNode; color: string }>;

export const MajorLayout: LayoutComp = ({ children, color }) => (
  <MajorBox>
    <Link href="/" passHref legacyBehavior>
      <MajorOcta>
        <h1>
          Octahedron<Sub color={color}>World</Sub>
        </h1>
      </MajorOcta>
    </Link>
    {children}
  </MajorBox>
);

export const MinorLayout: LayoutComp = ({ children, color }) => (
  <MinorBox>
    <OctaSection>
      <Link href="/" passHref legacyBehavior>
        <MinorOcta>
          <h1>
            Octahedron<Sub color={color}>World</Sub>
          </h1>
        </MinorOcta>
      </Link>
    </OctaSection>
    <MainSection>{children}</MainSection>
  </MinorBox>
);

const MajorBox = styled.main`
  margin: 0 6rem;

  @media ${mediaMedium} {
    margin: 0 2rem;
  }
  @media ${mediaSmall} {
    margin: 0 2rem 3rem;
  }
`;

const MinorBox = styled.div`
  display: flex;
  margin: 0 1rem 1rem;

  @media ${mediaSmall} {
    display: block;
    margin: 0 2rem 3rem;
  }
`;

const MajorOcta = styled.a`
  font-weight: ${fontBold};
  color: inherit;
  text-decoration: none;
  margin: 0;
  display: block;
  position: absolute;
  line-height: 1;
  top: 1.75rem;
  right: 6rem;

  @media ${mediaSmall} {
    top: 1.2rem;
    right: 5rem;
  }

  & h1 {
    font-size: ${fontSizeOctahedron};
    margin: 0;
    @media ${mediaSmall} {
      font-size: ${fontSizeOctahedronSmall};
    }
  }
`;

const MinorOcta = styled.a`
  font-weight: ${fontBold};
  color: inherit;
  text-decoration: none;
  margin: 0;
  line-height: 1;
  display: block;
  transform-origin: bottom right;
  transform: rotate(-90deg);
  position: absolute;
  right: 1.25rem;

  @media ${mediaSmall} {
    transform: none;
    top: 1.2rem;
    right: 5rem;
  }

  & h1 {
    font-size: ${fontSizeOctahedron};
    margin: 0;
    @media ${mediaSmall} {
      font-size: ${fontSizeOctahedronSmall};
    }
  }
`;

const Sub = styled('span', { shouldForwardProp: (prop) => prop !== 'color' })<{
  color: string;
}>`
  color: ${({ color }) => color};
  opacity: 0.5;
  font-weight: ${fontNormal};
`;

const OctaSection = styled.div`
  position: relative;
  width: 4rem;
  border-right: 1px solid ${colorText};
  flex: 0 0 auto;

  @media ${mediaSmall} {
    border-right: none;
    position: static;
    width: auto;
    padding-top: 3rem;
  }
`;
const MainSection = styled.main`
  padding: 3rem 6rem;
  flex: 1 1 auto;
  @media ${mediaMedium} {
    padding: 3rem 1rem;
  }
  @media ${mediaSmall} {
    padding: 2rem 0;
  }
`;