import type { NextPage } from 'next';
import Image from 'next/image';
import { PageArtDirected } from '../../../components/page-art-directed';
import image from './title.jpg';

console.log(image);

// lists all available storylines
const GoliathStoryline: NextPage = () => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline="Goliath"
      image={image}
      bgColor="#000"
      canonicalPath="/storylines/goliath"
      description="What if we develop an AI with more than human level intelligence? And how powerful can it become? The story in this line is following that thought."
    >
      Hello
    </PageArtDirected>
  );
};

export default GoliathStoryline;
