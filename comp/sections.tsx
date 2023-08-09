import { ComponentType } from 'react';
import { FCC } from '../core/types';

export const Section: FCC<{ headline: string; subHeadline?: string }> = ({
  children,
  headline,
  subHeadline,
}) => (
  <Boxed Component="section" className="mt-8">
    <div className="pb-6 my-6">
      <h2 className="text-neutral-900 text-4xl font-bold">{headline}</h2>
      {subHeadline && (
        <p className="text-neutral-900 font-light mt-1">{subHeadline}</p>
      )}
    </div>
    {children}
  </Boxed>
);

export const Grid: FCC = ({ children }) => (
  <ul className="grid gap-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-neutral-300 border-y border-neutral-300">
    {children}
  </ul>
);

export const GridItem: FCC = ({ children }) => (
  <li className="bg-neutral-100 flex items-stretch">{children}</li>
);

export const Boxed: FCC<{ Component?: JSX.ElementType }> = ({
  children,
  className,
  Component = 'div',
}) => <Component className={`mx-5 md:mx-6 ${className}`}>{children}</Component>;
