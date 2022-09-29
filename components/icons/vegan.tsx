import * as React from 'react';
import { SVGProps } from 'react';

const SvgVegan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M30.6667 23.9999L19 7.33325L7.33333 23.9999H10.4333L4 33.9999H15.6667V40.6666H22.3333V33.9999H34L27.5667 23.9999H30.6667Z"
      fill="currentColor"
    />
    <path
      d="M37.5676 23.9999H40.6676L29.0009 7.33325L25.0176 13.0166L33.8676 25.6666H30.6176L35.9842 33.9999H44.0009L37.5676 23.9999ZM25.6676 35.6666H32.3342V40.6666H25.6676V35.6666Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgVegan;
