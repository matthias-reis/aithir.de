import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import {
  colorBackgroundWeak,
  colorText,
  colorTextPlaceholder,
  colorTextStrong,
  colorTextWeak,
  fontBold,
  fontSizeMedium,
  fontSizeSmall,
  fontSizeStandard,
} from '../core/style';
import { PostMeta } from '../core/types';
import { DateLabel } from './date-label';

export const Post: FC<{
  meta: PostMeta;
  type?: 'reference' | 'storyline';
  small?: boolean;
  color?: string;
}> = ({ meta, type = 'reference', small = false, color }) => {
  return (
    <Link href={`/storylines/${meta.slug}`} passHref>
      <PostBox>
        <DateLabel
          date={new Date(meta.date || '')}
          small={small}
          color={color}
        />
        {type === 'reference' && (
          <SuperHead small={small}>{meta.storyline.name}</SuperHead>
        )}
        <Title small={small} isPlaceholder={!!meta.placeholder}>
          {meta.name}
        </Title>
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

const Title = styled.div<{ small: boolean; isPlaceholder: boolean }>`
  font-size: ${({ small }) => (small ? fontSizeSmall : fontSizeMedium)};
  font-weight: ${fontBold};
  color: ${({ isPlaceholder }) =>
    isPlaceholder ? colorTextPlaceholder : colorTextStrong};
  line-height: 1.1;
`;
