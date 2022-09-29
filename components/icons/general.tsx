import * as React from 'react';
import { SVGProps } from 'react';

const SvgGeneral = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23.8792 44L44 23.9994L23.8792 4L4 23.9994L23.8792 44ZM29.5504 24.7821L23.8824 40.4312L18.2155 24.7821H29.5504ZM18.2155 23.2186L23.8829 7.56944L29.5504 23.2186H18.2155ZM31.3092 24.7821H40.9242L25.9014 39.7157L31.3092 24.7821ZM31.3092 23.2186L25.9012 8.28499L40.9239 23.2186H31.3092ZM16.4578 23.2186H7.05525L21.8483 8.3353L16.4578 23.2186ZM16.4578 24.7821L21.8477 39.6643L7.05584 24.7821H16.4578Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgGeneral;
