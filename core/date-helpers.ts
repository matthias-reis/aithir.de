const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'Dicember',
];

export const getMonthName = (date: Date): string => {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};
export const getYearSpan = (start: Date, end: Date): string => {
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();
  return startYear === endYear
    ? start.getFullYear().toFixed()
    : `${start.getFullYear()}-${end.getFullYear()}`;
};
