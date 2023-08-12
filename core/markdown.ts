import { ComponentType, createElement, FC, Fragment } from 'react';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

export function parseMarkdown(s: string, components?: Record<string, FC>) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment, components })
    .processSync(s);

  return processed.result;
}
