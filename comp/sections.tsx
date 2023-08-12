import { ComponentType } from 'react';
import { FCC } from '../core/types';

export const Section: FCC<{
  headline: string;
  subHeadline?: string;
  script?: boolean;
}> = ({ children, headline, subHeadline, script }) => (
  <Boxed Component="section" className="mt-8">
    <div className="pb-6 my-4 text-center">
      <h2
        className={`font-bold ${
          script
            ? 'text-decent-500 text-8xl font-script'
            : 'text-decent-900 text-5xl'
        }`}
      >
        {headline}
      </h2>
      {subHeadline && (
        <p className="text-decent-700 text-xl font-light mt-1">{subHeadline}</p>
      )}
    </div>
    {children}
  </Boxed>
);

export const Grid: FCC = ({ children }) => (
  <ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-decent-300 border-y border-decent-300">
    {children}
  </ul>
);

export const GridItem: FCC = ({ children }) => (
  <li className="bg-decent-100 flex items-stretch">{children}</li>
);

export const Boxed: FCC<{ Component?: JSX.ElementType }> = ({
  children,
  className,
  Component = 'div',
}) => <Component className={`mx-5 md:mx-6 ${className}`}>{children}</Component>;
