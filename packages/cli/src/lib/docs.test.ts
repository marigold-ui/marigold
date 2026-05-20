import { sliceSection } from './docs.js';

const markdown = `# Button

Some intro.

## Usage

Use this for actions.

## Props

| Name | Type | Default |
| ---- | ---- | ------- |
| variant | string | primary |

## Examples

\`\`\`tsx
<Button>Click</Button>
\`\`\`
`;

describe('sliceSection', () => {
  test('extracts props section', () => {
    const out = sliceSection(markdown, 'props');

    expect(out).toContain('## Props');
    expect(out).toContain('variant');
    expect(out).not.toContain('## Examples');
  });

  test('extracts usage section', () => {
    const out = sliceSection(markdown, 'usage');

    expect(out).toContain('## Usage');
    expect(out).toContain('Use this for actions.');
    expect(out).not.toContain('## Props');
  });

  test('extracts examples section', () => {
    const out = sliceSection(markdown, 'examples');

    expect(out).toContain('## Examples');
    expect(out).toContain('<Button>');
  });

  test('returns a placeholder when section is missing', () => {
    const out = sliceSection('# Thing\n\nNo sections.', 'props');

    expect(out).toContain('not found');
  });
});
