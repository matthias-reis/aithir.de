import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { Page } from './page';

import { colorBackground, colorMain, sizeCanvas } from '../core/style';

import Link from 'next/link';

export const LayoutFrame: FC<{
  title: string;
  description?: string;
  path: string;
  children: ReactNode;
  color?: string;
  bgColor?: string;
  bdColor?: string;
  image?: string;
}> = ({
  children,
  title,
  description,
  path,
  color = colorMain,
  bgColor,
  bdColor = colorBackground,
  image,
}) => {
  return (
    <Page
      title={title}
      description={description}
      path={path}
      bgColor={bgColor}
      image={image}
    >
      <Main bdColor={bdColor}>{children}</Main>
      <Legal color={color}>
        <Link href="/more/about">About</Link>
        <a rel="me" href="https://mstdn.social/@aithir">
          Mastodon
        </a>
        <Link href="/more/privacy">Privacy Policy</Link>
        <Link href="/more/imprint">Imprint</Link>
      </Legal>
    </Page>
  );
};

const Legal = styled('nav', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 5rem 0;

  & > * {
    padding: 0 1rem;
  }

  & a {
    color: ${({ color }) => color || colorMain};
    text-decoration: none;

    &:hover {
      border-bottom: 2px solid ${({ color }) => color || colorMain};
    }
  }
`;

const Main = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bdColor',
})<{ bdColor: string }>`
  max-width: ${sizeCanvas};
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  background: ${(props) => props.bdColor};
  box-shadow: 0 0 2rem #fff4;
`;
