import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import {
  colorMain,
  fontBold,
  fontNormal,
  fontSizeOctahedron,
  fontSizeOctahedronSmall,
  mediaMedium,
  mediaSmall,
} from '../core/style';
import { OctahedronNav } from './octahedron-nav';
import Link from 'next/link';
import { LayoutFrame } from './layout-frame';

export const LayoutMajor: FC<{
  title: string;
  description?: string;
  path: string;
  children: ReactNode;
  color?: string;
  bgColor?: string;
}> = ({ children, title, description, path, color = colorMain, bgColor }) => {
  return (
    <LayoutFrame
      title={title}
      description={description}
      color={color}
      bgColor={bgColor}
      path={path}
    >
      <OctahedronNav color={color} />
      <Box>
        <Link href="/" passHref legacyBehavior>
          <Octa>
            <h1>
              Octahedron<Sub color={color}>World</Sub>
            </h1>
          </Octa>
        </Link>
        {children}
      </Box>
    </LayoutFrame>
  );
};

const Box = styled.main`
  margin: 0 6rem;

  @media ${mediaMedium} {
    margin: 0 2rem;
  }

  @media ${mediaSmall} {
    margin: 0 2rem 3rem;
  }
`;

const Octa = styled.a`
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

const Sub = styled('span', { shouldForwardProp: (prop) => prop !== 'color' })<{
  color: string;
}>`
  color: ${({ color }) => color};
  opacity: 0.5;
  font-weight: ${fontNormal};
`;
