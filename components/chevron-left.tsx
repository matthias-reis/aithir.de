import { FC, SVGProps } from 'react';

export const ChevronLeft: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z" />
  </svg>
);
