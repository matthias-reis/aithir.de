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
  'What if we developed an AI with more than human level intelligence? And how powerful can it become? Goliath is following that thought and adds a twist in the second half.';

// lists all available storylines
const GoliathStoryline: NextPage = () => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline="Goliath"
      image={image}
      bgColor="#010201"
      color="#6F6E2B"
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
      <Outro>
        <p>
          Initially, this story was formed by two ideas: How would we approach
          the topic of creating an AGI, a generel artificial intelligence. And
          why don&apos;t we let it fight against some nasty aliens. The movie
          Cowboys vs. Aliens came to my mind and the story was born. Also the
          story arc of splitting into two different and presumably independent
          parts was clear to me from the start.
        </p>
        <p>
          The ideation phase happened way before Chat GPT and Large Language
          Models took off. I had imagined the scenario 20 or 30 years in the
          future. So the reality was faster this time.
        </p>
      </Outro>
      <Hr />
      <Disclaimer>
        Released between June 12th and November 16th 2022
        <br />© 2022 Octahedron World, Matthias Reis
      </Disclaimer>
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
  margin: 0 10% 8rem auto;
  margin-top: max(-25vw, -270px);
  padding-left: 1rem;
  text-align: right;
  font-size: 20px;
  max-width: 30rem;
`;

const Outro = styled.div`
  color: #fff8;
  font-size: 0.9rem;
  max-width: 30rem;
  margin: 1rem auto;
  padding: 0 1rem;
`;

const Disclaimer = styled.p`
  color: #fff8;
  text-align: center;
  font-size: 0.9rem;
  padding-bottom: 5rem;
`;
