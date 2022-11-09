import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import { parseMarkdown } from '../core/markdown';
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
    <Link href={`/storylines/${meta.slug}`} passHref legacyBehavior>
      <PostBox>
        <DateLabel
          date={new Date(meta.date || '')}
          small={small}
          color={color}
        />
        {type === 'reference' && (
          <SuperHead small={small}>
            {meta.storyline.name}{' '}
            {meta.episode && <Episode>{meta.episode}</Episode>}
          </SuperHead>
        )}

        <Title small={small} isPlaceholder={!!meta.placeholder}>
          {meta.name}
        </Title>

        {!small && !meta.placeholder && (
          <Text>
            {parseMarkdown(
              meta.md.split(' ').slice(0, 15).join(' ') + `&nbsp;&hellip;`
            )}
          </Text>
        )}
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
  line-height: 1.25;
  margin-bottom: 0.25rem;
`;

const Episode = styled.span`
  display: inline-flex;
  width: 1.4rem;
  height: 1rem;
  vertical-align: baseline;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.1rem;
  border: 1px solid ${colorTextWeak};
  border-radius: 0.5rem;
  font-size: 80%;
  padding-right: 2px;
`;

const Title = styled.div<{ small: boolean; isPlaceholder: boolean }>`
  font-size: ${({ small }) => (small ? fontSizeSmall : fontSizeMedium)};
  font-weight: ${fontBold};
  color: ${({ isPlaceholder }) =>
    isPlaceholder ? colorTextPlaceholder : colorTextStrong};
  line-height: 1.1;
`;

const Text = styled.div`
  font-size: ${fontSizeSmall};
`;
