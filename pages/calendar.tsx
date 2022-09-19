import type { NextPage } from 'next';
import { Page } from '../components/page';
import { getAllPosts, getAllStorylines, getAllTags } from '../core/data-layer';
import { PostMeta, StorylineMeta, Tag } from '../core/types';
import { PageTitle, PageSuperTitle } from '../components/page-title';
import styled from '@emotion/styled';
import { colorText } from '../core/style';
import { Post } from '../components/post';

type Weeks = Record<string, PostMeta[][]>;

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Calendar: NextPage<{
  weeks: Weeks;
}> = ({ weeks }) => {
  return (
    <Page type="Calendar" title="All Posts">
      <PageSuperTitle>Calendar Weeks</PageSuperTitle>
      <PageTitle>All Posts</PageTitle>
      {Object.entries(weeks)
        .reverse()
        .map(([w, days]) => (
          <Week key={w}>
            <WeekNumber>{w}</WeekNumber>
            {days.map((day, i) => (
              <Day key={i}>
                {day.map((post) => (
                  <Post meta={post} key={post.slug} small />
                ))}
              </Day>
            ))}
          </Week>
        ))}
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
  //latest three visible posts
  let posts = getAllPosts().sort(
    (a, b) => a.week * 10 + a.day - b.week * 10 - b.day
  );
  if (!isPreview) {
    posts = posts.filter(
      (post) => new Date(post.date || Date.now()) <= new Date()
    );
  }
  const oldestWeek = posts[0].week;
  const latestWeek = posts[posts.length - 1].week;

  const weeks: Record<string, PostMeta[][]> = {};

  for (let i = oldestWeek; i <= latestWeek; i++) {
    weeks[pad(i)] = [[], [], [], []];
  }
  for (const post of posts) {
    weeks[pad(post.week)][post.day - 1].push(post);
  }

  return { props: { weeks } };
}

const pad = (s: number) => `00${s}`.slice(-2);

const WeekNumber = styled.div``;

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
