import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import {
  colorBackgroundLight,
  colorBackgroundWeak,
  colorTextLight,
  colorTextWeak,
  fontBold,
} from '../core/style';
import { Tag } from '../core/types';

export const TagItem: FC<{ tag: Tag }> = ({ tag }) => (
  <Link href={`/tags/${tag.slug}`} passHref legacyBehavior>
    <A>
      <Name>#{tag.name}</Name> <Count>{tag.count}</Count>
    </A>
  </Link>
);

export const TagList = styled.div`
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const A = styled.a`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  background: ${colorBackgroundWeak};
  text-decoration: none;
  height: 32px;
  padding-left: 16px;
  padding-right: 3px;
  border-radius: 16px;
  color: ${colorTextWeak};
  &:hover {
    background: ${colorBackgroundLight};
  }
`;
const Name = styled.span`
  flex: 1 1 auto;
  display: block;
`;
const Count = styled.span`
  color: ${colorTextLight};
  flex: 0 0 auto;
  background: #0006;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  min-width: 26px;
  border-radius: 13px;
  font-weight: ${fontBold};
`;
