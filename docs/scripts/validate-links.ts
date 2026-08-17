import { getTableOfContents } from 'fumadocs-core/content/toc';
import { getSlugs } from 'fumadocs-core/source';
import type { RootContent } from 'mdast';
import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
import path from 'node:path';

const toUrl = (file: string) =>
  `/${getSlugs(path.relative('content', file)).join('/')}`;

/** `href: '...'` inside a JSX expression attribute, e.g. `items={[{ href }]}`. */
const HREF_IN_EXPRESSION = /href:\s*['"]([^'"]+)['"]/g;

/**
 * The built-in scanner reads markdown links plus *string-valued* attributes on
 * components listed in `markdown.components`. Our link-heavy components take
 * their targets as expressions instead — `<TeaserList items={[{ href: … }]} />`
 * — and the built-in drops those, because it skips any attribute whose value is
 * not a plain string. That left 15 dead links invisible to this check.
 *
 * So scan both: markdown links, `href` string attributes on any JSX element,
 * and `href` keys inside expression attributes. The last one is matched
 * textually rather than by walking the estree — the attribute value is
 * arbitrary JS, and a regex over it costs nothing and cannot throw.
 *
 * Note errors are reported at the element's start line, not the line the href
 * sits on, because the position we get belongs to the node.
 */
const onNode = (node: RootContent): { hrefs: string[] } => {
  if (node.type === 'link') return { hrefs: [node.url] };
  if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement')
    return { hrefs: [] };

  const hrefs: string[] = [];
  for (const attr of node.attributes) {
    if (attr.type !== 'mdxJsxAttribute') continue;

    if (typeof attr.value === 'string') {
      if (attr.name === 'href') hrefs.push(attr.value);
      continue;
    }

    const expression = attr.value?.value;
    if (typeof expression !== 'string') continue;
    for (const [, href] of expression.matchAll(HREF_IN_EXPRESSION))
      hrefs.push(href);
  }

  return { hrefs };
};

const validateLinks = async () => {
  const files = await readFiles('content/**/*.mdx', { pathToUrl: toUrl });

  const scanned = await scanURLs({
    preset: 'next',
    populate: {
      '(docs)/[...slug]': files
        .map(file => ({
          value: getSlugs(path.relative('content', file.path)),
          hashes: getTableOfContents(file.content).map(item =>
            item.url.slice(1)
          ),
        }))
        // The empty slug is `content/index.mdx`, served by `app/page.tsx`.
        .filter(page => page.value.length > 0),
    },
  });

  printErrors(
    await validateFiles(files, {
      scanned,
      // The `next` preset only globs `app/**/page.*`, so route handlers are
      // invisible to it and have to be listed by hand.
      whitelist: ['/rss.xml'],
      markdown: { onNode },
    }),
    true
  );
};

validateLinks().catch(err => {
  console.error(err);
  process.exit(1);
});
