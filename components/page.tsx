import styled from '@emotion/styled';
import { FC, ReactNode, useEffect } from 'react';
import { COLOR_BG } from './_styles';
import { PageViews } from '@piwikpro/react-piwik-pro';

const PageBox = styled.div`
  max-width: 50rem;
  padding: 1rem;
  margin: 0 auto;
  background: ${COLOR_BG};
  border-radius: 2rem;
`;

export const Page: FC<{ title: string; children: ReactNode }> = ({
  children,
  title,
}) => {
  useEffect(() => {
    PageViews.trackPageView(title);
  }, [title]);
  return <PageBox>{children}</PageBox>;
};
