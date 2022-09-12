import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import {
  colorBackgroundWeak,
  colorMain,
  colorText,
  colorTextStrong,
  colorTextWeak,
  fontBold,
  fontMedium,
  fontNormal,
  fontSizeLarge,
  fontSizeMedium,
  fontSizeStandard,
} from '../core/style';
import { PostMeta } from '../core/types';
import { DateLabel } from './date-label';
import { formatDate } from './format-date';
import { FONT_L, FONT_M, FONT_S, SPACE_M, WEIGHT_BOLD } from './_styles';

export const Post: FC<{ meta: PostMeta; type?: 'reference' | 'storyline' }> = ({
  meta,
  type = 'reference',
}) => {
  return (
    <Link href={`/storylines/${meta.slug}`} passHref>
      <PostBox>
        <DateLabel date={new Date(meta.date || '')} />
        {type === 'reference' && <SuperHead>{meta.storyline.name}</SuperHead>}
        <Title>{meta.name}</Title>
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

const SuperHead = styled.div`
  font-size: ${fontSizeStandard};
  color: ${colorTextWeak};
  line-height: 1;
  margin-bottom: 0.25rem;
`;

const Title = styled.div`
  font-size: ${fontSizeLarge};
  font-weight: ${fontBold};
  color: ${colorTextStrong};
  line-height: 1.1;
`;
