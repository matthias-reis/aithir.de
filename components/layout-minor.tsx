import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import {
  colorMain,
  colorText,
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

export const LayoutMinor: FC<{
  title: string;
  description?: string;
  path: string;
  children: ReactNode;
  color?: string;
  bgColor?: string;
  image?: string;
}> = ({
  children,
  title,
  description,
  path,
  color = colorMain,
  bgColor,
  image,
}) => {
  return (
    <LayoutFrame
      title={title}
      description={description}
      color={color}
      bgColor={bgColor}
      path={path}
      image={image}
    >
      <OctahedronNav color={color} />
      <Box>
        <OctaSection>
          <Link href="/" passHref legacyBehavior>
            <Octa>
              <h1>
                Octahedron<Sub color={color}>World</Sub>
              </h1>
            </Octa>
          </Link>
        </OctaSection>
        <MainSection>{children}</MainSection>
      </Box>
    </LayoutFrame>
  );
};

const Box = styled.div`
  display: flex;
  margin: 0 0 0 1rem;

  @media ${mediaSmall} {
    display: block;
    margin: 0 2rem 3rem;
  }
`;

const Octa = styled.a`
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

const MainSection = styled.main`
  padding: 3rem 0;
  flex: 1 1 auto;
  @media ${mediaSmall} {
    padding: 2rem 0;
  }
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
