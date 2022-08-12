import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import { PostMeta } from '../core/types';
import { formatDate } from './format-date';
import {
  COLOR_BG_HOVER,
  COLOR_BG_LIGHT,
  FONT_L,
  FONT_M,
  FONT_S,
  SPACE_M,
  SPACE_S,
  WEIGHT_BOLD,
} from './_styles';

export const Post: FC<{ meta: PostMeta; type?: 'reference' | 'storyline' }> = ({
  meta,
  type = 'reference',
}) => {
  return (
    <Link href={`/storylines/${meta.slug}`}>
      <PostBox>
        <SuperHead>
          {type === 'reference'
            ? meta.storyline.name
            : `${meta.year}-${meta.week}`}
        </SuperHead>
        <Title>{meta.name}</Title>
        {meta.date && <FullDate>{formatDate(meta.date)}</FullDate>}
      </PostBox>
    </Link>
  );
};

const PostBox = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  background: ${COLOR_BG_LIGHT};
  padding: ${SPACE_S};
  border-radius: ${SPACE_S};
  &:hover {
    background: ${COLOR_BG_HOVER};
  }
`;

const SuperHead = styled.div`
  font-size: ${FONT_M};
  line-height: 1;
`;

const Title = styled.div`
  font-size: ${FONT_L};
  font-weight: ${WEIGHT_BOLD};
  line-height: 1.25;
  margin-bottom: ${SPACE_M};
`;

const FullDate = styled.div`
  font-size: ${FONT_S};
  flex: 1;
  display: flex;
  align-items: flex-end;
`;
