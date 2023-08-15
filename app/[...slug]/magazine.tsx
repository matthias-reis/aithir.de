import { Boxed } from '../../comp/sections';
import type { Layout } from './page';

export const magazineLayout: Layout = {
  components: {
    h2: ({ children }) => (
      <h2 className="font-bold text-3xl text-decent-900 mt-7 mb-4">
        {children}
      </h2>
    ),
    h1: ({ children }) => (
      <h1 className="font-script font-bold text-7xl text-decent-500">
        {children}
      </h1>
    ),
    p: ({ children }) => (
      <p className="text-lg text-decent-700 mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="text-lg mb-4 list-outside list-disc text-decent-700">
        {children}
      </ul>
    ),
    li: ({ children }) => <li className="mb-3 ml-4">{children}</li>,
  },
  Main: ({ item, sections }) => (
    <div>
      {sections.map((section, i) => (
        <Boxed key={i}>{section}</Boxed>
      ))}
    </div>
  ),
};
