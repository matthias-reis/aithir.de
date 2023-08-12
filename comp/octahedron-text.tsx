import Link from 'next/link';
import { FCC } from '../core/types';

export const OctahedronText: FCC = ({ className }) => (
  <Link href="/" className={`text-3xl ${className}`}>
    <span className="font-bold">Octahedron</span>
    <span className={`font-thin text-decent-500`}>World</span>
  </Link>
);
