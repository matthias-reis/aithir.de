import styled from '@emotion/styled';
import { FC, ReactNode } from 'react';
import { COLOR_BG } from './_styles';
import { pageView } from '../core/tracking';

const PageBox = styled.div`
  max-width: 50rem;
  padding: 1rem;
  margin: 0 auto;
  background: ${COLOR_BG};
  border-radius: 2rem;
`;

export const Page: FC<{ type: string; title: string; children: ReactNode }> = ({
  children,
  title,
  type,
}) => {
  pageView(type, title);
  return <PageBox>{children}</PageBox>;
};
