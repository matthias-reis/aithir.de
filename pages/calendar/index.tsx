import type { NextPage } from 'next';
import { Page } from '../../components/page';
import { getAllPosts } from '../../core/data-layer';
import { PostMeta } from '../../core/types';
import { PageTitle, PageSuperTitle } from '../../components/page-title';
import styled from '@emotion/styled';
import { colorText } from '../../core/style';
import { Post } from '../../components/post';
import Link from 'next/link';

type Weeks = Record<string, PostMeta[][]>;

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Calendar: NextPage<{
  weeks: Weeks;
  isPreview: boolean;
}> = ({ weeks, isPreview }) => {
  return (
    <Page type="Calendar" title="All Posts">
      <PageSuperTitle>Calendar Weeks</PageSuperTitle>
      <PageTitle>All Posts</PageTitle>
      {Object.entries(weeks)
        .reverse()
        .map(([w, days]) => {
          return (
            <Week key={w}>
              {isPreview ? (
                <Link href={`/calendar/${w}`}>{w}</Link>
              ) : (
                <div>{w}</div>
              )}
              {days.map((day, i) => (
                <Day key={i}>
                  {day.map((post) => (
                    <Post meta={post} key={post.slug} small />
                  ))}
                </Day>
              ))}
            </Week>
          );
        })}
    </Page>
  );
};

export default Calendar;

export function getServerSideProps({
  query,
}: {
  query: Record<string, string>;
}) {
  const isPreview = 'preview' in query;
  let posts = getAllPosts().sort(
    (a, b) => a.week * 10 + a.day - b.week * 10 - b.day
  );
  if (!isPreview) {
    posts = posts.filter(
      (post) => new Date(post.date || Date.now()) <= new Date()
    );
  }

  const weeks: Record<string, PostMeta[][]> = {};

  for (const post of posts) {
    const w = `${post.year}-${pad(post.week)}`;
    if (!weeks[w]) {
      weeks[w] = [[], [], [], []];
    }
    weeks[w][post.day - 1].push(post);
  }

  return { props: { weeks, isPreview } };
}

const pad = (s: number) => `00${s}`.slice(-2);

const Week = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Day = styled.div`
  flex: 1 1 auto;
  border-top: 1px solid ${colorText};
  width: 20%;
  padding: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
`;
