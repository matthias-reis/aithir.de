import { ComponentType, createElement, Fragment } from 'react';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { FCC } from './types';

export function parseMarkdown(s: string, components?: Record<string, FCC>) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment, components })
    .processSync(s);

  return processed.result;
}
