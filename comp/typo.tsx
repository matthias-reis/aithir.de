import { FCC } from '../core/types';

export const SectionHead: FCC = ({ children }) => (
  <h2 className="text-xl border-b pb-2 mb-4">{children}</h2>
);

export const Text: FCC = ({ children }) => <p className="my-1">{children}</p>;
