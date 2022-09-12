import styled from '@emotion/styled';
import { FC } from 'react';
import { colorMain, fontSizeMedium } from '../core/style';

export const DateLabel: FC<{ date: Date }> = ({ date }) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <DateBox>
      <Year>{year}</Year>
      <Month>{pad(month)}</Month>
      <Day>{pad(day)}</Day>
    </DateBox>
  );
};

const pad = (n: number) => `0${n}`.slice(-2);

const DateBox = styled.div`
  color: ${colorMain};
  font-size: ${fontSizeMedium};
  margin-bottom: 1rem;
`;

const Year = styled.span`
  opacity: 0.4;
  font-size: 75%;
`;
const Month = styled.span`
  opacity: 0.55;
`;
const Day = styled.span`
  opacity: 0.8;
`;
