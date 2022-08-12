const pad = (n: number) => (n < 10 ? `0${n}` : n);

export const formatDate = (date: string) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
