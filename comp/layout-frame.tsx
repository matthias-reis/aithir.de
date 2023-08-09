import Link from 'next/link';
import { FCC } from '../core/types';
import Octahedron from './octahedron';
import { Boxed } from './sections';

export const LayoutFrame: FCC<{
  colorSpace: string;
  withTextLogo?: boolean;
}> = ({ children, colorSpace, withTextLogo }) => {
  return (
    <body className={`bg-${colorSpace}-200 text-${colorSpace}-800`}>
      <div
        className={`rounded max-w-5xl mx-auto lg:my-6 bg-${colorSpace}-100 pb-5`}
      >
        <Boxed>
          <header className="flex items-center justify-end py-4 border-b border-neutral-400 gap-4 mb-8">
            <Link href="/" className="text-3xl">
              <span className="font-bold">Octahedron</span>
              <span className="font-thin text-neutral-500">World</span>
            </Link>
            <Link href="/">
              <Octahedron className={`text-${colorSpace}-950`} />
            </Link>
          </header>
        </Boxed>
        {children}
      </div>
    </body>
  );
};
