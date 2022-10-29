import styled from '@emotion/styled';
import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { colorMain, colorText } from '../core/style';
import { ChevronRight } from './chevron-right';

export const Pointer: FC<{ to: string; children: ReactNode }> = ({
  to,
  children,
}) => (
  <Link href={to} passHref legacyBehavior>
    <A>
      {children}
      <ChevronRight width={20} height={20} />
    </A>
  </Link>
);

const A = styled.a`
  margin-top: 2rem;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
  color: ${colorText};
  text-decoration: none;

  &:hover {
    color: ${colorMain};
  }
`;
