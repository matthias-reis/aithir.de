import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import { StorylineMeta } from '../core/types';
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

export const Storyline: FC<{ meta: StorylineMeta }> = ({ meta }) => {
  return (
    <Link href={`/storylines/${meta.slug}`}>
      <StorylineBox>
        <Title>{meta.name}</Title>
        <Count>
          {meta.count} post{meta.count === 1 ? '' : 's'}
        </Count>
        <Description>{meta.description}</Description>
      </StorylineBox>
    </Link>
  );
};

const StorylineBox = styled.a`
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

const Title = styled.div`
  font-size: ${FONT_L};
  font-weight: ${WEIGHT_BOLD};
  line-height: 1.25;
`;

const Count = styled.div`
  font-size: ${FONT_M};
  margin-bottom: ${SPACE_M};
`;
const Description = styled.div`
  font-size: ${FONT_S};
`;
