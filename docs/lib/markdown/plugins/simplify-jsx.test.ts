import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { describe, expect, it } from 'vitest';
import { remarkSimplifyJsx } from './simplify-jsx';

// Mirrors the ordering in `lib/markdown/parser.ts`, minus the resolvers that
// need a page on disk.
const toMarkdown = async (mdx: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkSimplifyJsx)
      .use(remarkStringify)
      .process(mdx)
  );

describe('remarkSimplifyJsx', () => {
  it('drops the imports that pull demo components into a page', async () => {
    const md = await toMarkdown(
      [
        "import { CardAnatomy } from './card-anatomy';",
        '',
        '# Card',
        '',
        'A card groups related content.',
      ].join('\n')
    );

    expect(md).not.toContain('import');
    expect(md).toContain('# Card');
    expect(md).toContain('A card groups related content.');
  });

  it('drops an export alongside it', async () => {
    const md = await toMarkdown(
      ['export const meta = { title: 1 };', '', '# Card'].join('\n')
    );

    expect(md).not.toContain('export');
    expect(md).toContain('# Card');
  });

  it('leaves an import inside fenced demo source alone', async () => {
    // The fenced block *is* the demo — stripping its imports would make the
    // sample uncompilable for a reader.
    const md = await toMarkdown(
      [
        '# Card',
        '',
        '```tsx',
        "import { Card } from '@marigold/components';",
        '',
        '<Card>content</Card>;',
        '```',
      ].join('\n')
    );

    expect(md).toContain("import { Card } from '@marigold/components';");
  });

  it('drops adjacent import blocks rather than every other one', async () => {
    // Blank lines make these three separate `mdxjsEsm` nodes rather than one
    // block, which is what exercises the splice-while-visiting index. Written
    // without a blank line they parse as a single node and prove nothing.
    const md = await toMarkdown(
      [
        "import { A } from './a';",
        '',
        "import { B } from './b';",
        '',
        "import { C } from './c';",
        '',
        '# Card',
      ].join('\n')
    );

    expect(md).not.toContain('import');
    expect(md).toContain('# Card');
  });
});
