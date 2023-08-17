import { ReadBoxed } from '../../comp/sections';
import type { Layout } from './page';

export const magazineLayout: Layout = {
  components: {
    h1: ({ children }) => (
      <h1 className="font-condensed font-bold text-5xl md:text-8xl text-decent-900 uppercase mb-3">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-bold font-condensed text-4xl md:text-5xl text-decent-900 mt-7 mb-4">
        {children}
      </h2>
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
    <>
      <div className="flex justify-center p-5 bg-decent-300 mb-7">
        <img
          src={`/detail/${item.slug}.jpg`}
          alt={item.title}
          className="object-contain aspect-w-2 aspect-h-3 max-h-[34rem] shadow-xl shadow-decent-100"
        />
      </div>
      {sections.map((section, i) => (
        <ReadBoxed key={i}>{section}</ReadBoxed>
      ))}
    </>
  ),
};
