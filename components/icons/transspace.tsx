import * as React from 'react';
import { SVGProps } from 'react';

const SvgTransspace = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_64_467)">
      <path
        d="M30 10L20 20H14L8 28C8 28 14.357 26.23 18.065 27.06L8 40L21.184 29.745C23.023 33.953 20 40 20 40L28 34V28L38 18L40 8L30 10Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_64_467">
        <rect width={32} height={32} fill="white" transform="translate(8 8)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgTransspace;