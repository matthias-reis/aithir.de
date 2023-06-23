import type { NextPage } from 'next';
import { PageArtDirected } from '../../../components/page-art-directed';
import text from '../../../_archive/tattoos/all.md';
import { parseMarkdown } from '../../../core/markdown';
import { ComponentType, ReactElement, ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import image from './title.jpg';
import p1 from './1.jpeg';
import p2 from './2.jpeg';
// import p3 from './3.jpeg';
import p4 from './4.jpeg';
import p5 from './5.jpeg';
import p6 from './6.jpeg';
import p7 from './7.jpeg';
import p8 from './8.jpeg';
import p9 from './9.jpeg';
import p10 from './10.jpeg';
import Image, { StaticImageData } from 'next/image';
import { ItemMeta } from '../../../core/types';
import { getStoryline } from '../../../core/data-layer';

type Alignment = 'l' | 'c' | 'r';

const images: [Alignment, StaticImageData | false, string][] = [
  ['c', false, ''], // tsuru
  ['l', p1, ''],
  ['r', p2, ''],
  ['l', p4, ''],
  ['r', p5, ''],
  ['c', false, ''], // lucy
  ['l', p6, ''],
  ['r', false, ''],
  ['l', p7, ''],
  ['r', p8, ''],
  ['l', p9, ''],
  ['r', p10, ''],
  ['c', false, ''],
];

const Left = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-evenly;
  flex-flow: row;
  margin: 2rem;

  & div {
    max-width: 30rem;
  }
  & img {
    flex: 0 0 auto;
    max-width: 270px;
    max-height: 480px;
    aspect-ratio: 16 / 9;
  }

  @media (max-width: 768px) {
    flex-flow: column;
    margin: 0;
  }
`;
const Right = styled(Left)`
  flex-flow: row-reverse;
`;
const Center = styled.div`
  display: block;
  max-width: 30rem;
  margin: 2rem auto;
`;

const layouts: Record<Alignment, ComponentType<{ children: ReactNode }>> = {
  l: Left,
  r: Right,
  c: Center,
};

const parts: {
  md: ReactElement;
  alignment: Alignment;
  image: StaticImageData | false;
  alt?: string;
}[] = text
  .split('---')
  .map((t: string) => t.trim())
  .map(parseMarkdown)
  .map((md, i) => ({
    md,
    alignment: images[i][0],
    image: images[i][1],
    alt: images[i][2],
  }));

const description = `Just like in Ray Bradbury's "The Illustrated Man", I am trying to bring my tattoos to life in this storyline.`;

// lists all available storylines
const GoliathStoryline: NextPage<{
  related: ItemMeta[];
}> = ({ related }) => {
  return (
    <PageArtDirected
      type="Storyline"
      storyline="Tattoos"
      image={image}
      bgColor="#132634"
      color="#ac768c"
      logoColor="#ffffff"
      canonicalPath="/storylines/tattoos"
      description={description}
      start={new Date('2022-05-25')}
      end={new Date('2023-02-13')}
      related={related}
    >
      <Intro>{description}</Intro>
      <Annotation>
        <p>
          Some weeks ago, my journey to cover both of my arms with tattoos has
          reached its end. Both of my arms are covered in ink.
        </p>
        <p>
          Just like almost every other tattooed person, I often get asked what
          the meaning of the motives is - or what they symbolize in my life. As
          if something that permanent would need to have a deeper cause 😃.
          Nope. They don&apos;t mean anything, they&apos;re &quot;just&quot;
          art. <strong>They acquire meaning by being on my skin.</strong>
        </p>
        <p>
          But as I&apos;m into making up stories, I&apos;ve also tried to find
          commonalities and a meaning or a small world that opens up when you
          look behind the already existing general themes and concepts.
          It&apos;s inspired by Ray Bradbury&apos;s &quot;The Illustrated
          Man&quot;.
        </p>
        <p>
          My right arm is the fantasy side. Its story plays on a far east ocean
          and involves Shinto spirits and Japanese demons.
        </p>
        <p>
          The left side combines science fiction and nature with cyborg
          creatures that turn nature into tech or vice versa.
        </p>
      </Annotation>
      <Headline>Tsuru</Headline>
      <SubHeadline>Right Arm</SubHeadline>
      <Annotation></Annotation>
      {parts.slice(0, 5).map((p, i) => {
        const Layout = layouts[p.alignment];
        return (
          <Layout key={i}>
            <Post key={i}>{p.md}</Post>
            {p.image && (
              <Image
                src={p.image.src}
                width={p.image.width}
                height={p.image.height}
                alt={p.alt || ''}
              />
            )}
          </Layout>
        );
      })}
      <Annotation>
        <p>
          This has been the story of my right arm. The left one is still not
          finished. So that story will be told on another day.
        </p>

        <p>
          The beautiful Tyto owl was the very first motive. It&apos;s over ten
          years old in the meantime.But the rest of the arm got it&apos;s
          torture just recently the whole procedure took several sessions over
          the span of a whole year and in the story, you will recognise all of
          its protagonists.
        </p>

        <p>
          This story is also the first playing in my cyberpunk world called The
          Mesh.
          <Link href="/storylines/mesh">
            If you&apos;re interested in its worldbuilding, I have created a
            full storyline around that.
          </Link>
        </p>
      </Annotation>
      <Headline>The Old Owl</Headline>
      <SubHeadline>Left Arm</SubHeadline>
      {parts.slice(5).map((p, i) => {
        const Layout = layouts[p.alignment];
        return (
          <Layout key={i}>
            <Post key={i}>{p.md}</Post>
            {p.image && (
              <Image
                src={p.image.src}
                width={p.image.width}
                height={p.image.height}
                alt={p.alt || ''}
              />
            )}
          </Layout>
        );
      })}
      <Annotation>
        <p>
          While my tattoos as well as many others out there don&apos;t have a
          real meaning, they still follow a common concept. I wanted the pieces
          to fit together - in style and in topic.
        </p>
        <p>
          Usually, this is not so easy. Sometimes you start a motive but it
          turns out you don&apos;t like the artist&apos;s style or parts of the
          project just have started at different times in your life.
        </p>
        <p>
          These stories are my attempt to make sense of the chaos. They have
          brought everything to an ordered end.
        </p>
      </Annotation>
    </PageArtDirected>
  );
};

export function getServerSideProps() {
  const related: ItemMeta[] = [
    getStoryline('mesh'),
    getStoryline('tropes'),
    getStoryline('operator'),
  ];
  return { props: { related } };
}

export default GoliathStoryline;

const Headline = styled.h2`
  font-size: 5rem;
  margin: 5rem 1rem 0 1rem;
  line-height: 1;
  color: #7e3755;
  border-bottom: 3px dashed #7e3755;
`;
const SubHeadline = styled.h5`
  font-size: 1.3rem;
  font-weight: 300;
  margin: 0;
  margin: 0 0 0 4rem;
  color: #fff5;
  text-transform: uppercase;
  letter-spacing: 1rem;
`;

const Post = styled.div`
  color: #fff;
  margin: 0 1rem;
`;

const Hr = styled.hr`
  border: none;
  border-bottom: 2px solid #fff3;
  width: 30%;
  margin: 3rem auto;
`;

const Intro = styled.p`
  font-weight: bold;
  margin: 0 1rem 5rem auto;
  margin-top: max(-12vw, -270px);
  padding-left: 1rem;
  text-align: right;
  font-size: 20px;
  color: #fff;
  max-width: 30rem;
`;

const Annotation = styled.div`
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
