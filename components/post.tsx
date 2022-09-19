import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import {
  colorBackgroundWeak,
  colorText,
  colorTextStrong,
  colorTextWeak,
  fontBold,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeStandard,
} from '../core/style';
import { PostMeta } from '../core/types';
import { DateLabel } from './date-label';
import { formatDate } from './format-date';
import { FONT_L, FONT_M, FONT_S, SPACE_M, WEIGHT_BOLD } from './_styles';

export const Post: FC<{
  meta: PostMeta;
  type?: 'reference' | 'storyline';
  small?: boolean;
}> = ({ meta, type = 'reference', small = false }) => {
  return (
    <Link href={`/storylines/${meta.slug}`} passHref>
      <PostBox>
        <DateLabel date={new Date(meta.date || '')} small={small} />
        {type === 'reference' && (
          <SuperHead small={small}>{meta.storyline.name}</SuperHead>
        )}
        <Title small={small}>{meta.name}</Title>
      </PostBox>
    </Link>
  );
};

const PostBox = styled.a`
  display: flex;
  color: ${colorText};
  text-decoration: none;
  flex-direction: column;
  justify-content: stretch;
  padding: 0.25rem;
  border-radius: 0.25rem;

  &:hover {
    background: ${colorBackgroundWeak};
  }
`;

const SuperHead = styled.div<{ small: boolean }>`
  font-size: ${({ small }) => (small ? fontSizeSmall : fontSizeStandard)};
  color: ${colorTextWeak};
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const Title = styled.div<{ small: boolean }>`
  font-size: ${({ small }) => (small ? fontSizeSmall : fontSizeMedium)};
  font-weight: ${fontBold};
  color: ${colorTextStrong};
  line-height: 1.1;
`;
