import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { pageView } from '../core/tracking';
import { colorBackground, mediaLarge, sizeCanvas } from '../core/style';

const Viewport = styled.div`
  background-image: url(/patterns/default.png);
  background-attachment: fixed;
  padding: 1rem 1rem;

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

export const Page: FC<{ type: string; title: string; children: ReactNode }> = ({
  children,
  title,
  type,
}) => {
  pageView(type, title);
  return (
    <Viewport>
      <Canvas>{children}</Canvas>
    </Viewport>
  );
};
