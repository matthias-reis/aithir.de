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
} from '../core/style';
import { ItemMeta } from '../core/types';

export const Article: FC<{
  meta: ItemMeta;
  type?: 'reference' | 'storyline';
  color?: string;
}> = ({ meta }) => {
  return (
    <Link href={meta.path} passHref legacyBehavior>
      <PostBox>
        <Img src={meta.image} alt={`${meta.title}`} />

        {meta.superTitle && <SuperHead>{meta.superTitle}</SuperHead>}

        <Title>{meta.title}</Title>
        <Type>{meta.type}</Type>

        <Text>{meta.text}</Text>
      </PostBox>
    </Link>
  );
};

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3/1;
  margin-bottom: 1rem;
`;
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
  font-size: ${fontSizeSmall};
  color: ${colorTextWeak};
  line-height: 1.25;
  margin-bottom: 0.25rem;
`;

const Title = styled.div`
  font-size: ${fontSizeMedium};
  font-weight: ${fontBold};
  color: ${colorTextStrong};
  line-height: 1.1;
`;

const Type = styled.div`
  font-size: ${fontSizeSmall};
  color: ${colorTextWeak};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
`;

const Text = styled.div`
  font-size: ${fontSizeSmall};
`;
