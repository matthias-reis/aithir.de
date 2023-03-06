import * as React from 'react';
import { SVGProps } from 'react';
const SvgBolt = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.79 6.581a2.799 2.799 0 0 0 2.791-2.79A2.799 2.799 0 0 0 19.791 1 2.799 2.799 0 0 0 17 3.79a2.799 2.799 0 0 0 2.79 2.791Zm-5.023 19.396 1.396-6.14 2.93 2.79V31h2.79V20.535l-2.93-2.79.838-4.187a10.217 10.217 0 0 0 7.674 3.489v-2.791c-2.651 0-4.884-1.396-6-3.349L20.07 8.674c-.558-.837-1.396-1.395-2.372-1.395-.419 0-.698.14-1.117.14l-7.255 3.07v6.558h2.79v-4.745l2.512-.976-2.233 11.302-6.837-1.395L5 24.023l9.767 1.954Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgBolt;
