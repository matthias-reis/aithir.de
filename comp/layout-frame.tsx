import Link from 'next/link';
import { FCC } from '../core/types';
import Octahedron from './octahedron';
import { Boxed } from './sections';
import { OctahedronText } from './octahedron-text';

export const LayoutFrame: FCC<{
  withTextLogo?: boolean;
}> = ({ children, withTextLogo, className }) => {
  return (
    <body className={`bg-decent-200 text-decent-800 ${className}`}>
      <div className={`rounded max-w-5xl mx-auto lg:my-6 bg-decent-100 pb-5`}>
        <Boxed>
          <header
            className={`flex items-center justify-end py-4 border-decent-400 gap-4 mb-8 text-decent-900 ${
              withTextLogo && 'border-b'
            }`}
          >
            {withTextLogo && <OctahedronText />}
            <Link href="/" className={`text-main`}>
              <Octahedron className={`text-main`} />
            </Link>
          </header>
        </Boxed>
        {children}
      </div>
    </body>
  );
};
