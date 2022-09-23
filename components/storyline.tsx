import styled from '@emotion/styled';
import Link from 'next/link';
import { FC } from 'react';
import {
  colorBackground,
  colorBackgroundWeak,
  colorText,
  colorTextWeak,
  fontBold,
  fontSizeMedium,
  fontSizeSmall,
} from '../core/style';
import { StorylineMeta } from '../core/types';
import { icons } from './icons';

export const Storyline: FC<{ meta: StorylineMeta }> = ({ meta }) => {
  const Icon = icons[meta.slug];
  const img = `/strips/${meta.slug}.jpg`;
  return (
    <Link href={`/storylines/${meta.slug}`} passHref>
      <StorylineBox>
        <TitleBox>
          <IconBox>
            <Icon width={24} height={24} />
          </IconBox>
          <div>
            <Title>{meta.name}</Title>
            <Count>
              {meta.count} post{meta.count === 1 ? '' : 's'}
            </Count>
          </div>
        </TitleBox>
        <Img src={img} alt={`${meta.name} Pattern`} />
        <Description>{meta.description}</Description>
      </StorylineBox>
    </Link>
  );
};

const StorylineBox = styled.a`
  color: ${colorText};
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  padding: 0.25rem;
  border-radius: 0.25rem;
  &:hover {
    background: ${colorBackgroundWeak};
  }
`;

const TitleBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;

  & > div:first-of-type {
    flex: 0 0 auto;
  }
  & > div:last-of-type {
    flex: 1 1 auto;
  }
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: ${colorText};
  color: ${colorBackground};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: ${fontSizeMedium};
  font-weight: ${fontBold};
  line-height: 1.25;
`;

const Count = styled.div`
  font-size: ${fontSizeSmall};
  color: ${colorTextWeak};
`;

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3/1;
  margin-bottom: 1rem;
`;

const Description = styled.div`
  font-size: ${fontSizeSmall};
  line-height: 1.25;
`;
