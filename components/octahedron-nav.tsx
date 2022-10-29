import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import { mediaSmall } from '../core/style';
import PlainOctahedron from './octahedron';

export const OctahedronNav: FC<{ color: string }> = ({ color }) => {
  return (
    <Positioning>
      <Link href="/" passHref>
        <Octahedron color={color} />
      </Link>
    </Positioning>
  );
};

const Octahedron = styled(PlainOctahedron)`
  width: 3.5rem;
  height: 3.5rem;

  @media ${mediaSmall} {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const A = styled.a`
  display: block;
`;

const Positioning = styled.nav`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
