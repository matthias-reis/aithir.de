import styled from '@emotion/styled';
import { fontSizeStandard, fontSizeXLarge } from '../core/style';
import { FC, ReactNode } from 'react';

export const PageTitle = styled.h2`
  font-size: ${fontSizeXLarge};
  line-height: 1.1;
  margin: 0;
  text-overflow: ellipsis;
`;
export const PageSuperTitle = styled.p`
  font-size: ${fontSizeStandard};
  margin: 0;
`;
const TitleBox = styled.div`
  padding: 5rem 0 1rem;
`;

export const Title: FC<{ children: ReactNode; superTitle?: string }> = ({
  children,
  superTitle,
}) => {
  return (
    <TitleBox>
      {superTitle && <PageSuperTitle>{superTitle}</PageSuperTitle>}
      <PageTitle>{children}</PageTitle>
    </TitleBox>
  );
};
