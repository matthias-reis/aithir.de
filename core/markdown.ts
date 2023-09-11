import { createElement, Fragment } from 'react';
import * as prod from 'react/jsx-runtime';

import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { FCC } from './types';

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export function parseMarkdown(s: string, components?: Record<string, FCC>) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype)
    .use(rehypeReact, { ...production, components })
    .processSync(s);

  return processed.result;
}
