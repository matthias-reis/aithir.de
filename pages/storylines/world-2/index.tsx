import type { NextPage } from 'next';
import { PageArtDirected } from '../../../components/page-art-directed';
import text from '../../../_archive/world-2/all.md';
import { parseMarkdown } from '../../../core/markdown';
import { ReactElement } from 'react';
import styled from '@emotion/styled';
import image from './title.jpg';
import {
  fontSizeMedium,
  fontSizeStandard,
  fontStackCopy,
  fontStackSerif,
} from '../../../core/style';
import { Graphics } from '../../../components/world-2-graphics';
import { Calculator } from '../../../components/calculator';

const parts: ReactElement[][] = text
  .split('---')
  .map(parseMarkdown)
  .reduce((acc: ReactElement[][], next, i) => {
    if (i % 2 === 0) {
      acc.push([]);
    }
    acc[acc.length - 1][i % 2] = next;
    return acc;
  }, []);

const description = `What are the biggest problems of our time and how do we overcome them? This storyline focuses on the complex problems around energy creation and consumption`;

// lists all available storylines
const World2Storyline: NextPage = () => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline="World 2"
      image={image}
      bgColor="#000"
      bdColor="#111106"
      color="#ac768c"
      logoColor="#ffffff"
      canonicalPath="/storylines/world-2"
      withShadow={false}
      description={description}
    >
      <TitleArea>
        <Title>World 2</Title>
        <SubTitle>Energy and Climate Crisis</SubTitle>
        <Intro>{description}</Intro>
      </TitleArea>

      {parts.slice(0, 4).map((part, i) => {
        const [left, right] = part;
        return (
          <Post key={i}>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Post>
        );
      })}
      <Post>
        <Left />
        <Right>
          <Graphics />
        </Right>
      </Post>
      {parts.slice(4, 5).map((part, i) => {
        const [left, right] = part;
        return (
          <Post key={i}>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Post>
        );
      })}

      <Calculator
        data={{
          title: 'What we actually emit',
          text: 'Here are some reference numbers for the CO₂ emissions of the different regions of the world.',
          calculus: [
            { name: 'Germany', value: 675_000_000, reference: 'de' },
            { name: 'EU', value: 3_619_000_000, reference: 'eu' },
            { name: 'China', value: 11_472_000_000, reference: 'ch' },
            { name: 'USA', value: 5_007_000_000, reference: 'us' },
            { name: 'World', value: 54_590_000_000, reference: 'wo' },
          ],
        }}
      />

      {parts.slice(5, 6).map((part, i) => {
        const [left, right] = part;
        return (
          <Post key={i}>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Post>
        );
      })}

      <Calculator
        data={{
          title: 'Fossile Energy Sources',
          text: `The single coal plant Niederaußem contributes 36% to the budget of a german citizen but only 0.7% of the overall energy.
          Additinally, I've added coal as a whole and gas for comparison.
          `,
          calculus: [
            { name: 'Niederaußem', value: 29_600_000, reference: 'de' },
            { name: 'Lignite', value: 116_000_000, reference: 'de' },
            { name: 'Hard Coal', value: 49_000_000, reference: 'de' },
            { name: 'Gas', value: 29_000_000, reference: 'de' },
          ],
        }}
      />

      {parts.slice(6, 7).map((part, i) => {
        const [left, right] = part;
        return (
          <Post key={i}>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Post>
        );
      })}

      <Calculator
        data={{
          title: 'Transport Sector - Flights',
          text: `We all know that flying is bad for the environment. But how bad is it really?
          Let's compare the results to our budget and have a look at different distances including return flights.
          Hamburg - Sylt (180km) is a typical private jet route, which allows much less people per flight with
          a devastating impact compared to the distance. I'm assuming 9 tons per flight and six passengers on board.
          `,
          calculus: [
            { name: 'HH - Sydney', value: 12.893, reference: 'pe' },
            { name: 'HH - Malaga', value: 0.918, reference: 'pe' },
            { name: 'Hamburg - Sylt', value: 3, reference: 'pe' },
          ],
        }}
      />

      {parts.slice(7).map((part, i) => {
        const [left, right] = part;
        return (
          <Post key={i}>
            <Left>{left}</Left>
            <Right>{right}</Right>
          </Post>
        );
      })}

      <Hr />
      <Disclaimer>
        Released between August 2022 and April 2023
        <br />© 2022-2023 Octahedron World, Matthias Reis
      </Disclaimer>
    </PageArtDirected>
  );
};

export default World2Storyline;

const TitleArea = styled.div`
  text-align: center;
  background: linear-gradient(0deg, #0000 0%, #0008 25%, #0008 75%, #0000 100%);
  padding: 5rem 0;
  margin-top: max(-50vw, -540px);
  margin-bottom: 20vh;
  position: relative;
  @media (max-width: 600px) {
    margin-bottom: 3rem;
  }
`;
const Title = styled.h2`
  font-size: 8rem;
  font-family: ${fontStackSerif};
  line-height: 1;
  color: #fff;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 5rem;
  }
`;

const SubTitle = styled.h5`
  font-size: 1.2rem;
  font-weight: 300;
  margin: 0;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
`;

const Post = styled.div`
  color: #fff;
  margin: 2rem 5rem;
  display: flex;
  gap: 2rem;
  justify-content: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
    margin: 1.5rem;
    gap: 0;
  }
`;

const Left = styled.div`
  flex: 1 1 auto;
  text-align: right;
  color: #fff5;
  font-size: ${fontSizeMedium};
  & h2 {
    line-height: 1.1;
    margin: 0;
    margin-top: 1rem;
  }
  @media (max-width: 600px) {
    text-align: left;
  }
`;

const Right = styled.div`
  /* font-family: ${fontStackCopy}; */
  width: 60%;
  flex: 0 0 auto;

  @media (max-width: 600px) {
    width: auto;
  }
`;

const Intro = styled.p`
  margin: 0 auto;
  font-size: ${fontSizeStandard};
  color: #fff8;
  max-width: 30rem;
`;
const Hr = styled.hr`
  border: none;
  border-bottom: 2px solid #fff3;
  width: 30%;
  margin: 3rem auto;
`;

const Disclaimer = styled.p`
  color: #fff8;
  text-align: center;
  font-size: 0.9rem;
  padding-bottom: 5rem;
`;
