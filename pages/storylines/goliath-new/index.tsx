import type { NextPage } from 'next';
import { PageArtDirected } from '../../../components/page-art-directed';
import image from './title.jpg';
import text from '../../../_archive/goliath/all.md';
import { parseMarkdown } from '../../../core/markdown';
import { ReactElement } from 'react';
import styled from '@emotion/styled';

const parts = text
  .split('---')
  .map((t: string) => t.trim())
  .map(parseMarkdown);

const description =
  'What if we develop an AI with more than human level intelligence? And how powerful can it become? The story in this line is following that thought.';

// lists all available storylines
const GoliathStoryline: NextPage = () => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline="Goliath"
      image={image}
      bgColor="#000"
      canonicalPath="/storylines/goliath"
      description={description}
    >
      <Intro>{description}</Intro>
      {parts.map((p: ReactElement, i: number) => (
        <Post key={i}>
          {p}
          <Hr />
        </Post>
      ))}
    </PageArtDirected>
  );
};

export default GoliathStoryline;

const Post = styled.div`
  max-width: 30rem;
  margin: 1rem auto;
  padding: 0 1rem;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 2px solid #fff3;
  width: 30%;
  margin: 3rem auto;
`;

const Intro = styled.p`
  font-weight: bold;
  margin: 1rem 10% 8rem auto;
  padding-left: 1rem;
  text-align: right;
  font-size: 20px;
  max-width: 30rem;
  margin-top: -25vw;
`;
