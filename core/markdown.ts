import { createElement, Fragment } from 'react';
import { unified } from 'unified';
import parse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';

export function parseMarkdown(s: string) {
  const processed = unified()
    .use(parse)
    .use(remarkRehype)
    .use(rehypeReact, { createElement, Fragment })
    .processSync(s);
  // console.log(processed);
  return processed.result;
}
