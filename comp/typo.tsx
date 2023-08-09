import { FCC } from '../core/types';

export const SectionHead: FCC = ({ children }) => (
  <h2 className="text-neutral-900 text-5xl font-bold border-b border-neutral-400 pb-6 mb-2">
    {children}
  </h2>
);

export const Text: FCC = ({ children }) => (
  <p className="text-neutral-900 font-light my-1">{children}</p>
);
