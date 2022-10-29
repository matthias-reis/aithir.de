import type { NextPage } from 'next';
import { Page } from '../../components/page';
import { getAllPosts } from '../../core/data-layer';
import { PostMeta } from '../../core/types';
import { PageTitle, PageSuperTitle } from '../../components/page-title';
import styled from '@emotion/styled';
import { colorText, fontBold, mediaMedium, mediaSmall } from '../../core/style';
import { Post } from '../../components/post';
import Link from 'next/link';

type Weeks = Record<string, PostMeta[][]>;

// home page contains: welcome visual, last three posts, all current storylines, all tags
const Calendar: NextPage<{
  weeks: Weeks;
  isPreview: boolean;
}> = ({ weeks, isPreview }) => {
  return (
    <Page
      type="Calendar"
      canonicalPath="/calendar"
      title="All Posts"
      description="Articles of the past weeks ordered by daye and grouped by calendar week."
      keywords={['SciFi', 'Science Fiction', 'Science', 'Fantasy']}
    >
      <PageSuperTitle>Calendar Weeks</PageSuperTitle>
      <PageTitle>All Posts</PageTitle>
      {Object.entries(weeks)
        .sort()
        .reverse()
        .map(([w, days]) => {
          const [year, week] = w.split('-');
          return (
            <Week key={w}>
              {isPreview ? (
                <Link href={`/calendar/${w}`} passHref legacyBehavior>
                  <A>
                    <W>{week}</W>
                    <Y>{year}</Y>
                  </A>
                </Link>
              ) : (
                <div>
                  <W>{week}</W>
                  <Y>{year}</Y>
                </div>
              )}
              <Days>
                {days.map((day, i) => (
                  <Day key={i}>
                    {day.map((post) => (
                      <>
                        <Post meta={post} key={post.slug} small />
                        {isPreview && (
                          <Link
                            href={`/storylines/${post.slug}/copy`}
                            legacyBehavior
                          >
                            copy
                          </Link>
                        )}
                      </>
                    ))}
                  </Day>
                ))}
              </Days>
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
    (a, b) =>
      a.year * 100 + a.week * 10 + a.day - b.year * 100 - b.week * 10 - b.day
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
  margin-bottom: 3rem;
`;

const Days = styled.div`
  flex: 1 1 auto;
  flex-wrap: wrap;
  display: flex;
  gap: 1rem;
`;

const Day = styled.div`
  flex: 1 1 auto;
  border-top: 1px solid ${colorText};
  width: 20%;
  padding: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${mediaMedium} {
    width: 20%;
  }
  @media ${mediaSmall} {
    width: 40%;
  }
`;

const A = styled.a`
  text-decoration: none;
`;
const W = styled.div`
  text-align: right;
  font-weight: ${fontBold};
  opacity: 0.5;
  font-size: 2rem;
  line-height: 1;
`;
const Y = styled.div`
  text-align: right;
  opacity: 0.3;
  line-height: 1;
`;
