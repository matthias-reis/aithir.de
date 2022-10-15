import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { pageView } from '../core/tracking';
import {
  colorBackground,
  colorMain,
  mediaLarge,
  sizeCanvas,
} from '../core/style';
import { MajorLayout, MinorLayout } from './layout';
import { OctahedronNav } from './octahedron-nav';
import { useRouter } from 'next/router';

type Layout = 'major' | 'minor';

export const Page: FC<{
  type: string;
  title: string;
  children: ReactNode;
  layout?: Layout;
  color?: string;
  bg?: string;
}> = ({
  children,
  title,
  type,
  layout = 'minor',
  color = colorMain,
  bg = 'general',
}) => {
  const router = useRouter();
  pageView(type, title, router.query.c as string | undefined);
  const Layout = layout === 'major' ? MajorLayout : MinorLayout;
  return (
    <Viewport bg={`/patterns/${bg}.jpg`}>
      <Canvas>
        <OctahedronNav color={color} />
        <Layout color={color}>{children}</Layout>
      </Canvas>
    </Viewport>
  );
};

const Viewport = styled.div<{ bg: string }>`
  background-image: url(${({ bg }) => bg});
  background-attachment: fixed;
  background-size: cover;
  padding: 1rem 1rem;
  min-height: 100vh;

  @media ${mediaLarge} {
    padding: 1rem 0.5rem;
  }
`;

const Canvas = styled.div`
  max-width: ${sizeCanvas};
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  background: ${colorBackground};
  border-radius: 0.25rem;
  box-shadow: 0 0 4rem #fff4;
`;
