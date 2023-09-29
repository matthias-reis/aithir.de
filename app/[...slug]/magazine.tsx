import { ReadBoxed } from '../../comp/sections';
import { Subscribe } from '../../comp/subscribe';
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
      <div className="text-center text-md">
        <p>
          Wanna be informed when the next edition comes out?
          <br />
          Then please subscribe to my newsletter
        </p>
        <Subscribe />
      </div>
    </>
  ),
};
