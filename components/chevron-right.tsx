import { FC, SVGProps } from 'react';

export const ChevronRight: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z" />
  </svg>
);
