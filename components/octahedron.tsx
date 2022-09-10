import { FC, SVGProps } from 'react';

const Octahedron: FC<{ color: string } & SVGProps<SVGSVGElement>> = ({
  color,
  ...props
}) => (
  <svg
    width={'1rem'}
    height={'1rem'}
    viewBox="0 0 60 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M23.5 34 30 0l29.5 30.5-36 3.5Z" fill={color} />
    <path d="M23.5 34 1 28.5 30 0l-6.5 34Z" fill={color} fillOpacity={0.7} />
    <path d="M23.5 34 30 59 1 28.5 23.5 34Z" fill={color} fillOpacity={0.3} />
    <path d="m23.5 34 36-3.5L30 59l-6.5-25Z" fill={color} fillOpacity={0.5} />
  </svg>
);

export default Octahedron;
