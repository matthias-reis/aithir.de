import * as React from 'react';
import { SVGProps } from 'react';
const SvgPredictions = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 5.5C6.70167 5.5 2 10.2017 2 16C2 21.7983 6.70167 26.5 12.5 26.5C18.2983 26.5 23 21.7983 23 16C23 10.2017 18.2983 5.5 12.5 5.5ZM15.755 20.9117L11.3333 16.4783V10.1667H13.6667V15.5217L17.4117 19.2667L15.755 20.9117V20.9117Z"
      fill="currentColor"
    />
    <path
      d="M22.9883 6.10669V8.62669C25.7533 9.93336 27.6666 12.745 27.6666 16C27.6666 19.255 25.7533 22.0667 22.9883 23.3734V25.8934C27.0599 24.4467 29.9999 20.5617 29.9999 16C29.9999 11.4384 27.0599 7.55336 22.9883 6.10669V6.10669Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPredictions;