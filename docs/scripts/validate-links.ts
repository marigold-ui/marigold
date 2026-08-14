import { getTableOfContents } from 'fumadocs-core/content/toc';
import { getSlugs } from 'fumadocs-core/source';
import {
  printErrors,
  readFiles,
  scanURLs,
  validateFiles,
} from 'next-validate-link';
import path from 'node:path';

const toUrl = (file: string) =>
  `/${getSlugs(path.relative('content', file)).join('/')}`;

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

  printErrors(await validateFiles(files, { scanned }), true);
};

validateLinks().catch(err => {
  console.error(err);
  process.exit(1);
});
