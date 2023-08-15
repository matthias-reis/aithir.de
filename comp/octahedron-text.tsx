import Link from 'next/link';
import { FCC } from '../core/types';

export const OctahedronText: FCC = ({ className }) => (
  <Link
    href="/"
    className={`text-3xl font-condensed  uppercase spac tracking-widest ${className}`}
  >
    <span className="font-bold">Octahedron</span>
    <span className={`font-light text-decent-600`}>World</span>
  </Link>
);
