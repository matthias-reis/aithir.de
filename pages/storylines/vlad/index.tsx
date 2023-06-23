import type { NextPage } from 'next';
import { PageArtDirected } from '../../../components/page-art-directed';
import text from '../../../_archive/vlad/all.md';
import { parseMarkdown } from '../../../core/markdown';
import styled from '@emotion/styled';
import image from './title.jpg';
import {
  fontSizeReading,
  fontSizeStandard,
  fontStackCopy,
} from '../../../core/style';
import { getStoryline } from '../../../core/data-layer';
import { ItemMeta } from '../../../core/types';

const md = parseMarkdown(text);

const title = 'Vlad';
const subtitle = 'The Truth About Dracula';
const description = `
  Everyone knows that Dracula was a real historic figure. 
  But did you also know that he was a magician?
  This is the first short in my series around the Hermetic Society.`;

// lists all available storylines
const VladStoryline: NextPage<{
  related: ItemMeta[];
}> = ({ related }) => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline={title}
      image={image}
      bgColor="#000"
      bdColor="#20090b"
      color="#ac768c"
      logoColor="#ffffff"
      canonicalPath="/storylines/world-2"
      withShadow={false}
      description={description}
      start={new Date('2022-12-07')}
      end={new Date('2023-06-23')}
      related={related}
    >
      <TitleArea>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <Intro>{description}</Intro>
      </TitleArea>

      <Post>{md}</Post>
    </PageArtDirected>
  );
};

export function getServerSideProps() {
  const related: ItemMeta[] = [
    getStoryline('hermetics'),
    getStoryline('tattoos'),
    getStoryline('tropes'),
  ];
  return { props: { related } };
}

export default VladStoryline;

const TitleArea = styled.div`
  text-align: center;
  background: linear-gradient(0deg, #0000 0%, #0008 25%, #0008 75%, #0000 100%);
  padding: 5rem 0;
  margin-top: max(-40vw, -380px);
  margin-bottom: 3rem;
`;
const Title = styled.h2`
  font-size: 8rem;
  font-family: ${fontStackCopy};
  font-weight: 400;
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
  margin-bottom: 3rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
`;

const Post = styled.div`
  color: #fff;
  margin: 2rem auto;
  max-width: 40rem;
  font-family: ${fontStackCopy};
  font-size: ${fontSizeReading};
  line-height: 1.7;
`;

const Intro = styled.p`
  margin: 0 auto;
  font-size: ${fontSizeStandard};
  color: #fff8;
  max-width: 30rem;
`;
