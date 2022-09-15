import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { pageView } from '../core/tracking';
import { colorBackground, mediaLarge, sizeCanvas } from '../core/style';

export const Page: FC<{
  type: string;
  title: string;
  children: ReactNode;
  bg?: string;
}> = ({ children, title, type, bg = 'general' }) => {
  pageView(type, title);
  return (
    <Viewport bg={`/patterns/${bg}.jpg`}>
      <Canvas>{children}</Canvas>
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
  padding: 2rem 6rem;
  margin: 0 auto;
  background: ${colorBackground};
  border-radius: 0.25rem;
  box-shadow: 0 0 4rem #fff4;

  @media ${mediaLarge} {
    padding: 1rem 2rem;
  }
`;
