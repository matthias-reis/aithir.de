import * as React from 'react';
import { SVGProps } from 'react';

const SvgHermetics = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_64_423)">
      <path
        d="M14 11.5L9 6.5H6.5V9L11.5 14L14 11.5ZM16.5 4H19V9H16.5V4ZM26.5 16.5H31.5V19H26.5V16.5ZM29 9V6.5H26.5L21.5 11.5L24 14L29 9ZM4 16.5H9V19H4V16.5ZM16.5 26.5H19V31.5H16.5V26.5ZM6.5 26.5V29H9L14 24L11.5 21.5L6.5 26.5ZM43.4537 38.4537L18.605 13.605C17.8763 12.8763 16.6825 12.8763 15.9537 13.605L13.605 15.9537C12.8763 16.6825 12.8763 17.8763 13.605 18.605L38.4537 43.4537C39.1825 44.1825 40.3763 44.1825 41.105 43.4537L43.4537 41.105C44.1825 40.3763 44.1825 39.1825 43.4537 38.4537ZM22.75 25.25L15.25 17.75L17.75 15.25L25.25 22.75L22.75 25.25Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_64_423">
        <rect width={40} height={40} fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgHermetics;