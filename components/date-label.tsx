import styled from '@emotion/styled';
import { FC } from 'react';
import { colorMain, fontSizeMedium, fontSizeSmall } from '../core/style';

export const DateLabel: FC<{ date: Date; small?: boolean; color?: string }> = ({
  date,
  small = false,
  color = colorMain,
}) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <DateBox small={small} color={color}>
      <Year>{year}</Year>
      <Month>{pad(month)}</Month>
      <Day>{pad(day)}</Day>
    </DateBox>
  );
};

const pad = (n: number) => `0${n}`.slice(-2);

const DateBox = styled.div<{ small: boolean; color: string }>`
  color: ${({ color }) => color};
  font-size: ${({ small }) => (small ? fontSizeSmall : fontSizeMedium)};
  margin-bottom: ${({ small }) => (small ? '0.25rem' : '1rem')};
`;

const Year = styled.span`
  opacity: 0.5;
  font-size: 75%;
`;
const Month = styled.span`
  opacity: 0.65;
`;
const Day = styled.span`
  opacity: 0.8;
  font-weight: bold;
`;
